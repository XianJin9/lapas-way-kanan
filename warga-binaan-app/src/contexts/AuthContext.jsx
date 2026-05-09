import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lapas_user')
      if (saved) setUser(JSON.parse(saved))
    } catch { /* ignore malformed data */ }
    setReady(true)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('lapas_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('lapas_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, ready, isAdmin: user?.role === 'petugas' }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus digunakan di dalam AuthProvider')
  return ctx
}
