import {NextResponse} from 'next/server';
import {getSession,requireRole} from '@/lib/auth';
import {pool,query} from '@/lib/db';
import bcrypt from 'bcryptjs';
import {randomBytes} from 'crypto';

export async function GET(){
 try{
  const u=await getSession(); if(!u)return NextResponse.json({error:'Unauthorized'},{status:401});
  if(u.role==='super_admin')return NextResponse.json({branches:await query('SELECT * FROM branches ORDER BY name')});
  const b=(await query<any>('SELECT * FROM branches WHERE id=?',[u.branch_id]))[0];
  if(u.role==='branch_admin'){
   const [citizens,schedules]=await Promise.all([
    query('SELECT id,name,nik,qr_token FROM users WHERE branch_id=? AND role=?',[u.branch_id,'citizen']),
    query('SELECT * FROM aid_schedules WHERE branch_id=? ORDER BY schedule_date DESC',[u.branch_id])
   ]);
   return NextResponse.json({branch:b,citizens,schedules});
  }
  return NextResponse.json({branch:b,reports:await query('SELECT * FROM issue_reports WHERE user_id=? ORDER BY created_at DESC',[u.id])});
 }catch{return NextResponse.json({error:'Gagal memuat data'},{status:500})}
}

export async function POST(req:Request){
 try{
  const x=await req.json();
  if(x.action==='branch'){
   await requireRole(['super_admin']);
   const code=String(x.code||'').trim(),name=String(x.name||'').trim(),region=String(x.region||'').trim(),username=String(x.username||'').trim(),password=String(x.password||'');
   if(!code||!name||!region||!username||password.length<8)throw new Error('Lengkapi data cabang; password minimal 8 karakter');
   const hash=await bcrypt.hash(password,10),c=await pool.getConnection();
   try{await c.beginTransaction();const [result]:any=await c.execute('INSERT INTO branches(code,name,region) VALUES(?,?,?)',[code,name,region]);await c.execute("INSERT INTO users(name,username,password_hash,role,branch_id) VALUES(?,?,?,'branch_admin',?)",[name,username,hash,result.insertId]);await c.commit()}catch(e){await c.rollback();throw e}finally{c.release()}
  }else if(x.action==='budget'){
   await requireRole(['super_admin']);const amount=Number(x.amount);if(!Number.isFinite(amount)||amount<=0)throw new Error('Nominal anggaran tidak valid');
   const c=await pool.getConnection();try{await c.beginTransaction();await c.execute('UPDATE branches SET allocated_budget=allocated_budget+? WHERE id=?',[amount,Number(x.branch_id)]);await c.execute('INSERT INTO branch_budget_logs(branch_id,amount,notes,allocated_date) VALUES(?,?,?,CURDATE())',[Number(x.branch_id),amount,String(x.notes||'Alokasi anggaran')]);await c.commit()}catch(e){await c.rollback();throw e}finally{c.release()}
  }else if(x.action==='citizen'){
   const u=await requireRole(['branch_admin']);const name=String(x.name||'').trim(),username=String(x.username||'').trim(),password=String(x.password||'');if(!name||!username||password.length<8)throw new Error('Nama, username, dan password minimal 8 karakter wajib diisi');
   const hash=await bcrypt.hash(password,10);await query("INSERT INTO users(name,username,nik,password_hash,role,branch_id,qr_token) VALUES(?,?,?,?,'citizen',?,?)",[name,username,x.nik||null,hash,u.branch_id,'W-'+randomBytes(20).toString('hex')]);
  }else if(x.action==='schedule'){
   const u=await requireRole(['branch_admin']);const title=String(x.title||'').trim(),date=String(x.schedule_date||'');if(!title||!/^\\d{4}-\\d{2}-\\d{2}$/.test(date))throw new Error('Judul dan tanggal jadwal wajib diisi');
   const c=await pool.getConnection();try{
    await c.beginTransaction();
    const [insert]:any=await c.execute("INSERT INTO aid_schedules(branch_id,title,schedule_date,history_table_name,status) VALUES(?,?,?,'pending','draft')",[u.branch_id,title,date]);
    const id=Number(insert.insertId),table='schedule_history_'+id;if(!/^schedule_history_\\d+$/.test(table))throw new Error('Nama tabel histori tidak valid');const quoted=String.fromCharCode(96)+table+String.fromCharCode(96);
    await c.execute('CREATE TABLE '+quoted+" (id INT AUTO_INCREMENT PRIMARY KEY,schedule_id INT NOT NULL,user_id INT NOT NULL,citizen_name VARCHAR(120) NOT NULL,nik VARCHAR(30) NULL,qr_token VARCHAR(100) NOT NULL,allocated_amount DECIMAL(15,2) NOT NULL DEFAULT 0,received_amount DECIMAL(15,2) NOT NULL DEFAULT 0,claim_status ENUM('pending','claimed') NOT NULL DEFAULT 'pending',claimed_at DATETIME NULL,scanned_by INT NULL,UNIQUE KEY uq_user(user_id),INDEX idx_qr(qr_token),INDEX idx_status(claim_status)) ENGINE=InnoDB");
    const [citizens]:any=await c.execute("SELECT id,name,nik,qr_token FROM users WHERE branch_id=? AND role='citizen'",[u.branch_id]);
    const amount=Number(x.amount);if(!Number.isFinite(amount)||amount<=0)throw new Error('Nominal alokasi per warga harus lebih dari nol');
    const [budgetRows]:any=await c.execute('SELECT allocated_budget,disbursed_total FROM branches WHERE id=? FOR UPDATE',[u.branch_id]);
    if(amount*citizens.length>Number(budgetRows[0].allocated_budget)-Number(budgetRows[0].disbursed_total))throw new Error('Anggaran cabang tidak mencukupi');
    for(const citizen of citizens)await c.execute('INSERT INTO '+quoted+'(schedule_id,user_id,citizen_name,nik,qr_token,allocated_amount) VALUES(?,?,?,?,?,?)',[id,citizen.id,citizen.name,citizen.nik,citizen.qr_token,amount]);
    await c.execute('UPDATE aid_schedules SET history_table_name=? WHERE id=?',[table,id]);await c.commit();
   }catch(e){await c.rollback();throw e}finally{c.release()}
  }else if(x.action==='activate'){
   const u=await requireRole(['branch_admin']);await query("UPDATE aid_schedules SET status='active' WHERE id=? AND branch_id=?",[Number(x.id),u.branch_id]);
  }else if(x.action==='claim'){
   const u=await requireRole(['branch_admin']);const id=Number(x.schedule_id),table='schedule_history_'+id;if(!Number.isSafeInteger(id)||id<1||!/^schedule_history_\\d+$/.test(table))throw new Error('ID jadwal tidak valid');
   const valid=await query<any>("SELECT id FROM aid_schedules WHERE id=? AND branch_id=? AND status='active' AND schedule_date=CURDATE()",[id,u.branch_id]);if(!valid.length)throw new Error('Jadwal tidak aktif, bukan milik cabang ini, atau bukan tanggal hari ini');const c=await pool.getConnection();try{await c.beginTransaction();const quoted=String.fromCharCode(96)+table+String.fromCharCode(96);const [rows]:any=await c.execute('SELECT * FROM '+quoted+' WHERE qr_token=? FOR UPDATE',[String(x.qr_token||'')]);const v=rows[0];if(!v)throw new Error('QR tidak terdaftar pada jadwal');if(v.claim_status==='claimed')throw new Error('Bantuan sudah diklaim');const amount=Number(x.received_amount);if(!Number.isFinite(amount)||amount<0||amount>Number(v.allocated_amount))throw new Error('Nominal diterima melebihi alokasi atau tidak valid');await c.execute("UPDATE "+quoted+" SET claim_status='claimed',received_amount=?,claimed_at=NOW(),scanned_by=? WHERE id=?",[amount,u.id,v.id]);await c.execute('UPDATE branches SET disbursed_total=disbursed_total+? WHERE id=?',[amount,u.branch_id]);await c.commit()}catch(e){await c.rollback();throw e}finally{c.release()}
  }else if(x.action==='report'){
   const u=await requireRole(['citizen']);const subject=String(x.subject||'').trim(),description=String(x.description||'').trim();if(!subject||!description)throw new Error('Subjek dan deskripsi wajib diisi');await query('INSERT INTO issue_reports(user_id,branch_id,subject,description) VALUES(?,?,?,?)',[u.id,u.branch_id,subject,description]);
  }else throw new Error('Aksi tidak dikenal');
  return NextResponse.json({ok:true});
 }catch(e:any){return NextResponse.json({error:e.message==='UNAUTHORIZED'?'Akses ditolak':e.message||'Operasi gagal'},{status:400})}
}