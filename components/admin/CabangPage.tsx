'use client';

import { usePortal } from '@/components/portal-context';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    branch: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    code: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />,
    name: <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />,
    name2: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />,
    location2: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    lock: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />,
    money: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />,
    alert: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
    eye: <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />,
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
export default function AdminCabangPage() {
  const { data, user, submit, rp } = usePortal();

  const branches = data.branches ?? [];

  // ===== STATISTIK =====
  const totalCabang = branches.length;
  const totalAnggaran = branches.reduce((a: number, b: any) => a + Number(b.allocated_budget ?? 0), 0);
  const totalTersalurkan = branches.reduce((a: number, b: any) => a + Number(b.disbursed_total ?? 0), 0);
  const totalJadwal = branches.reduce((a: number, b: any) => a + Number(b.schedule_count ?? 0), 0);

  const stats = [
    { label: 'Total Cabang', value: totalCabang, icon: 'branch' },
    { label: 'Total Anggaran', value: rp(totalAnggaran), icon: 'money', isText: true },
    { label: 'Total Tersalurkan', value: rp(totalTersalurkan), icon: 'check', isText: true },
    { label: 'Total Jadwal', value: totalJadwal, icon: 'calendar' },
  ];

  return (
    <div data-page="cabang" className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-black">Kelola Cabang & Anggaran</h1>
          <p className="text-gray-500 mt-1">
            Tambah cabang, alokasikan dana, dan pantau transparansi secara terpusat.
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
              <Icon name={s.icon} className="w-5 h-5 text-black" />
            </div>
            <p className={`font-bold text-black ${s.isText ? 'text-lg' : 'text-2xl'}`}>
              {s.value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ===== FORM TAMBAH CABANG ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="plus" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Tambah Cabang & Akun Petugas</h2>
            <p className="text-xs text-gray-500">
              Buat cabang baru beserta akun petugas yang akan mengelola cabang tersebut.
            </p>
          </div>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={(e) => submit(e, 'branch')}
        >
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Kode Cabang <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Icon name="code" className="w-4 h-4" /></div>
              <input className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white" name="code" placeholder="Contoh: JKT-01" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama Cabang <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Icon name="name" className="w-4 h-4" /></div>
              <input className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white" name="name" placeholder="Contoh: Cabang Jakarta Pusat" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Wilayah <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Icon name="location2" className="w-4 h-4" /></div>
              <input className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white" name="region" placeholder="Contoh: DKI Jakarta" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Username Petugas <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Icon name="user" className="w-4 h-4" /></div>
              <input className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white" name="username" placeholder="Username untuk login petugas" required />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"><Icon name="lock" className="w-4 h-4" /></div>
              <input className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white" name="password" type="password" placeholder="Minimal 8 karakter" minLength={8} required />
            </div>
            <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
              <Icon name="alert" className="w-3 h-3" /> Password akan digunakan oleh petugas untuk login ke portal cabang.
            </p>
          </div>

          <div className="md:col-span-2 flex justify-end pt-2">
            <button type="submit" className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center gap-2">
              <Icon name="plus" className="w-4 h-4" /> Buat Cabang
            </button>
          </div>
        </form>
      </div>

      {/* ===== FORM ALOKASI ANGGARAN (DIGABUNG DARI ADMIN ANGGARAN) ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="money" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Alokasikan Anggaran</h2>
            <p className="text-xs text-gray-500">
              Tambahkan dana masuk ke cabang tertentu.
            </p>
          </div>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          onSubmit={(e) => submit(e, 'budget')}
        >
          {/* Pilih Cabang */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Pilih Cabang <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="branch" className="w-4 h-4" />
              </div>
              <select
                className="w-full border border-gray-200 rounded-xl pl-10 pr-8 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white appearance-none cursor-pointer"
                name="branch_id"
                required
                defaultValue=""
              >
                <option value="" disabled>Pilih cabang tujuan</option>
                {branches.map((b: any) => (
                  <option value={b.id} key={b.id}>
                    {b.name} · ID {b.id}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Nominal */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nominal Rupiah <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="money" className="w-4 h-4" />
              </div>
              <input
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                name="amount"
                type="number"
                min="1"
                placeholder="Contoh: 50000000"
                required
              />
            </div>
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Catatan Alokasi <span className="text-gray-400 font-normal">(opsional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon name="name2" className="w-4 h-4" />
              </div>
              <input
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                name="notes"
                placeholder="Contoh: Tahap 1 Tahun 2026"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-3 flex justify-end pt-2">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Icon name="check" className="w-4 h-4" />
              Alokasikan Dana
            </button>
          </div>
        </form>
      </div>

      {/* ===== TABEL TRANSPARANSI CABANG ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="eye" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Transparansi Cabang</h2>
            <p className="text-xs text-gray-500">
              Perbandingan anggaran dan realisasi penyaluran per cabang
            </p>
          </div>
        </div>

        {branches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Icon name="branch" className="w-16 h-16 mb-3 opacity-30" />
            <p className="text-sm font-medium text-gray-500">Belum ada cabang terdaftar</p>
            <p className="text-xs text-gray-400 mt-1">
              Gunakan form di atas untuk menambahkan cabang pertama.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-4 font-semibold text-gray-700">Cabang</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Wilayah</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 text-right">Anggaran</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 text-right">Tersalurkan</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 text-right">Realisasi</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 text-center">Jadwal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {branches.map((b: any, i: number) => {
                  const anggaran = Number(b.allocated_budget ?? 0);
                  const tersalurkan = Number(b.disbursed_total ?? 0);
                  const realisasi = anggaran > 0 ? Math.round((tersalurkan / anggaran) * 100) : 0;

                  return (
                    <tr key={b.id ?? `branch-${i}`} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                            <Icon name="location2" className="w-4 h-4 text-black" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-black truncate">{b.name}</p>
                            <p className="text-xs text-gray-500 truncate">ID: {b.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{b.region ?? '-'}</td>
                      <td className="py-3 px-4 text-right font-medium text-gray-700">{rp(anggaran)}</td>
                      <td className="py-3 px-4 text-right font-bold text-black">{rp(tersalurkan)}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm font-bold text-black">{realisasi}%</span>
                          <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-black rounded-full transition-all" style={{ width: `${realisasi}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-xs font-semibold text-black">
                          {b.schedule_count ?? 0}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== INFO BOX ===== */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-start gap-3">
        <Icon name="alert" className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
        <div className="text-xs text-gray-600">
          <p className="font-semibold text-black mb-1">Catatan Penting</p>
          <p>
            Setiap cabang yang ditambahkan akan otomatis memiliki akun petugas. 
            Gunakan form <b>Alokasikan Anggaran</b> di atas untuk menambahkan dana masuk 
            ke cabang sebelum penyaluran dimulai.
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