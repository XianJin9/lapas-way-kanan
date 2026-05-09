import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Input } from '../components/ui'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function LupaPassword() {
  useDocumentTitle('Lupa Kata Sandi')
  const [value, setValue]     = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!value.trim()) {
      setError('NIK atau email wajib diisi')
      return
    }
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setDone(true)
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
          {done ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-5" aria-hidden="true">
                ✓
              </div>
              <h1 className="text-xl font-bold text-neutral-900 mb-2">Tautan Telah Dikirim</h1>
              <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                Jika NIK atau email yang Anda masukkan terdaftar, kami telah mengirimkan
                tautan reset kata sandi. Periksa kotak masuk email Anda.
              </p>
              <Alert variant="info" className="text-left mb-6">
                Tautan berlaku selama <strong>30 menit</strong>. Jika tidak menerima email,
                periksa folder <em>Spam</em> atau coba lagi.
              </Alert>
              <Link
                to="/login"
                className="inline-flex items-center justify-center h-10 px-5 text-sm font-medium bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                Kembali ke Halaman Masuk
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-neutral-900">Lupa Kata Sandi?</h1>
                <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                  Masukkan NIK atau email Anda dan kami akan mengirimkan tautan untuk
                  mereset kata sandi.
                </p>
              </div>

              <form onSubmit={submit} noValidate className="space-y-4">
                <Input
                  label="NIK atau Email"
                  required
                  placeholder="16 digit NIK atau alamat email"
                  value={value}
                  error={error}
                  onChange={(e) => setValue(e.target.value)}
                  autoComplete="email"
                  aria-describedby="nik-hint"
                />
                <p id="nik-hint" className="text-xs text-neutral-500 -mt-2">
                  Masukkan NIK (16 digit) atau alamat email yang terdaftar.
                </p>

                <Button type="submit" size="lg" loading={loading} className="w-full">
                  {loading ? 'Mengirim...' : 'Kirim Tautan Reset'}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-neutral-200 text-center">
                <Link
                  to="/login"
                  className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  ← Kembali ke Halaman Masuk
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
