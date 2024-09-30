import { createContext, useState, ReactNode } from 'react'


interface AuthContextProps {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
  token: string | null
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthContextProviderProps {
  children: ReactNode
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const login = (token: string) => {
    setToken(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setToken(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
