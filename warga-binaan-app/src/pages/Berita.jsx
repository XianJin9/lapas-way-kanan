import { Link, useNavigate, useParams } from 'react-router-dom'
import { Badge, EmptyState } from '../components/ui'
import { BERITA } from '../services/mockData'
import useDocumentTitle from '../hooks/useDocumentTitle'

const KATEGORI_COLOR = {
  Pengumuman:  'primary',
  Berita:      'info',
  Kegiatan:    'success',
  Penghargaan: 'gold',
}

function formatTanggal(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// ── Detail artikel ────────────────────────────────────────────────────────────
function ArtikelDetail({ artikel }) {
  useDocumentTitle(artikel.judul)
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap">
          <li><Link to="/" className="hover:text-primary-700 transition-colors">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/berita" className="hover:text-primary-700 transition-colors">Berita</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-900 font-medium truncate max-w-xs" aria-current="page">{artikel.judul}</li>
        </ol>
      </nav>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={KATEGORI_COLOR[artikel.kategori] ?? 'neutral'}>
              {artikel.kategori}
            </Badge>
            <time dateTime={artikel.tanggal} className="text-sm text-neutral-500">
              {formatTanggal(artikel.tanggal)}
            </time>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight mb-3">
            {artikel.judul}
          </h1>
          <p className="text-neutral-500 text-sm">
            Oleh: <span className="font-medium text-neutral-700">{artikel.penulis}</span>
          </p>
        </header>

        {/* Lead */}
        <p className="text-lg text-neutral-700 leading-relaxed mb-6 font-medium border-l-4 border-primary-200 pl-4">
          {artikel.ringkasan}
        </p>

        {/* Konten */}
        <div className="prose-custom">
          {artikel.konten.split('\n\n').map((para, i) => {
            if (!para.trim()) return null
            return (
              <p key={i} className="text-neutral-700 leading-relaxed mb-4 text-base">
                {para}
              </p>
            )
          })}
        </div>

        {/* Footer artikel */}
        <footer className="mt-10 pt-6 border-t border-neutral-200">
          <p className="text-xs text-neutral-500">
            Diterbitkan pada {formatTanggal(artikel.tanggal)} oleh {artikel.penulis}
          </p>
        </footer>
      </article>

      <div className="mt-8">
        <Link
          to="/berita"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors"
        >
          ← Kembali ke Daftar Berita
        </Link>
      </div>
    </div>
  )
}

// ── Daftar berita ─────────────────────────────────────────────────────────────
function DaftarBerita() {
  useDocumentTitle('Berita & Pengumuman')
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-primary-700 transition-colors">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-900 font-medium" aria-current="page">Berita & Pengumuman</li>
        </ol>
      </nav>

      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Berita & Pengumuman</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Informasi terkini dari Lapas Kelas IIB Way Kanan
          </p>
        </div>
        <span className="text-sm text-neutral-500">{BERITA.length} artikel</span>
      </div>

      {BERITA.length === 0 ? (
        <EmptyState
          icon="📰"
          title="Belum ada berita"
          description="Belum ada berita atau pengumuman yang diterbitkan saat ini."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BERITA.map((b) => (
            <Link
              key={b.id}
              to={`/berita/${b.id}`}
              className="group block bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md hover:border-primary-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={KATEGORI_COLOR[b.kategori] ?? 'neutral'} size="sm">
                  {b.kategori}
                </Badge>
                <time dateTime={b.tanggal} className="text-xs text-neutral-500">
                  {formatTanggal(b.tanggal)}
                </time>
              </div>
              <h2 className="font-semibold text-neutral-900 text-sm leading-snug mb-2 group-hover:text-primary-900 transition-colors line-clamp-2">
                {b.judul}
              </h2>
              <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3 mb-3">
                {b.ringkasan}
              </p>
              <span className="text-xs font-semibold text-primary-700 group-hover:text-primary-900 transition-colors">
                Baca selengkapnya →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Router ────────────────────────────────────────────────────────────────────
export default function Berita() {
  const { id } = useParams()
  const navigate = useNavigate()

  if (id) {
    const artikel = BERITA.find((b) => String(b.id) === id)
    if (!artikel) {
      return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <EmptyState
            icon="📄"
            title="Artikel tidak ditemukan"
            description="Artikel yang Anda cari tidak ada atau telah dihapus."
            action={{ label: 'Lihat Semua Berita', onClick: () => navigate('/berita') }}
          />
        </div>
      )
    }
    return <ArtikelDetail artikel={artikel} />
  }

  return <DaftarBerita />
}
