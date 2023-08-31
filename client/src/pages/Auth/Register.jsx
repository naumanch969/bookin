import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Navbar } from '../../components'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import {  register } from '../../redux/actions/user'
import { Person } from '@mui/icons-material'

const Register = () => {

    ///////////////////////////////////////// VARIABLES ////////////////////////////////////////
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetching, error } = useSelector(state => state.user)

    ///////////////////////////////////////// STATES ////////////////////////////////////////
    const [userData, setUserData] = useState({ username: null, password: null, email: null })

    ///////////////////////////////////////// USE EFFECTS ////////////////////////////////////////

    ///////////////////////////////////////// FUNCTIONS ////////////////////////////////////////
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        dispatch(register(userData, navigate))
    }



    return (
        <div className="min-h-screen ">

            <Navbar />

            <div style={{ minHeight: 'calc(100vh - 4rem)' }} className='flex flex-col justify-center items-center gap-[8px] ' >
                <div className="w-[20rem]">
                    <h2 className='font-semibold text-[32px] text-gray-800 text-start w-full ' >Registeration Form</h2>
                </div>
                <form onSubmit={handleRegister} className="flex flex-col gap-[1rem] w-[20rem] h-fit p-[1rem] bg-gray-300 rounded-[4px] ">
                    <div className="flex justify-center items-center">
                        <span className='w-[6rem] h-[6rem] flex justify-center items-center bg-gray-400 rounded-full ' ><Person style={{ fontSize: '64px' }} className='text-gray-900 ' /></span>
                    </div>
                    <input type="text" placeholder='Username' name='username' onChange={handleChange} className='h-[40px] p-[10px] outline-none rounded-[4px] ' />
                    <input type="email" placeholder='Email' name='email' onChange={handleChange} className='h-[40px] p-[10px] outline-none rounded-[4px] ' />
                    <input type="password" placeholder='Password' name='password' onChange={handleChange} className='h-[40px] p-[10px] outline-none rounded-[4px] ' />
                    <button type='submit' className='border-none px-[20px] py-[10px] bg-blue text-white font-bold cursor-pointer rounded-[5px] disabled:bg-[#0071c282] disabled:cursor-not-allowed ' >
                        {isFetching ? 'Submitting...' : 'Register'}
                    </button>
                    <div className="flex justify-center items-center gap-[4px] text-[12px] w-full ">
                        <span className='' >Already have account?</span>
                        <Link to='/auth/login' className='text-[14px] font-medium text-blue ' >Login</Link>
                    </div>
                    {error && <span className='w-full text-center text-red-500 ' >{error}</span>}
                </form>
            </div>

        </div>
    )
}

export default Register