import './App.css'
// import MyBookshelf from './components/MyBookshelf'
import NavBarWithSearch from './components/NavbarWithSearch'
import { useState } from 'react'
import Search from './components/Search'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <>
      <NavBarWithSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <Search searchTerm={searchTerm} />
      {/* <MyBookshelf /> */}
    </>
  )
}

export default App
