import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Input, Select } from '../components/ui'
import useDocumentTitle from '../hooks/useDocumentTitle'

const LANGKAH = ['Data Pengunjung', 'Data WBP', 'Jadwal & Sesi', 'Konfirmasi']

const HUBUNGAN_OPT = [
  { value: 'suami_istri', label: 'Suami/Istri' },
  { value: 'orang_tua',   label: 'Orang Tua' },
  { value: 'anak',        label: 'Anak' },
  { value: 'saudara',     label: 'Saudara Kandung' },
  { value: 'lainnya',     label: 'Lainnya' },
]

const SESI_OPT = [
  { value: 'pagi',  label: 'Sesi Pagi (08.00–11.00 WIB)' },
  { value: 'siang', label: 'Sesi Siang (13.00–15.00 WIB)' },
]

const JUMLAH_OPT = [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: `${n} orang` }))

const MIN_DATE = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]

const INIT_FORM = {
  namaPengunjung: '', nikPengunjung: '', noHp: '', hubunganWBP: '',
  namaWBP: '', noRegisterWBP: '',
  tanggalKunjungan: '', sesi: '', jumlahPengunjung: '',
  setuju: false,
}

function validateStep(step, data) {
  const err = {}
  if (step === 1) {
    if (!data.namaPengunjung.trim())    err.namaPengunjung = 'Nama lengkap wajib diisi'
    else if (data.namaPengunjung.trim().length < 3) err.namaPengunjung = 'Nama minimal 3 karakter'
    if (!data.nikPengunjung)            err.nikPengunjung  = 'NIK wajib diisi'
    else if (!/^\d{16}$/.test(data.nikPengunjung)) err.nikPengunjung = 'NIK harus 16 digit angka'
    if (!data.noHp)                     err.noHp           = 'Nomor HP wajib diisi'
    else if (!/^(08|\+62)\d{8,11}$/.test(data.noHp)) err.noHp = 'Format tidak valid (08xx atau +62xx)'
    if (!data.hubunganWBP)              err.hubunganWBP    = 'Pilih hubungan dengan WBP'
  }
  if (step === 2) {
    if (!data.namaWBP.trim())           err.namaWBP       = 'Nama WBP wajib diisi'
    if (!data.noRegisterWBP.trim())     err.noRegisterWBP = 'Nomor registrasi wajib diisi'
    else if (!/^WK-\d{4}-\d{3,}$/.test(data.noRegisterWBP))
      err.noRegisterWBP = 'Format: WK-TAHUN-NNN (contoh: WK-2022-001)'
  }
  if (step === 3) {
    if (!data.tanggalKunjungan) {
      err.tanggalKunjungan = 'Tanggal kunjungan wajib dipilih'
    } else {
      const tgl  = new Date(data.tanggalKunjungan)
      const hari = tgl.getDay()
      if (hari === 0 || hari === 6) err.tanggalKunjungan = 'Kunjungan hanya tersedia Senin–Jumat'
      else if (tgl <= new Date())   err.tanggalKunjungan = 'Tanggal harus di masa mendatang'
    }
    if (!data.sesi)             err.sesi             = 'Pilih sesi kunjungan'
    if (!data.jumlahPengunjung) err.jumlahPengunjung = 'Pilih jumlah pengunjung'
  }
  if (step === 4 && !data.setuju) err.setuju = 'Anda harus menyetujui persyaratan'
  return err
}

function StepBar({ current }) {
  return (
    <nav aria-label="Langkah pendaftaran" className="mb-8">
      <ol className="flex items-center">
        {LANGKAH.map((label, i) => {
          const n      = i + 1
          const done   = n < current
          const active = n === current
          return (
            <li key={n} className={i < LANGKAH.length - 1 ? 'flex-1 flex items-center' : 'flex items-center'}>
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div
                  aria-current={active ? 'step' : undefined}
                  className={[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                    done   ? 'bg-success-600 text-white' : '',
                    active ? 'bg-primary-900 text-white ring-4 ring-primary-100' : '',
                    !done && !active ? 'bg-neutral-200 text-neutral-400' : '',
                  ].join(' ')}
                >
                  {done ? '✓' : n}
                </div>
                <span className={[
                  'text-xs font-medium hidden sm:block whitespace-nowrap',
                  active ? 'text-primary-900' : done ? 'text-success-700' : 'text-neutral-400',
                ].join(' ')}>
                  {label}
                </span>
              </div>
              {i < LANGKAH.length - 1 && (
                <div className={['flex-1 h-0.5 mx-2', done ? 'bg-success-500' : 'bg-neutral-200'].join(' ')} aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function RowInfo({ label, value }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b border-neutral-100 last:border-0">
      <span className="text-sm text-neutral-500 shrink-0 w-32">{label}</span>
      <span className="text-sm font-medium text-neutral-900 text-right">{value || '—'}</span>
    </div>
  )
}

export default function KunjunganDaftar() {
  useDocumentTitle('Pendaftaran Kunjungan')
  const [step, setStep]       = useState(1)
  const [form, setForm]       = useState(INIT_FORM)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [noTiket, setNoTiket] = useState('')
  const stepRef = useRef(null)

  useEffect(() => {
    stepRef.current?.focus()
  }, [step])

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const next = () => {
    const err = validateStep(step, form)
    setErrors(err)
    if (!Object.keys(err).length) setStep((s) => s + 1)
  }

  const back = () => { setErrors({}); setStep((s) => s - 1) }

  const submit = async () => {
    const err = validateStep(4, form)
    setErrors(err)
    if (Object.keys(err).length) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setNoTiket(`KJG-2025-${String(Math.floor(Math.random() * 900) + 100)}`)
    setLoading(false)
    setDone(true)
  }

  // ── Halaman sukses ──────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="w-20 h-20 bg-success-50 rounded-full flex items-center justify-center text-4xl mx-auto mb-5" aria-hidden="true">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Pendaftaran Berhasil!</h1>
        <p className="text-neutral-500 mb-5 leading-relaxed">
          Kunjungan Anda telah terdaftar. Simpan nomor tiket ini sebagai bukti pendaftaran.
        </p>
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 mb-6">
          <p className="text-xs text-primary-600 font-semibold uppercase tracking-wide mb-1">Nomor Tiket</p>
          <p className="text-3xl font-bold text-primary-900 font-mono tracking-widest">{noTiket}</p>
        </div>
        <Alert variant="warning" className="mb-6 text-left">
          Harap tiba 15 menit sebelum sesi dimulai dan membawa KTP/identitas asli yang masih berlaku.
        </Alert>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => { setDone(false); setStep(1); setForm(INIT_FORM) }}>
            Daftar Kunjungan Baru
          </Button>
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
          <li className="text-neutral-900 font-medium" aria-current="page">Pendaftaran Kunjungan</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Pendaftaran Kunjungan</h1>
      <p className="text-neutral-500 text-sm mb-8">
        Isi formulir berikut untuk mendaftarkan jadwal kunjungan kepada warga binaan.
      </p>

      <StepBar current={step} />

      {/* Step content — focus moves here on step change for screen readers */}
      <div ref={stepRef} tabIndex={-1} className="outline-none">

      {/* ── LANGKAH 1 ── */}
      {step === 1 && (
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-neutral-900 mb-4 block">
            Data Pengunjung
          </legend>
          <Input label="Nama Lengkap" required placeholder="Sesuai KTP"
            value={form.namaPengunjung} error={errors.namaPengunjung} onChange={set('namaPengunjung')} />
          <Input label="NIK" required placeholder="16 digit angka" inputMode="numeric" maxLength={16}
            helperText="Nomor Induk Kependudukan sesuai KTP"
            value={form.nikPengunjung} error={errors.nikPengunjung} onChange={set('nikPengunjung')} />
          <Input label="Nomor HP Aktif" required placeholder="08xx-xxxx-xxxx" type="tel"
            value={form.noHp} error={errors.noHp} onChange={set('noHp')} />
          <Select label="Hubungan dengan Warga Binaan" required
            options={HUBUNGAN_OPT} value={form.hubunganWBP}
            error={errors.hubunganWBP} onChange={set('hubunganWBP')} />
        </fieldset>
      )}

      {/* ── LANGKAH 2 ── */}
      {step === 2 && (
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-neutral-900 mb-4 block">
            Data Warga Binaan yang Dikunjungi
          </legend>
          <Alert variant="info">
            Pastikan nama dan nomor registrasi sesuai dengan dokumen resmi yang Anda miliki.
          </Alert>
          <Input label="Nama Lengkap Warga Binaan" required placeholder="Sesuai surat keputusan"
            value={form.namaWBP} error={errors.namaWBP} onChange={set('namaWBP')} />
          <Input label="Nomor Registrasi WBP" required placeholder="WK-2022-001"
            helperText="Format: WK-TAHUN-NOMOR. Tertera di surat keputusan."
            value={form.noRegisterWBP} error={errors.noRegisterWBP} onChange={set('noRegisterWBP')} />
        </fieldset>
      )}

      {/* ── LANGKAH 3 ── */}
      {step === 3 && (
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-neutral-900 mb-4 block">
            Jadwal Kunjungan
          </legend>
          <Alert variant="warning">
            Kunjungan hanya tersedia Senin–Jumat. Daftarkan minimal H&#8209;2 sebelum tanggal kunjungan.
          </Alert>
          <Input label="Tanggal Kunjungan" required type="date" min={MIN_DATE}
            value={form.tanggalKunjungan} error={errors.tanggalKunjungan} onChange={set('tanggalKunjungan')} />
          <Select label="Sesi Kunjungan" required
            options={SESI_OPT} value={form.sesi}
            error={errors.sesi} onChange={set('sesi')} />
          <Select label="Jumlah Pengunjung" required
            options={JUMLAH_OPT} value={form.jumlahPengunjung}
            helperText="Maksimal 5 orang per sesi kunjungan"
            error={errors.jumlahPengunjung} onChange={set('jumlahPengunjung')} />
        </fieldset>
      )}

      {/* ── LANGKAH 4 ── */}
      {step === 4 && (
        <div>
          <h2 className="text-base font-semibold text-neutral-900 mb-4">Ringkasan Pendaftaran</h2>
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden mb-5">
            {[
              {
                judul: 'Data Pengunjung',
                rows: [
                  ['Nama', form.namaPengunjung],
                  ['NIK', form.nikPengunjung],
                  ['No. HP', form.noHp],
                  ['Hubungan', HUBUNGAN_OPT.find((o) => o.value === form.hubunganWBP)?.label],
                ],
              },
              {
                judul: 'Data WBP',
                rows: [
                  ['Nama WBP', form.namaWBP],
                  ['No. Registrasi', form.noRegisterWBP],
                ],
              },
              {
                judul: 'Jadwal',
                rows: [
                  ['Tanggal', form.tanggalKunjungan
                    ? new Date(form.tanggalKunjungan).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                    : ''],
                  ['Sesi', SESI_OPT.find((o) => o.value === form.sesi)?.label],
                  ['Jumlah', form.jumlahPengunjung ? `${form.jumlahPengunjung} orang` : ''],
                ],
              },
            ].map(({ judul, rows }) => (
              <div key={judul}>
                <div className="bg-neutral-50 px-5 py-2.5 border-b border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">{judul}</p>
                </div>
                <div className="px-5">
                  {rows.map(([label, value]) => (
                    <RowInfo key={label} label={label} value={value} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.setuju}
                onChange={set('setuju')}
                aria-required="true"
                className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-600"
              />
              <span className="text-sm text-neutral-700 leading-relaxed">
                Saya menyatakan bahwa data yang diisi adalah benar dan bersedia mengikuti
                seluruh peraturan kunjungan yang berlaku di Lapas Kelas IIB Way Kanan.
              </span>
            </label>
            {errors.setuju && (
              <p className="text-xs text-danger-600 mt-2 ml-7">{errors.setuju}</p>
            )}
          </div>
        </div>
      )}

      </div>{/* end step content */}

      {/* Navigasi langkah */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-200">
        {step > 1 ? (
          <Button variant="neutral" onClick={back}>← Kembali</Button>
        ) : (
          <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
            Batalkan
          </Link>
        )}
        {step < 4 ? (
          <Button onClick={next}>Lanjutkan →</Button>
        ) : (
          <Button loading={loading} onClick={submit}>
            {loading ? 'Mendaftarkan...' : 'Kirim Pendaftaran'}
          </Button>
        )}
      </div>
    </div>
  )
}
