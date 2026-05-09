import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Input, Select, Textarea } from '../components/ui'
import useDocumentTitle from '../hooks/useDocumentTitle'

const KATEGORI_OPT = [
  { value: 'pelayanan',  label: 'Pelayanan Petugas' },
  { value: 'fasilitas',  label: 'Fasilitas & Sarana' },
  { value: 'hak_wbp',   label: 'Hak Warga Binaan' },
  { value: 'kunjungan',  label: 'Prosedur Kunjungan' },
  { value: 'penitipan',  label: 'Penitipan Uang/Barang' },
  { value: 'lainnya',    label: 'Lainnya' },
]

const INIT = { nama: '', noHp: '', email: '', kategori: '', isi: '', anonim: false }

function validate(data) {
  const err = {}
  if (!data.anonim) {
    if (!data.nama.trim())      err.nama   = 'Nama wajib diisi (atau centang kirim anonim)'
    if (!data.noHp && !data.email) err.noHp = 'Isi No. HP atau email agar kami dapat menghubungi Anda'
  }
  if (!data.kategori)           err.kategori = 'Pilih kategori pengaduan'
  if (!data.isi.trim())         err.isi      = 'Isi pengaduan tidak boleh kosong'
  else if (data.isi.trim().length < 20) err.isi = 'Tuliskan pengaduan minimal 20 karakter'
  return err
}

export default function Pengaduan() {
  useDocumentTitle('Layanan Pengaduan')
  const [form, setForm]       = useState(INIT)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [noTiket, setNoTiket] = useState('')

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    const err = validate(form)
    setErrors(err)
    if (Object.keys(err).length) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setNoTiket(`PGD-2025-${String(Math.floor(Math.random() * 900) + 100)}`)
    setLoading(false)
    setDone(true)
  }

  // ── Sukses ───────────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-20 h-20 bg-success-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-5" aria-hidden="true">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Pengaduan Terkirim!</h1>
        <p className="text-neutral-500 mb-5 leading-relaxed">
          Pengaduan Anda telah diterima. Simpan nomor tiket ini untuk memantau status pengaduan.
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 mb-6">
          <p className="text-xs text-primary-600 font-semibold uppercase tracking-wide mb-1">Nomor Tiket</p>
          <p className="text-3xl font-bold text-primary-900 font-mono tracking-widest">{noTiket}</p>
        </div>
        <Alert variant="info" className="text-left mb-6">
          Pengaduan akan diproses dalam <strong>3×24 jam kerja</strong>.
          Kami akan menghubungi Anda melalui kontak yang tercantum jika diperlukan klarifikasi.
        </Alert>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => { setDone(false); setForm(INIT) }}>Kirim Pengaduan Baru</Button>
          <Link
            to="/"
            className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-primary-700 transition-colors">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-900 font-medium" aria-current="page">Layanan Pengaduan</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Layanan Pengaduan</h1>
      <p className="text-neutral-500 text-sm mb-3 leading-relaxed">
        Sampaikan keluhan, saran, atau pertanyaan Anda. Kami berkomitmen menanggapi setiap pengaduan
        dengan serius dan rahasia.
      </p>

      <Alert variant="info" className="mb-8">
        Pengaduan bersifat <strong>rahasia</strong>. Identitas Anda tidak akan disebarluaskan.
        Anda juga dapat mengirim pengaduan secara anonim.
      </Alert>

      <form onSubmit={submit} noValidate className="space-y-5">
        {/* Anonim toggle */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.anonim}
              onChange={set('anonim')}
              className="w-4 h-4 rounded border-neutral-300 text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-600"
            />
            <div>
              <span className="text-sm font-medium text-neutral-800">Kirim secara anonim</span>
              <p className="text-xs text-neutral-500 mt-0.5">
                Identitas tidak akan dicantumkan. Anda tidak akan dapat menerima update status.
              </p>
            </div>
          </label>
        </div>

        {/* Identitas (jika tidak anonim) */}
        {!form.anonim && (
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-neutral-700 mb-3 block">
              Identitas Pelapor <span className="text-neutral-400 font-normal">(untuk tindak lanjut)</span>
            </legend>
            <Input label="Nama Lengkap" placeholder="Nama Anda"
              value={form.nama} error={errors.nama} onChange={set('nama')} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Nomor HP" type="tel" placeholder="08xx-xxxx-xxxx"
                value={form.noHp} error={errors.noHp} onChange={set('noHp')} />
              <Input label="Email" type="email" placeholder="nama@email.com"
                value={form.email} onChange={set('email')} />
            </div>
          </fieldset>
        )}

        <Select label="Kategori Pengaduan" required
          options={KATEGORI_OPT} value={form.kategori}
          error={errors.kategori} onChange={set('kategori')} />

        <Textarea
          label="Isi Pengaduan"
          required
          rows={6}
          maxLength={1000}
          placeholder="Tuliskan pengaduan Anda secara jelas: apa yang terjadi, kapan, dan siapa yang terlibat (jika ada)..."
          helperText="Semakin jelas pengaduan, semakin cepat kami dapat menindaklanjuti."
          value={form.isi}
          error={errors.isi}
          onChange={set('isi')}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Batalkan
          </Link>
          <Button type="submit" loading={loading}>
            {loading ? 'Mengirim...' : 'Kirim Pengaduan'}
          </Button>
        </div>
      </form>
    </div>
  )
}
