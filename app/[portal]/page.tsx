import {notFound,redirect} from 'next/navigation';
export default async function Portal({params}:{params:Promise<{portal:string}>}){
 const {portal}=await params;
 if(!['admin','cabang','warga'].includes(portal))notFound();
 redirect('/'+portal+'/home');
}
