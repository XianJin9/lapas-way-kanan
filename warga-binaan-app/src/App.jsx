import { Routes, Route } from 'react-router-dom'
import { PageLayout } from './components/layout'
import Home            from './pages/Home'
import Login           from './pages/Login'
import Register        from './pages/Register'
import KunjunganDaftar from './pages/KunjunganDaftar'
import MasaTahanan     from './pages/MasaTahanan'
import Pengaduan       from './pages/Pengaduan'
import Berita          from './pages/Berita'
import NotFound        from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      {/* Halaman dengan Header + Footer */}
      <Route element={<PageLayout />}>
        <Route index           element={<Home />} />
        <Route path="kunjungan"    element={<KunjunganDaftar />} />
        <Route path="masa-tahanan" element={<MasaTahanan />} />
        <Route path="pengaduan"    element={<Pengaduan />} />
        <Route path="berita"       element={<Berita />} />
        <Route path="berita/:id"   element={<Berita />} />
      </Route>

      {/* Auth pages — layout tersendiri */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
