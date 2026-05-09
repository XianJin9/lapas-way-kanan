import { useContext } from 'react'
import AuthContext from '../contexts/authContextDef'

export default function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus digunakan di dalam AuthProvider')
  return ctx
}
