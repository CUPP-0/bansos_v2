'use client';

import { usePortal } from '@/components/portal-context';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    archive: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    money: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    chevron: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    id: <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />,
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

// ===== STATUS BADGE =====
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: 'bg-gray-200 text-gray-600',
    closed: 'bg-gray-100 text-gray-600 border border-gray-200',
    claimed: 'bg-black text-white',
    pending: 'bg-gray-100 text-gray-600 border border-gray-200',
  };
  const labels: Record<string, string> = {
    completed: 'Selesai',
    closed: 'Ditutup',
    claimed: 'Diterima',
    pending: 'Belum Menerima',
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
        styles[status] ?? styles.completed
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}

// ===== MAIN COMPONENT =====
export default function CabangHistoryPage() {
  const { data, rp, date } = usePortal();

  const archived = data.archived ?? [];

  // Kelompokkan per bulan (descending)
  const groupedByMonth = Object.entries(
    archived.reduce((acc: any, item: any) => {
      const key = String(item.schedule_date || '').slice(0, 7) || 'Tanpa tanggal';
      (acc[key] ??= []).push(item);
      return acc;
    }, {})
  ).sort(([a], [b]) => String(b).localeCompare(String(a)));

  // Statistik dari data real
  const totalArchived = archived.length;
  const totalPenerima = archived.reduce(
    (sum: number, item: any) => sum + (item.stats?.total ?? 0),
    0
  );
  const totalTersalurkan = archived.reduce(
    (sum: number, item: any) => sum + (item.stats?.received ?? 0),
    0
  );
  const bulanTerakhir = groupedByMonth.length > 0 ? groupedByMonth[0][0] : null;

  const stats = [
    { label: 'Total Jadwal Archived', value: totalArchived, icon: 'archive' },
    { label: 'Total Penerima', value: totalPenerima, icon: 'users' },
    { label: 'Total Tersalurkan', value: rp(totalTersalurkan), icon: 'money', isText: true },
    {
      label: 'Bulan Terakhir',
      value: bulanTerakhir
        ? new Date(bulanTerakhir + '-01T00:00:00').toLocaleDateString('id-ID', {
            month: 'short',
            year: 'numeric',
          })
        : '-',
      icon: 'calendar',
      isText: true,
    },
  ];

  return (
    <div data-page="history" className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-black">History Penyaluran</h1>
          <p className="text-gray-500 mt-1">
            Jadwal selesai, ditutup, atau melewati batas waktu.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-gray-200">
          <Icon name="folder" className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-semibold text-black">{totalArchived}</span>
          <span className="text-xs text-gray-500">jadwal</span>
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
            <p className={`font-bold text-black ${s.isText ? 'text-lg' : 'text-2xl'}`}>
              {s.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ===== DAFTAR HISTORY ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="archive" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Arsip Penyaluran</h2>
            <p className="text-xs text-gray-500">
              Dikelompokkan berdasarkan bulan penyaluran
            </p>
          </div>
        </div>

        {groupedByMonth.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Icon name="archive" className="w-16 h-16 mb-3 opacity-30" />
            <p className="text-sm font-medium text-gray-500">
              Belum ada jadwal yang masuk history
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Jadwal yang selesai atau ditutup akan otomatis muncul di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {groupedByMonth.map(([month, items]: any) => (
              <div key={month}>
                {/* Bulan Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Icon name="calendar" className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black">
                      {new Date(month + '-01T00:00:00').toLocaleDateString('id-ID', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {items.length} jadwal
                    </p>
                  </div>
                </div>

                {/* Jadwal Items */}
                <div className="space-y-3">
                  {items.map((item: any) => {
                    const total = item.stats?.total ?? 0;
                    const claimed = item.stats?.claimed ?? 0;
                    const pending = item.stats?.pending ?? 0;
                    const received = item.stats?.received ?? 0;
                    const progress = total > 0 ? Math.round((claimed / total) * 100) : 0;

                    return (
                      <details
                        key={item.id}
                        className="group border border-gray-200 rounded-2xl p-5 hover:border-black transition"
                      >
                        <summary className="cursor-pointer list-none">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <b className="text-base text-black">{item.title}</b>
                                <StatusBadge status={item.status} />
                              </div>
                              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                                <Icon name="calendar" className="w-3.5 h-3.5" />
                                {date(item.schedule_date)} · ID {item.id}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Progress</p>
                                <p className="text-sm font-bold text-black">
                                  {claimed}/{total}
                                </p>
                              </div>
                              <Icon
                                name="chevron"
                                className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180"
                              />
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-3">
                            <div
                              className="h-full bg-black rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </summary>

                        {/* Detail Content */}
                        <div className="mt-5 pt-5 border-t border-gray-200">
                          {/* Stats Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                                <Icon name="user" className="w-3.5 h-3.5" />
                                Penerima
                              </div>
                              <p className="text-lg font-bold text-black">{total}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                                <Icon name="check" className="w-3.5 h-3.5" />
                                Sudah Menerima
                              </div>
                              <p className="text-lg font-bold text-black">{claimed}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                                <Icon name="clock" className="w-3.5 h-3.5" />
                                Belum Menerima
                              </div>
                              <p className="text-lg font-bold text-black">{pending}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                                <Icon name="money" className="w-3.5 h-3.5" />
                                Tersalurkan
                              </div>
                              <p className="text-lg font-bold text-black">{rp(received)}</p>
                            </div>
                          </div>

                          {/* Tabel Histori */}
                          {item.history?.length > 0 ? (
                            <div>
                              <h4 className="text-sm font-bold text-black mb-3 flex items-center gap-2">
                                <Icon name="users" className="w-4 h-4" />
                                Daftar Penerima ({item.history.length})
                              </h4>
                              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                                <table className="w-full text-xs text-left">
                                  <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                      <th className="py-2.5 px-3 font-semibold text-gray-700">
                                        Nama Warga
                                      </th>
                                      <th className="py-2.5 px-3 font-semibold text-gray-700">
                                        Alokasi
                                      </th>
                                      <th className="py-2.5 px-3 font-semibold text-gray-700">
                                        Diterima
                                      </th>
                                      <th className="py-2.5 px-3 font-semibold text-gray-700">
                                        Status
                                      </th>
                                      <th className="py-2.5 px-3 font-semibold text-gray-700">
                                        Waktu Klaim
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.history.map((h: any) => (
                                      <tr
                                        key={h.id}
                                        className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
                                      >
                                        <td className="py-2.5 px-3 text-black font-medium">
                                          {h.citizen_name}
                                        </td>
                                        <td className="py-2.5 px-3 text-gray-700">
                                          {rp(h.allocated_amount)}
                                        </td>
                                        <td className="py-2.5 px-3 text-gray-700">
                                          {rp(h.received_amount)}
                                        </td>
                                        <td className="py-2.5 px-3">
                                          <StatusBadge
                                            status={
                                              h.claim_status === 'claimed'
                                                ? 'claimed'
                                                : 'pending'
                                            }
                                          />
                                        </td>
                                        <td className="py-2.5 px-3 text-gray-500">
                                          {h.claimed_at
                                            ? new Date(h.claimed_at).toLocaleString('id-ID')
                                            : '-'}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-500">
                              <Icon name="archive" className="w-5 h-5 text-gray-400" />
                              Tidak ada data penerima untuk jadwal ini.
                            </div>
                          )}
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}