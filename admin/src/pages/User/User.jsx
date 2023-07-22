import { useParams } from 'react-router-dom'
import { image0, image2 } from '../../assets'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish, Clear } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, updateUser } from '../../redux/actions/user'
import { useState, useRef, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useStateContext } from '../../contexts/ContextProvider'

const User = ({ users, setUsers }) => {

    //////////////////////////////////////// Variables ////////////////////////////////////////
    const { userId } = useParams()
    const dispatch = useDispatch()
    const fileBase64Ref = useRef(null)
    const { currentUser: user, isFetching, error } = useSelector(state => state.user)
    const fakeUser = { _id: 415561, username: 'Joh Ellen', email: 'email@gmail.com', phone: '+92 300 1230909', country: 'Pakistan', city: 'Lahore', image: image0, createdAt: '1 month ago', }
    const { currentColor } = useStateContext()

    //////////////////////////////////////// States ////////////////////////////////////////
    const [userData, setUserData] = useState(fakeUser)

    //////////////////////////////////////// UseEffects ////////////////////////////////////////
    useEffect(() => {
        dispatch(getUser(userId))        // use useMemo here 
    }, [userId])

    //////////////////////////////////////// Functions ////////////////////////////////////////
    const handleUpdateUser = (e) => {
        e.preventDefault()
        dispatch(updateUser(userId, userData))
    }
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }
    const removeImage = () => {
        setUserData({ ...userData, avatar: '' })
    }



    return (
        <>
            {error && <div className="w-full bg-light-red text-center py-[8px] font-medium ">{error}</div>}
            <div className='flex-[4] h-full ' >

                {/* title */}
                <div className="w-full pt-[12px] pb-[2rem] " >
                    <div className="userTitleContainer flex items-center justify-between ">
                        <h1 className="userTitle font-bold text-[24px]  ">User</h1>
                        <Link to='/newUser' >
                            <button style={{ background: currentColor }} className="py-[4px] px-[1rem] rounded-[4px] cursor-pointer bg-darkBlue text-white text-[16px]  ">Create</button>
                        </Link>
                    </div>


                    <div className="userContainer flex flex-col gap-[20px] mt-[20px] ">
                        {/* view user */}
                        <div className="userShow flex justify-between w-full p-[20px] shadow-box ">
                            <div className="flex-[1] flex flex-col items-center gap-[12px] " >
                                <img src={image2} alt="" className="userShowImage w-[7rem] h-[7rem] rounded-full object-cover " />
                                <div className="userShowTopTitle flex flex-col items-center ">
                                    <span className="userShowUsername font-semibold ">{userData.username}</span>
                                    <span className="userShowUserTitle font-light ">Software Engineer</span>
                                </div>
                            </div>
                            <div className="flex-[1] ">
                                <h4 className="userShowTitle text-[18px] font-semibold text-lightGray ">Account Details</h4>
                                <div className="userShowInfo flex items-center gap-[12px] my-[20px] text-gray "><PermIdentity style={{ fontSize: '18px' }} /><span className="userShowInfoTitle">{userData.username}</span></div>
                                <div className="flex items-center gap-[12px] my-[20px] text-gray "><CalendarToday style={{ fontSize: '18px' }} /><span className="userShowInfoTitle">{userData.createdAt}</span></div>
                            </div>
                            <div className="flex-[1] ">
                                <h4 className="userShowTitle text-[18px] font-semibold text-lightGray ">Account Contacts</h4>
                                <div className="userShowInfo flex items-center gap-[12px] my-[20px] text-gray "><PhoneAndroid style={{ fontSize: '18px' }} /><span className="userShowInfoTitle">{userData.phone}</span></div>
                                <div className="userShowInfo flex items-center gap-[12px] my-[20px] text-gray "><MailOutline style={{ fontSize: '18px' }} /><span className="userShowInfoTitle">{userData.email}</span></div>
                                <div className="userShowInfo flex items-center gap-[12px] my-[20px] text-gray "><LocationSearching style={{ fontSize: '18px' }} /><span className="userShowInfoTitle">{userData.country} | {userData.city}</span></div>
                            </div>
                        </div>

                        {/* edit user */}
                        <div className="userUpdate w-full p-[20px] box-shadow">
                            <h4 className="userShowTitle text-[24px] font-semibold text-lightGray ">Edit</h4>

                            <form onSubmit={handleUpdateUser} className="newUserForm flex flex-wrap gap-[20px] " >
                                {/* image */}
                                <div className="newUserItem w-full flex justify-center md:items-start items-center flex-col">
                                    {
                                        userData.image
                                            ?
                                            <div className="relative w-[10rem] h-[10rem] p-[8px] flex justify-center items-center  " >
                                                <img src={userData.image} alt="" className="w-full h-full object-cover " />
                                                <button onClick={() => removeImage()} className="absolute top-[5px] right-[5px] text-black   " ><Clear /></button>
                                            </div>
                                            :
                                            <div className="w-full flex justify-start items-center ">
                                                <div ref={imageRef} id='filebase_image' className="flex justify-center items-center h-[10rem] w-[10rem] p-[8px] overflow-hidden bg-gray-300 ">
                                                    <button onClick={handleImageButtonClick} className="flex  justify-center items-center " >
                                                        <PersonAdd style={{ fontSize: '4rem', color: '#555' }} />
                                                    </button>
                                                    <FileBase type="file" onDone={(image) => setUserData({ ...userData, image: image.base64 })} />
                                                </div>
                                            </div>}
                                </div>
                                {/* username */}
                                <div className="newUserItem w-[31%] flex flex-col">
                                    <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >username</label>
                                    <input onChange={handleChange} value={userData.username} name='username' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="text" placeholder="username" />
                                </div>
                                {/* email */}
                                <div className="newUserItem w-[31%] flex flex-col">
                                    <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >email</label>
                                    <input onChange={handleChange} value={userData.email} name='email' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="email" placeholder="email" />
                                </div>
                                {/* password */}
                                <div className="newUserItem w-[31%] flex flex-col">
                                    <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >password</label>
                                    <input onChange={handleChange} value={userData.password} name='password' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="password" placeholder="password" />
                                </div>
                                {/* country */}
                                <div className="newUserItem w-[31%] flex flex-col">
                                    <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >country</label>
                                    <input onChange={handleChange} value={userData.country} name='country' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="text" placeholder="country" />
                                </div>
                                {/* city */}
                                <div className="newUserItem w-[31%] flex flex-col">
                                    <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >city</label>
                                    <input onChange={handleChange} value={userData.city} name='city' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="text" placeholder="city" />
                                </div>
                                {/* phone */}
                                <div className="newUserItem w-[31%] flex flex-col">
                                    <label className="mb-[10px] text-[16px] font-semibold text-lightGray " >phone</label>
                                    <input onChange={handleChange} value={userData.phone} name='phone' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="number" placeholder="phone" />
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
        </>
    )
}

export default User;