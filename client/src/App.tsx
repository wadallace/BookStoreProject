import './App.css'
import NavBarWithSearch from './components/NavbarWithSearch'
import { useState } from 'react'
import Search from './components/Search'
import SignIn from './components/SignIn'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/authContext'

function App() {
  const { isAuthenticated } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')

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
