import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const { user } = useContext(AuthContext)

  return (
    <div className='h-[4rem] bg-blue flex justify-center ' >
      <div className="flex justify-between items-center w-full max-w-[1024px] text-white ">

        <Link to='/' className="font-medium text-[28px] ">book*in</Link>

        {
          user
            ?
            <span>{user.username}</span>
            :
            <div className="flex gap-[20px] ">
              <button className="p-[5px] px-[10px] rounded-[5px] cursor-pointer bg-white text-blue ">Register</button>
              <button className="p-[5px] px-[10px] rounded-[5px] cursor-pointer bg-white text-blue ">Login</button>
            </div>
        }

      </div>
    </div>
  )
}

export default Navbar