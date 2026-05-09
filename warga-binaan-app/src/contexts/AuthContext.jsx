import { useState } from 'react'
import AuthContext from './authContextDef'
import * as authService from '../services/auth.service'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lapas_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  const login = async ({ nik, password, role }) => {
    const data = await authService.login({ nik, password, role })
    const token    = data.token
    const userData = data.user ?? data.data ?? data
    localStorage.setItem('lapas_token', token)
    localStorage.setItem('lapas_user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const refresh = async () => {
    try {
      const data = await authService.getProfile()
      const userData = data.user ?? data.data ?? data
      localStorage.setItem('lapas_user', JSON.stringify(userData))
      setUser(userData)
      return userData
    } catch {
      logout()
      return null
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, refresh, isAdmin: user?.role === 'petugas' }}>
      {children}
    </AuthContext.Provider>
  )
}
