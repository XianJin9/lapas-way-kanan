import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Halaman Tidak Ditemukan')
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-primary-900 mb-2">404</p>
        <h1 className="text-2xl font-bold text-neutral-900 mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-neutral-500 text-sm leading-relaxed mb-8">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
          Silakan kembali ke beranda.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
            Hubungi Kami
          </Link>
        </div>
      </div>
    </div>
  )
}
