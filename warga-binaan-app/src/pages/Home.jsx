import { Link } from 'react-router-dom'
import { Badge, Card } from '../components/ui'
import { BERITA, LAYANAN, STATS } from '../services/mockData'
import useDocumentTitle from '../hooks/useDocumentTitle'

// ── Ikon layanan ─────────────────────────────────────────────────────────────
const iconColorMap = {
  primary: 'bg-primary-50 text-primary-700 group-hover:bg-primary-100',
  info:    'bg-info-50    text-info-700    group-hover:bg-info-100',
  success: 'bg-success-50 text-success-700 group-hover:bg-success-100',
  warning: 'bg-warning-50 text-warning-700 group-hover:bg-warning-100',
  neutral: 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200',
  gold:    'bg-gold-50    text-gold-700    group-hover:bg-gold-100',
}

const kategoriColor = {
  Pengumuman: 'primary',
  Berita:     'info',
  Kegiatan:   'success',
  Penghargaan:'gold',
}

function formatTanggal(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function Home() {
  useDocumentTitle('Beranda')
  const beritaTerbaru = BERITA.slice(0, 3)
  const kapasitasPct  = Math.round((STATS.totalWBP / STATS.kapasitas) * 100)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-primary-950 overflow-hidden">
        {/* Dekorasi latar */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-800/40 rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-gold-500/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-900/30 rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-center">
          {/* Emblem */}
          <div className="w-20 h-20 rounded-full bg-gold-600 mx-auto mb-5 flex items-center justify-center shadow-xl" aria-hidden="true">
            <span className="text-white font-bold text-3xl">L</span>
          </div>

          <p className="text-primary-300 text-sm font-medium uppercase tracking-widest mb-3">
            Kementerian Hukum dan HAM RI &bull; Ditjen Pemasyarakatan
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Lembaga Pemasyarakatan
            <br className="hidden sm:block" />
            <span className="text-gold-400"> Kelas IIB Way Kanan</span>
          </h1>

          <p className="text-primary-200 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Layanan informasi dan administrasi pemasyarakatan secara digital
            untuk keluarga dan masyarakat.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/kunjungan"
              className="inline-flex items-center justify-center h-11 px-6 bg-gold-600 text-white text-base font-semibold rounded-xl hover:bg-gold-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
            >
              Daftar Kunjungan
            </Link>
            <Link
              to="/masa-tahanan"
              className="inline-flex items-center justify-center h-11 px-6 border-2 border-primary-400 text-white text-base font-semibold rounded-xl hover:bg-primary-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-950"
            >
              Cek Status WBP
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATISTIK ────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-neutral-200" aria-label="Statistik Lapas">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: STATS.totalWBP,          label: 'Warga Binaan Aktif',  sub: `${kapasitasPct}% kapasitas` },
              { value: STATS.kunjunganBulanIni, label: 'Kunjungan Bulan Ini', sub: 'Mei 2025' },
              { value: STATS.pengaduanDiproses, label: 'Pengaduan Diproses',  sub: 'Dalam antrian' },
              { value: STATS.remisiDiberikan,   label: 'Remisi Diberikan',    sub: 'Tahun 2025' },
            ].map(({ value, label, sub }, idx) => (
              <div key={label} className={[
                'py-6 px-4 sm:px-8 text-center border-neutral-200',
                idx % 2 === 0 ? 'border-r' : '',
                idx < 2 ? 'border-b md:border-b-0' : '',
                idx < 3 ? 'md:border-r' : '',
              ].filter(Boolean).join(' ')}>
                <p className="text-2xl sm:text-3xl font-bold text-primary-900">{value}</p>
                <p className="text-sm font-medium text-neutral-700 mt-0.5">{label}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PENGUMUMAN STRIP ─────────────────────────────────────────────── */}
      <div className="bg-gold-50 border-y border-gold-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <span className="text-gold-700 shrink-0 font-bold text-sm uppercase tracking-wide">
            📢 Pengumuman
          </span>
          <p className="text-gold-800 text-sm flex-1 truncate">
            {BERITA.find((b) => b.kategori === 'Pengumuman')?.judul}
          </p>
          <Link
            to="/berita"
            className="text-gold-700 text-xs font-semibold hover:text-gold-900 shrink-0 transition-colors"
          >
            Lihat semua →
          </Link>
        </div>
      </div>

      {/* ── LAYANAN ──────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
            Layanan Kami
          </h2>
          <p className="text-neutral-500 text-base max-w-lg mx-auto">
            Akses seluruh layanan administrasi dan informasi Lapas Way Kanan secara online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAYANAN.map(({ id, judul, deskripsi, icon, href, warna }) => (
            <Link
              key={id}
              to={href}
              className="group block bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md hover:border-primary-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              aria-label={judul}
            >
              <div
                className={[
                  'w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors',
                  iconColorMap[warna],
                ].join(' ')}
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1.5 group-hover:text-primary-900 transition-colors">
                {judul}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{deskripsi}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BERITA TERBARU ───────────────────────────────────────────────── */}
      <section className="bg-neutral-100 border-y border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Berita & Pengumuman</h2>
              <p className="text-neutral-500 text-sm mt-1">Informasi terkini dari Lapas Way Kanan</p>
            </div>
            <Link
              to="/berita"
              className="text-primary-700 text-sm font-semibold hover:text-primary-900 transition-colors shrink-0 ml-4"
            >
              Lihat semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {beritaTerbaru.map((b) => (
              <Link
                key={b.id}
                to={`/berita/${b.id}`}
                className="group block bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md hover:border-primary-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={kategoriColor[b.kategori] ?? 'neutral'} size="sm">
                    {b.kategori}
                  </Badge>
                  <span className="text-xs text-neutral-500">{formatTanggal(b.tanggal)}</span>
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm leading-snug mb-2 group-hover:text-primary-900 transition-colors line-clamp-2">
                  {b.judul}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                  {b.ringkasan}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── KONTAK & HOTLINE ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-primary-900 rounded-2xl p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Butuh Bantuan?</h2>
              <p className="text-primary-200 text-sm leading-relaxed mb-6">
                Tim kami siap membantu Anda pada jam kerja. Hubungi kami melalui saluran resmi berikut.
              </p>
              <div className="space-y-3">
                {[
                  { icon: '📞', label: 'Hotline',  value: '(0723) 000-000' },
                  { icon: '✉️', label: 'Email',    value: 'lapas.waykanan@kemenkumham.go.id' },
                  { icon: '🕐', label: 'Jam Kerja', value: 'Senin–Jumat, 08.00–15.00 WIB' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-lg shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
                    <div>
                      <p className="text-primary-300 text-xs font-medium uppercase tracking-wide">
                        {label}
                      </p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to="/pengaduan"
                className="flex items-center justify-center gap-2 bg-gold-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-gold-700 transition-colors text-center"
              >
                📋 Kirim Pengaduan
              </Link>
              <Link
                to="/kunjungan"
                className="flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-center"
              >
                👥 Daftar Kunjungan
              </Link>
              <Link
                to="/berita"
                className="flex items-center justify-center gap-2 bg-white/10 text-white font-semibold px-5 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/20 text-center"
              >
                📰 Berita Terbaru
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
