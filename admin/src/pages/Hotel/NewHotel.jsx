import { useSelector, useDispatch } from 'react-redux'
import { createHotel } from '../../redux/actions/hotel'
import { useEffect, useRef, useState } from 'react'
import { Clear, Close, UploadFile } from '@mui/icons-material'
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { getRooms } from '../../redux/actions/room'
import { Upload } from '../../components'

const NewHotel = () => {

  //////////////////////////////////////// Variables ////////////////////////////////////////
  const dispatch = useDispatch()
  const { isFetching } = useSelector(state => state.hotel)
  let { rooms, isFetching: isRoomsFetching } = useSelector(state => state.room)
  const { currentColor } = useStateContext()
  console.log(rooms)

  //////////////////////////////////////// States ////////////////////////////////////////

  const initialHotelState = { name: '', city: '', address: '', type: '', distance: '', images: [], rooms: [], title: '', description: '', rating: '', cheapestPrice: '', featured: false }
  const [hotelData, setHotelData] = useState(initialHotelState)
  const [roomsTitle, setRoomsTitle] = useState(rooms = rooms.map(room => ({ title: room.title, _id: room._id })))
  const [images, setImages] = useState([])

  //////////////////////////////////////// UseEffects ////////////////////////////////////////
  useEffect(() => {
    if (rooms.length == 0)
      getRooms()
  }, [rooms])

  //////////////////////////////////////// Functions ////////////////////////////////////////
  const handleCreateHotel = (e) => {
    e.preventDefault()
    const { name, city, address, rating, cheapestPrice, type, distance, title, description } = hotelData
    if (!name || !city || !address || !rating || !cheapestPrice || !images || !type || !distance || !title || !description)
      return alert('make sure to provide all the fields.')
    dispatch(createHotel(hotelData))
    // setHotelData(initialHotelState)
  }
  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value })
  }
  const handleRoomNumbersChange = (e) => {
    console.log(e.target.value)
  }

  const handleAddRoom = (roomTitle) => {
    const roomIds = rooms.map(r => (r.title == roomTitle) && r._id)
    setHotelData({ ...hotelData, rooms: roomIds })
  }

  const handleFilterRoom = (roomTitle) => {
    const rooms = rooms.map(r => (r.title == roomTitle) && r)
    filteredRooms = rooms.filter(room => room.title != roomTitle)
    filteredRoomsIds = filteredRooms.map(fr => fr._id)
    setHotelData({ ...hotelData, rooms: filteredRoomsIds })
  }

  const RoomNumber = ({ roomTitle }) => (
    <span style={{ borderColor: currentColor, borderWidth: '1px', color: currentColor }} className='flex items-center gap-[8px] px-[8px] py-[2px] rounded-[1rem] bg-white ' >
      {roomTitle}
      <Close onClick={() => handleFilterRoom(roomTitle)} style={{ border: '1px solid', borderColor: currentColor, borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }} />
    </span>
  )


  return (
    <div className='w-full md:flex-[4] h-full ' >

      <div className="w-full pt-[12px] pb-[2rem] " >
        <h1 className="hotelTitle font-bold text-[32px] mb-[1rem]  ">New Hotel</h1>

        <form onSubmit={handleCreateHotel} className="newHotelForm flex flex-wrap gap-[20px] text-dark-gray " >
          {/* image */}
          <div className="newHotelItem w-full flex flex-wrap justify-start md:items-start items-center gap-[1rem] ">
            <Upload image={hotelData?.images} isMultiple={true} />
          </div>
          {/* name */}
          <div className="newHotelItem w-[31%] flex flex-col">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >name</label>
            <input onChange={handleChange} value={hotelData.name} name='name' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="name" />
          </div>
          {/* city */}
          <div className="newHotelItem w-[31%] flex flex-col">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >city</label>
            <input onChange={handleChange} value={hotelData.city} name='city' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="city" />
          </div>
          {/* address */}
          <div className="newHotelItem w-[31%] flex flex-col">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >address</label>
            <input onChange={handleChange} value={hotelData.address} name='address' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="address" />
          </div>
          {/* type */}
          <div className="newHotelItem w-[31%] flex flex-col">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >type</label>
            <input onChange={handleChange} value={hotelData.type} name='type' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="type" />
          </div>
          {/* distance */}
          <div className="newHotelItem w-[31%] flex flex-col">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >distance</label>
            <input onChange={handleChange} value={hotelData.distance} name='distance' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="number" placeholder="distance" />
          </div>
          {/* city */}
          <div className="newHotelItem w-[31%] flex flex-col">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >title</label>
            <input onChange={handleChange} value={hotelData.title} name='title' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="title" />
          </div>
          {/* phone */}
          <div className="newHotelItem w-[31%] flex flex-col">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >description</label>
            <input onChange={handleChange} value={hotelData.description} name='description' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="description" />
          </div>
          {/* phone */}
          <div className="newHotelItem w-[31%] flex flex-col">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >rating</label>
            <input onChange={handleChange} value={hotelData.rating} name='rating' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="number" placeholder="rating" />
          </div>
          {/* phone */}
          <div className="newHotelItem w-[31%] flex flex-col">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >cheapestPrice</label>
            <input onChange={handleChange} value={hotelData.cheapestPrice} name='cheapestPrice' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="number" placeholder="cheapestPrice" />
          </div>
          {/* roomNumbers */}
          <div className="w-full md:w-[31%] flex flex-col ">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >room numbers</label>
            <select multiple={true} onChange={handleRoomNumbersChange}  name="roomNumbers" className="border-[1px] border-dark-gray px-[12px] w-full rounded-[6px] " >
              <option value="">Rooms</option>
              {
                roomsTitle.map((roomTitle, index) => (
                  <option value={roomTitle._id} key={index} >{roomTitle.title}</option>
                ))
              }
            </select>
          </div>
          {/* isAdmin */}
          <div className="w-full md:w-[31%] flex flex-col ">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >featured</label>
            <select multiple={false} onChange={handleChange} value={hotelData.featured} name="featured" className="border-[1px] border-dark-gray h-[40px] px-[12px] w-full rounded-[6px] " >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
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
  )
}

export default NewHotel;