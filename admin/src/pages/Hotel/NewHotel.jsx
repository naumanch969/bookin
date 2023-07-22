import { useSelector, useDispatch } from 'react-redux'
import { createHotel } from '../../redux/actions/hotel'
import { useEffect, useRef, useState } from 'react'
import { Clear, UploadFile } from '@mui/icons-material'
import FileBase from 'react-file-base64'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { getRooms } from '../../redux/actions/room'

const NewHotel = () => {

  //////////////////////////////////////// Variables ////////////////////////////////////////
  const dispatch = useDispatch()
  const { isFetching } = useSelector(state => state.hotel)
  let { rooms, isFetching: isRoomsFetching } = useSelector(state => state.room)
  rooms = rooms.map(room => room.title)
  const { currentColor } = useStateContext()
  const imageRef = useRef(null)
  const navigate = useNavigate()

  //////////////////////////////////////// States ////////////////////////////////////////

  const initialHotelState = { name: '', city: '', address: '', type: '', distance: '', images: [], rooms: [], title: '', description: '', rating: '', cheapestPrice: '', featured: false }
  const [hotelData, setHotelData] = useState(initialHotelState)
  const [images, setImages] = useState([])

  //////////////////////////////////////// UseEffects ////////////////////////////////////////
  useEffect(() => {
    getRooms()
  }, [])

  //////////////////////////////////////// Functions ////////////////////////////////////////
  const handleCreateHotel = (e) => {
    e.preventDefault()
    const { name, city, address, rating, cheapestPrice, type, distance, title, description } = hotelData
    if (!name || !city || !address || !rating || !cheapestPrice || !images || !type || !distance || !title || !description)
      return alert('make sure to provide all the fields.')
    dispatch(createHotel(hotelData))
    // setHotelData(initialHotelState)
  }
  const handleImageButtonClick = (e) => {
    e.preventDefault();
    imageRef.current.querySelector('input[type="file"]').click();
  }
  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value })
  }
  const handleAddImage = (files) => {
    let imagesArr = []
    files.map((img) => {
      console.log(img)
      if (images.includes(img)) {
        console.log('image already exist')
      }
      else {
        imagesArr = imagesArr.concat(img.base64)
      }
    })
    setImages([...images, ...imagesArr])
  }
  const removeImage = (e, img) => {
    e.preventDefault()
    setImages(images.filter(i => i != img))
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
            {
              images?.map((img, index) => (
                <div key={index} className="relative rounded-[8px] overflow-hidden w-[10rem] h-[10rem] p-[8px] flex justify-center items-center  " >
                  <img src={img} alt="" className="w-full h-full object-cover " />
                  <button onClick={(e) => removeImage(e, img)} className="absolute top-[5px] right-[5px] text-black   " ><Clear /></button>
                </div>
              ))
            }
            <div ref={imageRef} id='filebase_image' className="flex justify-center items-center rounded-[8px] h-[10rem] w-[10rem] p-[8px] overflow-hidden bg-gray-300 ">
              <button onClick={handleImageButtonClick} className="flex  justify-center items-center " >
                <UploadFile style={{ fontSize: '4rem', color: '#555' }} />
              </button>
              <FileBase type="file" multiple onDone={(files) => handleAddImage(files)} />
            </div>
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
          {/* rooms */}
          {/* roomNumbers */}
          <div className="w-[48%] flex flex-col">
            <label className="mb-[10px] text-[16px] font-semibold capitalize " >room numbers</label>
            <div style={{ outlineColor: currentColor }} className="relative border-[1px] border-dark-gray px-[12px] h-[40px] rounded-[4px] bg-white ">
              <div className="w-full flex flex-wrap justify-center items-center gap-[8px] ">
                {rooms.map((roomTitle, index) => (
                  <RoomNumber key={index} roomTitle={roomTitle} />
                ))}
              </div>
              <div className="absolute top-full  ">
                {
                  hotelData.rooms.map((room, index) => (
                    <span onClick={() => handleAddRoom(room)} key={index} >{room}</span>
                  ))
                }
              </div>
            </div>
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