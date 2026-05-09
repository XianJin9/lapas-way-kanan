import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Input } from '../components/ui'

export default function Login() {
  const navigate = useNavigate()
  const [peran, setPeran]     = useState('masyarakat')
  const [form, setForm]       = useState({ nik: '', password: '' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg]   = useState('')

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const err = {}
    if (!form.nik.trim())      err.nik      = peran === 'petugas' ? 'NIP/Username wajib diisi' : 'NIK wajib diisi'
    else if (peran === 'masyarakat' && !/^\d{16}$/.test(form.nik)) err.nik = 'NIK harus 16 digit angka'
    if (!form.password)        err.password = 'Kata sandi wajib diisi'
    else if (form.password.length < 6) err.password = 'Kata sandi minimal 6 karakter'
    setErrors(err)
    if (Object.keys(err).length) return

    setLoading(true)
    setErrMsg('')
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    // Simulasi: demo masuk ke beranda
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header instansi */}
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

      {/* Form container */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-neutral-900">Masuk ke Akun Anda</h1>
            <p className="text-neutral-500 text-sm mt-1">Layanan Informasi Lapas Way Kanan</p>
          </div>

          {/* Tab peran */}
          <div className="flex rounded-lg border border-neutral-200 p-1 bg-white mb-6" role="tablist">
            {[
              { id: 'masyarakat', label: 'Masyarakat / Keluarga' },
              { id: 'petugas',    label: 'Petugas Lapas' },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={peran === id}
                onClick={() => { setPeran(id); setErrors({}); setErrMsg('') }}
                className={[
                  'flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors',
                  peran === id
                    ? 'bg-primary-900 text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>

          {errMsg && <Alert variant="danger" className="mb-4">{errMsg}</Alert>}

          <form onSubmit={submit} noValidate className="space-y-4">
            <Input
              label={peran === 'petugas' ? 'NIP / Username' : 'NIK (16 digit)'}
              required
              placeholder={peran === 'petugas' ? 'Masukkan NIP atau username' : '16 digit NIK sesuai KTP'}
              inputMode={peran === 'masyarakat' ? 'numeric' : 'text'}
              maxLength={peran === 'masyarakat' ? 16 : undefined}
              value={form.nik}
              error={errors.nik}
              onChange={set('nik')}
              autoComplete={peran === 'petugas' ? 'username' : 'off'}
            />
            <Input
              label="Kata Sandi"
              type="password"
              required
              placeholder="Masukkan kata sandi"
              value={form.password}
              error={errors.password}
              onChange={set('password')}
              autoComplete="current-password"
            />

            <div className="flex items-center justify-end">
              <Link
                to="/lupa-password"
                className="text-xs text-primary-700 hover:text-primary-900 transition-colors"
              >
                Lupa kata sandi?
              </Link>
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full">
              {loading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>

          {peran === 'masyarakat' && (
            <p className="text-center text-sm text-neutral-500 mt-6">
              Belum punya akun?{' '}
              <Link to="/register" className="text-primary-700 font-medium hover:text-primary-900 transition-colors">
                Daftar sekarang
              </Link>
            </p>
          )}

          <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
            <Link to="/" className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
