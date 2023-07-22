import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react"
import { login } from "../../redux/actions/user"
import { SiShopware } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from "../../contexts/ContextProvider"

const Login = () => {

    ///////////////////////////////////////  Variables  /////////////////////////////////////////////
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' })
    const { error } = useSelector(state => state.user)
    const navigate = useNavigate()
    const { currentColor } = useStateContext()

    ///////////////////////////////////////  States   /////////////////////////////////////////////

    ///////////////////////////////////////  useEffect   /////////////////////////////////////////////

    ///////////////////////////////////////  Functions  /////////////////////////////////////////////
    // 1)
    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(login(userData, navigate))
    }
    // 2)
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    return (
        <div className="w-full h-screen min-h-[30rem] bg-light-teal pt-[3rem] flex flex-col justify-center items-center relative">
            <div className="w-full flex justify-start fixed top-0 z-50 py-[8px] px-[24px] ">
                <Link to="/" className="item-center gap-[12px] ml-[12px] mt-[1rem] flex text-xl font-extrabold tracking-tight ddark:text-white text-slate-900 " >   {/* tracking-tight - letter-spacing:-.25rem */}
                    <SiShopware /> <span>Shoppy</span>
                </Link>
            </div>

            <div style={{ borderWidth: '2px', borderColor: currentColor }} className="flex flex-col gap-[1rem] rounded-[6px] p-[20px] lg:w-[30%] md:w-[40%] sm:w-[70%] w-[90%] bg-white text-dark-gray " >
                <h2 className="title capitalize text-[24px] font-semibold " >Sign in</h2>
                <form className="form flex flex-wrap md:flex-row flex-col gap-[1rem] " >
                    <input onChange={handleChange} type="text" name="email" placeholder="email" style={{ outlineColor: currentColor }} className="input outline-teal flex-1 min-w-full border-[1px] rounded-[4px] border-light-gray500 p-[10px] " />
                    <input onChange={handleChange} type="password" name="password" placeholder="password" style={{ outlineColor: currentColor }} className="input outline-teal flex-1 min-w-[40%] border-[1px] rounded-[4px] border-light-gray500 p-[10px] " />
                    <div className="w-full flex justify-start ">
                        <Link to={``} className="my-[6px] text-[14px] underline cursor-pointer " >Forget Password</Link>
                    </div>
                    <div className="flex justify-end w-full " >
                        <button onClick={handleLogin} style={{ background: currentColor }} className={`w-fit border-none py-[10px] px-[20px] text-white rounded-[2px] cursor-pointer `} >Login</button>
                    </div>
                </form>
                {error && <p className='text-red-500 ' >something went wrong</p>}
                <p className='w-full text-center capitalize' >don't have account? <Link to='/auth/register' style={{ color: currentColor }} >Register here</Link> </p>
            </div>

        </div>
    )
}

export default Login;