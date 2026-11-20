'use client';

import { usePortal } from '@/components/portal-context';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    money: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    doc: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    alert: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
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

// ===== STATUS BADGE =====
function StatusBadge({ status }: { status: string }) {
  const isClaimed = status === 'claimed';
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${
        isClaimed
          ? 'bg-black text-white'
          : 'bg-gray-100 text-gray-600 border border-gray-200'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isClaimed ? 'bg-white' : 'bg-gray-500'}`} />
      {isClaimed ? 'Diterima' : 'Belum Diterima'}
    </span>
  );
}

// ===== MAIN COMPONENT =====
export default function WargaRiwayatPage() {
  const { data, user, rp, date } = usePortal();

  const history = data.history ?? [];

  // Statistik dari data real
  const totalRiwayat = history.length;
  const totalDiterima = history
    .filter((h: any) => h.claim_status === 'claimed')
    .reduce((sum: number, h: any) => sum + (h.received_amount ?? 0), 0);
  const totalBelum = history
    .filter((h: any) => h.claim_status !== 'claimed')
    .reduce((sum: number, h: any) => sum + (h.allocated_amount ?? 0), 0);

  const stats = [
    { label: 'Total Riwayat', value: totalRiwayat, icon: 'doc' },
    { label: 'Total Diterima', value: rp(totalDiterima), icon: 'check', isText: true },
    { label: 'Belum Diterima', value: rp(totalBelum), icon: 'alert', isText: true },
  ];

  return (
    <div data-page="riwayat" className="space-y-6">

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
            <p className={`font-bold text-black ${s.isText ? 'text-lg' : 'text-2xl'}`}>
              {s.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ===== TABEL RIWAYAT ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="clock" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Daftar Riwayat Penyaluran</h2>
            <p className="text-xs text-gray-500">
              {totalRiwayat} transaksi tercatat dalam sistem
            </p>
          </div>
        </div>

        {totalRiwayat === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Icon name="doc" className="w-16 h-16 mb-3 opacity-30" />
            <p className="text-sm font-medium text-gray-500">Belum ada riwayat bantuan</p>
            <p className="text-xs text-gray-400 mt-1">
              Riwayat akan muncul setelah Anda terdaftar dalam jadwal penyaluran.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-4 font-semibold text-gray-700">Program</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 text-right">Alokasi</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 text-right">Diterima</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {history.map((h: any, i: number) => (
                  <tr
                    key={h.id ?? `history-${i}`}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">
                      <p className="font-semibold text-black">{h.title ?? 'Penyaluran'}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {date(h.schedule_date)}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-gray-700">
                      {rp(h.allocated_amount)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-black">
                      {rp(h.received_amount)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={h.claim_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}