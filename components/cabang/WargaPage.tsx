'use client';

import { usePortal } from '@/components/portal-context';
import { QRCodeSVG } from 'qrcode.react';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    userPlus: <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />,
    qr: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />,
    id: <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    alert: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
    copy: <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />,
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
export default function CabangWargaPage() {
  const { data, user, submit, rp } = usePortal();

  const citizens = data.citizens ?? [];

  // Statistik dari data real (tanpa dummy)
  const totalWarga = citizens.length;
  const withNIK = citizens.filter((c: any) => c.nik).length;
  const withoutNIK = totalWarga - withNIK;

  const stats = [
    { label: 'Total Warga', value: totalWarga, icon: 'users' },
    { label: 'Sudah ada NIK', value: withNIK, icon: 'id' },
    { label: 'Belum ada NIK', value: withoutNIK, icon: 'alert' },
  ];

  return (
    <div data-page="warga" className="space-y-6">
      {/* ===== HEADER SECTION ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-black">Data Warga</h1>
          <p className="text-gray-500 mt-1">
            Kelola akun warga dan QR token untuk penyaluran bantuan.
          </p>
        </div>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm"
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

      {/* ===== FORM TAMBAH WARGA ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="userPlus" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Tambah Akun Warga</h2>
            <p className="text-xs text-gray-500">
              Buat akun baru untuk warga yang belum terdaftar.
            </p>
          </div>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(e) => submit(e, 'citizen')}
        >
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
              name="name"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Username Login <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
              name="username"
              placeholder="Username untuk login"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              NIK <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
              name="nik"
              placeholder="Nomor Induk Kependudukan"
            />
          </div>

          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
              name="password"
              type="password"
              placeholder="Minimal 8 karakter"
              minLength={8}
              required
            />
          </div>

          <div className="md:col-span-2 flex justify-end pt-2">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Icon name="userPlus" className="w-4 h-4" />
              Simpan Warga
            </button>
          </div>
        </form>
      </div>

      {/* ===== DAFTAR WARGA ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Icon name="qr" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Daftar Warga & QR</h2>
              <p className="text-xs text-gray-500">
                {totalWarga} warga terdaftar
              </p>
            </div>
          </div>
        </div>

        {citizens.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Icon name="users" className="w-16 h-16 mb-3 opacity-30" />
            <p className="text-sm font-medium text-gray-500">Belum ada warga terdaftar</p>
            <p className="text-xs text-gray-400 mt-1">
              Gunakan form di atas untuk menambahkan warga pertama.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {citizens.map((c: any) => (
              <div
                key={c.id}
                className="border border-gray-200 rounded-2xl p-4 flex gap-4 items-start hover:border-black transition group"
              >
                {/* QR Code */}
                <div className="shrink-0 bg-white p-2 rounded-xl border border-gray-100">
                  <QRCodeSVG value={c.qr_token} size={72} level="M" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <b className="text-sm text-black truncate">{c.name}</b>
                    <span
                      className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        c.nik
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-gray-50 text-gray-400 border border-gray-200'
                      }`}
                    >
                      {c.nik ? 'NIK Lengkap' : 'NIK Kosong'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                    <Icon name="id" className="w-3 h-3" />
                    {c.nik || 'NIK belum diisi'}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-1.5 border border-gray-100">
                    <Icon name="qr" className="w-3 h-3 text-gray-400" />
                    <p className="text-[11px] text-gray-600 font-mono truncate flex-1">
                      {c.qr_token}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(c.qr_token);
                      }}
                      className="shrink-0 text-gray-400 hover:text-black transition"
                      title="Salin token"
                    >
                      <Icon name="copy" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}