# Panduan Kontribusi

## Penamaan Branch

| Tipe | Format | Contoh |
|---|---|---|
| Fitur baru | `feature/<nama-singkat>` | `feature/halaman-profil` |
| Perbaikan bug | `fix/<nama-singkat>` | `fix/validasi-nik` |
| Dokumentasi | `docs/<nama-singkat>` | `docs/update-readme` |
| Refaktor | `refactor/<nama-singkat>` | `refactor/auth-context` |

## Format Commit

Gunakan [Conventional Commits](https://www.conventionalcommits.org/):

```
<prefix>: <deskripsi singkat dalam imperative>

[opsional: body penjelasan]
```

| Prefix | Kegunaan |
|---|---|
| `feat` | Fitur baru |
| `fix` | Perbaikan bug |
| `chore` | Dependensi, konfigurasi, tooling |
| `docs` | Dokumentasi |
| `refactor` | Refaktor tanpa ubah fungsionalitas |
| `test` | Tambah atau perbaiki test |
| `perf` | Peningkatan performa |
| `style` | Format/whitespace (bukan CSS) |

**Aturan:**
- Subject line maksimal 72 karakter
- Gunakan bentuk imperative: *tambah*, *perbaiki*, *hapus* — bukan *menambahkan*
- Tidak ada titik di akhir subject

## Pull Request

Sebelum membuka PR, pastikan:

- [ ] `npm run lint` — **0 error**
- [ ] `npm run build` — **build sukses**
- [ ] UI teks menggunakan Bahasa Indonesia
- [ ] Tidak ada warna mentah Tailwind (gunakan token `primary-`, `gold-`, dst.)
- [ ] Komponen baru mengikuti pola di `src/components/ui/`
- [ ] Setiap halaman baru punya `useDocumentTitle` dan breadcrumb

CI akan otomatis menjalankan lint dan build. PR tidak bisa di-merge jika CI gagal.
