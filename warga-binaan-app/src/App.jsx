import { lazy, Suspense } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { PageLayout }    from './components/layout'
import { AdminLayout, ProtectedRoute } from './components/admin'
import { PageLoader }    from './components/ui'
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

// Halaman admin di-lazy-load untuk code splitting
const Dashboard      = lazy(() => import('./pages/admin/Dashboard'))
const BeritaAdmin    = lazy(() => import('./pages/admin/BeritaAdmin'))
const KunjunganAdmin = lazy(() => import('./pages/admin/KunjunganAdmin'))
const PengaduanAdmin = lazy(() => import('./pages/admin/PengaduanAdmin'))

// Layout route perantara untuk Suspense admin
function AdminSuspense() {
  return (
    <Suspense fallback={<PageLoader label="Memuat panel admin..." />}>
      <Outlet />
    </Suspense>
  )
}

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

      {/* Admin pages — protected + lazy-loaded */}
      <Route
        path="/admin"
        element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
      >
        <Route element={<AdminSuspense />}>
          <Route index             element={<Dashboard />} />
          <Route path="berita"     element={<BeritaAdmin />} />
          <Route path="kunjungan"  element={<KunjunganAdmin />} />
          <Route path="pengaduan"  element={<PengaduanAdmin />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
