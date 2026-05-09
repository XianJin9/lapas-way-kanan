import { useState } from 'react'
import { Header, Footer } from './components/layout'
import {
  Alert,
  Badge,
  Button,
  Card,
  EmptyState,
  Input,
  Modal,
  Select,
  Skeleton,
  Spinner,
  Textarea,
} from './components/ui'
import useDisclosure from './hooks/useDisclosure'

const Section = ({ title, description, children }) => (
  <section>
    <h2 className="text-lg font-bold text-neutral-900 mb-0.5">{title}</h2>
    {description && <p className="text-sm text-neutral-500 mb-4">{description}</p>}
    <div className="bg-white rounded-xl border border-neutral-200 p-6">{children}</div>
  </section>
)

const Label = ({ children }) => (
  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3">{children}</p>
)

export default function App() {
  const modal = useDisclosure()
  const confirmModal = useDisclosure()

  const [formState, setFormState] = useState({ nama: '', pesan: '', kategori: '' })
  const [formError, setFormError] = useState({})
  const [loading, setLoading] = useState(false)
  const [showEmpty, setShowEmpty] = useState(false)

  const handleDemoSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    if (!formState.nama) errors.nama = 'Nama wajib diisi'
    if (!formState.pesan) errors.pesan = 'Pesan tidak boleh kosong'
    if (!formState.kategori) errors.kategori = 'Pilih kategori pengaduan'
    setFormError(errors)

    if (!Object.keys(errors).length) {
      setLoading(true)
      setTimeout(() => setLoading(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header currentPath="/" />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10 space-y-10">

        {/* Banner */}
        <Alert variant="success" title="Tahap 3 — Komponen Reusable Selesai">
          14 komponen baru tersedia: Button, Input, Textarea, Select, Card, Badge, Alert, Modal,
          Skeleton, EmptyState, Spinner, Header, Footer, dan hook useDisclosure.
        </Alert>

        {/* ── BUTTON ── */}
        <Section title="Button" description="5 varian · 3 ukuran · loading state · icon">
          <div className="space-y-4">
            <div>
              <Label>Varian</Label>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Daftar Kunjungan</Button>
                <Button variant="secondary">Konfirmasi</Button>
                <Button variant="outline">Lihat Detail</Button>
                <Button variant="ghost">Batal</Button>
                <Button variant="neutral">Simpan Draft</Button>
                <Button variant="danger">Hapus</Button>
              </div>
            </div>
            <div>
              <Label>Ukuran</Label>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Kecil</Button>
                <Button size="md">Sedang</Button>
                <Button size="lg">Besar</Button>
              </div>
            </div>
            <div>
              <Label>State</Label>
              <div className="flex flex-wrap gap-3">
                <Button loading>Memproses...</Button>
                <Button disabled>Tidak Tersedia</Button>
                <Button
                  leftIcon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                  }
                >
                  Cari
                </Button>
                <Button
                  variant="outline"
                  rightIcon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  }
                >
                  Lanjutkan
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ── FORM ELEMENTS ── */}
        <Section title="Form Elements" description="Input, Textarea, Select — dengan label, helper, error, dan disabled state">
          <form onSubmit={handleDemoSubmit} noValidate className="space-y-4 max-w-lg">
            <Input
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap Anda"
              required
              value={formState.nama}
              error={formError.nama}
              helperText="Sesuai dengan KTP"
              onChange={(e) => setFormState((s) => ({ ...s, nama: e.target.value }))}
            />
            <Input
              label="NIK"
              placeholder="16 digit NIK"
              type="text"
              inputMode="numeric"
              disabled
              helperText="NIK dikunci setelah registrasi pertama"
            />
            <Select
              label="Kategori Pengaduan"
              required
              options={[
                { value: 'pelayanan', label: 'Pelayanan Petugas' },
                { value: 'fasilitas', label: 'Fasilitas' },
                { value: 'hak-wbp', label: 'Hak Warga Binaan' },
                { value: 'lainnya', label: 'Lainnya' },
              ]}
              value={formState.kategori}
              error={formError.kategori}
              onChange={(e) => setFormState((s) => ({ ...s, kategori: e.target.value }))}
            />
            <Textarea
              label="Isi Pengaduan"
              placeholder="Tuliskan pengaduan Anda secara jelas dan lengkap..."
              required
              rows={4}
              maxLength={500}
              value={formState.pesan}
              error={formError.pesan}
              onChange={(e) => setFormState((s) => ({ ...s, pesan: e.target.value }))}
            />
            <div className="flex gap-3">
              <Button type="submit" loading={loading}>
                {loading ? 'Mengirim...' : 'Kirim Pengaduan'}
              </Button>
              <Button
                type="button"
                variant="neutral"
                onClick={() => { setFormState({ nama: '', pesan: '', kategori: '' }); setFormError({}) }}
              >
                Reset
              </Button>
            </div>
          </form>
        </Section>

        {/* ── CARD ── */}
        <Section title="Card" description="5 varian termasuk interactive (klik)">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card variant="default">
              <p className="text-sm font-semibold text-neutral-800 mb-1">Default</p>
              <p className="text-xs text-neutral-500">bg-white border border-neutral-200</p>
            </Card>
            <Card variant="elevated">
              <p className="text-sm font-semibold text-neutral-800 mb-1">Elevated</p>
              <p className="text-xs text-neutral-500">shadow-md, tanpa border</p>
            </Card>
            <Card variant="primary">
              <p className="text-sm font-semibold text-primary-800 mb-1">Primary</p>
              <p className="text-xs text-primary-600">bg-primary-50 border-primary-200</p>
            </Card>
            <Card
              variant="default"
              onClick={() => alert('Card diklik!')}
            >
              <p className="text-sm font-semibold text-neutral-800 mb-1">Interactive ↗</p>
              <p className="text-xs text-neutral-500">Klik untuk aksi, hover + focus ring</p>
            </Card>
            <Card variant="outlined">
              <p className="text-sm font-semibold text-neutral-800 mb-1">Outlined</p>
              <p className="text-xs text-neutral-500">Transparan, border neutral-300</p>
            </Card>
            <Card variant="filled">
              <p className="text-sm font-semibold text-neutral-800 mb-1">Filled</p>
              <p className="text-xs text-neutral-500">bg-neutral-50</p>
            </Card>
          </div>
        </Section>

        {/* ── BADGE ── */}
        <Section title="Badge" description="7 varian · dot indicator · 2 ukuran">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" dot>Disetujui</Badge>
              <Badge variant="warning" dot>Menunggu</Badge>
              <Badge variant="danger"  dot>Ditolak</Badge>
              <Badge variant="info"    dot>Informasi</Badge>
              <Badge variant="primary" dot>Aktif</Badge>
              <Badge variant="gold"    dot>Prioritas</Badge>
              <Badge variant="neutral" dot>Tidak Aktif</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" size="sm">sm</Badge>
              <Badge variant="warning" size="md">md</Badge>
            </div>
          </div>
        </Section>

        {/* ── ALERT ── */}
        <Section title="Alert" description="4 varian · judul opsional · dapat ditutup (dismissible)">
          <div className="space-y-3">
            <Alert variant="info" title="Jadwal Kunjungan">
              Pendaftaran kunjungan dibuka setiap Senin–Jumat pukul 08.00–15.00 WIB.
            </Alert>
            <Alert variant="success" title="Pengaduan Terkirim">
              Pengaduan Anda berhasil dikirim dan akan diproses dalam 3×24 jam kerja.
            </Alert>
            <Alert variant="warning" dismissible>
              Harap membawa dokumen identitas asli (KTP/SIM) saat melakukan kunjungan.
            </Alert>
            <Alert variant="danger" title="Akses Ditolak" dismissible>
              Sesi Anda telah berakhir. Silakan masuk kembali untuk melanjutkan.
            </Alert>
          </div>
        </Section>

        {/* ── MODAL ── */}
        <Section title="Modal" description="Ukuran sm/md/lg/xl · Escape key · klik backdrop">
          <div className="flex flex-wrap gap-3">
            <Button onClick={modal.open}>Buka Modal Informasi</Button>
            <Button variant="danger" onClick={confirmModal.open}>
              Modal Konfirmasi Hapus
            </Button>
          </div>

          <Modal
            isOpen={modal.isOpen}
            onClose={modal.close}
            title="Detail Pendaftaran Kunjungan"
            size="md"
            footer={
              <>
                <Button variant="neutral" onClick={modal.close}>Tutup</Button>
                <Button onClick={modal.close}>Simpan</Button>
              </>
            }
          >
            <div className="space-y-3 text-sm text-neutral-700">
              <p>
                Kunjungan dapat dilakukan pada hari <strong>Senin hingga Jumat</strong>, pukul
                08.00–15.00 WIB.
              </p>
              <Alert variant="warning">
                Setiap pengunjung wajib memiliki surat kunjungan yang disetujui petugas.
              </Alert>
              <Input label="Nomor Registrasi" placeholder="Contoh: KJG-2025-001" />
            </div>
          </Modal>

          <Modal
            isOpen={confirmModal.isOpen}
            onClose={confirmModal.close}
            title="Konfirmasi Penghapusan"
            size="sm"
            footer={
              <>
                <Button variant="neutral" onClick={confirmModal.close}>Batal</Button>
                <Button variant="danger" onClick={confirmModal.close}>Ya, Hapus</Button>
              </>
            }
          >
            <p className="text-sm text-neutral-700">
              Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
            </p>
          </Modal>
        </Section>

        {/* ── SKELETON ── */}
        <Section title="Skeleton Loader" description="Loading placeholder — card, avatar, tabel">
          <div className="space-y-6">
            <div>
              <Label>Card Skeleton</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} padding="md">
                    <Skeleton.Card />
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Label>Avatar + Teks</Label>
              <div className="flex items-center gap-3">
                <Skeleton.Avatar size="3rem" />
                <div className="flex-1 space-y-2">
                  <Skeleton width="40%" height="14px" />
                  <Skeleton width="70%" height="10px" />
                </div>
              </div>
            </div>
            <div>
              <Label>Tabel</Label>
              <Card padding="none" className="overflow-hidden">
                <Skeleton.Table rows={4} cols={4} />
              </Card>
            </div>
          </div>
        </Section>

        {/* ── EMPTY STATE ── */}
        <Section title="Empty State" description="Tampilan kosong dengan ikon, deskripsi, dan CTA">
          <div className="space-y-4">
            <Button
              variant="neutral"
              size="sm"
              onClick={() => setShowEmpty((v) => !v)}
            >
              {showEmpty ? 'Tampilkan Data' : 'Simulasi Data Kosong'}
            </Button>
            {showEmpty ? (
              <EmptyState
                icon="📭"
                title="Belum ada pengaduan"
                description="Anda belum pernah mengajukan pengaduan. Klik tombol di bawah untuk memulai."
                action={{ label: 'Ajukan Pengaduan', onClick: () => setShowEmpty(false) }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Pengaduan A', 'Pengaduan B'].map((item) => (
                  <Card key={item} variant="default" padding="md">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-neutral-800">{item}</p>
                      <Badge variant="warning" dot>Menunggu</Badge>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </Section>

        {/* ── SPINNER ── */}
        <Section title="Spinner" description="4 ukuran · warna mengikuti currentColor">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="xs" className="text-primary-700" />
              <span className="text-xs text-neutral-400">xs</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="sm" className="text-primary-700" />
              <span className="text-xs text-neutral-400">sm</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" className="text-primary-700" />
              <span className="text-xs text-neutral-400">md</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" className="text-primary-700" />
              <span className="text-xs text-neutral-400">lg</span>
            </div>
          </div>
        </Section>

      </main>

      <Footer />
    </div>
  )
}
