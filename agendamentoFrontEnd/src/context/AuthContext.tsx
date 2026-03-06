import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authService } from '../services/authService'
import {
  clearToken,
  clearUserStorage,
  getToken,
  getUserStorage,
  setToken,
  setUserStorage
} from '../lib/storage'
import type { User } from '../types/api'

interface LoginInput {
  email: string
  senha: string
}

interface AuthContextData {
  user: User | null
  token: string | null
  loading: boolean
  login: (payload: LoginInput) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextData | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(getToken())
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = getUserStorage()
    if (saved) {
      try {
        setUser(JSON.parse(saved) as User)
      } catch {
        clearUserStorage()
      }
    }

    const bootstrap = async () => {
      if (!getToken()) {
        setLoading(false)
        return
      }
      try {
        const me = await authService.me()
        setUser(me)
        setUserStorage(JSON.stringify(me))
      } catch {
        clearToken()
        clearUserStorage()
        setTokenState(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    bootstrap()
  }, [])

  async function login(payload: LoginInput) {
    const data = await authService.login(payload)
    setToken(data.token)
    setUserStorage(JSON.stringify(data.user))
    setTokenState(data.token)
    setUser(data.user)
  }

  function logout() {
    clearToken()
    clearUserStorage()
    setTokenState(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      logout,
      isAuthenticated: Boolean(token)
    }),
    [user, token, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de AuthProvider')
  }
  return context
}
