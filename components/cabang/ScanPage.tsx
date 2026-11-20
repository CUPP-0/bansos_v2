'use client';

import { usePortal } from '@/components/portal-context';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    scan: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />,
    camera: <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />,
    camera2: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    alert: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    id: <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />,
    money: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    chevron: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
    key: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />,
    play: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />,
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
    claimed: 'bg-black text-white',
    pending: 'bg-gray-100 text-gray-600 border border-gray-200',
    failed: 'bg-gray-200 text-gray-500',
  };
  const labels: Record<string, string> = {
    claimed: 'Sudah Diterima',
    pending: 'Belum Diklaim',
    failed: 'Gagal',
  };
  return (
    <span
      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
        styles[status] ?? styles.pending
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}

// ===== MAIN COMPONENT =====
export default function CabangScanPage() {
  const {
    data, user, submit, action, rp, date,
    scanSchedule, setScanSchedule,
    scanToken, setScanToken,
    scanDetails, scanError,
    scanOn, lookupToken, startScanner
  } = usePortal();

  const activeSchedules = (data.schedules ?? []).filter((s: any) => s.status === 'active');

  // Statistik dari data real
  const totalActive = activeSchedules.length;
  const totalHistory = scanDetails ? 1 : 0;

  const stats = [
    { label: 'Jadwal Aktif', value: totalActive, icon: 'play' },
    { label: 'Scan Hari Ini', value: data.today_scans ?? 0, icon: 'scan' },
    { label: 'Berhasil Diklaim', value: data.today_claimed ?? 0, icon: 'check' },
    { label: 'Total Warga', value: (data.citizens ?? []).length, icon: 'users' },
  ];

  // Tambahkan ikon users kalau belum ada di stats
  const iconMap: Record<string, string> = {
    play: 'play',
    scan: 'scan',
    check: 'check',
    users: 'user',
  };

  return (
    <div data-page="scan" className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-black">Scan QR & Konfirmasi</h1>
          <p className="text-gray-500 mt-1">
            Pilih jadwal aktif, lalu scan QR kamera atau masukkan token manual.
          </p>
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
              <Icon name={iconMap[s.icon] ?? s.icon} className="w-5 h-5 text-black" />
            </div>
            <p className="text-2xl font-bold text-black">
              {s.value.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ===== SCAN SECTION ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Icon name="camera" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Scanner QR</h2>
              <p className="text-xs text-gray-500">
                Scan QR code warga melalui kamera.
              </p>
            </div>
          </div>

          {/* Pilih Jadwal */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Jadwal Aktif <span className="text-red-500">*</span>
            </label>
            {activeSchedules.length === 0 ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-500">
                <Icon name="alert" className="w-5 h-5 text-gray-400" />
                Tidak ada jadwal aktif. Aktifkan jadwal terlebih dahulu di menu Jadwal.
              </div>
            ) : (
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white appearance-none cursor-pointer"
                value={scanSchedule}
                onChange={(e) => {
                  setScanSchedule(e.target.value);
                  // reset details & error
                  if (scanDetails) {
                    // reset via action jika perlu
                  }
                }}
              >
                <option value="">Pilih jadwal aktif</option>
                {activeSchedules.map((s: any) => (
                  <option value={s.id} key={s.id}>
                    {s.title} · #{s.id}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Tombol Kamera */}
          <button
            type="button"
            onClick={startScanner}
            disabled={scanOn || activeSchedules.length === 0}
            className="w-full bg-black text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black"
          >
            <Icon name="camera2" className="w-4 h-4" />
            {scanOn ? 'Kamera Aktif...' : 'Buka Kamera untuk Scan'}
          </button>

          {/* QR Reader Area */}
          {scanOn && (
            <div className="mt-4">
              <div
                id="qr-reader"
                className="w-full rounded-xl overflow-hidden border border-gray-200 bg-black"
                style={{ minHeight: '240px' }}
              />
              <p className="text-xs text-gray-500 text-center mt-2 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Arahkan kamera ke QR code warga
              </p>
            </div>
          )}
        </div>

        {/* Manual Input Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Icon name="key" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Input Manual</h2>
              <p className="text-xs text-gray-500">
                Masukkan token QR warga secara manual.
              </p>
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              lookupToken(scanToken);
            }}
          >
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Token QR Warga <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white font-mono"
                value={scanToken}
                onChange={(e) => setScanToken(e.target.value)}
                placeholder="Masukkan token QR warga"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              <Icon name="search" className="w-4 h-4" />
              Periksa QR
            </button>
          </form>

          {/* Error Message */}
          {scanError && (
            <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                <Icon name="alert" className="w-4 h-4 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-black">Gagal Memeriksa QR</p>
                <p className="text-xs text-gray-600 mt-0.5">{scanError}</p>
              </div>
            </div>
          )}

          {/* Info Card */}
          <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex items-start gap-3">
              <Icon name="alert" className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div className="text-xs text-gray-600 space-y-1">
                <p className="font-semibold text-black">Cara Penggunaan:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Pilih jadwal aktif dari dropdown</li>
                  <li>Scan QR atau masukkan token manual</li>
                  <li>Verifikasi data warga</li>
                  <li>Konfirmasi bantuan diterima</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== HASIL SCAN ===== */}
      {scanDetails && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Icon name="user" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Data Warga</h2>
              <p className="text-xs text-gray-500">
                Hasil pemeriksaan QR token
              </p>
            </div>
          </div>

          {/* Info Warga */}
          <div className="border border-gray-200 rounded-2xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <b className="text-base text-black">{scanDetails.citizen.citizen_name}</b>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <Icon name="id" className="w-3.5 h-3.5" />
                  NIK: {scanDetails.citizen.nik || '-'}
                </p>
              </div>
              <StatusBadge status={scanDetails.citizen.claim_status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                  <Icon name="money" className="w-3.5 h-3.5" />
                  Hak Bantuan
                </div>
                <p className="text-xl font-bold text-black">
                  {rp(scanDetails.citizen.allocated_amount)}
                </p>
              </div>

              {scanDetails.citizen.claim_status === 'claimed' && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Icon name="check" className="w-3.5 h-3.5" />
                    Sudah Diterima
                  </div>
                  <p className="text-xl font-bold text-black">
                    {rp(scanDetails.citizen.received_amount)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Icon name="clock" className="w-3 h-3" />
                    {new Date(scanDetails.citizen.claimed_at).toLocaleString('id-ID')}
                  </p>
                </div>
              )}
            </div>

            {/* Form Konfirmasi */}
            {scanDetails.citizen.claim_status !== 'claimed' && (
              <div className="mt-5 pt-5 border-t border-gray-200">
                <h3 className="text-sm font-bold text-black mb-3 flex items-center gap-2">
                  <Icon name="check" className="w-4 h-4" />
                  Konfirmasi Penerimaan Bantuan
                </h3>
                <form
                  className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3"
                  onSubmit={(e) => submit(e, 'claim')}
                >
                  <input type="hidden" name="schedule_id" value={scanSchedule} />
                  <input type="hidden" name="qr_token" value={scanToken} />

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Nominal Diterima <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                      name="received_amount"
                      type="number"
                      min="1"
                      max={scanDetails.citizen.allocated_amount}
                      defaultValue={scanDetails.citizen.allocated_amount}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maksimal: {rp(scanDetails.citizen.allocated_amount)}
                    </p>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2"
                    >
                      <Icon name="check" className="w-4 h-4" />
                      Konfirmasi Diterima
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}