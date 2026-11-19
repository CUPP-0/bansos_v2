# Bansos Transparan

Aplikasi pengelolaan bantuan sosial dengan tiga portal dalam satu project Next.js App Router + TypeScript + MySQL.

## Stack
- Next.js 14, React 18, TypeScript, Tailwind CSS
- MySQL melalui `mysql2/promise`
- Autentikasi cookie HTTP-only bertanda JWT (`jose`) dan password bcrypt
- QR Code warga (`qrcode.react`) dan pemindai kamera (`html5-qrcode`)
- Grafik bulanan (`recharts`)

## Fitur
### Admin utama — `/admin`
- Membuat cabang sekaligus akun petugas cabang.
- Menambahkan anggaran ke cabang dan mencatat log alokasi.
- Ringkasan anggaran dan penyaluran per cabang.
- Grafik bulanan dana masuk dan bantuan yang benar-benar diklaim.
- Melihat serta menindaklanjuti laporan warga.

### Petugas cabang — `/cabang`
- Membuat akun warga dan QR token unik.
- Membuat jadwal dengan tanggal dan jam mulai/selesai.
- Mengatur nominal bantuan secara individual untuk setiap warga.
- Validasi anggaran termasuk dana yang masih dicadangkan oleh jadwal draft/aktif.
- Membuka jadwal, scan QR dengan kamera atau input token manual, dan mencatat nominal aktual.
- Mencegah klaim ganda; menampilkan nominal dan waktu klaim sebelumnya.
- Melihat tabel histori penerima untuk setiap jadwal dan mengelola laporan warga.

### Warga — `/warga`
- QR identitas penerima.
- Status jadwal bantuan aktif, tanggal/jam, nominal, dan status penerimaan.
- Riwayat bantuan pribadi.
- Transparansi anggaran cabang dan pengeluaran yang tercatat.
- Mengirim laporan masalah yang dapat dikaitkan ke jadwal tertentu dan melihat tanggapan petugas.

## Menjalankan aplikasi

### 1. Persiapan
Gunakan Node.js 18 atau lebih baru, npm, dan MySQL/MariaDB. Buat database melalui phpMyAdmin atau MySQL.

### 2. Import database
Import berurutan:
1. `database/schema.sql`
2. `database/seed.sql`

Seed menyediakan dua cabang dan akun demo. Password seluruh akun demo adalah `password`.

| Portal | Username | Password |
|---|---|---|
| Admin utama | `admin` | `password` |
| Petugas Jakarta | `petugas.jakarta` | `password` |
| Warga | `siti.aminah` | `password` |

### 3. Environment
Salin `.env.example` menjadi `.env.local`, lalu sesuaikan kredensial MySQL. Ganti `SESSION_SECRET` dengan string acak rahasia minimal 32 karakter. Jangan gunakan nilai contoh di server publik.

### 4. Install dan jalankan
```bash
npm install
npm run dev
```
Buka http://localhost:3000. Untuk build produksi:
```bash
npm run build
npm start
```

## Catatan operasional
- Akses kamera QR memerlukan localhost atau HTTPS dan izin kamera dari browser. Jika kamera tidak tersedia, gunakan input token manual.
- Jadwal hanya dapat diklaim pada tanggal jadwal dan saat statusnya aktif.
- Tabel histori dinamis dibuat dengan nama `schedule_history_<id>`; nama tabel dibentuk dari ID integer database, bukan input bebas.
- Data histori jadwal lama tetap tersimpan dan QR warga yang sama dapat digunakan pada jadwal berikutnya.
- Seed demo ditujukan untuk pengujian lokal. Ganti semua password demo sebelum aplikasi dipublikasikan.

## Pemeriksaan sebelum deployment
Aplikasi ini sudah memiliki alur inti dan dokumentasi setup, tetapi tetap wajib diuji pada database MySQL target sebelum dipakai untuk penyaluran nyata: uji migrasi/import SQL, login per role, pembuatan cabang/warga, alokasi anggaran, jadwal dengan nominal berbeda, scan QR, klaim ganda, laporan, dan grafik. Gunakan HTTPS, secret kuat, backup database, serta akun operasional dengan password unik.
