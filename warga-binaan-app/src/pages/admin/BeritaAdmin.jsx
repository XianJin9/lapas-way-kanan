import { useState } from 'react'
import { Badge, Button, Input, Modal, Select, Textarea } from '../../components/ui'
import { BERITA as INIT_BERITA } from '../../services/mockData'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const KATEGORI_OPT = [
  { value: 'Pengumuman', label: 'Pengumuman' },
  { value: 'Berita',     label: 'Berita' },
  { value: 'Kegiatan',   label: 'Kegiatan' },
  { value: 'Penghargaan',label: 'Penghargaan' },
]

const KATEGORI_COLOR = { Pengumuman: 'primary', Berita: 'info', Kegiatan: 'success', Penghargaan: 'gold' }

const FORM_INIT = { judul: '', kategori: '', tanggal: '', penulis: '', ringkasan: '', konten: '' }

function validateForm(f) {
  const err = {}
  if (!f.judul.trim())     err.judul     = 'Judul wajib diisi'
  if (!f.kategori)         err.kategori  = 'Pilih kategori'
  if (!f.tanggal)          err.tanggal   = 'Tanggal wajib diisi'
  if (!f.penulis.trim())   err.penulis   = 'Penulis wajib diisi'
  if (!f.ringkasan.trim()) err.ringkasan = 'Ringkasan wajib diisi'
  if (!f.konten.trim())    err.konten    = 'Konten wajib diisi'
  return err
}

function formatTanggal(iso) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BeritaAdmin() {
  useDocumentTitle('Kelola Berita')
  const [items, setItems]     = useState(INIT_BERITA)
  const [modal, setModal]     = useState({ open: false, mode: 'add', id: null })
  const [deleteId, setDeleteId] = useState(null)
  const [form, setForm]       = useState(FORM_INIT)
  const [formErr, setFormErr] = useState({})

  const setField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const openAdd = () => {
    setForm(FORM_INIT)
    setFormErr({})
    setModal({ open: true, mode: 'add', id: null })
  }

  const openEdit = (item) => {
    setForm({ judul: item.judul, kategori: item.kategori, tanggal: item.tanggal, penulis: item.penulis, ringkasan: item.ringkasan, konten: item.konten })
    setFormErr({})
    setModal({ open: true, mode: 'edit', id: item.id })
  }

  const closeModal = () => setModal({ open: false, mode: 'add', id: null })

  const save = () => {
    const err = validateForm(form)
    setFormErr(err)
    if (Object.keys(err).length) return

    if (modal.mode === 'add') {
      setItems((prev) => [{ ...form, id: Date.now() }, ...prev])
    } else {
      setItems((prev) => prev.map((it) => it.id === modal.id ? { ...it, ...form } : it))
    }
    closeModal()
  }

  const confirmDelete = () => {
    setItems((prev) => prev.filter((it) => it.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-neutral-500">{items.length} artikel</p>
        <Button onClick={openAdd} size="md">+ Tambah Artikel</Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide">Judul</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden md:table-cell">Kategori</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden sm:table-cell">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden lg:table-cell">Penulis</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-neutral-900 line-clamp-1">{item.judul}</p>
                    <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5 md:hidden">{item.kategori} · {formatTanggal(item.tanggal)}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <Badge variant={KATEGORI_COLOR[item.kategori] ?? 'neutral'} size="sm">{item.kategori}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600 hidden sm:table-cell whitespace-nowrap">
                    {formatTanggal(item.tanggal)}
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600 hidden lg:table-cell">{item.penulis}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="text-xs font-medium text-primary-700 hover:text-primary-900 transition-colors px-2 py-1 rounded hover:bg-primary-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className="text-xs font-medium text-danger-600 hover:text-danger-800 transition-colors px-2 py-1 rounded hover:bg-danger-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modal.open}
        onClose={closeModal}
        title={modal.mode === 'add' ? 'Tambah Artikel' : 'Edit Artikel'}
        size="lg"
        footer={
          <>
            <Button variant="neutral" onClick={closeModal}>Batal</Button>
            <Button onClick={save}>Simpan</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Judul" required value={form.judul} error={formErr.judul} onChange={setField('judul')} placeholder="Judul artikel" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Kategori" required options={KATEGORI_OPT} value={form.kategori} error={formErr.kategori} onChange={setField('kategori')} />
            <Input label="Tanggal" type="date" required value={form.tanggal} error={formErr.tanggal} onChange={setField('tanggal')} />
          </div>
          <Input label="Penulis" required value={form.penulis} error={formErr.penulis} onChange={setField('penulis')} placeholder="Nama penulis / unit kerja" />
          <Textarea label="Ringkasan" required rows={3} maxLength={300} value={form.ringkasan} error={formErr.ringkasan} onChange={setField('ringkasan')} placeholder="Ringkasan singkat artikel (maks. 300 karakter)" />
          <Textarea label="Konten" required rows={8} maxLength={3000} value={form.konten} error={formErr.konten} onChange={setField('konten')} placeholder="Isi lengkap artikel..." />
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Hapus Artikel"
        size="sm"
        footer={
          <>
            <Button variant="neutral" onClick={() => setDeleteId(null)}>Batal</Button>
            <Button variant="danger" onClick={confirmDelete}>Hapus</Button>
          </>
        }
      >
        <p className="text-sm text-neutral-600">Yakin ingin menghapus artikel ini? Tindakan tidak dapat dibatalkan.</p>
      </Modal>
    </div>
  )
}
