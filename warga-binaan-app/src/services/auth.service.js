import api from './api'

export async function login({ nik, password, role }) {
  const { data } = await api.post('/auth/login', { nik, password, role })
  return data
}

export async function register(formData) {
  const { data } = await api.post('/auth/register', formData)
  return data
}

export function logout() {
  localStorage.removeItem('lapas_token')
  localStorage.removeItem('lapas_user')
}

export async function getProfile() {
  const { data } = await api.get('/auth/me')
  return data
}
