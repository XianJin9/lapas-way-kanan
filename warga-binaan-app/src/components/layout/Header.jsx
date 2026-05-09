import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const DEFAULT_NAV = [
  { label: 'Beranda',   to: '/' },
  { label: 'Kunjungan', to: '/kunjungan' },
  { label: 'Informasi', to: '/informasi' },
  { label: 'Pengaduan', to: '/pengaduan' },
  { label: 'Berita',    to: '/berita' },
]

export default function Header({
  navItems = DEFAULT_NAV,
  currentPath = '/',
  user,
  onLogout,
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [currentPath])

  return (
    <header className="bg-primary-900 shadow-lg sticky top-0 z-40" role="banner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
            aria-label="Beranda Lapas Way Kanan"
          >
            <div className="w-9 h-9 rounded-full bg-gold-600 flex items-center justify-center shrink-0" aria-hidden="true">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-primary-300 text-xs font-medium uppercase tracking-wide">
                Kemenkumham RI
              </p>
              <p className="text-white text-sm font-semibold">
                Lapas Kelas IIB Way Kanan
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Navigasi utama">
            {navItems.map(({ label, to }) => {
              const active = currentPath === to || (to !== '/' && currentPath.startsWith(to))
              return (
                <Link
                  key={to}
                  to={to}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary-700 text-white'
                      : 'text-primary-200 hover:bg-primary-800 hover:text-white',
                  ].join(' ')}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Right area */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-primary-200 text-sm">{user.name}</span>
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-primary-300 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-primary-800 transition-colors"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden lg:inline-flex items-center gap-1.5 bg-gold-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-gold-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                Masuk
              </Link>
            )}

            {/* Hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg text-primary-300 hover:text-white hover:bg-primary-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            className="lg:hidden py-3 border-t border-primary-800"
            aria-label="Navigasi mobile"
          >
            <div className="flex flex-col gap-1">
              {navItems.map(({ label, to }) => {
                const active = currentPath === to || (to !== '/' && currentPath.startsWith(to))
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary-700 text-white'
                        : 'text-primary-200 hover:bg-primary-800 hover:text-white',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                )
              })}
              {!user && (
                <Link
                  to="/login"
                  className="mt-2 bg-gold-700 text-white text-sm font-medium px-3 py-3 rounded-lg hover:bg-gold-800 transition-colors text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Masuk
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
