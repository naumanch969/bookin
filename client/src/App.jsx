import { Home, Hotel, Hotels, Login } from "./pages"
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'


const App = () => {



  return (
    <div className="">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<Hotels />} />
        <Route path='/hotel/:hotelId' element={<Hotel />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>

    </div>
  )
}

export default App