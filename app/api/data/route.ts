import {NextResponse} from 'next/server';
import {getSession,requireRole} from '@/lib/auth';
import {pool,query} from '@/lib/db';
import bcrypt from 'bcryptjs';
import {randomBytes} from 'crypto';

const money=(v:unknown)=>{const n=Number(v);if(!Number.isFinite(n)||n<=0)throw new Error('Nominal harus lebih dari nol');return n};
const historyTable=(id:number)=>{if(!Number.isSafeInteger(id)||id<1)throw new Error('ID jadwal tidak valid');return '`schedule_history_'+id+'`'};

export async function GET(){
 try{
  const u=await getSession();if(!u)return NextResponse.json({error:'Unauthorized'},{status:401});
  if(u.role==='super_admin'){
   const [branches,reports]=await Promise.all([
    query('SELECT b.*,COUNT(DISTINCT s.id) schedule_count FROM branches b LEFT JOIN aid_schedules s ON s.branch_id=b.id GROUP BY b.id ORDER BY b.name'),
    query('SELECT r.*,u.name citizen_name,b.name branch_name FROM issue_reports r JOIN users u ON u.id=r.user_id JOIN branches b ON b.id=r.branch_id ORDER BY r.created_at DESC')
   ]);
   const monthlyMap=new Map<string,{branch_id:number,branch_name:string,month:string,disbursed:number,allocated:number}>();
   const [allSchedules,budgetMonths]:any=await Promise.all([
    query("SELECT id,branch_id FROM aid_schedules ORDER BY id"),
    query("SELECT branch_id,DATE_FORMAT(allocated_date,'%Y-%m') month_key,COALESCE(SUM(amount),0) amount FROM branch_budget_logs GROUP BY branch_id,DATE_FORMAT(allocated_date,'%Y-%m')")
   ]);
   const branchName=(id:number)=>String((branches as any[]).find((b:any)=>Number(b.id)===Number(id))?.name||'Cabang');
   for(const row of budgetMonths){const key=String(row.branch_id)+'-'+row.month_key;const item=monthlyMap.get(key)||{branch_id:Number(row.branch_id),branch_name:branchName(row.branch_id),month:row.month_key,disbursed:0,allocated:0};item.allocated=Number(row.amount);monthlyMap.set(key,item)}
   for(const schedule of allSchedules){const table=historyTable(Number(schedule.id));const sums=await query<any>("SELECT DATE_FORMAT(claimed_at,'%Y-%m') month_key,COALESCE(SUM(received_amount),0) amount FROM "+table+" WHERE claim_status='claimed' GROUP BY DATE_FORMAT(claimed_at,'%Y-%m')");for(const sum of sums){const key=String(schedule.branch_id)+'-'+sum.month_key;const item=monthlyMap.get(key)||{branch_id:Number(schedule.branch_id),branch_name:branchName(schedule.branch_id),month:sum.month_key,disbursed:0,allocated:0};item.disbursed+=Number(sum.amount||0);monthlyMap.set(key,item)}}
   const monthly=[...monthlyMap.values()].sort((a,b)=>a.month.localeCompare(b.month)||a.branch_name.localeCompare(b.branch_name));
   return NextResponse.json({branches,reports,monthly});
  }
  const branch=(await query<any>('SELECT * FROM branches WHERE id=?',[u.branch_id]))[0];
  if(u.role==='branch_admin'){
   // Tutup otomatis jadwal yang tanggalnya sudah lewat atau jam selesai hari ini sudah terlewati.
   await query("UPDATE aid_schedules SET status='completed' WHERE branch_id=? AND status='active' AND (schedule_date<CURDATE() OR (schedule_date=CURDATE() AND end_time IS NOT NULL AND end_time<CURTIME()))",[u.branch_id]);
   const [citizens,schedules,reports]=await Promise.all([
    query('SELECT id,name,nik,qr_token FROM users WHERE branch_id=? AND role=? ORDER BY name',[u.branch_id,'citizen']),
    query<any>('SELECT * FROM aid_schedules WHERE branch_id=? ORDER BY schedule_date DESC,id DESC',[u.branch_id]),
    query('SELECT r.*,u.name citizen_name FROM issue_reports r JOIN users u ON u.id=r.user_id WHERE r.branch_id=? ORDER BY r.created_at DESC',[u.branch_id])
   ]);
   const monthlyRows=await query<any>("SELECT DATE_FORMAT(h.claimed_at,'%Y-%m') month_key,COALESCE(SUM(h.received_amount),0) disbursed,COUNT(*) claims FROM aid_schedules s JOIN information_schema.tables t ON t.table_schema=DATABASE() AND t.table_name=CONCAT('schedule_history_',s.id) JOIN (SELECT 1) seed ON 1=1 JOIN schedule_history_1 h ON 1=0 WHERE s.branch_id=? GROUP BY DATE_FORMAT(h.claimed_at,'%Y-%m')",[u.branch_id]).catch(()=>[]);
   const monthlyMap=new Map<string,{month:string,disbursed:number,claims:number}>();
   const monthlySchedules=await query<any>("SELECT id FROM aid_schedules WHERE branch_id=? ORDER BY id",[u.branch_id]);
   for(const item of monthlySchedules){const sums=await query<any>("SELECT DATE_FORMAT(claimed_at,'%Y-%m') month,COALESCE(SUM(received_amount),0) disbursed,COUNT(*) claims FROM `schedule_history_${Number(item.id)}` WHERE claim_status='claimed' GROUP BY DATE_FORMAT(claimed_at,'%Y-%m')");for(const row of sums){const current=monthlyMap.get(row.month)||{month:row.month,disbursed:0,claims:0};current.disbursed+=Number(row.disbursed||0);current.claims+=Number(row.claims||0);monthlyMap.set(row.month,current)}}
   const monthly=[...monthlyMap.values()].sort((a,b)=>a.month.localeCompare(b.month));
   const enriched=await Promise.all(schedules.map(async(s:any)=>{
    const table=historyTable(Number(s.id));
    const [stats]:any=await query('SELECT COUNT(*) total, SUM(claim_status=\'claimed\') claimed, SUM(claim_status=\'pending\') pending, COALESCE(SUM(allocated_amount),0) allocated, COALESCE(SUM(received_amount),0) received FROM '+table);
    const history=await query('SELECT id,citizen_name,nik,allocated_amount,received_amount,claim_status,claimed_at FROM '+table+' ORDER BY citizen_name');
    return {...s,stats:stats||{},history};
   }));
   const archived=await Promise.all(enriched.filter((s:any)=>s.status==='completed').map(async(s:any)=>({...s,history:s.history||[]})));
   return NextResponse.json({branch,citizens,schedules:enriched,monthly,archived,reports});
  }
  const schedules=await query<any>('SELECT id,title,schedule_date,start_time,end_time,status,history_table_name FROM aid_schedules WHERE branch_id=? ORDER BY schedule_date DESC,id DESC',[u.branch_id]);
  const history:any[]=[],branchSpending:any[]=[];
  for(const s of schedules){
   const table=historyTable(Number(s.id));
   const [totals]:any=await query('SELECT COUNT(*) recipients,SUM(claim_status=\'claimed\') claimed,COALESCE(SUM(allocated_amount),0) allocated,COALESCE(SUM(received_amount),0) received FROM '+table);
   branchSpending.push({title:s.title,schedule_date:s.schedule_date,status:s.status,recipients:totals?.recipients||0,claimed:totals?.claimed||0,allocated:totals?.allocated||0,received:totals?.received||0});
   const rows=await query<any>('SELECT schedule_id,citizen_name,allocated_amount,received_amount,claim_status,claimed_at FROM '+table+' WHERE user_id=?',[u.id]);
   for(const row of rows)history.push({...row,title:s.title,schedule_date:s.schedule_date,status:s.status,start_time:s.start_time,end_time:s.end_time});
  }
  return NextResponse.json({branch,reports:await query('SELECT * FROM issue_reports WHERE user_id=? ORDER BY created_at DESC',[u.id]),history,branchSpending});
 }catch(e:any){return NextResponse.json({error:e.message||'Gagal memuat data'},{status:500})}
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
   await requireRole(['super_admin']);const amount=money(x.amount),branchId=Number(x.branch_id);if(!Number.isSafeInteger(branchId)||branchId<1)throw new Error('Cabang tidak valid');
   const c=await pool.getConnection();try{await c.beginTransaction();const [rows]:any=await c.execute('SELECT id FROM branches WHERE id=? FOR UPDATE',[branchId]);if(!rows.length)throw new Error('Cabang tidak ditemukan');await c.execute('UPDATE branches SET allocated_budget=allocated_budget+? WHERE id=?',[amount,branchId]);await c.execute('INSERT INTO branch_budget_logs(branch_id,amount,notes,allocated_date) VALUES(?,?,?,CURDATE())',[branchId,amount,String(x.notes||'Alokasi anggaran')]);await c.commit()}catch(e){await c.rollback();throw e}finally{c.release()}
  }else if(x.action==='citizen'){
   const u=await requireRole(['branch_admin']);const name=String(x.name||'').trim(),username=String(x.username||'').trim(),password=String(x.password||'');if(!name||!username||password.length<8)throw new Error('Nama, username, dan password minimal 8 karakter wajib diisi');
   const hash=await bcrypt.hash(password,10);await query("INSERT INTO users(name,username,nik,password_hash,role,branch_id,qr_token) VALUES(?,?,?,?,'citizen',?,?)",[name,username,x.nik||null,hash,u.branch_id,'W-'+randomBytes(20).toString('hex')]);
  }else if(x.action==='schedule'){
   const u=await requireRole(['branch_admin']);const title=String(x.title||'').trim(),date=String(x.schedule_date||''),startTime=String(x.start_time||'')||null,endTime=String(x.end_time||'')||null;if(!title||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date))throw new Error('Judul dan tanggal jadwal wajib diisi');if(startTime&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(startTime)||endTime&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(endTime))throw new Error('Format jam tidak valid');if(startTime&&endTime&&startTime>=endTime)throw new Error('Jam selesai harus setelah jam mulai');
   const c=await pool.getConnection();let id=0,table='';
   try{
    await c.beginTransaction();
    const [citizens]:any=await c.execute("SELECT id,name,nik,qr_token FROM users WHERE branch_id=? AND role='citizen' ORDER BY id",[u.branch_id]);
    if(!citizens.length)throw new Error('Tambahkan warga sebelum membuat jadwal');
    const allocations=new Map<number,number>();let totalAllocation=0;for(const citizen of citizens){const raw=x.allocations?.[String(citizen.id)]??x.amount;const value=money(raw);allocations.set(Number(citizen.id),value);totalAllocation+=value;}
    const [budgetRows]:any=await c.execute('SELECT allocated_budget,disbursed_total FROM branches WHERE id=? FOR UPDATE',[u.branch_id]);
    if(!budgetRows.length)throw new Error('Cabang tidak ditemukan');
    let reserved=0;
    const [existing]:any=await c.execute("SELECT id FROM aid_schedules WHERE branch_id=? AND status IN ('draft','active')",[u.branch_id]);
    for(const item of existing){const oldTable=historyTable(Number(item.id));const [sum]:any=await c.execute('SELECT COALESCE(SUM(allocated_amount),0) reserved FROM '+oldTable+' WHERE claim_status=\'pending\'');reserved+=Number(sum[0]?.reserved||0)}
    const available=Number(budgetRows[0].allocated_budget)-Number(budgetRows[0].disbursed_total)-reserved;
    if(totalAllocation>available)throw new Error('Total alokasi warga melebihi anggaran yang tersedia setelah memperhitungkan jadwal lain');
    const [insert]:any=await c.execute("INSERT INTO aid_schedules(branch_id,title,schedule_date,start_time,end_time,history_table_name,status) VALUES(?,?,?,?,?,'pending','draft')",[u.branch_id,title,date,startTime,endTime]);id=Number(insert.insertId);table='schedule_history_'+id;
    const quoted=historyTable(id);
    await c.execute('CREATE TABLE '+quoted+" (id INT AUTO_INCREMENT PRIMARY KEY,schedule_id INT NOT NULL,user_id INT NOT NULL,citizen_name VARCHAR(120) NOT NULL,nik VARCHAR(30) NULL,qr_token VARCHAR(100) NOT NULL,allocated_amount DECIMAL(15,2) NOT NULL DEFAULT 0,received_amount DECIMAL(15,2) NOT NULL DEFAULT 0,claim_status ENUM('pending','claimed') NOT NULL DEFAULT 'pending',claimed_at DATETIME NULL,scanned_by INT NULL,UNIQUE KEY uq_user(user_id),INDEX idx_qr(qr_token),INDEX idx_status(claim_status)) ENGINE=InnoDB");
    for(const citizen of citizens)await c.execute('INSERT INTO '+quoted+'(schedule_id,user_id,citizen_name,nik,qr_token,allocated_amount) VALUES(?,?,?,?,?,?)',[id,citizen.id,citizen.name,citizen.nik,citizen.qr_token,allocations.get(Number(citizen.id))]);
    await c.execute('UPDATE aid_schedules SET history_table_name=? WHERE id=?',[table,id]);await c.commit();
   }catch(e){await c.rollback();if(id){try{await c.execute('DROP TABLE IF EXISTS '+historyTable(id));await c.execute('DELETE FROM aid_schedules WHERE id=?',[id]);}catch{}}throw e}finally{c.release()}
  }else if(x.action==='activate'){
   const u=await requireRole(['branch_admin']);const [result]:any=await pool.execute("UPDATE aid_schedules SET status='active' WHERE id=? AND branch_id=? AND status='draft'",[Number(x.id),u.branch_id]);if(!result.affectedRows)throw new Error('Jadwal tidak ditemukan atau bukan berstatus draft');
  }else if(x.action==='complete'||x.action==='close_schedule'){
   const u=await requireRole(['branch_admin']);const id=Number(x.id);const valid=await query<any>("SELECT id FROM aid_schedules WHERE id=? AND branch_id=? AND status='active'",[id,u.branch_id]);if(!valid.length)throw new Error('Jadwal aktif tidak ditemukan');if(x.action==='complete'){const table=historyTable(id);const pending=await query<any>("SELECT COUNT(*) total FROM "+table+" WHERE claim_status='pending'");if(Number(pending[0].total)>0)throw new Error('Masih ada warga yang belum menerima bantuan. Gunakan Tutup jadwal jika penyaluran dihentikan.')}await query("UPDATE aid_schedules SET status='completed' WHERE id=? AND branch_id=?",[id,u.branch_id]);
  }else if(x.action==='lookup_claim'){
   const u=await requireRole(['branch_admin']);const id=Number(x.schedule_id),table=historyTable(id);const valid=await query<any>("SELECT id,title,schedule_date FROM aid_schedules WHERE id=? AND branch_id=? AND status='active' AND schedule_date=CURDATE()",[id,u.branch_id]);if(!valid.length)throw new Error('Pilih jadwal aktif yang berlaku hari ini');const rows=await query<any>('SELECT user_id,citizen_name,nik,allocated_amount,received_amount,claim_status,claimed_at FROM '+table+' WHERE qr_token=?',[String(x.qr_token||'')]);if(!rows.length)throw new Error('QR tidak terdaftar pada jadwal ini');return NextResponse.json({ok:true,citizen:rows[0],schedule:valid[0]});
  }else if(x.action==='claim'){
   const u=await requireRole(['branch_admin']);const id=Number(x.schedule_id),table=historyTable(id),c=await pool.getConnection();
   try{await c.beginTransaction();const [schedules]:any=await c.execute("SELECT id FROM aid_schedules WHERE id=? AND branch_id=? AND status='active' AND schedule_date=CURDATE() FOR UPDATE",[id,u.branch_id]);if(!schedules.length)throw new Error('Jadwal tidak aktif, bukan milik cabang ini, atau bukan tanggal hari ini');const quoted=table;const [rows]:any=await c.execute('SELECT * FROM '+quoted+' WHERE qr_token=? FOR UPDATE',[String(x.qr_token||'')]);const v=rows[0];if(!v)throw new Error('QR tidak terdaftar pada jadwal');if(v.claim_status==='claimed')throw new Error('Bantuan sudah diklaim pada '+String(v.claimed_at)+' dengan nominal '+String(v.received_amount));const amount=Number(x.received_amount);if(!Number.isFinite(amount)||amount<=0||amount>Number(v.allocated_amount))throw new Error('Nominal diterima harus lebih dari nol dan tidak melebihi alokasi');await c.execute("UPDATE "+quoted+" SET claim_status='claimed',received_amount=?,claimed_at=NOW(),scanned_by=? WHERE id=?",[amount,u.id,v.id]);await c.execute('UPDATE branches SET disbursed_total=disbursed_total+? WHERE id=?',[amount,u.branch_id]);await c.commit()}catch(e){await c.rollback();throw e}finally{c.release()}
  }else if(x.action==='report'){
   const u=await requireRole(['citizen']);const subject=String(x.subject||'').trim(),description=String(x.description||'').trim(),scheduleId=x.schedule_id?Number(x.schedule_id):null;if(!subject||!description)throw new Error('Subjek dan deskripsi wajib diisi');if(scheduleId){const own=await query<any>('SELECT id FROM aid_schedules WHERE id=? AND branch_id=?',[scheduleId,u.branch_id]);if(!own.length)throw new Error('Jadwal laporan tidak valid');}await query('INSERT INTO issue_reports(user_id,branch_id,schedule_id,subject,description) VALUES(?,?,?,?,?)',[u.id,u.branch_id,scheduleId,subject,description]);
  }else if(x.action==='report_update'){
   const u=await requireRole(['super_admin','branch_admin']);const id=Number(x.id),status=String(x.status||''),response=String(x.admin_response||'').trim();if(!['open','in_progress','resolved'].includes(status))throw new Error('Status laporan tidak valid');if(!response)throw new Error('Tanggapan petugas wajib diisi');
   const args:any[]=[status,response,id];let sql='UPDATE issue_reports SET status=?,admin_response=? WHERE id=?';if(u.role==='branch_admin'){sql+=' AND branch_id=?';args.push(u.branch_id)}const [result]:any=await pool.execute(sql,args);if(!result.affectedRows)throw new Error('Laporan tidak ditemukan atau di luar kewenangan');
  }else throw new Error('Aksi tidak dikenal');
  return NextResponse.json({ok:true});
 }catch(e:any){return NextResponse.json({error:e.message==='UNAUTHORIZED'?'Akses ditolak':e.message||'Operasi gagal'},{status:400})}
}
