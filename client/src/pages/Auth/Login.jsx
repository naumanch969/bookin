import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [userData, setUserData] = useState({ username: null, password: null })

    const { loading, error, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch({ type: 'LOGIN_START' })
        try {

            const { data } = await axios.post('http://localhost:4000/user/login', userData)
            dispatch({ type: 'LOGIN_SUCCESS', payload: data.result })
            navigate('/')

        } catch (error) {
            dispatch({ type: 'LOGIN_FAILED', payload: error.response.data })
        }
    }

    return (
        <div className='flex justify-center items-center ' >

            <div className="flex flex-col gap-[10px] w-[30%]  ">
                <input type="text" placeholder='username' name='username' onChange={handleChange} className='h-[30px] p-[10px] outline-none rounded-[4px] ' />
                <input type="password" placeholder='password' name='password' onChange={handleChange} className='h-[30px] p-[10px] outline-none rounded-[4px] ' />
                <button onClick={handleLogin} className='border-none px-[20px] py-[10px] bg-[#0071c2] text-white font-bold cursor-pointer rounded-[5px] disabled:bg-[#0071c282] disabled:cursor-not-allowed ' >Login</button>
                {error && <span>{error.message}</span>}
            </div>

        </div>
    )
}

export default Login