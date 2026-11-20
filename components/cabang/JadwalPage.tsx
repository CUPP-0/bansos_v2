'use client';

import { usePortal } from '@/components/portal-context';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    money: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    play: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />,
    archive: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />,
    chevron: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
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
  const styles: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700 border-gray-200',
    active: 'bg-black text-white',
    completed: 'bg-gray-200 text-gray-500',
    closed: 'bg-gray-50 text-gray-500 border border-gray-200',
  };
  const labels: Record<string, string> = {
    draft: 'Draft',
    active: 'Aktif',
    completed: 'Selesai',
    closed: 'Ditutup',
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
        styles[status] ?? styles.draft
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}

// ===== MAIN COMPONENT =====
export default function CabangJadwalPage() {
  const { data, user, submit, action, rp, date } = usePortal();

  const schedules = data.schedules ?? [];
  const citizens = data.citizens ?? [];

  // Filter: sembunyikan jadwal yang statusnya 'completed'
  const visibleSchedules = schedules.filter((s: any) => s.status !== 'completed');

  // Statistik dari data real
  const totalJadwal = schedules.length;
  const draftCount = schedules.filter((s: any) => s.status === 'draft').length;
  const activeCount = schedules.filter((s: any) => s.status === 'active').length;
  const completedCount = schedules.filter((s: any) => s.status === 'completed').length;

  const stats = [
    { label: 'Total Jadwal', value: totalJadwal, icon: 'calendar' },
    { label: 'Draft', value: draftCount, icon: 'clock' },
    { label: 'Aktif', value: activeCount, icon: 'play' },
    { label: 'Selesai', value: completedCount, icon: 'check' },
  ];

  return (
    <div data-page="jadwal" className="space-y-6">

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

      {/* ===== FORM BUAT JADWAL ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="plus" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Buat Jadwal Baru</h2>
            <p className="text-xs text-gray-500">
              Tentukan program, tanggal, dan nominal bantuan per warga.
            </p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => submit(e, 'schedule')}>
          {/* Info Program */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Nama Program <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                name="title"
                placeholder="Contoh: Bansos Tahap 1 2026"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Tanggal Penyaluran <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                type="date"
                name="schedule_date"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Jam Mulai
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                type="time"
                name="start_time"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Jam Selesai
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                type="time"
                name="end_time"
              />
            </div>
          </div>

          {/* Alokasi per Warga */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-black">Nominal Bantuan per Warga</h3>
              <span className="text-xs text-gray-500">
                {citizens.length} warga terdaftar
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Isi nominal masing-masing penerima. Total akan divalidasi dengan sisa anggaran cabang.
            </p>

            {citizens.length === 0 ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-500">
                <Icon name="alert" className="w-5 h-5 text-gray-400" />
                Belum ada warga terdaftar. Tambahkan warga terlebih dahulu di menu Warga.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {citizens.map((citizen: any) => (
                  <label
                    key={citizen.id}
                    className="border border-gray-200 rounded-xl p-3 flex items-center justify-between gap-3 hover:border-black transition cursor-pointer bg-white"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <Icon name="user" className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-sm text-black truncate">{citizen.name}</span>
                    </div>
                    <input
                      className="w-32 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-black outline-none focus:border-black text-right bg-white"
                      type="number"
                      min="1"
                      name={'allocation_' + citizen.id}
                      placeholder="Rp"
                      required
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!citizens.length}
              className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black"
            >
              <Icon name="plus" className="w-4 h-4" />
              Buat Jadwal
            </button>
          </div>
        </form>
      </div>

      {/* ===== DAFTAR JADWAL ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Icon name="calendar" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Daftar Jadwal</h2>
              <p className="text-xs text-gray-500">
                {visibleSchedules.length} jadwal aktif (completed tidak ditampilkan)
              </p>
            </div>
          </div>
        </div>

        {visibleSchedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Icon name="calendar" className="w-16 h-16 mb-3 opacity-30" />
            <p className="text-sm font-medium text-gray-500">Belum ada jadwal</p>
            <p className="text-xs text-gray-400 mt-1">
              Buat jadwal baru menggunakan form di atas.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleSchedules.map((s: any) => {
              const total = s.stats?.total ?? 0;
              const claimed = s.stats?.claimed ?? 0;
              const pending = s.stats?.pending ?? 0;
              const received = s.stats?.received ?? 0;
              const progress = total > 0 ? Math.round((claimed / total) * 100) : 0;

              return (
                <div
                  key={s.id}
                  className="border border-gray-200 rounded-2xl p-5 hover:border-black transition"
                >
                  {/* Header Card */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <b className="text-base text-black">{s.title}</b>
                        <StatusBadge status={s.status} />
                      </div>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                        <Icon name="calendar" className="w-3.5 h-3.5" />
                        {date(s.schedule_date)} · ID {s.id}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-black rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                        <Icon name="users" className="w-3.5 h-3.5" />
                        Total Warga
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

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {s.status === 'draft' && (
                      <button
                        className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center gap-2"
                        onClick={() => action('activate', { id: s.id })}
                      >
                        <Icon name="play" className="w-4 h-4" />
                        Aktifkan
                      </button>
                    )}
                    {s.status === 'active' && (
                      <>
                        <button
                          className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center gap-2"
                          onClick={() => action('complete', { id: s.id })}
                        >
                          <Icon name="check" className="w-4 h-4" />
                          Tandai Selesai
                        </button>
                        <button
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition flex items-center gap-2"
                          onClick={() => {
                            if (
                              confirm(
                                'Tutup jadwal ini? Jadwal akan masuk ke History dan tidak bisa dipakai untuk scan.'
                              )
                            )
                              action('close_schedule', { id: s.id });
                          }}
                        >
                          <Icon name="archive" className="w-4 h-4" />
                          Tutup Jadwal
                        </button>
                      </>
                    )}
                  </div>

                  {/* Histori Penerima */}
                  {s.history?.length > 0 && (
                    <details className="mt-4 group">
                      <summary className="cursor-pointer text-sm font-semibold text-black flex items-center gap-2 hover:text-gray-700 transition">
                        <Icon
                          name="chevron"
                          className="w-4 h-4 transition-transform group-open:rotate-180"
                        />
                        Lihat Histori Penerima ({s.history.length})
                      </summary>
                      <div className="overflow-x-auto mt-3 border border-gray-200 rounded-xl">
                        <table className="w-full text-xs text-left">
                          <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                              <th className="py-2.5 px-3 font-semibold text-gray-700">Nama Warga</th>
                              <th className="py-2.5 px-3 font-semibold text-gray-700">Alokasi</th>
                              <th className="py-2.5 px-3 font-semibold text-gray-700">Diterima</th>
                              <th className="py-2.5 px-3 font-semibold text-gray-700">Status</th>
                              <th className="py-2.5 px-3 font-semibold text-gray-700">Waktu Klaim</th>
                            </tr>
                          </thead>
                          <tbody>
                            {s.history.map((h: any) => (
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
                                  <span
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                      h.claim_status === 'claimed'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}
                                  >
                                    {h.claim_status}
                                  </span>
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
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}