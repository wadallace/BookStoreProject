import './App.css'
import NavBarWithSearch from './components/NavbarWithSearch'
import { useContext, useState } from 'react'
import SignIn from './components/SignIn'
import { Routes, Route, Navigate } from 'react-router-dom'
import MyBookshelf from './components/MyBookshelf'
import Search from './components/Search'
import { AuthContext } from './context/AuthContext'

function App() {
  const authContext = useContext(AuthContext)
  const [searchTerm, setSearchTerm] = useState('')

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthContextProvider')
  }

  const { isAuthenticated } = authContext

  return (
    <>
      {isAuthenticated && (
        <NavBarWithSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      )}
      <Routes>
        <Route
          path='/signin'
          element={<SignIn />}
        />
        <Route
          path='/'
          element={
            isAuthenticated ? <MyBookshelf /> : <Navigate to='/signin' />
          }
        />
        <Route
          path='/search'
          element={
            isAuthenticated ? (
              <Search searchTerm={searchTerm} />
            ) : (
              <Navigate to='/signin' />
            )
          }
        />
      </Routes>
    </>
  )
}

export default App
