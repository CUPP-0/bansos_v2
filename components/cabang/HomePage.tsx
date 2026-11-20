'use client';

import { usePortal } from '@/components/portal-context';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer
} from 'recharts';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />,
    bell: <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    key: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />,
    hourglass: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />,
    money: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    scan: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    doc: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    settings: <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />,
    settings2: <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />,
    arrowUp: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />,
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
export default function CabangHomePage() {
  const {
    data, user, portal: activePortal, submit, action, rp, date,
    chartRows, chartBranch, setChartBranch,
    scanSchedule, setScanSchedule, scanToken, setScanToken,
    scanDetails, scanError, scanOn, lookupToken, startScanner
  } = usePortal();

  const citizens = data.citizens ?? [];
  const schedules = data.schedules ?? [];
  const reports = data.reports ?? [];
  const totalWarga = citizens.length;
  const tokenAktif = citizens.filter((citizen: any) => Boolean(citizen.qr_token)).length;
  const pendingCount = schedules.reduce((total: number, schedule: any) => total + Number(schedule.stats?.pending ?? 0), 0);
  const allocated = Number(data.branch?.allocated_budget ?? 0);
  const disbursed = Number(data.branch?.disbursed_total ?? 0);
  const realization = allocated > 0 ? Math.round((disbursed / allocated) * 100) : 0;
  const recentActivities = [
    ...schedules.map((item: any) => ({ id: `schedule-${item.id}`, title: item.title, desc: `Jadwal penyaluran · ${item.stats?.claimed ?? 0} dari ${item.stats?.total ?? 0} warga menerima`, time: item.created_at, icon: 'calendar' })),
    ...reports.map((item: any) => ({ id: `report-${item.id}`, title: item.subject, desc: `Laporan warga · ${item.status}`, time: item.created_at, icon: 'doc' })),
  ].sort((a: any, b: any) => new Date(b.time || 0).getTime() - new Date(a.time || 0).getTime()).slice(0, 5);

  const branchStats = [
    { label: 'Total Warga', value: totalWarga, icon: 'users' },
    { label: 'Token Aktif', value: tokenAktif, icon: 'key' },
    { label: 'Belum Disalurkan', value: pendingCount, icon: 'hourglass' },
  ];

  return (
    // ⚠️ TIDAK ADA wrapper div/main di sini — PortalLayout sudah menyediakannya
    <div data-page="home">
      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Revenue Card */}
        <div className="bg-[#fef3e2] rounded-2xl p-5 relative overflow-hidden">
          <p className="text-sm text-gray-500 font-medium">Revenue</p>
          <div className="flex items-end justify-between mt-2">
            <b className="text-2xl text-black">{rp(data.branch?.allocated_budget)}</b>
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gray-400 border-2 border-[#fef3e2]"></div>
                <div className="w-7 h-7 rounded-full bg-gray-600 border-2 border-[#fef3e2]"></div>
              </div>
              <span className="text-xs bg-white/60 rounded-full px-2 py-0.5 font-medium">{totalWarga} warga</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-3">Total anggaran yang dialokasikan ke cabang</p>
        </div>

        {/* Expenses Card */}
        <div className="bg-[#fde8e8] rounded-2xl p-5 relative overflow-hidden">
          <p className="text-sm text-gray-500 font-medium">Expenses</p>
          <div className="flex items-end justify-between mt-2">
            <b className="text-2xl text-black">{rp(data.branch?.disbursed_total)}</b>
            <span className="text-xs bg-white/70 rounded-full px-3 py-1">Realisasi {realization}%</span>
          </div>
          <p className="text-xs text-gray-600 mt-3">Nominal bantuan yang sudah diterima warga</p>
        </div>

        {/* Important Card */}
        <div className="bg-[#e8f5e9] rounded-2xl p-5 relative overflow-hidden">
          <p className="text-sm text-gray-500 font-medium">Sisa Anggaran</p>
          <b className="text-xl text-black mt-1 block">{rp(Math.max(0, allocated - disbursed))}</b>
          <p className="text-sm text-gray-600 mt-3">Anggaran tersedia setelah dikurangi penyaluran yang tercatat.</p>
          <svg className="absolute right-0 top-0 w-32 h-full opacity-30" viewBox="0 0 120 160">
            <path d="M120 0 Q80 40 90 80 T60 160" fill="none" stroke="#000000" strokeWidth="2" />
            <path d="M100 0 Q60 60 70 100 T40 160" fill="none" stroke="#000000" strokeWidth="1.5" />
            <circle cx="90" cy="70" r="10" fill="#000000" />
            <circle cx="65" cy="130" r="6" fill="#000000" />
          </svg>
        </div>
      </div>

      {/* ===== BRANCH STATS ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {branchStats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
              <Icon name={s.icon} className="w-5 h-5 text-black" />
            </div>
            <p className="text-2xl font-bold text-black">{s.value.toLocaleString('id-ID')}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
            <Icon name="calendar" className="w-5 h-5 text-black" />
          </div>
          <p className="text-2xl font-bold text-black">{new Date().getDate()}</p>
          <p className="text-xs text-gray-500 mt-1">Hari Ini</p>
        </div>
      </div>

      {/* ===== CHART SECTION ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
        <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-black">Grafik Penyaluran per Bulan</h2>
            <p className="text-xs text-gray-500 mt-1">
              Berdasarkan tanggal bantuan benar-benar diterima warga.
            </p>
          </div>
          <span className="text-xs rounded-full bg-gray-100 text-gray-800 px-3 py-1 font-medium border border-gray-200">
            Per bulan
          </span>
        </div>

        <div className="h-72">
          {data.monthly?.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthly} barSize={28}>
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
                <Bar
                  dataKey="disbursed"
                  name="Dana tersalurkan"
                  fill="#000000"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Icon name="chart" className="w-12 h-12 mb-2" />
              <p className="text-sm">Belum ada penyaluran pada bulan mana pun.</p>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-0">
          {data.monthly?.map((m: any) => (
            <div
              key={m.month}
              className="flex justify-between items-center border-t border-gray-100 py-3 text-sm"
            >
              <span className="text-gray-600">
                {new Date(m.month + '-01T00:00:00').toLocaleDateString('id-ID', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <b className="text-black">{rp(m.disbursed)}</b>
            </div>
          ))}
        </div>
      </div>

      {/* ===== BOTTOM GRID ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-black">Recent Activities</h3>
            <button className="text-xs text-gray-600 font-medium hover:text-black transition">View all</button>
          </div>
          <div className="space-y-3">
            {recentActivities.length ? recentActivities.map((a: any) => (
              <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Icon name={a.icon} className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-black">{a.title}</p>
                  <p className="text-xs text-gray-500 truncate">{a.desc}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{a.time ? new Date(a.time).toLocaleString('id-ID') : '-'}</span>
              </div>
            )) : <p className="text-sm text-gray-500 py-8 text-center">Belum ada aktivitas yang tercatat.</p>}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-black mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: 'Scan Token', icon: 'scan' },
              { label: 'Tambah Warga', icon: 'users' },
              { label: 'Laporan', icon: 'doc' },
              { label: 'Pengaturan', icon: 'settings2' },
            ].map((q) => (
              <button
                key={q.label}
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center">
                  <Icon name={q.icon} className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-700">{q.label}</span>
              </button>
            ))}
          </div>

          {/* Progress card */}
          <div className="mt-5 p-4 rounded-xl bg-black text-white">
            <p className="text-xs opacity-70">Target Bulanan</p>
            <div className="flex items-end justify-between mt-1">
              <b className="text-xl">{realization}%</b>
              <span className="text-xs opacity-70">Realisasi anggaran</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: `${Math.min(100, realization)}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 mt-8">
        © 2026 BANSOS+ — Cabang {activePortal ?? 'Pusat'}
      </p>
    </div>
  );
}