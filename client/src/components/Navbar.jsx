import { Avatar } from '@mui/material'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const { loggedUser } = useSelector(state => state.user)

  return (
    <div className='h-[4rem] bg-blue flex justify-center ' >
      <div className="flex justify-between items-center w-full max-w-[1024px] text-white ">

        <Link to='/' className="font-medium text-[28px] ">book*in</Link>

        {
          loggedUser
            ?
            <div className="flex justify-center items-center gap-[8px] ">
              <span className='capitalize' >{loggedUser.username}</span>
              <Avatar className='capitalize' >{loggedUser.username[0]}</Avatar>
            </div>
            :
            <div className="flex gap-[20px] ">
              <Link to='/auth/register' className="p-[5px] px-[10px] rounded-[5px] cursor-pointer bg-white text-blue ">Register</Link>
              <Link to='/auth/login' className="p-[5px] px-[10px] rounded-[5px] cursor-pointer bg-white text-blue ">Login</Link>
            </div>
        }

      </div>
    </div>
  )
}

export default Navbar