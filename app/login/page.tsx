'use client';

import { useState } from 'react';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    lock: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />,
    eye: <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />,
    eyeOff: <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />,
    arrowRight: <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />,
    home: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    qr: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
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

// ===== FLOATING CARD COMPONENT =====
function FloatingCard({
  children,
  className = '',
  delay = '0s',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`absolute bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl ${className}`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      {children}
    </div>
  );
}

// ===== MAIN COMPONENT =====
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error || 'Login gagal');
        return;
      }
      location.href = d.redirect;
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex bg-white">
      {/* ===== CSS ANIMATIONS ===== */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-slide-up { animation: slide-up 0.6s ease-out both; }
        .animate-slide-up-delay-1 { animation: slide-up 0.6s ease-out 0.1s both; }
        .animate-slide-up-delay-2 { animation: slide-up 0.6s ease-out 0.2s both; }
        .animate-slide-up-delay-3 { animation: slide-up 0.6s ease-out 0.3s both; }
        .animate-slide-up-delay-4 { animation: slide-up 0.6s ease-out 0.4s both; }
      `}</style>

      {/* ===== LEFT PANEL: VISUAL ===== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
        {/* Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, #1f2937 0%, #000000 50%, #0a0a0a 100%)',
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative Circles */}
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        {/* Floating Elements */}
        <FloatingCard className="top-20 left-20" delay="0s">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <Icon name="users" className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="text-[10px] text-white/60 uppercase tracking-wider">Total Warga</p>
              <p className="text-xl font-bold text-white">1,248</p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard className="top-40 right-16" delay="1s">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <Icon name="qr" className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="text-[10px] text-white/60 uppercase tracking-wider">Scan Hari Ini</p>
              <p className="text-xl font-bold text-white">87</p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard className="bottom-32 left-24" delay="2s">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <Icon name="chart" className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="text-[10px] text-white/60 uppercase tracking-wider">Tersalurkan</p>
              <p className="text-xl font-bold text-white">Rp 50jt</p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard className="bottom-24 right-20" delay="3s">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <Icon name="check" className="w-4 h-4 text-black" />
            </div>
            <p className="text-sm font-semibold text-white">150 Dikonfirmasi</p>
          </div>
        </FloatingCard>

        {/* Large Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            {/* Pulse Ring */}
            <div
              className="absolute inset-0 rounded-full bg-white/10"
              style={{ animation: 'pulse-ring 3s ease-out infinite' }}
            />
            <div
              className="absolute inset-0 rounded-full bg-white/10"
              style={{ animation: 'pulse-ring 3s ease-out infinite 1s' }}
            />

            {/* Main Logo */}
            <div
              className="relative w-32 h-32 rounded-3xl bg-white flex items-center justify-center shadow-2xl"
              style={{ animation: 'floatSlow 8s ease-in-out infinite' }}
            >
              <Icon name="home" className="w-16 h-16 text-black" />
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-10 left-10 right-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-xs text-white/60 uppercase tracking-widest">Portal Terpadu</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>
          <h2 className="text-3xl font-bold text-white text-center">
            BANSOS<span className="text-white/60">+</span>
          </h2>
          <p className="text-sm text-white/60 text-center mt-2">
            Sistem Penyaluran Bantuan Sosial Transparan
          </p>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>

        <div className="absolute top-6 right-6">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/80">Sistem Online</span>
          </div>
        </div>
      </div>

      {/* ===== RIGHT PANEL: FORM ===== */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <Icon name="home" className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-black text-lg tracking-wide">
              BANSOS<span className="text-gray-400">+</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8 animate-slide-up">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Selamat Datang
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Masuk ke Akun Anda
            </h1>
            <p className="text-gray-500 mt-2">
              Silakan login untuk mengakses portal BANSOS+
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="animate-slide-up-delay-1">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="user" className="w-4 h-4" />
                </div>
                <input
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div className="animate-slide-up-delay-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="lock" className="w-4 h-4" />
                </div>
                <input
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-11 py-3 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition bg-white"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                >
                  <Icon name={showPassword ? 'eyeOff' : 'eye'} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200 animate-slide-up-delay-3">
                <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                  <Icon name="alert" className="w-4 h-4 text-gray-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-black">Login Gagal</p>
                  <p className="text-xs text-gray-600 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed animate-slide-up-delay-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  Masuk
                  <Icon name="arrowRight" className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 animate-slide-up-delay-4">
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Demo Akun
            </p>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-mono">admin</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600 font-mono">password</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-mono">petugas.jakarta</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600 font-mono">password</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-mono">siti.aminah</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600 font-mono">password</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-8 animate-slide-up-delay-4">
            © 2026 BANSOS+ · Sistem Penyaluran Bantuan Sosial
          </p>
        </div>
      </div>
    </main>
  );
}