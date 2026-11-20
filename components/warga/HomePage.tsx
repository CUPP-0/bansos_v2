'use client';

import { useState } from 'react';
import { usePortal } from '@/components/portal-context';
import { QRCodeSVG } from 'qrcode.react';

// ===== SVG ICONS MONOKROM =====
function Icon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />,
    key: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    doc: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
    money: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    alert: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    copy: <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />,
    table: <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v1.5c0 .621-.504 1.125-1.125 1.125" />,
    area: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />,
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

// ===== MINI BAR CHART (ala foto) =====
function MiniBars({ values, accent = false }: { values: number[]; accent?: boolean }) {
  const max = Math.max(...values, 1);
  const bars = values.length ? values : new Array(10).fill(0);
  const out: number[] = [];
  for (let i = 0; i < 10; i++) {
    out.push(Math.max(10, Math.round(((bars[i] ?? 0) / max) * 100)));
  }
  return (
    <div className="flex items-end gap-1.5 h-12 mt-4">
      {out.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-sm ${
            accent
              ? i % 2 === 0
                ? 'bg-black'
                : 'bg-gray-400'
              : i % 3 === 0
              ? 'bg-gray-400'
              : 'bg-black'
          }`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

// ===== STATUS DOT (ala badge "For rent"/"For sell" di foto) =====
function StatusDot({ status }: { status: string }) {
  const claimed = status === 'claimed';
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700">
      <span
        className={`w-2 h-2 rounded-full ${claimed ? 'bg-green-500' : 'bg-red-400'}`}
      />
      {claimed ? 'Sudah diterima' : 'Belum diterima'}
    </span>
  );
}

// ===== MAIN COMPONENT =====
export default function WargaHomePage() {
  const { data, user, rp, date } = usePortal();
  const [bulanTampil, setBulanTampil] = useState(6);

  const citizen = data.citizen;
  const schedules = data.schedules ?? [];
  const history = data.history ?? [];
  const branchSpending = data.branchSpending ?? [];
  const branch = data.branch;

  const activeSchedules = schedules.filter((s: any) => s.status === 'active');

  const myHistory = history.filter((h: any) => h.citizen_id === citizen?.id);
  const totalDiterima = myHistory
    .filter((h: any) => h.claim_status === 'claimed')
    .reduce((sum: number, h: any) => sum + (h.received_amount ?? 0), 0);
  const totalPending = myHistory
    .filter((h: any) => h.claim_status !== 'claimed')
    .reduce((sum: number, h: any) => sum + (h.allocated_amount ?? 0), 0);
  const totalHak = myHistory.reduce(
    (sum: number, h: any) => sum + (h.allocated_amount ?? 0),
    0
  );
  const persentasePribadi = totalHak > 0 ? Math.round((totalDiterima / totalHak) * 100) : 0;

  // Transparansi cabang
  const totalAnggaran = branch?.allocated_budget ?? 0;
  const totalTersalurkan = branch?.disbursed_total ?? 0;
  const sisaAnggaran = totalAnggaran - totalTersalurkan;
  const persentaseTersalurkan =
    totalAnggaran > 0 ? Math.round((totalTersalurkan / totalAnggaran) * 100) : 0;

  const totalAlokasiProgram = branchSpending.reduce(
    (sum: number, s: any) => sum + (s.allocated ?? 0),
    0
  );
  const totalDiterimaProgram = branchSpending.reduce(
    (sum: number, s: any) => sum + (s.received ?? 0),
    0
  );

  // Bars dari data real (nominal per transaksi)
  const hakBars = myHistory.map((h: any) => h.allocated_amount ?? 0);
  const terimaBars = myHistory.map((h: any) => h.received_amount ?? 0);

  // Jadwal klaim berikutnya
  const jadwalBerikutnya = activeSchedules
    .map((s: any) => s.schedule_date)
    .filter(Boolean)
    .sort()[0];

  // Filter riwayat per slider bulan
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - bulanTampil);
  const cutoffKey = cutoff.toISOString().slice(0, 7);
  const shownHistory = myHistory.filter((h: any) => {
    const key = String(h.claimed_at || h.schedule_date || '').slice(0, 7);
    return !key || key >= cutoffKey;
  });

  return (
    <div data-page="home" className="space-y-6">
      {/* ===== 3 CARD PASTEL (ala foto) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card cream: Total Hak */}
        <div className="bg-[#fef3e2] rounded-2xl p-5 relative overflow-hidden">
          <p className="text-sm text-gray-500 font-medium">Total Hak Bantuan</p>
          <div className="flex items-end justify-between mt-2">
            <b className="text-2xl text-black">{rp(totalHak)}</b>
            <div className="flex items-center gap-1">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gray-400 border-2 border-[#fef3e2] flex items-center justify-center">
                  <Icon name="users" className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="w-7 h-7 rounded-full bg-black border-2 border-[#fef3e2] flex items-center justify-center">
                  <Icon name="doc" className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <span className="text-xs bg-white/60 rounded-full px-2 py-0.5 font-medium">
                {myHistory.length}+
              </span>
            </div>
          </div>
          <MiniBars values={hakBars} />
          <div className="flex items-center gap-1 mt-3 text-xs font-medium text-gray-700">
            <span className="w-2 h-2 rounded-full bg-black" /> {persentasePribadi}% diterima
          </div>
        </div>

        {/* Card pink: Sudah Diterima */}
        <div className="bg-[#fde8e8] rounded-2xl p-5 relative overflow-hidden">
          <p className="text-sm text-gray-500 font-medium">Sudah Diterima</p>
          <div className="flex items-end justify-between mt-2">
            <b className="text-2xl text-black">{rp(totalDiterima)}</b>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-sm">
              <Icon name="check" className="w-4 h-4" />
            </div>
          </div>
          <MiniBars values={terimaBars} accent />
          <div className="flex items-center gap-1 mt-3 text-xs font-medium text-gray-700">
            <span className="w-2 h-2 rounded-full bg-black" /> {myHistory.filter((h: any) => h.claim_status === 'claimed').length} klaim
          </div>
        </div>

        {/* Card hijau: Pengumuman + garis dekoratif */}
        <div className="bg-[#e8f5e9] rounded-2xl p-5 relative overflow-hidden">
          <p className="text-sm text-gray-500 font-medium">Penting</p>
          <b className="text-xl text-black mt-1 block">Jadwal Klaim Berikutnya</b>
          <p className="text-sm text-gray-600 mt-3">
            {jadwalBerikutnya ? (
              <>
                Siapkan QR Anda untuk penyaluran tanggal <b>{date(jadwalBerikutnya)}</b>
              </>
            ) : (
              <>
                Belum ada jadwal aktif. Pantau menu <b>Jadwal</b> secara berkala.
              </>
            )}
          </p>
          <svg className="absolute right-0 top-0 w-32 h-full opacity-30" viewBox="0 0 120 160">
            <path d="M120 0 Q80 40 90 80 T60 160" fill="none" stroke="#000000" strokeWidth="2" />
            <path d="M100 0 Q60 60 70 100 T40 160" fill="none" stroke="#000000" strokeWidth="1.5" />
            <circle cx="90" cy="70" r="10" fill="#000000" />
            <circle cx="65" cy="130" r="6" fill="#000000" />
          </svg>
        </div>
      </div>

      {/* ===== INFO CARD WARGA + QR ===== */}
      {citizen && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="bg-white p-3 rounded-xl border border-gray-200 mb-3">
                <QRCodeSVG value={citizen.qr_token} size={130} level="M" />
              </div>
              <p className="text-xs font-semibold text-black mb-2">QR Token Saya</p>
              <div className="flex items-center gap-1.5 bg-white rounded-lg px-2.5 py-1.5 border border-gray-200 w-full">
                <Icon name="key" className="w-3 h-3 text-gray-400" />
                <p className="text-[10px] text-gray-600 font-mono truncate flex-1">{citizen.qr_token}</p>
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(citizen.qr_token)}
                  className="shrink-0 text-gray-400 hover:text-black transition"
                  title="Salin token"
                >
                  <Icon name="copy" className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 text-center">Tunjukkan QR ini saat penyaluran</p>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Nama Lengkap</p>
                  <p className="text-lg font-bold text-black">{citizen.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">NIK</p>
                  <p className="text-sm font-mono text-gray-700">{citizen.nik || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Icon name="money" className="w-3.5 h-3.5" /> Total Hak
                  </div>
                  <p className="text-xl font-bold text-black">{rp(totalHak)}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <Icon name="clock" className="w-3.5 h-3.5" /> Belum Diklaim
                  </div>
                  <p className="text-xl font-bold text-black">{rp(totalPending)}</p>
                </div>
              </div>

              {totalHak > 0 && (
                <div>
                  <div className="flex items-end justify-between mb-1.5">
                    <p className="text-xs text-gray-500">Progress Penerimaan</p>
                    <p className="text-sm font-bold text-black">{persentasePribadi}%</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-black rounded-full transition-all" style={{ width: `${persentasePribadi}%` }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== TRANSPARANSI CABANG ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
            <Icon name="shield" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Transparansi Anggaran Cabang</h2>
            <p className="text-xs text-gray-500">Realisasi penyaluran bantuan di cabang Anda</p>
          </div>
        </div>

        <div className="mb-5 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-3">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Realisasi Penyaluran</p>
              <p className="text-4xl font-bold text-black">{persentaseTersalurkan}%</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Tersalurkan</p>
              <p className="text-xl font-bold text-black">{rp(totalTersalurkan)}</p>
            </div>
          </div>
          <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-gray-200">
            <div className="h-full bg-black rounded-full transition-all" style={{ width: `${persentaseTersalurkan}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Icon name="money" className="w-3.5 h-3.5" /> Total Anggaran
            </div>
            <p className="text-xl font-bold text-black">{rp(totalAnggaran)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Icon name="check" className="w-3.5 h-3.5" /> Tersalurkan
            </div>
            <p className="text-xl font-bold text-black">{rp(totalTersalurkan)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
              <Icon name="clock" className="w-3.5 h-3.5" /> Sisa Anggaran
            </div>
            <p className="text-xl font-bold text-black">{rp(sisaAnggaran)}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3">
          <Icon name="info" className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
          <div className="text-xs text-gray-600">
            <p className="font-semibold text-black mb-1">Tentang Transparansi</p>
            <p>
              Data di atas menunjukkan realisasi anggaran cabang secara real-time. Jika ada
              ketidaksesuaian, silakan laporkan melalui menu Laporan.
            </p>
          </div>
        </div>
      </div>

      {/* ===== RINCIAN PENYALURAN CABANG ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Icon name="table" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Rincian Penyaluran Cabang</h2>
              <p className="text-xs text-gray-500">{branchSpending.length} program tercatat</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <div className="text-right">
              <p className="text-gray-500">Total Alokasi</p>
              <p className="font-bold text-black">{rp(totalAlokasiProgram)}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Total Diterima</p>
              <p className="font-bold text-black">{rp(totalDiterimaProgram)}</p>
            </div>
          </div>
        </div>

        {branchSpending.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Icon name="table" className="w-12 h-12 mb-2 opacity-30" />
            <p className="text-sm font-medium text-gray-500">Belum ada penyaluran</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-200 rounded-xl">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-4 font-semibold text-gray-700">Program</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Tanggal</th>
                  <th className="py-3 px-4 font-semibold text-gray-700">Penerima</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 text-right">Alokasi</th>
                  <th className="py-3 px-4 font-semibold text-gray-700 text-right">Tersalurkan</th>
                </tr>
              </thead>
              <tbody>
                {branchSpending.map((s: any, i: number) => {
                  const progress = s.allocated > 0 ? Math.round((s.received / s.allocated) * 100) : 0;
                  return (
                    <tr key={s.id ?? `sp-${i}`} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                      <td className="py-3 px-4"><p className="font-semibold text-black">{s.title}</p></td>
                      <td className="py-3 px-4 text-gray-600">{date(s.schedule_date)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <Icon name="users" className="w-3.5 h-3.5 text-gray-500" />
                          <span className="text-gray-700">{s.claimed ?? 0}/{s.recipients ?? 0}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-700">{rp(s.allocated)}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-bold text-black">{rp(s.received)}</span>
                          <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-black rounded-full" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== JADWAL AKTIF ===== */}
      {activeSchedules.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Icon name="calendar" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Jadwal Penyaluran Aktif</h2>
              <p className="text-xs text-gray-500">{activeSchedules.length} jadwal sedang berlangsung</p>
            </div>
          </div>

          <div className="space-y-3">
            {activeSchedules.map((s: any, i: number) => {
              const myClaim = s.history?.find((h: any) => h.citizen_id === citizen?.id);
              const total = s.stats?.total ?? 0;
              const claimed = s.stats?.claimed ?? 0;
              const progress = total > 0 ? Math.round((claimed / total) * 100) : 0;
              return (
                <div key={s.id ?? `sch-${i}`} className="border border-gray-200 rounded-2xl p-4 hover:border-black transition">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <b className="text-base text-black">{s.title}</b>
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black text-white">Aktif</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                        <Icon name="calendar" className="w-3.5 h-3.5" /> {date(s.schedule_date)}
                      </p>
                    </div>
                    {myClaim && <StatusDot status={myClaim.claim_status} />}
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div className="h-full bg-black rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{claimed} dari {total} warga sudah menerima</span>
                    <span className="font-semibold text-black">{progress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== RIWAYAT PENYALURAN SAYA (list item ala foto + slider) ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
              <Icon name="clock" className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">Riwayat Penyaluran Saya</h2>
              <p className="text-xs text-gray-500">{shownHistory.length} transaksi ditampilkan</p>
            </div>
          </div>
          {/* Slider ala "4km" di foto */}
          <div className="flex items-center gap-3 min-w-44">
            <input
              type="range"
              min={1}
              max={12}
              value={bulanTampil}
              onChange={(e) => setBulanTampil(Number(e.target.value))}
              className="flex-1 accent-black"
            />
            <span className="text-xs font-semibold text-black whitespace-nowrap bg-gray-100 border border-gray-200 rounded-full px-2.5 py-1">
              {bulanTampil} bln
            </span>
          </div>
        </div>

        {shownHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Icon name="doc" className="w-12 h-12 mb-2 opacity-30" />
            <p className="text-sm font-medium text-gray-500">Belum ada riwayat pada rentang ini</p>
            <p className="text-xs text-gray-400 mt-1">Coba geser slider untuk melihat bulan lebih lama.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {shownHistory.map((h: any, i: number) => (
              <div
                key={h.id ?? `hist-${i}`}
                className="flex flex-wrap items-center gap-4 py-3 hover:bg-gray-50 transition rounded-xl px-2"
              >
                {/* thumbnail */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Icon
                    name={h.claim_status === 'claimed' ? 'check' : 'clock'}
                    className="w-5 h-5 text-black"
                  />
                </div>

                {/* nama + tanggal */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-black truncate">
                    {h.schedule_title ?? 'Penyaluran'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {h.claimed_at
                      ? new Date(h.claimed_at).toLocaleString('id-ID')
                      : 'Belum diklaim'}
                  </p>
                </div>

                {/* badge status */}
                <div className="shrink-0">
                  <StatusDot status={h.claim_status} />
                </div>

                {/* ikon nominal (ala bed/bath/area di foto) */}
                <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-600 shrink-0">
                  <Icon name="money" className="w-3.5 h-3.5 text-gray-400" />
                  <span>{rp(h.allocated_amount)}</span>
                  <Icon name="area" className="w-3.5 h-3.5 text-gray-400 ml-2" />
                  <span>{h.claim_status === 'claimed' ? 'Lunas' : 'Tagihan'}</span>
                </div>

                {/* harga */}
                <b className="text-sm font-bold text-black shrink-0 w-28 text-right">
                  {rp(h.received_amount ?? h.allocated_amount)}
                </b>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== PANDUAN WARGA ===== */}
      <div className="bg-black rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <Icon name="info" className="w-5 h-5 text-black" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Panduan Singkat</h2>
            <p className="text-xs text-white/60">Cara menggunakan sistem BANSOS+</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: '01', title: 'Simpan QR Code', desc: 'QR token Anda ada di atas. Simpan untuk ditunjukkan saat penyaluran.', icon: 'key' },
            { step: '02', title: 'Datang Sesuai Jadwal', desc: 'Perhatikan jadwal aktif. Datang tepat waktu membawa QR code.', icon: 'calendar' },
            { step: '03', title: 'Pantau Transparansi', desc: 'Cek realisasi anggaran cabang. Laporkan jika ada ketidaksesuaian.', icon: 'shield' },
          ].map((item) => (
            <div key={item.step} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-white/20">{item.step}</span>
                <Icon name={item.icon} className="w-5 h-5 text-white/60" />
              </div>
              <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
              <p className="text-xs text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 pt-4">
        © 2026 BANSOS+ · Sistem Penyaluran Bantuan Sosial Transparan
      </p>
    </div>
  );
}