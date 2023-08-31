import { useNavigate, useParams } from 'react-router-dom'
import { image0, image2 } from '../../assets'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish, Clear, PersonAdd } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, updateUser } from '../../redux/actions/user'
import { Upload } from '../../components'
import { useState, useRef, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useStateContext } from '../../contexts/ContextProvider'
import { CircularProgress } from '@mui/material'
import { deleteImageReducer } from '../../redux/reducers/general'

const User = () => {

    //////////////////////////////////////// Variables ////////////////////////////////////////
    const { userId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser, isFetching, error } = useSelector(state => state.user)
    const { url } = useSelector(state => state.general)
    const { currentColor } = useStateContext()

    //////////////////////////////////////// States ////////////////////////////////////////
    const [userData, setUserData] = useState(currentUser)

    //////////////////////////////////////// UseEffects ////////////////////////////////////////
    useEffect(() => {
        dispatch(getUser(userId))        // use useMemo here 
    }, [userId])
    useEffect(() => {
        setUserData(currentUser)
    }, [currentUser])
    useEffect(() => {
        setUserData({ ...userData, image: url })
    }, [url])

    //////////////////////////////////////// Functions ////////////////////////////////////////
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser(userId, userData, navigate))
    }
    const handleChange = (e) => {
        e.preventDefault()
        setUserData({ ...userData, [e.target.name]: e.target.value })
        dispatch(deleteImageReducer())
    }



    return (
        <>
            {error && <div className="w-full bg-light-red text-center py-[8px] font-medium rounded-[4px] ">{error}</div>}
            {
                isFetching
                    ?
                    <div className="flex justify-center items-center min-h-[25rem] ">
                        <CircularProgress style={{}} />
                    </div>
                    :
                    <div className='flex-[4] h-full ' >

                        <div className="w-full pt-[12px] pb-[2rem] " >
                            {/* title */}
                            <div className="userTitleContainer flex items-center justify-between ">
                                <h1 className="userTitle font-bold text-[24px]  ">User</h1>
                                <Link to='/user/new' >
                                    <button style={{ background: currentColor }} className="py-[4px] px-[1rem] rounded-[4px] cursor-pointer bg-darkBlue text-white text-[16px]  ">Create</button>
                                </Link>
                            </div>


                            <div className="userContainer flex flex-col gap-[20px] mt-[20px] ">
                                {/* view user */}
                                <div className="bg-white flex flex-wrap lg:flex-nowrap justify-between gap-[1rem] w-full p-[20px] shadow-box ">
                                    <div className="md:flex-[1] min-w-[14rem] flex flex-col items-center gap-[12px] w-full  " >
                                        <img src={userData?.image || image2} alt="" className=" w-[7rem] h-[7rem] rounded-full object-cover " />
                                        <div className=" flex flex-col items-center ">
                                            <span className=" font-semibold capitalize ">{userData?.username}</span>
                                            <span className=" font-light ">Software Engineer</span>
                                        </div>
                                    </div>
                                    <div className="md:flex-[1] min-w-[14rem] ">
                                        <h4 className=" text-[18px] font-semibold text-lightGray ">Account Details</h4>
                                        <div className=" flex items-center gap-[12px] my-[10px] text-gray capitalize "><PermIdentity style={{ fontSize: '18px' }} /><span className="">{userData?.username}</span></div>
                                        <div className="flex items-center gap-[12px] my-[10px] text-gray "><CalendarToday style={{ fontSize: '18px' }} /><span className="">{userData?.createdAt}</span></div>
                                    </div>
                                    <div className="md:flex-[1] min-w-[14rem] ">
                                        <h4 className=" text-[18px] font-semibold text-lightGray ">Account Contacts</h4>
                                        <div className=" flex items-center gap-[12px] my-[10px] text-gray "><PhoneAndroid style={{ fontSize: '18px' }} /><span className="">{userData?.phone}</span></div>
                                        <div className=" flex items-center gap-[12px] my-[10px] text-gray "><MailOutline style={{ fontSize: '18px' }} /><span className="">{userData?.email}</span></div>
                                        <div className=" flex items-center gap-[12px] my-[10px] text-gray capitalize"><LocationSearching style={{ fontSize: '18px' }} /><span className="">{userData?.country} | {userData?.city}</span></div>
                                    </div>
                                </div>

                                {/* edit user */}
                                <div className="userUpdate w-full p-[20px] box-shadow">
                                    <h4 className=" text-[24px] font-semibold text-lightGray ">Edit</h4>

                                    <form onSubmit={handleSubmit} className="newUserForm flex flex-wrap gap-[20px] " >
                                        {/* image */}
                                        <div className="newUserItem w-full flex justify-center md:items-start items-center flex-col">
                                            <Upload image={userData?.image} isMultiple={false} />
                                        </div>
                                        {/* username */}
                                        <div className="newUserItem lg:w-[31%] md:w-[47%] sm:w-[47%] w-full flex flex-col">
                                            <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >username</label>
                                            <input onChange={handleChange} value={userData?.username} name='username' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="text" placeholder="username" />
                                        </div>
                                        {/* email */}
                                        <div className="newUserItem lg:w-[31%] md:w-[47%] sm:w-[47%] w-full flex flex-col">
                                            <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >email</label>
                                            <input onChange={handleChange} value={userData?.email} name='email' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="email" placeholder="email" />
                                        </div>
                                        {/* password */}
                                        <div className="newUserItem lg:w-[31%] md:w-[47%] sm:w-[47%] w-full flex flex-col">
                                            <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >password</label>
                                            <input onChange={handleChange} value={userData?.password} name='password' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="password" placeholder="password" />
                                        </div>
                                        {/* country */}
                                        <div className="newUserItem lg:w-[31%] md:w-[47%] sm:w-[47%] w-full flex flex-col">
                                            <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >country</label>
                                            <input onChange={handleChange} value={userData?.country} name='country' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="text" placeholder="country" />
                                        </div>
                                        {/* city */}
                                        <div className="newUserItem lg:w-[31%] md:w-[47%] sm:w-[47%] w-full flex flex-col">
                                            <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >city</label>
                                            <input onChange={handleChange} value={userData?.city} name='city' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="text" placeholder="city" />
                                        </div>
                                        {/* phone */}
                                        <div className="newUserItem lg:w-[31%] md:w-[47%] sm:w-[47%] w-full flex flex-col">
                                            <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >phone</label>
                                            <input onChange={handleChange} value={userData?.phone} name='phone' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="number" placeholder="phone" />
                                        </div>
                                        {/* buttons */}
                                        <div className=" w-full flex justify-start " >
                                            <button type='submit' style={{ background: currentColor }} className="text-white px-[1rem] py-[8px] rounded-[8px] ">
                                                {isFetching ? 'Loading...' : 'Update'}
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>

                        </div>

                    </div>
            }
        </>
    )
}

export default User;