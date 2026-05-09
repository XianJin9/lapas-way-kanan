import { Link } from 'react-router-dom'
import { Card } from '../components/ui'
import useDocumentTitle from '../hooks/useDocumentTitle'

function IconPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 10a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.27 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function InfoRow({ icon, label, children }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-neutral-100 last:border-0">
      <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 text-primary-700 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">{label}</p>
        <div className="text-sm text-neutral-800 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

export default function Kontak() {
  useDocumentTitle('Kontak & Lokasi')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-primary-700 transition-colors">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-900 font-medium" aria-current="page">Kontak & Lokasi</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Kontak & Lokasi</h1>
      <p className="text-neutral-500 text-sm mb-8 leading-relaxed">
        Informasi resmi untuk menghubungi Lembaga Pemasyarakatan Kelas IIB Way Kanan.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Info kontak */}
        <div className="lg:col-span-2 space-y-5">
          <Card variant="default" padding="none">
            <div className="px-5 pt-5 pb-2">
              <h2 className="text-base font-semibold text-neutral-900 mb-0">Informasi Kontak</h2>
            </div>
            <div className="px-5 pb-3">
              <InfoRow icon={<IconPin />} label="Alamat">
                Jl. Way Kanan No. 1, Blambangan Umpu<br />
                Kab. Way Kanan, Lampung 34761
              </InfoRow>
              <InfoRow icon={<IconPhone />} label="Telepon">
                <a
                  href="tel:+62723000000"
                  className="text-primary-700 hover:text-primary-900 transition-colors"
                >
                  (0723) 000-000
                </a>
              </InfoRow>
              <InfoRow icon={<IconMail />} label="Email">
                <a
                  href="mailto:lapas.waykanan@kemenkumham.go.id"
                  className="text-primary-700 hover:text-primary-900 transition-colors break-all"
                >
                  lapas.waykanan@kemenkumham.go.id
                </a>
              </InfoRow>
              <InfoRow icon={<IconClock />} label="Jam Pelayanan">
                <p>Senin – Jumat</p>
                <p className="font-medium">08.00 – 15.00 WIB</p>
                <p className="text-neutral-500 mt-1 text-xs">
                  Sabtu, Minggu & Hari Libur Nasional: Tutup
                </p>
              </InfoRow>
            </div>
          </Card>

          <Card variant="primary" padding="md">
            <h2 className="text-sm font-semibold text-primary-900 mb-2">Pengaduan & Layanan Online</h2>
            <p className="text-xs text-primary-700 leading-relaxed mb-3">
              Untuk layanan pendaftaran kunjungan, pengaduan, dan informasi masa tahanan,
              gunakan layanan online kami.
            </p>
            <Link
              to="/pengaduan"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-900 transition-colors"
            >
              Kirim pengaduan →
            </Link>
          </Card>
        </div>

        {/* Peta */}
        <div className="lg:col-span-3 space-y-5">
          <Card variant="default" padding="none">
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-semibold text-neutral-900">Lokasi</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Blambangan Umpu, Kab. Way Kanan, Lampung</p>
            </div>
            <div className="relative">
              {/* TODO: ganti src dengan URL embed Google Maps resmi setelah API key tersedia */}
              <iframe
                src=""
                title="Lokasi Lapas Kelas IIB Way Kanan"
                width="100%"
                height="320"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                aria-label="Peta lokasi Lapas Kelas IIB Way Kanan"
              />
              {/* Placeholder ditampilkan saat src kosong */}
              <div className="absolute inset-0 bg-neutral-100 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div className="text-neutral-400 text-4xl" aria-hidden="true">
                  <IconPin />
                </div>
                <p className="text-sm text-neutral-500 font-medium">Peta belum tersedia</p>
                <p className="text-xs text-neutral-400">
                  Jl. Way Kanan No. 1, Blambangan Umpu
                </p>
              </div>
            </div>
          </Card>

          <Card variant="filled" padding="md">
            <h2 className="text-sm font-semibold text-neutral-700 mb-3">Petunjuk Arah</h2>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold shrink-0">•</span>
                Dari Bandar Lampung: ±3 jam perjalanan via Tol Trans Sumatera ke arah Blambangan Umpu
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold shrink-0">•</span>
                Terminal Bus Blambangan Umpu: ±10 menit kendaraan roda dua
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 font-bold shrink-0">•</span>
                Parkir tersedia di halaman depan kantor
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
