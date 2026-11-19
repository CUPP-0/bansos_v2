import {notFound} from 'next/navigation';
import {requireRole} from '@/lib/auth';
import Dashboard from '@/components/dashboard';
const sections:any={admin:['home','grafik','cabang','anggaran','laporan'],cabang:['home','warga','jadwal','scan','history','laporan'],warga:['home','qr','transparansi','riwayat','laporan']};
const roles:any={admin:'super_admin',cabang:'branch_admin',warga:'citizen'};
export default async function PortalSection({params}:{params:Promise<{portal:string;section:string}>}){
 const {portal,section}=await params;
 if(!sections[portal]||!sections[portal].includes(section))notFound();
 const user=await requireRole([roles[portal]]);
 return <Dashboard portal={portal} user={user} section={section}/>;
}
