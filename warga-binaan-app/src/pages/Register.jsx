import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Input } from '../components/ui'
import useDocumentTitle from '../hooks/useDocumentTitle'

const INIT = { nama: '', nik: '', noHp: '', email: '', password: '', konfirmasiPassword: '' }

function validate(data) {
  const err = {}
  if (!data.nama.trim())              err.nama = 'Nama lengkap wajib diisi'
  if (!/^\d{16}$/.test(data.nik))    err.nik  = 'NIK harus 16 digit angka'
  if (!data.noHp)                     err.noHp = 'Nomor HP wajib diisi'
  else if (!/^(08|\+62)\d{8,11}$/.test(data.noHp)) err.noHp = 'Format tidak valid'
  if (data.password.length < 8)       err.password = 'Kata sandi minimal 8 karakter'
  if (data.password !== data.konfirmasiPassword) err.konfirmasiPassword = 'Kata sandi tidak cocok'
  return err
}

export default function Register() {
  useDocumentTitle('Daftar Akun')
  const navigate = useNavigate()
  const [form, setForm]       = useState(INIT)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [setuju, setSetuju]   = useState(false)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const err = validate(form)
    if (!setuju) err.setuju = 'Anda harus menyetujui syarat dan ketentuan'
    setErrors(err)
    if (Object.keys(err).length) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="bg-primary-900 text-white py-3">
        <div className="max-w-sm mx-auto px-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center shrink-0" aria-hidden="true">
            <span className="text-white font-bold text-xs">L</span>
          </div>
          <div className="leading-tight">
            <p className="text-primary-300 text-xs">Kemenkumham RI</p>
            <p className="text-white text-sm font-semibold">Lapas Kelas IIB Way Kanan</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-900">Buat Akun Baru</h1>
            <p className="text-neutral-500 text-sm mt-1">Untuk masyarakat dan keluarga warga binaan</p>
          </div>

          <Alert variant="info" className="mb-6">
            Akun ini untuk <strong>masyarakat umum</strong> dan keluarga warga binaan. Petugas lapas
            menggunakan akun yang diterbitkan oleh sistem kepegawaian.
          </Alert>

          <form onSubmit={submit} noValidate className="space-y-4">
            <Input label="Nama Lengkap" required placeholder="Sesuai KTP"
              value={form.nama} error={errors.nama} onChange={set('nama')} />
            <Input label="NIK" required placeholder="16 digit angka" inputMode="numeric" maxLength={16}
              helperText="Nomor Induk Kependudukan sesuai KTP"
              value={form.nik} error={errors.nik} onChange={set('nik')} />
            <Input label="Nomor HP" required type="tel" placeholder="08xx-xxxx-xxxx"
              value={form.noHp} error={errors.noHp} onChange={set('noHp')} />
            <Input label="Email" type="email" placeholder="nama@email.com (opsional)"
              value={form.email} onChange={set('email')} />
            <Input label="Kata Sandi" required type="password" placeholder="Minimal 8 karakter"
              helperText="Gunakan kombinasi huruf dan angka"
              value={form.password} error={errors.password} onChange={set('password')} autoComplete="new-password" />
            <Input label="Konfirmasi Kata Sandi" required type="password" placeholder="Ketik ulang kata sandi"
              value={form.konfirmasiPassword} error={errors.konfirmasiPassword}
              onChange={set('konfirmasiPassword')} autoComplete="new-password" />

            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={setuju} onChange={(e) => setSetuju(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-600" />
                <span className="text-xs text-neutral-700 leading-relaxed">
                  Saya menyetujui{' '}
                  <Link to="/syarat" className="text-primary-700 hover:underline">syarat dan ketentuan</Link>
                  {' '}serta{' '}
                  <Link to="/privasi" className="text-primary-700 hover:underline">kebijakan privasi</Link>
                  {' '}Lapas Kelas IIB Way Kanan.
                </span>
              </label>
              {errors.setuju && <p className="text-xs text-danger-600 mt-2 ml-7">{errors.setuju}</p>}
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full">
              {loading ? 'Mendaftarkan...' : 'Daftar'}
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-primary-700 font-medium hover:text-primary-900 transition-colors">
              Masuk
            </Link>
          </p>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
