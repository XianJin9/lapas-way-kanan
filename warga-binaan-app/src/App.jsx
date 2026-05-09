import { Routes, Route } from 'react-router-dom'
import { PageLayout }    from './components/layout'
import { AdminLayout, ProtectedRoute } from './components/admin'
import Home            from './pages/Home'
import Login           from './pages/Login'
import Register        from './pages/Register'
import LupaPassword    from './pages/LupaPassword'
import KunjunganDaftar from './pages/KunjunganDaftar'
import MasaTahanan     from './pages/MasaTahanan'
import Pengaduan       from './pages/Pengaduan'
import Berita          from './pages/Berita'
import Kontak          from './pages/Kontak'
import Penitipan       from './pages/Penitipan'
import Syarat          from './pages/Syarat'
import Privasi         from './pages/Privasi'
import NotFound        from './pages/NotFound'
import Dashboard       from './pages/admin/Dashboard'
import BeritaAdmin     from './pages/admin/BeritaAdmin'
import KunjunganAdmin  from './pages/admin/KunjunganAdmin'
import PengaduanAdmin  from './pages/admin/PengaduanAdmin'

export default function App() {
  return (
    <Routes>
      {/* Halaman publik dengan Header + Footer */}
      <Route element={<PageLayout />}>
        <Route index              element={<Home />} />
        <Route path="kunjungan"    element={<KunjunganDaftar />} />
        <Route path="masa-tahanan" element={<MasaTahanan />} />
        <Route path="pengaduan"    element={<Pengaduan />} />
        <Route path="berita"       element={<Berita />} />
        <Route path="berita/:id"   element={<Berita />} />
        <Route path="kontak"       element={<Kontak />} />
        <Route path="penitipan"    element={<Penitipan />} />
        <Route path="syarat"       element={<Syarat />} />
        <Route path="privasi"      element={<Privasi />} />
      </Route>

      {/* Auth pages */}
      <Route path="/login"          element={<Login />} />
      <Route path="/register"       element={<Register />} />
      <Route path="/lupa-password"  element={<LupaPassword />} />

      {/* Admin pages — protected */}
      <Route
        path="/admin"
        element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
      >
        <Route index             element={<Dashboard />} />
        <Route path="berita"     element={<BeritaAdmin />} />
        <Route path="kunjungan"  element={<KunjunganAdmin />} />
        <Route path="pengaduan"  element={<PengaduanAdmin />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
