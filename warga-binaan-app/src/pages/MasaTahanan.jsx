import { useReducer, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Badge, Button, Card, Input, Select, Skeleton } from '../components/ui'
import { WBP_DATA } from '../services/mockData'
import useDocumentTitle from '../hooks/useDocumentTitle'

// ── Opsi hubungan ─────────────────────────────────────────────────────────────
const HUBUNGAN_OPT = [
  { value: 'suami_istri', label: 'Suami / Istri' },
  { value: 'orang_tua',   label: 'Orang Tua' },
  { value: 'anak',        label: 'Anak' },
  { value: 'saudara',     label: 'Saudara Kandung' },
  { value: 'lainnya',     label: 'Lainnya (kerabat terdaftar)' },
]

// ── Helper: tanggal → label kuartal ──────────────────────────────────────────
function toKuartal(dateStr) {
  const d      = new Date(dateStr)
  const year   = d.getFullYear()
  const roman  = ['I', 'II', 'III', 'IV'][Math.ceil((d.getMonth() + 1) / 3) - 1]
  return `Kuartal ${roman} ${year}`
}

// ── Helper: hitung jumlah remisi dari string status ──────────────────────────
function hitungRemisi(statusRemisi) {
  if (!statusRemisi) return 0
  const matches = statusRemisi.match(/\b(IV|III|II|I)\b/g)
  return matches ? matches.length : 0
}

// ── Reducer ──────────────────────────────────────────────────────────────────
const INIT = {
  tahap:   1,
  form:    { noRegisterWBP: '', nikPencari: '', noHp: '', hubungan: '' },
  otp:     '',
  wbp:     null,
  loading: false,
  errors:  {},
  errMsg:  '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FORM':
      return { ...state, form: { ...state.form, [action.field]: action.value }, errors: {} }
    case 'SET_OTP':
      return { ...state, otp: action.value, errMsg: '' }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'SET_ERR_MSG':
      return { ...state, errMsg: action.msg }
    case 'LOADING':
      return { ...state, loading: action.value }
    case 'OTP_SENT':
      return { ...state, tahap: 2, loading: false, errors: {}, errMsg: '' }
    case 'OTP_VERIFIED':
      return { ...state, tahap: 3, loading: false, wbp: action.wbp, errors: {}, errMsg: '' }
    case 'RESET':
      return { ...INIT }
    default:
      return state
  }
}

// ── Validasi tahap 1 ──────────────────────────────────────────────────────────
function validateTahap1(form) {
  const err = {}
  if (!form.noRegisterWBP.trim())
    err.noRegisterWBP = 'Nomor registrasi WBP wajib diisi'
  else if (!/^WK-\d{4}-\d{3,}$/.test(form.noRegisterWBP.trim()))
    err.noRegisterWBP = 'Format tidak valid (contoh: WK-2022-001)'
  if (!/^\d{16}$/.test(form.nikPencari))
    err.nikPencari = 'NIK harus 16 digit angka'
  if (!form.noHp)
    err.noHp = 'Nomor HP wajib diisi'
  else if (!/^(08|\+62)\d{8,11}$/.test(form.noHp))
    err.noHp = 'Format tidak valid (08xx atau +62xx)'
  if (!form.hubungan)
    err.hubungan = 'Pilih hubungan dengan WBP'
  return err
}

// ── Banner UU PDP ─────────────────────────────────────────────────────────────
function BannerPDP() {
  return (
    <div className="bg-info-50 border border-info-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
      <span className="text-info-600 text-lg shrink-0 mt-0.5" aria-hidden="true">⚖️</span>
      <p className="text-sm text-info-800 leading-relaxed">
        <strong>Sesuai UU PDP No. 27/2022</strong>, akses informasi Warga Binaan Pemasyarakatan
        (WBP) terbatas pada kerabat terdaftar yang sudah terverifikasi melalui OTP.
      </p>
    </div>
  )
}

// ── Tahap 1 — Identifikasi Pencari ───────────────────────────────────────────
function TahapIdentifikasi({ state, dispatch, onSubmit }) {
  const set = (field) => (e) => dispatch({ type: 'SET_FORM', field, value: e.target.value })

  return (
    <Card variant="default" padding="lg">
      <h2 className="text-base font-semibold text-neutral-900 mb-1">Identifikasi Pencari</h2>
      <p className="text-sm text-neutral-500 mb-5 leading-relaxed">
        Hanya kerabat yang terdaftar di sistem yang dapat mengakses informasi ini.
        Isi formulir berikut untuk menerima kode verifikasi.
      </p>

      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Input
          label="Nomor Registrasi WBP"
          required
          placeholder="WK-2022-001"
          helperText="Tertera di surat keputusan pengadilan. Hubungi registrar jika tidak tahu."
          value={state.form.noRegisterWBP}
          error={state.errors.noRegisterWBP}
          onChange={set('noRegisterWBP')}
        />
        <Input
          label="NIK Anda (Pencari)"
          required
          placeholder="16 digit angka"
          inputMode="numeric"
          maxLength={16}
          helperText="Nomor Induk Kependudukan sesuai KTP Anda"
          value={state.form.nikPencari}
          error={state.errors.nikPencari}
          onChange={set('nikPencari')}
          autoComplete="off"
        />
        <Input
          label="Nomor HP Terdaftar"
          required
          type="tel"
          placeholder="08xx-xxxx-xxxx"
          helperText="Nomor yang terdaftar sebagai kerabat WBP di Lapas"
          value={state.form.noHp}
          error={state.errors.noHp}
          onChange={set('noHp')}
          autoComplete="tel"
        />
        <Select
          label="Hubungan dengan WBP"
          required
          options={HUBUNGAN_OPT}
          value={state.form.hubungan}
          error={state.errors.hubungan}
          onChange={set('hubungan')}
        />

        {state.errMsg && (
          <Alert variant="danger">{state.errMsg}</Alert>
        )}

        <div className="pt-1">
          <Button type="submit" loading={state.loading} className="w-full">
            {state.loading ? 'Mengirim OTP...' : 'Kirim Kode OTP via WhatsApp/SMS'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

// ── Tahap 2 — Verifikasi OTP ──────────────────────────────────────────────────
function TahapOTP({ state, dispatch, onVerify, onResend, countdown }) {
  return (
    <Card variant="default" padding="lg">
      <h2 className="text-base font-semibold text-neutral-900 mb-1">Verifikasi OTP</h2>
      <p className="text-sm text-neutral-500 mb-5 leading-relaxed">
        Kode OTP 6 digit telah dikirim ke nomor{' '}
        <strong>{state.form.noHp}</strong>. Masukkan kode tersebut untuk melanjutkan.
      </p>

      {state.loading ? (
        <div className="space-y-3">
          <Skeleton height="56px" rounded="rounded-lg" />
          <Skeleton height="40px" rounded="rounded-lg" />
        </div>
      ) : (
        <form onSubmit={onVerify} noValidate className="space-y-4">
          <Input
            label="Kode OTP"
            required
            placeholder="6 digit angka"
            inputMode="numeric"
            maxLength={6}
            value={state.otp}
            error={state.errMsg}
            onChange={(e) => dispatch({ type: 'SET_OTP', value: e.target.value })}
            autoComplete="one-time-code"
            aria-describedby="otp-helper"
          />
          <p id="otp-helper" className="text-xs text-neutral-500 -mt-2">
            Kode berlaku selama 5 menit. Jangan berikan kode ini kepada siapapun.
          </p>

          <Button type="submit" className="w-full">
            Verifikasi &amp; Lihat Data
          </Button>

          <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
            <span className="text-sm text-neutral-500">Belum menerima kode?</span>
            <button
              type="button"
              disabled={countdown > 0}
              onClick={onResend}
              className={[
                'text-sm font-medium transition-colors',
                countdown > 0
                  ? 'text-neutral-400 cursor-not-allowed'
                  : 'text-primary-700 hover:text-primary-900',
              ].join(' ')}
              aria-live="polite"
            >
              {countdown > 0 ? `Kirim ulang (${countdown}s)` : 'Kirim ulang OTP'}
            </button>
          </div>
        </form>
      )}

      <button
        type="button"
        onClick={() => dispatch({ type: 'RESET' })}
        className="mt-4 text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
      >
        ← Ubah data identifikasi
      </button>
    </Card>
  )
}

// ── Tahap 3 — Hasil Terbatas ──────────────────────────────────────────────────
function TahapHasil({ wbp, onReset }) {
  if (!wbp) {
    return (
      <Card variant="default" padding="lg" className="text-center">
        <div className="text-4xl mb-3" aria-hidden="true">🔍</div>
        <h2 className="text-base font-semibold text-neutral-900 mb-1">Data Tidak Ditemukan</h2>
        <p className="text-sm text-neutral-500 mb-5 leading-relaxed">
          Data WBP dengan nomor registrasi tersebut tidak ditemukan, atau Anda belum terdaftar
          sebagai kerabat. Hubungi petugas registrasi untuk informasi lebih lanjut.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/kontak"
            className="inline-flex items-center justify-center h-10 px-4 text-sm font-semibold bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          >
            Hubungi Petugas
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </Card>
    )
  }

  const jumlahRemisi  = hitungRemisi(wbp.statusRemisi)
  const kuartalBebas  = toKuartal(wbp.estimasiBebasRemisi || wbp.tanggalBebasMurni)
  const sudahBebas    = wbp.status !== 'aktif'

  return (
    <div className="space-y-4">
      <Alert variant="info" title="Informasi terbatas">
        Data yang ditampilkan bersifat umum sesuai ketentuan UU PDP. Untuk detail lebih lanjut,
        silakan datang langsung ke Lapas dengan membawa identitas.
      </Alert>

      {/* Kartu hasil */}
      <Card variant="elevated" padding="none" className="overflow-hidden">
        {/* Header */}
        <div className="bg-primary-900 px-6 py-5 flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-full bg-primary-700 flex items-center justify-center text-white font-bold text-lg shrink-0"
            aria-hidden="true"
          >
            {wbp.nama.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-primary-300 text-xs font-medium uppercase tracking-wide mb-0.5">
              Terverifikasi
            </p>
            <h2 className="text-white text-lg font-bold truncate">{wbp.nama}</h2>
          </div>
          <div className="shrink-0">
            <Badge variant={sudahBebas ? 'success' : 'warning'} dot>
              {sudahBebas ? 'Telah Bebas' : 'Sedang Menjalani'}
            </Badge>
          </div>
        </div>

        {/* Isi — TERBATAS */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide mb-1">
                Estimasi Kebebasan
              </p>
              <p className="text-base font-bold text-neutral-900">{kuartalBebas}</p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Perkiraan berdasarkan remisi yang diterima
              </p>
            </div>

            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
              <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide mb-1">
                Status Remisi
              </p>
              <p className="text-base font-bold text-neutral-900">
                {jumlahRemisi > 0
                  ? `Telah menerima ${jumlahRemisi} kali remisi`
                  : 'Belum menerima remisi'}
              </p>
            </div>
          </div>

          {/* Info tidak ditampilkan */}
          <Alert variant="warning">
            Informasi detail seperti pasal/kasus, pengadilan, blok, dan tanggal masuk tidak
            ditampilkan sesuai kebijakan perlindungan data pribadi.
          </Alert>

          {/* CTA konsultasi */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1 border-t border-neutral-100">
            <Link
              to="/kontak"
              className="inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-semibold bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              🏛️ Konsultasi Petugas
            </Link>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Cek WBP Lain
            </button>
          </div>

          <p className="text-xs text-neutral-400 text-center">
            Untuk informasi lebih lengkap, datang langsung ke loket pelayanan Lapas
            dengan membawa identitas diri.
          </p>
        </div>
      </Card>
    </div>
  )
}

// ── Komponen utama ────────────────────────────────────────────────────────────
export default function MasaTahanan() {
  useDocumentTitle('Cek Masa Tahanan')
  const [state, dispatch] = useReducer(reducer, INIT)
  const [countdown, setCountdown] = useState(0)
  const timerRef = useRef(null)

  // Bersihkan timer saat unmount
  useEffect(() => () => clearInterval(timerRef.current), [])

  const startCountdown = () => {
    clearInterval(timerRef.current)
    setCountdown(60)
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(timerRef.current); return 0 }
        return c - 1
      })
    }, 1000)
  }

  // ── Submit tahap 1 ──────────────────────────────────────────────────────────
  const handleKirimOTP = async (e) => {
    e.preventDefault()
    const errors = validateTahap1(state.form)
    if (Object.keys(errors).length) {
      dispatch({ type: 'SET_ERRORS', errors })
      return
    }
    dispatch({ type: 'LOADING', value: true })

    // TODO: integrate with WhatsApp Business API + backend OTP service
    await new Promise((r) => setTimeout(r, 1500))

    dispatch({ type: 'OTP_SENT' })
    startCountdown()
  }

  // ── Submit tahap 2 ──────────────────────────────────────────────────────────
  const handleVerifikasiOTP = async (e) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(state.otp)) {
      dispatch({ type: 'SET_ERR_MSG', msg: 'Kode OTP harus 6 digit angka' })
      return
    }
    dispatch({ type: 'LOADING', value: true })

    // TODO: integrate with WhatsApp Business API + backend OTP service
    await new Promise((r) => setTimeout(r, 1200))

    const found = WBP_DATA.find(
      (w) => w.noRegister.toUpperCase() === state.form.noRegisterWBP.trim().toUpperCase()
    )
    dispatch({ type: 'OTP_VERIFIED', wbp: found ?? null })
  }

  // ── Kirim ulang OTP ─────────────────────────────────────────────────────────
  const handleResend = async () => {
    dispatch({ type: 'SET_OTP', value: '' })

    // TODO: integrate with WhatsApp Business API + backend OTP service
    await new Promise((r) => setTimeout(r, 800))

    startCountdown()
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-primary-700 transition-colors">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-900 font-medium" aria-current="page">Cek Masa Tahanan</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Cek Masa Tahanan</h1>
      <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
        Layanan ini hanya tersedia untuk kerabat terdaftar. Verifikasi identitas diperlukan
        sebelum informasi ditampilkan.
      </p>

      <BannerPDP />

      {/* Indikator tahap */}
      {state.tahap < 3 && (
        <div className="flex items-center gap-2 mb-6" aria-label="Progres verifikasi">
          {['Identifikasi', 'Verifikasi OTP'].map((label, i) => {
            const n      = i + 1
            const done   = n < state.tahap
            const active = n === state.tahap
            return (
              <div key={n} className="flex items-center gap-2">
                <div className={[
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                  done   ? 'bg-success-600 text-white' : '',
                  active ? 'bg-primary-900 text-white ring-4 ring-primary-100' : '',
                  !done && !active ? 'bg-neutral-200 text-neutral-400' : '',
                ].join(' ')} aria-current={active ? 'step' : undefined}>
                  {done ? '✓' : n}
                </div>
                <span className={[
                  'text-xs font-medium hidden sm:block',
                  active ? 'text-primary-900' : done ? 'text-success-700' : 'text-neutral-400',
                ].join(' ')}>
                  {label}
                </span>
                {i < 1 && <div className={['w-8 h-0.5 mx-1', done ? 'bg-success-400' : 'bg-neutral-200'].join(' ')} aria-hidden="true" />}
              </div>
            )
          })}
        </div>
      )}

      {/* Konten per tahap */}
      {state.tahap === 1 && (
        <>
          <TahapIdentifikasi
            state={state}
            dispatch={dispatch}
            onSubmit={handleKirimOTP}
          />

          {/* Panduan (hanya di tahap 1) */}
          <Card variant="filled" padding="md" className="mt-5">
            <h2 className="text-sm font-semibold text-neutral-700 mb-3">Syarat Akses</h2>
            <ul className="space-y-2 text-sm text-neutral-600">
              {[
                'NIK dan nomor HP Anda harus sudah terdaftar sebagai kerabat WBP di Lapas',
                'Nomor registrasi WBP tertera di surat keputusan pengadilan',
                'Jika belum terdaftar, datang langsung ke loket registrasi dengan membawa KTP',
                'Informasi yang ditampilkan bersifat umum sesuai UU PDP No. 27/2022',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="text-primary-500 shrink-0 mt-0.5" aria-hidden="true">›</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        </>
      )}

      {state.tahap === 2 && (
        <TahapOTP
          state={state}
          dispatch={dispatch}
          onVerify={handleVerifikasiOTP}
          onResend={handleResend}
          countdown={countdown}
        />
      )}

      {state.tahap === 3 && (
        <TahapHasil
          wbp={state.wbp}
          onReset={() => dispatch({ type: 'RESET' })}
        />
      )}
    </div>
  )
}
