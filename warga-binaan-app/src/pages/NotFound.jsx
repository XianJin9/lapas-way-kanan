import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

const QUICK_LINKS = [
  { label: 'Pendaftaran Kunjungan', to: '/kunjungan',    icon: '👥' },
  { label: 'Cek Masa Tahanan',      to: '/masa-tahanan', icon: '📅' },
  { label: 'Layanan Pengaduan',     to: '/pengaduan',    icon: '📋' },
  { label: 'Berita & Pengumuman',   to: '/berita',       icon: '📰' },
]

export default function NotFound() {
  useDocumentTitle('Halaman Tidak Ditemukan')

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md w-full">
        <div className="text-7xl mb-5" aria-hidden="true">🔍</div>

        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-neutral-500 text-sm leading-relaxed mb-8">
          Halaman yang Anda cari mungkin sudah dipindahkan, dihapus, atau tidak tersedia.
          Periksa kembali alamat URL atau gunakan layanan di bawah ini.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-semibold bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          >
            Kembali ke Beranda
          </Link>
          <Link
            to="/kontak"
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          >
            Hubungi Petugas
          </Link>
        </div>

        <div className="border-t border-neutral-200 pt-8">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-4">
            Atau akses layanan utama
          </p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_LINKS.map(({ label, to, icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-neutral-200 bg-white text-sm text-neutral-700 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
              >
                <span className="text-base shrink-0" aria-hidden="true">{icon}</span>
                <span className="font-medium text-left text-xs leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
