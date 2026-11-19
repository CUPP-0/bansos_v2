import { notFound } from 'next/navigation';
import { requireRole } from '@/lib/auth';
import Dashboard from '@/components/dashboard';

const roles = {
  admin: 'super_admin',
  cabang: 'branch_admin',
  warga: 'citizen',
} as const;

const sections = {
  admin: ['home', 'grafik', 'cabang', 'anggaran', 'laporan'],
  cabang: ['home', 'warga', 'jadwal', 'scan', 'history', 'laporan'],
  warga: ['home', 'qr', 'transparansi', 'riwayat', 'laporan'],
} as const;

type Portal = keyof typeof roles;

export async function PortalPage({ portal, section }: { portal: Portal; section: string }) {
  if (!(sections[portal] as readonly string[]).includes(section)) notFound();
  const user = await requireRole([roles[portal]]);
  return <Dashboard portal={portal} user={user} section={section} />;
}
