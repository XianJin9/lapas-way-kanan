import { Link } from 'react-router-dom'
import { Alert } from '../components/ui'
import useDocumentTitle from '../hooks/useDocumentTitle'

const TERAKHIR_DIPERBARUI = '1 Mei 2025'

export default function Syarat() {
  useDocumentTitle('Syarat & Ketentuan')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-primary-700 transition-colors">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-900 font-medium" aria-current="page">Syarat & Ketentuan</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Syarat & Ketentuan</h1>
      <p className="text-neutral-500 text-sm mb-6">
        Terakhir diperbarui: <time dateTime="2025-05-01">{TERAKHIR_DIPERBARUI}</time>
      </p>

      <Alert variant="warning" className="mb-8">
        <strong>Catatan:</strong> Dokumen ini adalah <strong>draf awal</strong> — finalisasi dan pengesahan
        dilakukan oleh Bagian Hukum Lapas Kelas IIB Way Kanan sebelum berlaku secara resmi.
      </Alert>

      <article className="prose prose-neutral max-w-none">
        <section>
          <h2>1. Penerimaan Syarat</h2>
          <p>
            Dengan mengakses dan menggunakan Sistem Informasi Lapas Kelas IIB Way Kanan
            (<em>"Layanan"</em>), Anda menyatakan telah membaca, memahami, dan menyetujui
            seluruh syarat dan ketentuan yang tercantum dalam dokumen ini.
          </p>
          <p>
            Apabila Anda tidak menyetujui syarat ini, harap hentikan penggunaan Layanan
            dan hubungi kami untuk informasi lebih lanjut.
          </p>
        </section>

        <section>
          <h2>2. Akun Pengguna</h2>
          <p>
            Untuk menggunakan fitur tertentu, Anda mungkin diharuskan membuat akun dengan
            memberikan informasi yang akurat dan terkini. Anda bertanggung jawab atas:
          </p>
          <ul>
            <li>Kerahasiaan kata sandi akun Anda</li>
            <li>Seluruh aktivitas yang terjadi di bawah akun Anda</li>
            <li>Pemberitahuan segera kepada kami apabila terjadi akses tidak sah</li>
          </ul>
          <p>
            Satu NIK hanya dapat digunakan untuk satu akun. Pembuatan akun dengan data
            palsu atau duplikat dapat mengakibatkan penonaktifan layanan.
          </p>
        </section>

        <section>
          <h2>3. Kewajiban Pengguna</h2>
          <p>Pengguna wajib:</p>
          <ul>
            <li>Memberikan data yang benar, lengkap, dan tidak menyesatkan</li>
            <li>Menggunakan Layanan hanya untuk keperluan yang sah sesuai peraturan perundang-undangan</li>
            <li>Mematuhi seluruh tata tertib kunjungan yang berlaku di Lapas</li>
            <li>Tidak menyalahgunakan layanan penitipan uang atau barang</li>
          </ul>
        </section>

        <section>
          <h2>4. Larangan</h2>
          <p>Pengguna <strong>dilarang</strong> melakukan hal-hal berikut melalui Layanan ini:</p>
          <ul>
            <li>Menyebarkan informasi yang tidak benar, fitnah, atau menghasut</li>
            <li>Mencoba mengakses sistem secara tidak sah (<em>unauthorized access</em>)</li>
            <li>Menggunakan Layanan untuk kegiatan yang melanggar hukum</li>
            <li>Mengirimkan konten yang mengandung virus atau kode berbahaya</li>
            <li>Mengumpulkan data pengguna lain tanpa izin</li>
          </ul>
          <p>
            Pelanggaran terhadap larangan ini dapat mengakibatkan pemblokiran akun dan/atau
            tindakan hukum sesuai peraturan yang berlaku.
          </p>
        </section>

        <section>
          <h2>5. Pembatasan Layanan</h2>
          <p>
            Lapas Kelas IIB Way Kanan berhak untuk, sewaktu-waktu dan tanpa pemberitahuan
            sebelumnya:
          </p>
          <ul>
            <li>Melakukan pemeliharaan sistem yang dapat menyebabkan gangguan sementara</li>
            <li>Mengubah, menangguhkan, atau menghentikan fitur tertentu</li>
            <li>Memblokir akses pengguna yang melanggar ketentuan ini</li>
          </ul>
          <p>
            Kami tidak bertanggung jawab atas kerugian yang timbul akibat gangguan layanan
            yang tidak dapat kami kendalikan.
          </p>
        </section>

        <section>
          <h2>6. Perubahan Syarat</h2>
          <p>
            Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan
            diberitahukan melalui Layanan dan/atau email terdaftar paling lambat 7 hari
            sebelum berlaku efektif.
          </p>
          <p>
            Penggunaan Layanan setelah tanggal efektif perubahan dianggap sebagai
            persetujuan atas syarat yang baru.
          </p>
          <p>
            Untuk pertanyaan mengenai syarat ini, hubungi kami di{' '}
            <Link to="/kontak">halaman kontak</Link>.
          </p>
        </section>
      </article>
    </div>
  )
}
