import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function PageLayout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header currentPath={pathname} />
      <main id="main-content" className="flex-1" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
