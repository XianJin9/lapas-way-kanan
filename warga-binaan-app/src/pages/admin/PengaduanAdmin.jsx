import { useState } from 'react'
import { Alert, Badge, Button, Select, Textarea } from '../../components/ui'
import { PENGADUAN_LIST as INIT } from '../../services/mockData'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const STATUS_COLOR = { baru: 'info', diproses: 'warning', selesai: 'success' }
const STATUS_OPT   = [
  { value: 'baru',     label: 'Baru' },
  { value: 'diproses', label: 'Diproses' },
  { value: 'selesai',  label: 'Selesai' },
]
const KATEGORI_LABEL = {
  pelayanan: 'Pelayanan Petugas', fasilitas: 'Fasilitas & Sarana',
  hak_wbp: 'Hak Warga Binaan', kunjungan: 'Prosedur Kunjungan',
  penitipan: 'Penitipan Uang/Barang', lainnya: 'Lainnya',
}
const FILTER_TABS = ['semua', 'baru', 'diproses', 'selesai']

function formatDateTime(iso) {
  return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function PengaduanAdmin() {
  useDocumentTitle('Kelola Pengaduan')
  const [items, setItems]   = useState(INIT)
  const [filter, setFilter] = useState('semua')
  const [selected, setSelected] = useState(null)
  const [balasan, setBalasan]   = useState('')
  const [statusEdit, setStatusEdit] = useState('')

  const filtered = filter === 'semua' ? items : items.filter((p) => p.status === filter)
  const counts   = FILTER_TABS.reduce((acc, s) => ({ ...acc, [s]: s === 'semua' ? items.length : items.filter((p) => p.status === s).length }), {})

  const openDetail = (p) => {
    setSelected(p)
    setBalasan(p.balasan ?? '')
    setStatusEdit(p.status)
  }

  const closeDetail = () => { setSelected(null); setBalasan(''); setStatusEdit('') }

  const simpan = () => {
    setItems((prev) => prev.map((p) =>
      p.id === selected.id ? { ...p, status: statusEdit, balasan } : p
    ))
    closeDetail()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
      {/* List panel */}
      <div className={['lg:col-span-2 space-y-3', selected ? 'hidden lg:block' : ''].join(' ')}>
        {/* Filter */}
        <div className="flex gap-2 flex-wrap">
          {FILTER_TABS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize',
                filter === s
                  ? 'bg-primary-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300',
              ].join(' ')}
            >
              {s} <span className="text-xs opacity-70">({counts[s]})</span>
            </button>
          ))}
        </div>

        {/* List */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden divide-y divide-neutral-100">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => openDetail(p)}
              className={[
                'w-full text-left px-4 py-3 hover:bg-neutral-50 transition-colors',
                selected?.id === p.id ? 'bg-primary-50 border-l-2 border-primary-600' : '',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-mono text-neutral-500">{p.noTiket}</span>
                <Badge variant={STATUS_COLOR[p.status]} size="sm">{p.status}</Badge>
              </div>
              <p className="text-sm font-medium text-neutral-900 truncate">
                {p.anonim ? '🔒 Anonim' : p.nama}
              </p>
              <p className="text-xs text-neutral-500 truncate mt-0.5">
                {KATEGORI_LABEL[p.kategori]} · {formatDateTime(p.createdAt)}
              </p>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-neutral-400">Tidak ada pengaduan.</p>
          )}
        </div>
      </div>

      {/* Detail panel */}
      {selected ? (
        <div className="lg:col-span-3 bg-white rounded-xl border border-neutral-200 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-mono text-neutral-500">{selected.noTiket}</p>
              <p className="text-sm font-semibold text-neutral-900">
                {selected.anonim ? 'Pengaduan Anonim' : selected.nama}
              </p>
            </div>
            <button
              type="button"
              onClick={closeDetail}
              className="lg:hidden text-sm text-neutral-500 hover:text-neutral-700 px-2 py-1 rounded"
            >
              ← Kembali
            </button>
          </div>

          <div className="p-5 space-y-5">
            {/* Info */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['Kategori',  KATEGORI_LABEL[selected.kategori]],
                ['Diterima',  formatDateTime(selected.createdAt)],
                ...(!selected.anonim ? [
                  ['No. HP', selected.noHp || '—'],
                  ['Email',  selected.email || '—'],
                ] : []),
              ].map(([l, v]) => (
                <div key={l}>
                  <p className="text-xs text-neutral-400">{l}</p>
                  <p className="font-medium text-neutral-800">{v}</p>
                </div>
              ))}
            </div>

            {/* Isi pengaduan */}
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Isi Pengaduan</p>
              <p className="text-sm text-neutral-700 leading-relaxed bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                {selected.isi}
              </p>
            </div>

            {/* Update status */}
            <Select
              label="Status Pengaduan"
              options={STATUS_OPT}
              value={statusEdit}
              onChange={(e) => setStatusEdit(e.target.value)}
            />

            {/* Balasan */}
            <Textarea
              label="Balasan ke Pelapor"
              rows={4}
              placeholder="Tulis balasan resmi yang akan disampaikan kepada pelapor..."
              value={balasan}
              onChange={(e) => setBalasan(e.target.value)}
            />

            {selected.status === 'baru' && (
              <Alert variant="info">
                Mengubah status ke <strong>Diproses</strong> akan mencatat bahwa pengaduan ini sedang ditangani.
              </Alert>
            )}

            <div className="flex justify-end gap-3">
              <Button variant="neutral" onClick={closeDetail}>Batal</Button>
              <Button onClick={simpan}>Simpan Perubahan</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:col-span-3 hidden lg:flex items-center justify-center bg-white rounded-xl border border-neutral-200 h-64 text-neutral-400 text-sm">
          Pilih pengaduan untuk melihat detail
        </div>
      )}
    </div>
  )
}
