import { Home, Hotel, Hotels, Login, Register } from "./pages"
import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components'
import { useSelector } from "react-redux"


const App = () => {

  const { loggedUser } = useSelector(state => state.user)

  return (
    <div className="">

      {
        !loggedUser
          ?
          <Routes>
            <Route exact path='/auth/login' element={<Login />} />
            <Route exact path='/auth/register' element={<Register />} />
            <Route path='/' element={<Navigate to='/auth/login' />} />
            <Route path='/:anyotherRoute' element={<Navigate to='/auth/login' />} />
          </Routes>
          :
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/hotels' element={<Hotels />} />
            <Route path='/hotel/:hotelId' element={<Hotel />} />
            <Route path='/auth/login' element={<Navigate to='/' />} />
            <Route path='/auth/register' element={<Navigate to='/' />} />
          </Routes>
      }

    </div>
  )
}

export default App