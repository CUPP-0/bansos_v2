'use client';

import { usePortal } from '@/components/portal-context';
import ReportList from '@/components/ReportList';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    doc: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    alert: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
    message: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />,
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
export default function AdminLaporanPage() {
  const { data, user } = usePortal();

  const reports = data.reports ?? [];

  // ===== STATISTIK DARI DATA REAL =====
  const totalLaporan = reports.length;
  const menunggu = reports.filter(
    (r: any) => r.status === 'pending' || r.status === 'menunggu' || !r.status
  ).length;
  const selesai = reports.filter(
    (r: any) => r.status === 'resolved' || r.status === 'selesai' || r.status === 'completed'
  ).length;

  const stats = [
    { label: 'Total Laporan', value: totalLaporan, icon: 'doc' },
    { label: 'Menunggu Respon', value: menunggu, icon: 'clock' },
    { label: 'Telah Diselesaikan', value: selesai, icon: 'check' },
  ];

  return (
    <div data-page="laporan" className="space-y-6">

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
              <Icon name={s.icon} className="w-5 h-5 text-black" />
            </div>
            <p className="text-2xl font-bold text-black">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ===== DAFTAR LAPORAN (WRAPPER) ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="message" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Daftar Laporan Masuk</h2>
            <p className="text-xs text-gray-500">
              {totalLaporan} laporan tercatat dalam sistem
            </p>
          </div>
        </div>

        {totalLaporan === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Icon name="doc" className="w-16 h-16 mb-3 opacity-30" />
            <p className="text-sm font-medium text-gray-500">Belum ada laporan masuk</p>
            <p className="text-xs text-gray-400 mt-1">
              Laporan dari warga akan otomatis muncul di sini.
            </p>
          </div>
        ) : (
          /* 
            CATATAN PENTING: 
            Pastikan komponen <ReportList /> di dalam folder components 
            juga sudah di-update styling-nya (menghapus class .panel, .btn lama) 
            agar warnanya tidak bentrok dengan container putih ini.
          */
          <div className="space-y-3">
            <ReportList reports={reports} />
          </div>
        )}
      </div>

      {/* ===== INFO BOX ===== */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-start gap-3">
        <Icon name="alert" className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
        <div className="text-xs text-gray-600">
          <p className="font-semibold text-black mb-1">Tindak Lanjut</p>
          <p>
            Pastikan setiap laporan yang masuk segera diverifikasi dan diperbarui statusnya 
            agar warga mengetahui bahwa kendala mereka sedang ditangani oleh admin cabang/pusat.
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 pt-4">
        © 2026 BANSOS+ · Sistem Penyaluran Bantuan Sosial Transparan
      </p>
    </div>
  );
}