import { useState } from 'react'
import { Badge, Button, Modal } from '../../components/ui'
import { KUNJUNGAN_LIST as INIT } from '../../services/mockData'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const STATUS_COLOR  = { menunggu: 'warning', disetujui: 'success', ditolak: 'danger' }
const FILTER_TABS   = ['semua', 'menunggu', 'disetujui', 'ditolak']
const HUBUNGAN_LABEL = { suami_istri: 'Suami/Istri', orang_tua: 'Orang Tua', anak: 'Anak', saudara: 'Saudara Kandung', lainnya: 'Lainnya' }
const SESI_LABEL     = { pagi: 'Pagi (08.00–11.00)', siang: 'Siang (13.00–15.00)' }

function formatTanggal(iso) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatDateTime(iso) {
  return new Date(iso).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function KunjunganAdmin() {
  useDocumentTitle('Kelola Kunjungan')
  const [items, setItems]   = useState(INIT)
  const [filter, setFilter] = useState('semua')
  const [detail, setDetail] = useState(null)
  const [tolakId, setTolakId] = useState(null)

  const filtered = filter === 'semua' ? items : items.filter((k) => k.status === filter)
  const counts   = FILTER_TABS.reduce((acc, s) => ({ ...acc, [s]: s === 'semua' ? items.length : items.filter((k) => k.status === s).length }), {})

  const setujui = (id) => setItems((prev) => prev.map((k) => k.id === id ? { ...k, status: 'disetujui' } : k))
  const tolak   = (id) => { setItems((prev) => prev.map((k) => k.id === id ? { ...k, status: 'ditolak' } : k)); setTolakId(null) }

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
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
            {s} <span className="ml-1 text-xs opacity-70">({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide">No. Tiket</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide">Pengunjung</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden md:table-cell">WBP</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden lg:table-cell">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((k) => (
                <tr key={k.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-neutral-600 whitespace-nowrap">{k.noTiket}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-neutral-900">{k.namaPengunjung}</p>
                    <p className="text-xs text-neutral-500">{HUBUNGAN_LABEL[k.hubunganWBP] ?? k.hubunganWBP}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <p className="text-sm text-neutral-800">{k.namaWBP}</p>
                    <p className="text-xs text-neutral-500">{k.noRegisterWBP}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <p className="text-sm text-neutral-700 whitespace-nowrap">{formatTanggal(k.tanggalKunjungan)}</p>
                    <p className="text-xs text-neutral-500">{SESI_LABEL[k.sesi]}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_COLOR[k.status]} size="sm" dot>{k.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDetail(k)}
                        className="text-xs font-medium text-primary-700 hover:text-primary-900 px-2 py-1 rounded hover:bg-primary-50 transition-colors"
                      >
                        Detail
                      </button>
                      {k.status === 'menunggu' && (
                        <>
                          <button
                            type="button"
                            onClick={() => setujui(k.id)}
                            className="text-xs font-medium text-success-700 hover:text-success-900 px-2 py-1 rounded hover:bg-success-50 transition-colors"
                          >
                            Setujui
                          </button>
                          <button
                            type="button"
                            onClick={() => setTolakId(k.id)}
                            className="text-xs font-medium text-danger-600 hover:text-danger-800 px-2 py-1 rounded hover:bg-danger-50 transition-colors"
                          >
                            Tolak
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-neutral-400">
                    Tidak ada data kunjungan untuk filter ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!detail} onClose={() => setDetail(null)} title={`Detail — ${detail?.noTiket}`} size="md">
        {detail && (
          <div className="space-y-5 text-sm">
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Data Pengunjung</p>
              <div className="space-y-1.5">
                {[
                  ['Nama',    detail.namaPengunjung],
                  ['NIK',     detail.nikPengunjung],
                  ['No. HP',  detail.noHp],
                  ['Hubungan', HUBUNGAN_LABEL[detail.hubunganWBP] ?? detail.hubunganWBP],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between gap-4">
                    <span className="text-neutral-500 w-24 shrink-0">{l}</span>
                    <span className="font-medium text-neutral-800 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Data WBP</p>
              <div className="space-y-1.5">
                {[
                  ['Nama WBP',    detail.namaWBP],
                  ['No. Register', detail.noRegisterWBP],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between gap-4">
                    <span className="text-neutral-500 w-24 shrink-0">{l}</span>
                    <span className="font-medium text-neutral-800 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Jadwal</p>
              <div className="space-y-1.5">
                {[
                  ['Tanggal',  formatTanggal(detail.tanggalKunjungan)],
                  ['Sesi',     SESI_LABEL[detail.sesi]],
                  ['Jumlah',   `${detail.jumlahPengunjung} orang`],
                  ['Didaftar', formatDateTime(detail.createdAt)],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between gap-4">
                    <span className="text-neutral-500 w-24 shrink-0">{l}</span>
                    <span className="font-medium text-neutral-800 text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Status:</span>
              <Badge variant={STATUS_COLOR[detail.status]} dot>{detail.status}</Badge>
            </div>
          </div>
        )}
      </Modal>

      {/* Konfirmasi Tolak */}
      <Modal
        isOpen={!!tolakId}
        onClose={() => setTolakId(null)}
        title="Tolak Kunjungan"
        size="sm"
        footer={
          <>
            <Button variant="neutral" onClick={() => setTolakId(null)}>Batal</Button>
            <Button variant="danger" onClick={() => tolak(tolakId)}>Tolak Kunjungan</Button>
          </>
        }
      >
        <p className="text-sm text-neutral-600">Yakin ingin menolak pendaftaran kunjungan ini? Pemohon akan perlu mendaftar ulang.</p>
      </Modal>
    </div>
  )
}
