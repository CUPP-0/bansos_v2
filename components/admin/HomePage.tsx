'use client';

import { usePortal } from '@/components/portal-context';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  CartesianGrid, ResponsiveContainer
} from 'recharts';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    branch: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />,
    money: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    location: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />,
    location2: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />,
    filter: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />,
    arrowUp: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />,
    arrowDown: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />,
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
export default function AdminHomePage() {
  const {
    data, user, rp, date,
    chartRows, chartBranch, setChartBranch
  } = usePortal();

  const branches = data.branches ?? [];

  // ===== STATISTIK GLOBAL =====
  const totalCabang = branches.length;
  const totalAnggaran = branches.reduce((a: number, b: any) => a + Number(b.allocated_budget ?? 0), 0);
  const totalTersalurkan = branches.reduce((a: number, b: any) => a + Number(b.disbursed_total ?? 0), 0);
  const totalSisa = totalAnggaran - totalTersalurkan;
  const persentaseGlobal = totalAnggaran > 0 ? Math.round((totalTersalurkan / totalAnggaran) * 100) : 0;

  // ===== DATA GRAFIK =====
  const hasChartData = chartRows && chartRows.length > 0;

  // ===== TOP CABANG (berdasarkan persentase tersalurkan) =====
  const topBranches = [...branches]
    .map((b: any) => ({
      ...b,
      persentase: b.allocated_budget > 0
        ? Math.round((Number(b.disbursed_total ?? 0) / Number(b.allocated_budget ?? 0)) * 100)
        : 0,
    }))
    .sort((a: any, b: any) => b.persentase - a.persentase)
    .slice(0, 5);

  const stats = [
    { label: 'Jumlah Cabang', value: totalCabang, icon: 'branch' },
    { label: 'Total Anggaran', value: rp(totalAnggaran), icon: 'money', isText: true },
    { label: 'Total Tersalurkan', value: rp(totalTersalurkan), icon: 'check', isText: true },
    { label: 'Realisasi Global', value: `${persentaseGlobal}%`, icon: 'chart', isText: true },
  ];

  return (
    <div data-page="home" className="space-y-6">

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

      {/* ===== GRAFIK ANGGARAN & PENYALURAN ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Icon name="chart" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">
                Grafik Anggaran & Penyaluran Bulanan
              </h2>
              <p className="text-xs text-gray-500">
                Alokasi = dana masuk · Tersalurkan = klaim warga
              </p>
            </div>
          </div>

          {/* Filter Cabang */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
            <Icon name="filter" className="w-4 h-4 text-gray-500" />
            <select
              className="bg-transparent text-sm text-black outline-none cursor-pointer pr-2"
              value={chartBranch}
              onChange={(e) => setChartBranch(e.target.value)}
            >
              <option value="">Gabungan semua cabang</option>
              {branches.map((b: any) => (
                <option value={b.id} key={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chart Area */}
        <div className="h-72">
          {hasChartData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartRows} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) =>
                    new Intl.NumberFormat('id-ID', { notation: 'compact' }).format(v)
                  }
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(v: any) => rp(v)}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', color: '#4b5563' }}
                />
                <Bar
                  dataKey="allocated"
                  name="Anggaran dialokasikan"
                  fill="#d1d5db"
                  radius={[5, 5, 0, 0]}
                />
                <Bar
                  dataKey="disbursed"
                  name="Bantuan tersalurkan"
                  fill="#000000"
                  radius={[5, 5, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Icon name="chart" className="w-12 h-12 mb-2 opacity-30" />
              <p className="text-sm font-medium text-gray-500">
                Belum ada data bulanan
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Grafik akan muncul setelah ada penyaluran dari cabang.
              </p>
            </div>
          )}
        </div>

        {/* Legend info */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-gray-300" />
            Anggaran dialokasikan
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-black" />
            Bantuan tersalurkan
          </div>
        </div>
      </div>

      {/* ===== PROGRESS GLOBAL ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="money" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Realisasi Anggaran Nasional</h2>
            <p className="text-xs text-gray-500">
              Perbandingan total anggaran vs tersalurkan
            </p>
          </div>
        </div>

        <div className="mb-5 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Realisasi Keseluruhan</p>
              <p className="text-4xl font-bold text-black">{persentaseGlobal}%</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Tersalurkan</p>
              <p className="text-xl font-bold text-black">{rp(totalTersalurkan)}</p>
            </div>
          </div>
          <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-gray-200">
            <div
              className="h-full bg-black rounded-full transition-all"
              style={{ width: `${persentaseGlobal}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Icon name="money" className="w-3.5 h-3.5" />
              Total Anggaran
            </div>
            <p className="text-xl font-bold text-black">{rp(totalAnggaran)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Icon name="check" className="w-3.5 h-3.5" />
              Tersalurkan
            </div>
            <p className="text-xl font-bold text-black">{rp(totalTersalurkan)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Icon name="arrowUp" className="w-3.5 h-3.5" />
              Sisa Anggaran
            </div>
            <p className="text-xl font-bold text-black">{rp(totalSisa)}</p>
          </div>
        </div>
      </div>

      {/* ===== TOP CABANG ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="branch" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Performa Cabang</h2>
            <p className="text-xs text-gray-500">
              5 cabang dengan realisasi tertinggi
            </p>
          </div>
        </div>

        {branches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Icon name="branch" className="w-12 h-12 mb-2 opacity-30" />
            <p className="text-sm font-medium text-gray-500">Belum ada cabang terdaftar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {topBranches.map((b: any, i: number) => (
              <div
                key={b.id ?? `branch-${i}`}
                className="border border-gray-200 rounded-2xl p-4 hover:border-black transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                      <Icon name="location2" className="w-5 h-5 text-black" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <b className="text-base text-black truncate">{b.name}</b>
                        {i === 0 && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black text-white">
                            Top 1
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        ID: {b.id} · {b.total_residents ?? 0} warga
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">Realisasi</p>
                    <p className="text-lg font-bold text-black">{b.persentase}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-black rounded-full transition-all"
                    style={{ width: `${b.persentase}%` }}
                  />
                </div>

                {/* Detail Anggaran */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Anggaran</p>
                    <p className="font-semibold text-black">{rp(b.allocated_budget)}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Tersalurkan</p>
                    <p className="font-semibold text-black">{rp(b.disbursed_total)}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Sisa</p>
                    <p className="font-semibold text-black">
                      {rp(Number(b.allocated_budget ?? 0) - Number(b.disbursed_total ?? 0))}
                    </p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Warga</p>
                    <p className="font-semibold text-black">{b.total_residents ?? 0}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== INFO BOX ===== */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-start gap-3">
        <Icon name="info" className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
        <div className="text-xs text-gray-600">
          <p className="font-semibold text-black mb-1">Tentang Dashboard Admin</p>
          <p>
            Data di atas merupakan agregasi dari seluruh cabang. Gunakan filter pada grafik
            untuk melihat performa per cabang. Cabang dengan realisasi rendah dapat
            ditindaklanjuti melalui menu Cabang.
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