import { colors } from './theme/index'

const ColorScale = ({ name, palette }) => (
  <div>
    <p className="text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">{name}</p>
    <div className="flex rounded-lg overflow-hidden border border-black/5">
      {Object.entries(palette).map(([shade, hex]) => (
        <div
          key={shade}
          className="flex-1 h-8"
          style={{ backgroundColor: hex }}
          title={`${shade}: ${hex}`}
        />
      ))}
    </div>
  </div>
)

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-primary-900 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-base">L</span>
          </div>
          <div>
            <p className="text-primary-300 text-xs font-medium uppercase tracking-wide">
              Kementerian Hukum dan HAM RI
            </p>
            <h1 className="text-white text-base font-semibold leading-tight">
              Lapas Kelas IIB Way Kanan
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* Status */}
        <div className="bg-success-50 border border-success-200 rounded-xl px-5 py-4 flex items-start gap-3">
          <span className="text-success-600 text-lg shrink-0 mt-0.5">✓</span>
          <div>
            <p className="text-success-700 font-semibold">Tahap 2 — Design System Selesai</p>
            <p className="text-success-600 text-sm mt-0.5">
              Tailwind CSS aktif &bull; Design tokens terkonfigurasi &bull; Inter font dimuat
            </p>
          </div>
        </div>

        {/* Color Palette */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-1">Palet Warna</h2>
          <p className="text-neutral-500 text-sm mb-5">
            Identitas visual Lapas Way Kanan — WCAG AA compliant
          </p>
          <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
            <ColorScale name="Primary — Biru Institusional" palette={colors.primary} />
            <ColorScale name="Gold — Emas Negara" palette={colors.gold} />
            <ColorScale name="Neutral" palette={colors.neutral} />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                ['Success', colors.success],
                ['Warning', colors.warning],
                ['Danger', colors.danger],
                ['Info', colors.info],
              ].map(([name, palette]) => (
                <div key={name}>
                  <p className="text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">
                    {name}
                  </p>
                  <div className="flex rounded-lg overflow-hidden border border-black/5">
                    {Object.entries(palette).map(([shade, hex]) => (
                      <div
                        key={shade}
                        className="flex-1 h-8"
                        style={{ backgroundColor: hex }}
                        title={`${shade}: ${hex}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-1">Tipografi — Inter</h2>
          <p className="text-neutral-500 text-sm mb-5">
            Scale: 12–36px &bull; Weight: 400 · 500 · 600 · 700
          </p>
          <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-3">
            {[
              { cls: 'text-xs text-neutral-500',               label: 'xs · 12px',  text: 'Keterangan, label kecil, timestamp' },
              { cls: 'text-sm text-neutral-600',               label: 'sm · 14px',  text: 'Caption, informasi pendukung, metadata' },
              { cls: 'text-base text-neutral-700',             label: 'base · 16px',text: 'Teks utama konten dan paragraf halaman' },
              { cls: 'text-lg text-neutral-700',               label: 'lg · 18px',  text: 'Lead paragraph dan teks pengantar' },
              { cls: 'text-xl font-medium text-neutral-800',   label: 'xl · 20px',  text: 'Judul section kecil' },
              { cls: 'text-2xl font-semibold text-neutral-900',label: '2xl · 24px', text: 'Judul kartu dan panel' },
              { cls: 'text-3xl font-bold text-neutral-900',    label: '3xl · 30px', text: 'Judul halaman sekunder' },
              { cls: 'text-4xl font-bold text-primary-900',    label: '4xl · 36px', text: 'Judul hero utama' },
            ].map(({ cls, label, text }) => (
              <div key={label} className="flex items-baseline gap-4">
                <span className="text-xs text-neutral-400 w-20 shrink-0">{label}</span>
                <p className={cls}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Components */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 mb-1">Preview Komponen</h2>
          <p className="text-neutral-500 text-sm mb-5">
            Komponen lengkap dibuat di Tahap 3
          </p>
          <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">

            {/* Tombol */}
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">
                Tombol
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-primary-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2">
                  Daftar Kunjungan
                </button>
                <button className="border border-primary-900 text-primary-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                  Lihat Detail
                </button>
                <button className="bg-gold-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gold-800 transition-colors">
                  Konfirmasi
                </button>
                <button className="bg-neutral-100 text-neutral-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-neutral-200 transition-colors">
                  Batalkan
                </button>
                <button className="bg-danger-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-danger-700 transition-colors">
                  Hapus
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">
                Status Badge
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-success-50 text-success-700 border border-success-200 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ Disetujui
                </span>
                <span className="inline-flex items-center gap-1.5 bg-warning-50 text-warning-700 border border-warning-200 text-xs font-semibold px-3 py-1 rounded-full">
                  ⏳ Menunggu Verifikasi
                </span>
                <span className="inline-flex items-center gap-1.5 bg-danger-50 text-danger-700 border border-danger-200 text-xs font-semibold px-3 py-1 rounded-full">
                  ✕ Ditolak
                </span>
                <span className="inline-flex items-center gap-1.5 bg-info-50 text-info-700 border border-info-200 text-xs font-semibold px-3 py-1 rounded-full">
                  ℹ Informasi
                </span>
                <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-500 border border-neutral-200 text-xs font-semibold px-3 py-1 rounded-full">
                  — Tidak Aktif
                </span>
              </div>
            </div>

            {/* Kartu Layanan */}
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">
                Kartu Layanan
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: '👥', title: 'Pendaftaran Kunjungan', desc: 'Daftarkan jadwal kunjungan ke Lapas' },
                  { icon: '📅', title: 'Cek Masa Tahanan',       desc: 'Lihat estimasi bebas warga binaan' },
                  { icon: '📋', title: 'Layanan Pengaduan',       desc: 'Sampaikan keluhan dan saran Anda' },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="border border-neutral-200 rounded-xl p-5 hover:shadow-md hover:border-primary-200 transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center text-xl mb-3 group-hover:bg-primary-100 transition-colors">
                      {icon}
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-sm mb-1">{title}</h3>
                    <p className="text-xs text-neutral-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert */}
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">
                Alert / Notifikasi
              </p>
              <div className="space-y-2">
                <div className="bg-info-50 border border-info-200 rounded-lg px-4 py-3 flex items-start gap-2.5">
                  <span className="text-info-600 shrink-0 mt-0.5">ℹ</span>
                  <p className="text-info-700 text-sm">
                    Pendaftaran kunjungan dibuka setiap Senin–Jumat pukul 08.00–15.00 WIB.
                  </p>
                </div>
                <div className="bg-warning-50 border border-warning-200 rounded-lg px-4 py-3 flex items-start gap-2.5">
                  <span className="text-warning-600 shrink-0 mt-0.5">⚠</span>
                  <p className="text-warning-700 text-sm">
                    Harap membawa dokumen identitas asli saat melakukan kunjungan.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary-950 text-neutral-400 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Lapas Kelas IIB Way Kanan</p>
              <p className="text-neutral-400 text-xs">Kementerian Hukum dan HAM RI</p>
            </div>
          </div>
          <hr className="border-neutral-700 mb-4" />
          <p className="text-xs text-neutral-500">
            © 2025 Lembaga Pemasyarakatan Kelas IIB Way Kanan &bull; Direktorat Jenderal
            Pemasyarakatan
          </p>
        </div>
      </footer>
    </div>
  )
}
