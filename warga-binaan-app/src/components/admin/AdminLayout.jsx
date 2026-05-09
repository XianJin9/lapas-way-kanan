import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import AdminSidebar from './AdminSidebar'

const PAGE_TITLES = {
  '/admin':           'Dashboard',
  '/admin/berita':    'Kelola Berita',
  '/admin/kunjungan': 'Kelola Kunjungan',
  '/admin/pengaduan': 'Kelola Pengaduan',
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()
  const { pathname } = useLocation()

  const pageTitle = PAGE_TITLES[pathname] ?? 'Admin'

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-neutral-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={pathname}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        {/* Top bar */}
        <header className="bg-white border-b border-neutral-200 px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Buka menu navigasi"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-base font-semibold text-neutral-900">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              Lihat Situs
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center text-white text-xs font-bold shrink-0" aria-hidden="true">
                {user?.nama?.charAt(0)?.toUpperCase() ?? 'A'}
              </div>
              <span className="hidden sm:block text-sm font-medium text-neutral-700 max-w-[120px] truncate">
                {user?.nama ?? 'Admin'}
              </span>
            </div>
          </div>
        </header>

        <main id="admin-content" className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
