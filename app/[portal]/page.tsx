import {notFound} from 'next/navigation';
import {requireRole} from '@/lib/auth';
import Dashboard from '@/components/dashboard';

export default async function Portal({params}:{params:Promise<{portal:string}>}){
 const {portal:p}=await params;
 if(!['admin','cabang','warga'].includes(p))notFound();
 const role=p==='admin'?'super_admin':p==='cabang'?'branch_admin':'citizen';
 const user=await requireRole([role]);
 return <Dashboard portal={p} user={user}/>;
}
