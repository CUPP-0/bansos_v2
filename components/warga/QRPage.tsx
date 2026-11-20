'use client';

import { useState } from 'react';
import { usePortal } from '@/components/portal-context';
import { QRCodeSVG } from 'qrcode.react';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    qr: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    id: <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />,
    copy: <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
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
export default function WargaQRPage() {
  const { data, user } = usePortal();
  const [copied, setCopied] = useState(false);

  // Fallback ke user jika citizen belum ter-load
  const citizen = data.citizen || user;
  const token = citizen?.qr_token || 'QR_BELUM_TERSEDIA';
  const hasToken = token !== 'QR_BELUM_TERSEDIA';

  const handleCopy = async () => {
    if (!hasToken) return;
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin token', err);
    }
  };

  return (
    <div data-page="qr" className="space-y-6">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-black">QR Identitas Penerima</h1>
        <p className="text-gray-500 mt-1">
          Tunjukkan kode ini kepada petugas saat pengambilan bantuan.
        </p>
      </div>

      {/* ===== MAIN QR CARD ===== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10 max-w-md mx-auto text-center">
        {/* User Info */}
        <div className="mb-6">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mx-auto mb-3">
            <Icon name="user" className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-black">{citizen?.name || 'Nama Warga'}</h2>
          {citizen?.nik && (
            <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1.5">
              <Icon name="id" className="w-3.5 h-3.5" />
              {citizen.nik}
            </p>
          )}
        </div>

        {/* QR Code Display */}
        <div className="relative inline-block">
          {hasToken ? (
            <div className="bg-white p-4 rounded-2xl border-2 border-black shadow-sm">
              <QRCodeSVG value={token} size={220} level="H" includeMargin={false} />
            </div>
          ) : (
            <div className="w-[220px] h-[220px] bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
              <Icon name="qr" className="w-10 h-10 mb-2 opacity-50" />
              <span className="text-sm">QR belum tersedia</span>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
            <Icon name="shield" className="w-3 h-3" />
            Terverifikasi
          </div>
        </div>

        {/* Token String + Copy Button */}
        {hasToken && (
          <div className="mt-8">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">
              Token Manual (Jika QR tidak terbaca)
            </p>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 border border-gray-200">
              <Icon name="qr" className="w-4 h-4 text-gray-500 shrink-0" />
              <span className="flex-1 text-sm font-mono text-gray-700 truncate text-left">
                {token}
              </span>
              <button
                onClick={handleCopy}
                className={`shrink-0 p-2 rounded-lg transition flex items-center justify-center ${
                  copied 
                    ? 'bg-black text-white' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-black hover:text-black'
                }`}
                title="Salin token"
              >
                <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <p className="text-xs text-black font-medium mt-2 animate-pulse">
                ✓ Token berhasil disalin ke clipboard
              </p>
            )}
          </div>
        )}
      </div>

      {/* ===== TIPS CARD ===== */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
            <Icon name="info" className="w-5 h-5 text-black" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-black mb-2">Tips Agar QR Mudah Dibaca</h3>
            <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside">
              <li>Pastikan <b>kecerahan layar</b> ponsel Anda dalam posisi maksimal.</li>
              <li>Jangan <b>zoom in atau zoom out</b> pada halaman ini saat discan.</li>
              <li>Bersihkan lensa kamera petugas jika hasil scan tidak stabil.</li>
              <li>Jika QR rusak atau tidak terbaca, berikan <b>Token Manual</b> di atas kepada petugas.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-gray-400 pt-4">
        Simpan halaman ini atau screenshot QR code untuk berjaga-jaga.
      </p>
    </div>
  );
}