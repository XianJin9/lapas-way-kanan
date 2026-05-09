import { Link } from 'react-router-dom'

const LAYANAN = [
  { label: 'Pendaftaran Kunjungan', to: '/kunjungan' },
  { label: 'Cek Masa Tahanan',      to: '/masa-tahanan' },
  { label: 'Penitipan Uang',        to: '/penitipan' },
  { label: 'Layanan Pengaduan',     to: '/pengaduan' },
  { label: 'Berita & Pengumuman',   to: '/berita' },
]

const INFORMASI = [
  { label: 'Profil Lapas',          to: '/profil' },
  { label: 'Visi & Misi',          to: '/visi-misi' },
  { label: 'Struktur Organisasi',   to: '/struktur' },
  { label: 'Kebijakan Privasi',     to: '/privasi' },
  { label: 'Syarat Penggunaan',     to: '/syarat' },
]

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-neutral-400" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold-600 flex items-center justify-center shrink-0" aria-hidden="true">
                <span className="text-white font-bold">L</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  Lapas Kelas IIB Way Kanan
                </p>
                <p className="text-neutral-500 text-xs">Kemenkumham RI</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Direktorat Jenderal Pemasyarakatan — Kementerian Hukum dan Hak Asasi Manusia
              Republik Indonesia.
            </p>
            <address className="not-italic text-sm space-y-1">
              <p>Jl. Way Kanan No. 1, Blambangan Umpu</p>
              <p>Way Kanan, Lampung 34761</p>
              <p>
                <a
                  href="tel:+62723000000"
                  className="hover:text-white transition-colors"
                  aria-label="Nomor telepon Lapas"
                >
                  Telp: (0723) 000-000
                </a>
              </p>
              <p>
                <a
                  href="mailto:lapas.waykanan@kemenkumham.go.id"
                  className="hover:text-white transition-colors break-all"
                >
                  lapas.waykanan@kemenkumham.go.id
                </a>
              </p>
            </address>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">
              Layanan
            </h3>
            <ul className="space-y-0.5 text-sm" role="list">
              {LAYANAN.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="block py-1.5 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">
              Informasi
            </h3>
            <ul className="space-y-0.5 text-sm" role="list">
              {INFORMASI.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="block py-1.5 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-neutral-800 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-neutral-600">
          <p>© {new Date().getFullYear()} Lapas Kelas IIB Way Kanan. Hak Cipta Dilindungi.</p>
          <p>
            Dikelola oleh{' '}
            <a
              href="https://kemenkumham.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-400 transition-colors"
            >
              Kemenkumham RI
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
