---
name: commit-msg
description: Use this skill any time the user asks to commit changes, write a commit message, or create a git commit. Writes commit messages in Conventional Commit format with Indonesian-friendly descriptions.
---

# Aturan Commit Message

## Prefix yang Valid

| Prefix     | Kegunaan                                        |
| ---------- | ----------------------------------------------- |
| `feat`     | Fitur baru                                      |
| `fix`      | Perbaikan bug                                   |
| `chore`    | Tugas rutin, update dependensi, konfigurasi     |
| `docs`     | Perubahan dokumentasi                           |
| `refactor` | Refaktor kode tanpa mengubah fungsionalitas     |
| `test`     | Menambah atau memperbaiki test                  |
| `perf`     | Peningkatan performa                            |
| `style`    | Perubahan format/style (spasi, titik koma, dll) |

## Format

```
<prefix>: <ringkasan singkat dalam imperative>

[opsional: body penjelasan lebih lanjut]
```

## Aturan

- Subject line maksimal **72 karakter**
- Gunakan bahasa Inggris untuk prefix, deskripsi boleh bahasa Indonesia
- **Jangan** ada titik di akhir subject line
- Tulis dalam bentuk **imperative** (tambah, perbaiki, hapus — bukan menambah/ditambah)
- Jika ada body, pisahkan dengan **satu baris kosong** dari subject

---

## Contoh Commit yang Baik

```
feat: tambah validasi input pada form registrasi
```

```
fix: perbaiki kalkulasi total harga saat diskon diterapkan
```

```
refactor: pisahkan logika autentikasi ke modul tersendiri

Sebelumnya logika auth tersebar di beberapa controller.
Sekarang dipusatkan di auth.service.js agar lebih mudah diuji.
```

---

## Contoh Commit yang Buruk

```
fixed bug.
```

**Salah karena:** pakai past tense bukan imperative, ada titik di akhir, tidak ada prefix, terlalu vague.

```
feat: Menambahkan fitur baru untuk mengelola data pengguna dan memperbarui tampilan halaman profil serta memperbaiki bug pada sistem login
```

**Salah karena:** subject line terlalu panjang (melebihi 72 karakter) dan mencampur beberapa perubahan dalam satu commit.
