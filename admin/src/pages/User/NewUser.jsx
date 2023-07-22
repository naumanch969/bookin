import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../redux/actions/user'
import { useEffect, useRef, useState } from 'react'
import { Clear } from '@mui/icons-material'
import FileBase from 'react-file-base64'
import { PersonAdd } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'

const NewUser = ({ users, setUsers }) => {

  //////////////////////////////////////// Variables ////////////////////////////////////////
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector(state => state.user)
  const navigate = useNavigate()
  const imageRef = useRef()
  const { currentColor } = useStateContext()

  //////////////////////////////////////// States ////////////////////////////////////////
  const initialUserState = { username: '', email: '', password: '', image: '', country: '', city: '', phone: '', isAdmin: false }
  const [userData, setUserData] = useState(initialUserState)

  //////////////////////////////////////// UseEffects ////////////////////////////////////////


  //////////////////////////////////////// Functions ////////////////////////////////////////
  const handleCreateUser = (e) => {
    e.preventDefault()
    const { username, email, password, image, country, city, phone } = userData
    if (!username || !email || !password || !image || !country || !city || !phone)
      return alert('make sure to provide all the fields')
    dispatch(register(userData, navigate))
    // setUserData(initialUserState)
  }
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  const handleImageButtonClick = (e) => {
    e.preventDefault();
    imageRef.current.querySelector('input[type="file"]').click();
  }
  const removeImage = () => {
    setUserData({ ...userData, image: '' })
  }

  return (
    <>
      {error && <div className="w-full bg-light-red text-center py-[8px] font-medium ">{error}</div>}
      <div className='w-full md:flex-[4] h-full  text-dark-gray ' >

        <div className="w-full pt-[12px] pb-[1rem] " >
          <h1 className="userTitle font-bold text-[32px] mb-[1rem]  ">New User</h1>

          <form onSubmit={handleCreateUser} className="newUserForm flex flex-wrap gap-[20px] " >
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
                  </div>
              }
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
                {isFetching ? 'Loading...' : 'Create'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </>
  )
}

export default NewUser;