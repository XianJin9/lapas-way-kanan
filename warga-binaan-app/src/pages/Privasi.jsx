import { Link } from 'react-router-dom'
import { Alert } from '../components/ui'
import useDocumentTitle from '../hooks/useDocumentTitle'

const TERAKHIR_DIPERBARUI = '1 Mei 2025'

export default function Privasi() {
  useDocumentTitle('Kebijakan Privasi')

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-neutral-500 mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-primary-700 transition-colors">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-neutral-900 font-medium" aria-current="page">Kebijakan Privasi</li>
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-neutral-900 mb-1">Kebijakan Privasi</h1>
      <p className="text-neutral-500 text-sm mb-6">
        Terakhir diperbarui: <time dateTime="2025-05-01">{TERAKHIR_DIPERBARUI}</time>
      </p>

      <Alert variant="warning" className="mb-8">
        <strong>Catatan:</strong> Dokumen ini adalah <strong>draf awal</strong> — finalisasi dan pengesahan
        dilakukan oleh Bagian Hukum Lapas Kelas IIB Way Kanan sebelum berlaku secara resmi.
      </Alert>

      <article className="prose prose-neutral max-w-none">
        <p>
          Lapas Kelas IIB Way Kanan (<em>"kami"</em>) berkomitmen melindungi privasi Anda sesuai
          Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) dan
          peraturan perundang-undangan yang berlaku.
        </p>

        <section>
          <h2>1. Data yang Dikumpulkan</h2>
          <p>Kami mengumpulkan data pribadi berikut saat Anda menggunakan Layanan:</p>
          <ul>
            <li><strong>Identitas:</strong> Nama lengkap, Nomor Induk Kependudukan (NIK), tempat dan tanggal lahir</li>
            <li><strong>Kontak:</strong> Nomor telepon/HP, alamat email</li>
            <li><strong>Data kunjungan:</strong> Tanggal kunjungan, sesi, hubungan dengan warga binaan</li>
            <li><strong>Data pengaduan:</strong> Isi laporan, kategori, identitas pelapor (jika tidak anonim)</li>
            <li><strong>Data teknis:</strong> Alamat IP, jenis browser, waktu akses (dikumpulkan secara otomatis)</li>
          </ul>
        </section>

        <section>
          <h2>2. Tujuan Pengumpulan</h2>
          <p>Data Anda digunakan untuk:</p>
          <ul>
            <li>Memproses pendaftaran kunjungan dan verifikasi identitas pengunjung</li>
            <li>Menindaklanjuti pengaduan dan memberikan respons yang sesuai</li>
            <li>Meningkatkan kualitas layanan dan keamanan sistem</li>
            <li>Memenuhi kewajiban pelaporan kepada instansi yang berwenang sesuai ketentuan hukum</li>
            <li>Mengirimkan notifikasi terkait layanan yang Anda gunakan</li>
          </ul>
        </section>

        <section>
          <h2>3. Dasar Hukum</h2>
          <p>Pengumpulan dan pemrosesan data pribadi kami dasarkan pada:</p>
          <ul>
            <li>UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi</li>
            <li>UU No. 12 Tahun 1995 tentang Pemasyarakatan</li>
            <li>Peraturan Menteri Hukum dan HAM terkait tata kelola data pemasyarakatan</li>
            <li>Persetujuan eksplisit yang Anda berikan saat mendaftarkan layanan</li>
          </ul>
        </section>

        <section>
          <h2>4. Penyimpanan & Keamanan Data</h2>
          <p>
            Data Anda disimpan di server yang berlokasi di wilayah Indonesia dan dilindungi
            dengan enkripsi standar industri. Kami menerapkan langkah-langkah keamanan teknis
            dan organisasional untuk mencegah akses tidak sah, kehilangan, atau pengungkapan data.
          </p>
          <p>
            Data kunjungan disimpan selama <strong>5 tahun</strong> sesuai ketentuan arsip
            pemerintah. Data pengaduan yang tidak memerlukan tindak lanjut lebih lanjut akan
            dianonimkan setelah 2 tahun.
          </p>
          <p>
            Kami tidak menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada
            pihak ketiga untuk tujuan komersial.
          </p>
        </section>

        <section>
          <h2>5. Hak Subjek Data</h2>
          <p>Berdasarkan UU PDP, Anda memiliki hak untuk:</p>
          <ul>
            <li><strong>Mengakses</strong> data pribadi yang kami simpan tentang Anda</li>
            <li><strong>Memperbaiki</strong> data yang tidak akurat atau tidak lengkap</li>
            <li><strong>Menghapus</strong> data Anda dalam kondisi yang diizinkan hukum</li>
            <li><strong>Menarik persetujuan</strong> atas pemrosesan data kapan saja</li>
            <li><strong>Mengajukan keberatan</strong> atas pemrosesan data untuk tujuan tertentu</li>
            <li><strong>Portabilitas data</strong> dalam format yang dapat dibaca mesin</li>
          </ul>
          <p>
            Untuk menggunakan hak-hak di atas, hubungi kami melalui informasi kontak di bawah.
          </p>
        </section>

        <section>
          <h2>6. Kontak Data Protection Officer (DPO)</h2>
          <p>
            Apabila Anda memiliki pertanyaan, kekhawatiran, atau ingin menggunakan hak-hak
            privasi Anda, silakan hubungi Petugas Pelindungan Data kami:
          </p>
          <ul>
            <li><strong>Nama/Jabatan:</strong> Petugas Pelindungan Data Pribadi — <em>[placeholder, diisi setelah penunjukan resmi]</em></li>
            <li><strong>Email:</strong> dpo.lapaswaykanan@kemenkumham.go.id <em>(placeholder)</em></li>
            <li><strong>Telepon:</strong> (0723) 000-000</li>
            <li><strong>Alamat:</strong> Jl. Way Kanan No. 1, Blambangan Umpu, Kab. Way Kanan, Lampung 34761</li>
          </ul>
          <p>
            Kami akan merespons permintaan Anda dalam waktu paling lambat <strong>14 hari kerja</strong>.
          </p>
          <p>
            Informasi kontak lengkap tersedia di <Link to="/kontak">halaman kontak</Link> kami.
          </p>
        </section>
      </article>
    </div>
  )
}
