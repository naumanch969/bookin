import { Link, useNavigate } from "react-router-dom"
import { Navbar } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { register } from "../../redux/actions/user"
import { PersonAdd, Publish } from "@mui/icons-material"
import FileBase from 'react-file-base64'
import { useRef, useState } from "react"
import { SiShopware } from "react-icons/si"
import { useStateContext } from "../../contexts/ContextProvider"

const Register = () => {

    ///////////////////////////////////////  Variables  /////////////////////////////////////////////
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({ username: '', email: '', password: '', country: '', city: '', phone: '', image: '' })
    const { isFetching, error } = useSelector(state => state.user)
    const navigate = useNavigate()
    const imageRef = useRef()
    const { currentColor } = useStateContext()

    ///////////////////////////////////////  States   /////////////////////////////////////////////

    ///////////////////////////////////////  useEffect   /////////////////////////////////////////////

    ///////////////////////////////////////  Functions  /////////////////////////////////////////////
    // 1)
    const handleRegister = (e) => {
        e.preventDefault()
        const { username, email, password, country, city, phone, image } = userData
        if (!username || !email || !password || !country || !city || !phone || !image)
            return alert('make sure to provide all the fields')
        dispatch(register(userData, navigate))
    }
    // 2)
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const handleImageButtonClick = (e) => {
        e.preventDefault();
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }



    return (
        <>
            <div className=" overflow-x-hidden overflow-y-scroll bg-light-teal flex flex-col justify-center items-center relative">

                <div className="w-full flex justify-start sticky top-0 z-50 py-[8px] px-[24px] ">
                    <Link to="/" className="item-center gap-[12px] ml-[12px] mt-[1rem] flex text-xl font-extrabold tracking-tight ddark:text-white text-slate-900 " >   {/* tracking-tight - letter-spacing:-.25rem */}
                        <SiShopware /> <span>Shoppy</span>
                    </Link>
                </div>

                <div className="w-full flex justify-center items-center my-[1rem] ">
                    <div style={{ borderWidth: '2px', borderColor: currentColor }} className="lg:w-[30%] md:w-[40%] sm:w-[70%] w-[90%] flex flex-col gap-[1rem] rounded-[6px] p-[20px] bg-white text-dark-gray " >
                        <h2 className="title capitalize text-[24px] font-semibold " >create an account</h2>
                        <form className="form flex flex-wrap gap-[1rem] " >
                            {

                                userData.image
                                    ?
                                    <div className="w-full flex justify-center items-center ">
                                        <div key={index} className="relative w-[7rem] h-[7rem] p-[8px] rounded-full flex justify-center items-center  " >
                                            <img src={userData.image} alt="" className="rounded-full " />
                                            <button onClick={() => setUserData({ ...userData, image: '' })} className="absolute top-[0px] right-[0px] text-white   " ><Clear /></button>
                                        </div>
                                    </div>
                                    :
                                    <div className="w-full flex justify-center items-center ">
                                        <div ref={imageRef} id='filebase_image' className="flex justify-center items-center h-[7rem] w-[7rem] p-[8px] rounded-full bg-gray-300 ">
                                            <button onClick={handleImageButtonClick} className="flex  justify-center items-center " >
                                                <PersonAdd style={{ fontSize: '4rem', color: '#555' }} />
                                            </button>
                                            <FileBase type="file" onDone={(image) => setUserData({ ...userData, image })} />
                                        </div>
                                    </div>
                            }
                            <input onChange={handleChange} name='username' type="text" placeholder="Username" style={{ outlineColor: currentColor }} className="flex-1 outline-teal border-[1px] rounded-[4px] border-light-gray p-[10px] " />
                            <input onChange={handleChange} name='email' type="email" placeholder="Email" style={{ outlineColor: currentColor }} className="flex-1 outline-teal border-[1px] rounded-[4px] border-light-gray p-[10px] " />
                            <input onChange={handleChange} name='country' type="text" placeholder="Country" style={{ outlineColor: currentColor }} className="flex-1 outline-teal border-[1px] rounded-[4px] border-light-gray p-[10px] " />
                            <input onChange={handleChange} name='city' type="text" placeholder="City" style={{ outlineColor: currentColor }} className="flex-1 outline-teal border-[1px] rounded-[4px] border-light-gray p-[10px] " />
                            <input onChange={handleChange} name='phone' type="number" placeholder="Phone" style={{ outlineColor: currentColor }} className="flex-1 outline-teal border-[1px] rounded-[4px] border-light-gray p-[10px] " />
                            <input onChange={handleChange} name='password' type="password" placeholder="Password" style={{ outlineColor: currentColor }} className="flex-1 outline-teal border-[1px] rounded-[4px] border-light-gray p-[10px] " />
                            <div className="flex justify-end w-full " >
                                <button onClick={handleRegister} style={{ background: currentColor }} className={`w-fit border-none py-[10px] px-[20px] text-white rounded-[2px] cursor-pointer `} >
                                    {isFetching ? 'Loading...' : 'Register'}
                                </button>
                            </div>
                            {error && <p className='text-red-500 ' >something went wrong</p>}
                        </form>
                        <p className='w-full text-center capitalize ' >Already have account? <Link to='/login' style={{ color: currentColor }} > login here</Link> </p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register;