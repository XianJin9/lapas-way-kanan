import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Badge, Button, Card, EmptyState, Input, Skeleton } from '../components/ui'
import { WBP_DATA } from '../services/mockData'

function formatTanggal(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function sisaHari(iso) {
  const diff = new Date(iso) - new Date()
  if (diff <= 0) return null
  return Math.ceil(diff / 86400000)
}

function HasilWBP({ wbp }) {
  const sisaMurni  = sisaHari(wbp.tanggalBebasMurni)
  const sisaRemisi = sisaHari(wbp.estimasiBebasRemisi)

  return (
    <div className="space-y-4">
      <Alert variant="info" title="Informasi ini bersifat indikatif">
        Data masa tahanan dapat berubah sesuai keputusan pengadilan dan kebijakan pemberian remisi.
        Untuk kepastian, hubungi petugas registrasi Lapas.
      </Alert>

      {/* Header kartu WBP */}
      <Card variant="elevated" padding="none" className="overflow-hidden">
        <div className="bg-primary-900 px-6 py-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary-700 flex items-center justify-center text-white font-bold text-lg shrink-0" aria-hidden="true">
            {wbp.nama.charAt(0)}
          </div>
          <div>
            <p className="text-primary-300 text-xs font-medium uppercase tracking-wide mb-0.5">
              No. Registrasi: {wbp.noRegister}
            </p>
            <h2 className="text-white text-lg font-bold">{wbp.nama}</h2>
            <p className="text-primary-200 text-sm">
              Lahir di {wbp.tempatLahir},{' '}
              {new Date(wbp.tanggalLahir).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="ml-auto">
            <Badge variant={wbp.status === 'aktif' ? 'warning' : 'success'} dot>
              {wbp.status === 'aktif' ? 'Sedang Menjalani' : 'Telah Bebas'}
            </Badge>
          </div>
        </div>

        {/* Detail */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kasus */}
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Informasi Pidana</p>
            <div className="space-y-2.5">
              {[
                ['Kasus',       wbp.kasusRingkas],
                ['Putusan',     wbp.putusanPengadilan],
                ['Pengadilan',  wbp.pengadilan],
                ['Blok',        `Blok ${wbp.blok}`],
                ['Tanggal Masuk', formatTanggal(wbp.tanggalMasuk)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <span className="text-sm text-neutral-500 shrink-0 w-28">{label}</span>
                  <span className="text-sm font-medium text-neutral-800 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Masa tahanan */}
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">Estimasi Kebebasan</p>
            <div className="space-y-3">
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                <p className="text-xs text-neutral-500 mb-0.5">Bebas Murni (tanpa remisi)</p>
                <p className="text-base font-bold text-neutral-900">{formatTanggal(wbp.tanggalBebasMurni)}</p>
                {sisaMurni && (
                  <p className="text-xs text-neutral-400 mt-0.5">±{sisaMurni} hari lagi</p>
                )}
              </div>
              <div className="bg-success-50 border border-success-200 rounded-lg p-3">
                <p className="text-xs text-success-700 mb-0.5">Estimasi Bebas (dengan remisi)</p>
                <p className="text-base font-bold text-success-800">{formatTanggal(wbp.estimasiBebasRemisi)}</p>
                {sisaRemisi && (
                  <p className="text-xs text-success-600 mt-0.5">±{sisaRemisi} hari lagi</p>
                )}
              </div>
              <div className="bg-info-50 border border-info-200 rounded-lg p-3">
                <p className="text-xs text-info-700 mb-0.5">Status Remisi</p>
                <p className="text-sm font-medium text-info-800">{wbp.statusRemisi}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function MasaTahanan() {
  const [query, setQuery]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [hasil, setHasil]       = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [pernah, setPernah]     = useState(false)

  const cari = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setNotFound(false)
    setHasil(null)
    setPernah(true)

    await new Promise((r) => setTimeout(r, 1200))

    const found = WBP_DATA.find(
      (w) =>
        w.noRegister.toLowerCase() === query.trim().toLowerCase() ||
        w.nama.toLowerCase().includes(query.trim().toLowerCase())
    )
    setLoading(false)
    if (found) setHasil(found)
    else setNotFound(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-primary-700 transition-colors">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-900 font-medium" aria-current="page">Cek Masa Tahanan</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Cek Masa Tahanan</h1>
      <p className="text-neutral-500 text-sm mb-8 leading-relaxed">
        Masukkan nama lengkap atau nomor registrasi warga binaan untuk melihat informasi
        masa pidana dan estimasi kebebasan.
      </p>

      {/* Form pencarian */}
      <form onSubmit={cari} className="flex gap-3 mb-8" role="search">
        <Input
          wrapperClassName="flex-1"
          placeholder="Nama atau nomor registrasi (contoh: WK-2022-001)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Cari warga binaan"
          leftIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          }
        />
        <Button type="submit" loading={loading}>
          {loading ? 'Mencari...' : 'Cari'}
        </Button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="space-y-4">
          <Skeleton height="160px" rounded="rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton height="100px" rounded="rounded-xl" />
            <Skeleton height="100px" rounded="rounded-xl" />
          </div>
        </div>
      )}

      {/* Hasil */}
      {!loading && hasil && <HasilWBP wbp={hasil} />}

      {/* Tidak ditemukan */}
      {!loading && notFound && (
        <EmptyState
          icon="🔍"
          title="Data tidak ditemukan"
          description={`Warga binaan dengan kata kunci "${query}" tidak ditemukan dalam sistem. Periksa kembali nama atau nomor registrasi, atau hubungi petugas kami.`}
          action={{ label: 'Hubungi Petugas', onClick: () => window.location.href = '/kontak' }}
        />
      )}

      {/* Panduan (sebelum pencarian) */}
      {!pernah && !loading && (
        <Card variant="filled" padding="lg">
          <h2 className="text-sm font-semibold text-neutral-700 mb-3">Panduan Pencarian</h2>
          <ul className="space-y-2 text-sm text-neutral-600">
            {[
              'Masukkan nama lengkap warga binaan sesuai surat keputusan',
              'Atau masukkan nomor registrasi (format: WK-TAHUN-NNN)',
              'Pencarian tidak membedakan huruf besar/kecil',
              'Jika tidak ditemukan, hubungi bagian registrasi Lapas',
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="text-primary-500 shrink-0 mt-0.5" aria-hidden="true">›</span>
                {tip}
              </li>
            ))}
          </ul>
          <Alert variant="warning" className="mt-4">
            Data ini bersifat indikatif. Untuk kepastian resmi, hubungi petugas registrasi Lapas.
          </Alert>
        </Card>
      )}
    </div>
  )
}
