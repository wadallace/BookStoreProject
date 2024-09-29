// client/src/context/AuthProvider.tsx
import { useState, ReactNode } from 'react'
import { AuthContext } from './authContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)

  const login = (authToken: string) => {
    setToken(authToken)
  }

  const logout = () => {
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
