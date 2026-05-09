import { Link } from 'react-router-dom'
import { Alert, Card } from '../components/ui'
import useDocumentTitle from '../hooks/useDocumentTitle'

const BARANG_DIIZINKAN = [
  'Pakaian bersih (maks. 5 stel)',
  'Makanan ringan dalam kemasan tersegel',
  'Perlengkapan mandi (sabun, pasta gigi, sikat gigi)',
  'Al-Quran / kitab suci',
  'Buku pelajaran / novel (non-pornografi)',
  'Obat-obatan dengan resep dokter',
]

const BARANG_DILARANG = [
  'Uang tunai (wajib melalui loket penitipan)',
  'Handphone dan perangkat elektronik',
  'Senjata tajam / benda berbahaya',
  'Alkohol dan narkotika',
  'Makanan tidak dalam kemasan / masakan rumah',
  'Dokumen tidak resmi',
]

const PROSEDUR = [
  { no: '01', judul: 'Datang ke loket', isi: 'Kunjungi Loket Penitipan di gedung utama Lapas pada jam pelayanan.' },
  { no: '02', judul: 'Siapkan identitas', isi: 'Tunjukkan KTP/identitas asli dan sebutkan nama serta nomor registrasi WBP yang dituju.' },
  { no: '03', judul: 'Serahkan titipan', isi: 'Petugas akan memeriksa barang/uang. Uang diterima maks. Rp 500.000 per transaksi.' },
  { no: '04', judul: 'Terima bukti', isi: 'Simpan bukti penitipan yang diberikan petugas sebagai referensi apabila diperlukan.' },
]

export default function Penitipan() {
  useDocumentTitle('Penitipan Uang & Barang')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-primary-700 transition-colors">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-900 font-medium" aria-current="page">Penitipan Uang & Barang</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Penitipan Uang & Barang</h1>
      <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
        Keluarga dapat menitipkan uang dan barang tertentu kepada warga binaan melalui
        loket pelayanan resmi Lapas Way Kanan.
      </p>

      <Alert variant="info" className="mb-8">
        <strong>Layanan online sedang dalam pengembangan.</strong> Untuk saat ini, penitipan uang dan barang
        dilakukan langsung di loket pelayanan pada jam kerja.
      </Alert>

      {/* Prosedur */}
      <section className="mb-8" aria-labelledby="prosedur-heading">
        <h2 id="prosedur-heading" className="text-lg font-semibold text-neutral-900 mb-4">
          Prosedur Penitipan
        </h2>
        <div className="space-y-3">
          {PROSEDUR.map(({ no, judul, isi }) => (
            <div key={no} className="flex items-start gap-4 bg-white border border-neutral-200 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-primary-900 text-white text-sm font-bold flex items-center justify-center shrink-0">
                {no}
              </div>
              <div>
                <p className="font-semibold text-neutral-900 text-sm">{judul}</p>
                <p className="text-sm text-neutral-500 mt-0.5 leading-relaxed">{isi}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Batas maksimum */}
      <Card variant="primary" padding="md" className="mb-8">
        <h2 className="text-sm font-semibold text-primary-900 mb-2">Batas Maksimum Penitipan Uang</h2>
        <p className="text-3xl font-bold text-primary-900 mb-1">Rp 500.000</p>
        <p className="text-xs text-primary-700">per transaksi / per kunjungan</p>
        <p className="text-xs text-primary-600 mt-2 leading-relaxed">
          Penitipan uang melebihi batas tidak dapat diproses. Ketentuan dapat berubah
          sewaktu-waktu sesuai kebijakan Lapas.
        </p>
      </Card>

      {/* Barang diizinkan vs dilarang */}
      <section aria-labelledby="barang-heading" className="mb-8">
        <h2 id="barang-heading" className="text-lg font-semibold text-neutral-900 mb-4">
          Daftar Barang
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card variant="default" padding="md">
            <h3 className="text-sm font-semibold text-success-700 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-success-100 rounded-full flex items-center justify-center text-xs font-bold" aria-hidden="true">✓</span>
              Barang yang Diizinkan
            </h3>
            <ul className="space-y-2" role="list">
              {BARANG_DIIZINKAN.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="text-success-600 font-bold shrink-0 mt-0.5" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="default" padding="md">
            <h3 className="text-sm font-semibold text-danger-700 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-danger-100 rounded-full flex items-center justify-center text-xs font-bold" aria-hidden="true">✗</span>
              Barang yang Dilarang
            </h3>
            <ul className="space-y-2" role="list">
              {BARANG_DILARANG.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                  <span className="text-danger-500 font-bold shrink-0 mt-0.5" aria-hidden="true">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <Card variant="filled" padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-base font-semibold text-neutral-900">Datang ke Loket Pelayanan</h2>
            <p className="text-sm text-neutral-500 mt-1">
              Loket Penitipan buka Senin–Jumat, pukul 08.00–14.00 WIB.
              Harap antre dan tunjukkan identitas diri.
            </p>
          </div>
          <Link
            to="/kontak"
            className="inline-flex items-center justify-center h-10 px-4 text-sm font-semibold bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 shrink-0"
          >
            Lihat Alamat & Lokasi
          </Link>
        </div>
      </Card>
    </div>
  )
}
