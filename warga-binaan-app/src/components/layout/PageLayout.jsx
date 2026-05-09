import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function PageLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    mainRef.current?.focus()
  }, [pathname])

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:text-primary-900 focus:px-4 focus:py-2.5 focus:rounded-lg focus:shadow-lg focus:font-medium focus:text-sm focus:border focus:border-primary-200"
      >
        Lewati ke konten utama
      </a>
      <Header currentPath={pathname} />
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 outline-none"
        role="main"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
