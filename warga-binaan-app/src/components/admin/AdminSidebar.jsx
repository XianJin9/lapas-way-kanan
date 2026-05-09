import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const NAV = [
  { to: '/admin',           label: 'Dashboard',  icon: '📊', exact: true },
  { to: '/admin/berita',    label: 'Berita',      icon: '📰' },
  { to: '/admin/kunjungan', label: 'Kunjungan',   icon: '👥' },
  { to: '/admin/pengaduan', label: 'Pengaduan',   icon: '📋' },
]

export default function AdminSidebar({ isOpen, onClose, currentPath }) {
  const { logout } = useAuth()
  const navigate   = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside
      className={[
        'fixed top-0 left-0 h-full w-60 bg-primary-950 flex flex-col z-40',
        'transition-transform duration-200',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ].join(' ')}
      aria-label="Navigasi admin"
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-primary-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold-600 flex items-center justify-center shrink-0" aria-hidden="true">
            <span className="text-white font-bold text-xs">L</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold leading-tight truncate">Lapas Way Kanan</p>
            <p className="text-primary-400 text-xs">Panel Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Menu admin">
        {NAV.map(({ to, label, icon, exact }) => {
          const active = exact ? currentPath === to : currentPath.startsWith(to)
          return (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              aria-current={active ? 'page' : undefined}
              className={[
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-primary-700 text-white'
                  : 'text-primary-300 hover:bg-primary-800 hover:text-white',
              ].join(' ')}
            >
              <span aria-hidden="true">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-primary-800 space-y-0.5 shrink-0">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-400 hover:bg-primary-800 hover:text-white transition-colors"
        >
          <span aria-hidden="true">🌐</span>
          Lihat Situs Publik
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-400 hover:bg-danger-800/30 hover:text-danger-400 transition-colors text-left"
        >
          <span aria-hidden="true">🚪</span>
          Keluar
        </button>
      </div>
    </aside>
  )
}
