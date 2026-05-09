import { Link } from 'react-router-dom'
import { Badge } from '../../components/ui'
import { BERITA, KUNJUNGAN_LIST, PENGADUAN_LIST, STATS } from '../../services/mockData'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const STATUS_KUNJUNGAN = { menunggu: 'warning', disetujui: 'success', ditolak: 'danger' }
const STATUS_PENGADUAN  = { baru: 'info', diproses: 'warning', selesai: 'success' }

function StatCard({ label, value, sub, color = 'primary', to }) {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-700 border-primary-100',
    warning: 'bg-warning-50 text-warning-700 border-warning-100',
    success: 'bg-success-50 text-success-700 border-success-100',
    gold:    'bg-gold-50 text-gold-700 border-gold-100',
  }
  return (
    <Link
      to={to}
      className={['rounded-xl border p-5 hover:shadow-md transition-all block', colorMap[color]].join(' ')}
    >
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-sm font-semibold">{label}</p>
      {sub && <p className="text-xs opacity-70 mt-0.5">{sub}</p>}
    </Link>
  )
}

function formatTanggal(iso) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Dashboard() {
  useDocumentTitle('Dashboard Admin')

  const menunggu     = KUNJUNGAN_LIST.filter((k) => k.status === 'menunggu').length
  const pengaduanBaru = PENGADUAN_LIST.filter((p) => p.status === 'baru').length
  const recentKunjungan = [...KUNJUNGAN_LIST].slice(0, 5)
  const recentPengaduan  = [...PENGADUAN_LIST].slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Warga Binaan" value={STATS.totalWBP}       sub="Aktif saat ini"     color="primary" to="/admin" />
        <StatCard label="Kunjungan Menunggu" value={menunggu}              sub="Perlu konfirmasi"   color="warning" to="/admin/kunjungan" />
        <StatCard label="Pengaduan Baru"     value={pengaduanBaru}         sub="Belum ditangani"    color="gold"    to="/admin/pengaduan" />
        <StatCard label="Total Berita"       value={BERITA.length}         sub="Artikel diterbitkan" color="success" to="/admin/berita" />
      </div>

      {/* Recent tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Kunjungan terbaru */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900">Kunjungan Terbaru</h2>
            <Link to="/admin/kunjungan" className="text-xs text-primary-700 font-medium hover:text-primary-900 transition-colors">
              Lihat semua →
            </Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {recentKunjungan.map((k) => (
              <div key={k.id} className="px-5 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">{k.namaPengunjung}</p>
                  <p className="text-xs text-neutral-500 truncate">→ {k.namaWBP} · {formatTanggal(k.tanggalKunjungan)}</p>
                </div>
                <Badge variant={STATUS_KUNJUNGAN[k.status]} size="sm" className="shrink-0">{k.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Pengaduan terbaru */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900">Pengaduan Terbaru</h2>
            <Link to="/admin/pengaduan" className="text-xs text-primary-700 font-medium hover:text-primary-900 transition-colors">
              Lihat semua →
            </Link>
          </div>
          <div className="divide-y divide-neutral-100">
            {recentPengaduan.map((p) => (
              <div key={p.id} className="px-5 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {p.anonim ? 'Anonim' : p.nama}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">{p.noTiket} · {p.kategori}</p>
                </div>
                <Badge variant={STATUS_PENGADUAN[p.status]} size="sm" className="shrink-0">{p.status}</Badge>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
