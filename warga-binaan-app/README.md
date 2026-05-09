# Sistem Informasi Lapas Kelas IIB Way Kanan

Sistem informasi publik & manajemen warga binaan untuk Lembaga Pemasyarakatan
Kelas IIB Way Kanan, Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia.

---

## Fitur

**Halaman Publik**
- Beranda dengan statistik, layanan, dan berita terkini
- Berita & Pengumuman resmi Lapas
- Pendaftaran Kunjungan (multi-step form, 4 langkah)
- Cek Masa Tahanan — flow 2-tahap dengan verifikasi OTP sesuai UU PDP No. 27/2022
- Layanan Pengaduan (anonim atau teridentifikasi)
- Penitipan Uang & Barang, Kontak & Lokasi
- Syarat & Ketentuan, Kebijakan Privasi

**Area Admin** (petugas terautentikasi)
- Dashboard ringkasan statistik
- Kelola Berita, Kelola Kunjungan, Kelola Pengaduan

**Autentikasi**
- Login terpisah untuk Masyarakat/Keluarga dan Petugas Lapas
- Registrasi akun masyarakat, lupa kata sandi

---

## Stack

| Paket | Versi |
|---|---|
| react | ^19.2.5 |
| react-dom | ^19.2.5 |
| react-router-dom | ^7.15.0 |
| axios | ^1.16.0 |
| vite | ^8.0.10 |
| tailwindcss | ^3.4.19 |
| @tailwindcss/typography | ^0.5.19 |
| @vitejs/plugin-react | ^6.0.1 |
| eslint | ^10.2.1 |

---

## Prerequisites

- **Node.js** 20.19+ atau 22.12+ (lihat `engines` di `package.json`)
- **npm** 10+
- **Backend API** berjalan di port 3000 — lihat repo
  [lapas-way-kanan](https://github.com/XianJin9/lapas-way-kanan) (Express + JWT)

---

## Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/XianJin9/lapas-way-kanan-frontend.git
cd lapas-way-kanan-frontend

# 2. Install dependensi
npm install

# 3. Salin dan isi variabel environment
cp .env.example .env
# Edit .env: sesuaikan VITE_API_URL dengan alamat backend

# 4. Jalankan dev server
npm run dev
# → http://localhost:5173
```

---

## Struktur Folder

```
src/
├── components/
│   ├── admin/          # Layout dan guard admin (AdminLayout, ProtectedRoute, dsb.)
│   ├── layout/         # Layout publik (Header, Footer, PageLayout)
│   └── ui/             # Komponen UI reusable (Button, Input, Card, Alert, dsb.)
│       └── index.js    # Barrel export semua komponen UI
├── contexts/
│   ├── AuthContext.jsx  # AuthProvider — login, logout, refresh, state user
│   └── authContextDef.js # createContext (dipisah untuk react-refresh compliance)
├── hooks/
│   ├── useAuth.js       # Hook useAuth() — akses context autentikasi
│   └── useDocumentTitle.js
├── pages/
│   ├── admin/           # Halaman panel admin (Dashboard, Berita, Kunjungan, Pengaduan)
│   ├── Home.jsx
│   ├── Berita.jsx
│   ├── KunjunganDaftar.jsx
│   ├── MasaTahanan.jsx  # Flow OTP 2-tahap (UU PDP)
│   ├── Pengaduan.jsx
│   ├── Kontak.jsx
│   ├── Penitipan.jsx
│   ├── Syarat.jsx
│   ├── Privasi.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── LupaPassword.jsx
│   └── NotFound.jsx
└── services/
    ├── api.js           # Axios instance — interceptor Bearer token + 401 redirect
    ├── auth.service.js  # login(), register(), logout(), getProfile()
    └── mockData.js      # Data statis sementara (berita, WBP, kunjungan, pengaduan)
```

---

## Skrip Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan dev server dengan HMR di `localhost:5173` |
| `npm run build` | Build produksi ke folder `dist/` |
| `npm run lint` | Jalankan ESLint — harus 0 error sebelum commit |
| `npm run preview` | Preview build produksi secara lokal |

---

## Konvensi Pengembangan

- **Bahasa UI**: Seluruh teks, label, placeholder, dan pesan error menggunakan Bahasa Indonesia
- **Design tokens**: Pakai token Tailwind yang sudah didefinisikan (`primary-`, `gold-`,
  `success-`, `danger-`, `warning-`, `info-`, `neutral-`) — jangan pakai warna mentah seperti `blue-500`
- **Komponen**: Gunakan komponen yang ada di `src/components/ui/` — jangan buat ulang
- **Setiap halaman**: wajib `useDocumentTitle('Judul')` dan breadcrumb (pola dari `Pengaduan.jsx`)
- **Aksesibilitas**: `aria-label`, `aria-current`, `aria-live`, `focus-visible`, `autoComplete`
- **Commit**: Format Conventional Commits (lihat `CONTRIBUTING.md`)

---

## Variabel Environment

Salin `.env.example` ke `.env` dan sesuaikan:

```env
VITE_API_URL=http://localhost:3000/api   # URL backend Express
VITE_APP_NAME=Lapas Way Kanan
```

---

## Deploy

1. Build produksi:
   ```bash
   npm run build
   ```
2. Upload isi folder `dist/` ke web server.
3. Konfigurasi rewrite SPA agar semua path diarahkan ke `index.html`:

   **Nginx**:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

   **Apache** (`.htaccess`):
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ /index.html [L]
   ```

---

## Lisensi

Internal use — Kementerian Hukum dan Hak Asasi Manusia RI.
Dilarang digunakan atau didistribusikan di luar lingkungan Kemenkumham tanpa izin tertulis.
