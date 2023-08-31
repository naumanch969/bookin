import { useSelector, useDispatch } from 'react-redux'
import { register } from '../../redux/actions/user'
import { useEffect, useRef, useState } from 'react'
import { Clear } from '@mui/icons-material'
import FileBase from 'react-file-base64'
import { PersonAdd } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { Upload } from '../../components'
import { deleteImageReducer } from '../../redux/reducers/general'

const NewUser = () => {

  //////////////////////////////////////// Variables ////////////////////////////////////////
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector(state => state.user)
  const { url } = useSelector(state => state.general)
  const navigate = useNavigate()
  const imageRef = useRef()
  const { currentColor } = useStateContext()

  //////////////////////////////////////// States ////////////////////////////////////////
  const initialUserState = { username: '', email: '', password: '', image: url, country: '', city: '', phone: '', isAdmin: false }
  const [userData, setUserData] = useState(initialUserState)

  //////////////////////////////////////// UseEffects ////////////////////////////////////////
  useEffect(() => {
    setUserData({ ...userData, image: url })
  }, [url])

  //////////////////////////////////////// Functions ////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault()
    const { username, email, password, image, country, city, phone } = userData
    if (!username || !email || !password || !country || !city || !phone)
      return alert('make sure to provide all the fields')
    dispatch(register(userData, navigate, 'toUser'))
    // setUserData(initialUserState)
    dispatch(deleteImageReducer())
  }
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  return (
    <>
      {error && <div className="w-full bg-light-red text-center py-[8px] font-medium rounded-[4px] ">{error}</div>}
      <div className='w-full md:flex-[4] h-full  text-dark-gray ' >

        <div className="w-full pt-[12px] pb-[1rem] " >
          <h1 className="userTitle font-bold text-[32px] mb-[1rem]  ">New User</h1>


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
                {isFetching ? 'Submitting...' : 'Create'}
              </button>
            </div>

          </form>


        </div>

      </div>
    </>
  )
}

export default NewUser;