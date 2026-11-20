'use client';

import Link from 'next/link';
import { usePortal } from '@/components/portal-context';

// ===== SVG ICONS (monokrom, warna mengikuti text-current) =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    branch: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />,
    money: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    doc: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />,
    scan: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    key: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />,
    bell: <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />,
    logout: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />,
    hourglass: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
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

// ===== MAIN LAYOUT =====
export default function PortalLayout({
  portal,
  section,
  children,
}: {
  portal: 'admin' | 'cabang' | 'warga';
  section: string;
  children: React.ReactNode;
}) {
  const { user, message, logout } = usePortal();

  const menus =
    portal === 'admin'
      ? [
          ['home', 'Ringkasan', 'home'],
          ['cabang', 'Cabang', 'branch'],
          ['laporan', 'Laporan', 'doc'],
        ]
      : portal === 'cabang'
      ? [
          ['home', 'Ringkasan', 'home'],
          ['warga', 'Warga', 'users'],
          ['jadwal', 'Jadwal', 'calendar'],
          ['scan', 'Scan QR', 'scan'],
          ['history', 'History', 'clock'],
          ['laporan', 'Laporan', 'doc'],
        ]
      : [
          ['home', 'Beranda', 'home'],
          ['qr', 'QR Saya', 'key'],
          ['transparansi', 'Transparansi', 'eye'],
          ['riwayat', 'Riwayat', 'clock'],
          ['laporan', 'Laporan', 'doc'],
        ];

  const sectionLabels: Record<string, Record<string, string>> = {
    admin: {
      home: 'Ringkasan Nasional',
      cabang: 'Daftar Cabang',
      laporan: 'Laporan',
    },
    cabang: {
      home: 'Dashboard Cabang',
      warga: 'Data Warga',
      jadwal: 'Jadwal Penyaluran',
      scan: 'Scan QR',
      history: 'Riwayat',
      laporan: 'Laporan',
    },
    warga: {
      home: 'Beranda',
      qr: 'QR Saya',
      transparansi: 'Transparansi',
      riwayat: 'Riwayat',
      laporan: 'Laporan',
    },
  };

  return (
    <main
      data-active-portal={portal}
      data-active-section={section}
      className="min-h-screen"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* ===== SIDEBAR ===== */}
      <aside
        className="hidden lg:flex w-60 flex-col justify-between p-5 shrink-0 border-r"
        style={{
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb',
        }}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: '#000000' }}
            >
              <Icon name="home" className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-bold tracking-wide text-sm"
              style={{ color: '#000000' }}
            >
              BANSOS+
            </span>
          </div>

          {/* Portal badge */}
          <div className="mb-6">
            <span
              className="text-[10px] tracking-widest font-semibold uppercase"
              style={{ color: '#9ca3af' }}
            >
              Portal {portal}
            </span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {menus.map(([k, l, iconName]) => {
              const isActive = section === k;
              return (
                <Link
                  key={k}
                  href={`/${portal}/${k}`}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition"
                  style={{
                    backgroundColor: isActive ? '#000000' : 'transparent',
                    color: isActive ? '#ffffff' : '#4b5563',
                    boxShadow: isActive ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Icon name={iconName} className="w-5 h-5" />
                  {l}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile */}
        <div className="space-y-3">
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: '#f9fafb' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #f472b6)',
                color: '#ffffff',
              }}
            >
              {user?.name?.[0] ?? 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-semibold truncate"
                style={{ color: '#000000' }}
              >
                {user?.name ?? 'User'}
              </p>
              <p
                className="text-xs truncate"
                style={{ color: '#6b7280' }}
              >
                {user?.email ?? 'user@bansos.id'}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition border"
            style={{
              borderColor: '#e5e7eb',
              color: '#374151',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Icon name="logout" className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <section 
  className="p-6 md:p-10 w-full max-w-[1400px]" 
  style={{ 
    marginLeft: '240px'
  }}
>
        {/* Mobile nav */}
        <nav className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-4 border-b" style={{ borderColor: '#e5e7eb' }}>
          {menus.map(([k, l]) => {
            const isActive = section === k;
            return (
              <Link
                key={k}
                href={`/${portal}/${k}`}
                className="whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition"
                style={{
                  backgroundColor: isActive ? '#000000' : '#f3f4f6',
                  color: isActive ? '#ffffff' : '#4b5563',
                }}
              >
                {l}
              </Link>
            );
          })}
        </nav>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1
              className="text-2xl lg:text-3xl font-bold"
              style={{ color: '#000000' }}
            >
              {sectionLabels[portal]?.[section] ?? 'Dashboard'}
            </h1>
            <p className="mt-1" style={{ color: '#6b7280' }}>
              Welcome, {user?.name ?? 'User'}!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center transition border"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#e5e7eb',
                color: '#4b5563',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              <Icon name="search" className="w-5 h-5" />
            </button>
            <button
              className="w-10 h-10 rounded-xl flex items-center justify-center transition border relative"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#e5e7eb',
                color: '#4b5563',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              <Icon name="bell" className="w-5 h-5" />
              <span
                className="absolute top-2 right-2 w-2 h-2 rounded-full"
                style={{ backgroundColor: '#ef4444' }}
              />
            </button>
            <Link
              href={`/${portal}/home`}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition"
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1f2937';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
              }}
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className="rounded-xl px-4 py-3 mb-6 text-sm border"
            style={{
              backgroundColor: '#eff6ff',
              borderColor: '#bfdbfe',
              color: '#1e40af',
            }}
            role="status"
          >
            {message}
          </div>
        )}

        {children}
      </section>
    </main>
  );
}