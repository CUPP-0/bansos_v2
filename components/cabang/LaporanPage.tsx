'use client';

import { usePortal } from '@/components/portal-context';
import ReportList from '@/components/ReportList';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    doc: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    alert: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
    folder: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className={className}
    >
      {icons[name]}
    </svg>
  );
}

// ===== MAIN COMPONENT =====
export default function CabangLaporanPage() {
  const { data, user, rp, date } = usePortal();

  const reports = data.reports ?? [];

  // Statistik dari data real
  const totalLaporan = reports.length;
  const bulanIni = new Date().getMonth();
  const tahunIni = new Date().getFullYear();

  const laporanBulanIni = reports.filter((r: any) => {
    if (!r.created_at) return false;
    const d = new Date(r.created_at);
    return d.getMonth() === bulanIni && d.getFullYear() === tahunIni;
  }).length;

  // Coba hitung status kalau ada field status
  const menunggu = reports.filter((r: any) => r.status === 'pending' || r.status === 'menunggu').length;
  const selesai = reports.filter((r: any) => r.status === 'completed' || r.status === 'selesai' || r.status === 'resolved').length;

  const stats = [
    { label: 'Total Laporan', value: totalLaporan, icon: 'doc' },
    { label: 'Bulan Ini', value: laporanBulanIni, icon: 'calendar' },
    { label: 'Menunggu', value: menunggu, icon: 'clock' },
    { label: 'Selesai', value: selesai, icon: 'check' },
  ];

  return (
    <div data-page="laporan" className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-black">Laporan Warga Cabang</h1>
          <p className="text-gray-500 mt-1">
            Pantau dan kelola laporan yang masuk dari warga cabang ini.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-gray-200">
          <Icon name="folder" className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-semibold text-black">{totalLaporan}</span>
          <span className="text-xs text-gray-500">laporan</span>
        </div>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
              <Icon name={s.icon} className="w-5 h-5 text-black" />
            </div>
            <p className="text-2xl font-bold text-black">
              {s.value.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ===== DAFTAR LAPORAN ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="doc" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Daftar Laporan</h2>
            <p className="text-xs text-gray-500">
              {totalLaporan} laporan tercatat
            </p>
          </div>
        </div>

        {totalLaporan === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Icon name="doc" className="w-16 h-16 mb-3 opacity-30" />
            <p className="text-sm font-medium text-gray-500">Belum ada laporan</p>
            <p className="text-xs text-gray-400 mt-1">
              Laporan dari warga akan otomatis muncul di sini.
            </p>
          </div>
        ) : (
          <ReportList reports={reports} />
        )}
      </div>
    </div>
  );
}