import { useParams } from 'react-router-dom'
import { image0, image2 } from '../../assets'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish, Clear, LocationCity, LocationOff, LocationCityOutlined, LocationOnOutlined, PriceCheck, PriceChange, SmartDisplayOutlined, AssistWalker, DirectionsWalk, RateReviewOutlined, PersonAdd, Upload, UploadFile } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getHotel, updateHotel } from '../../redux/actions/hotel'
import { useState, useRef, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { Rating } from '@mui/material'
import { useStateContext } from '../../contexts/ContextProvider'

const Hotel = () => {

  //////////////////////////////////////// Variables ////////////////////////////////////////
  const { hotelId } = useParams()
  const dispatch = useDispatch()
  const imageRef = useRef(null)
  const { currentHotel: hotel, isFetching, error } = useSelector(state => state.hotel)
  const fakeHotel = { _id: 415560, name: 'grand hotel 561', city: 'Lahore', address: 'Near Anarkali', rating: 5, cheapestPrice: 45, featured: false, images: [], type: 'resort', distance: '500', title: 'Have a nice time at sam singeston hotel in the heart of lahore', description: 'This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. This is hotel lies amid of the city center having a prime location of area. ' }
  const { currentColor } = useStateContext()

  //////////////////////////////////////// States ////////////////////////////////////////
  const [hotelData, setHotelData] = useState(hotel)
  const [images, setImages] = useState([])

  //////////////////////////////////////// UseEffects ////////////////////////////////////////
  useEffect(() => {
    dispatch(getHotel(hotelId))        // use useMemo here 
  }, [hotelId])

  //////////////////////////////////////// Functions ////////////////////////////////////////
  const handleUpdateHotel = (e) => {
    e.preventDefault()
    console.log(hotelData)
    const { name, city, address, rating, cheapestPrice, type, distance, title, description } = hotelData
      if (!name || !city || !address || !rating || !cheapestPrice || images.length == 0  || !type || !distance || !title || !description)
      return alert('make sure to provide all the fields.')
    dispatch(updateHotel(hotelId, { ...hotelData, images }))
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


  return (
    <>
      {error && <div className="w-full bg-light-red text-center py-[8px] font-medium ">{error}</div>}
      <div className='flex-[4] h-full ' >

        {/* title */}
        <div className="w-full pt-[12px] pb-[2rem] " >
          <div className="hotelTitleContainer flex items-center justify-between ">
            <h1 className="hotelTitle font-bold text-[32px] capitalize ">{hotelData.type}</h1>
            <Link to='/hotel/new' >
              <button style={{ background: currentColor }} className="py-[4px] px-[1rem] rounded-[4px] cursor-pointer bg-darkBlue text-white text-[16px]  ">Create</button>
            </Link>
          </div>


          <div className="hotelContainer flex flex-col gap-[20px] mt-[20px] ">
            {/* view hotel */}
            <div className="hotelShow flex justify-between gap-[1rem] w-full p-[20px] shadow-box ">

              <div className="flex-[4] flex flex-col gap-[12px] text-dark-gray ">
                <h2 className='text-[36px] font-bold capitalize ' >{hotelData.name}</h2>
                <span className='flex gap-[12px] ' ><DirectionsWalk />{hotelData.distance}m from city center</span>
                <span className='flex gap-[12px] ' ><LocationOnOutlined />{hotelData.address}</span>
                <span className='flex gap-[12px] ' ><LocationCity /> {hotelData.city}</span>
                <span className='flex gap-[12px] ' ><PriceChange /> Starting from {hotelData.cheapestPrice}</span>
                <span className='flex gap-[12px] ' ><RateReviewOutlined /><Rating value={Number(hotelData.rating)} /></span>
                <h2 className='text-[20px] font-semibold capitalize ' >{hotelData.title}</h2>
                <p className='text-[15px] font-[400] ' >{hotelData.description}</p>
              </div>


              <div className="flex-[3] flex flex-col items-center gap-[12px] " >
                <img src={hotelData.images[0]} alt="" className="hotelShowImage w-full h-[15rem] object-cover " />
              </div>

            </div>

            {/* edit hotel */}
            <div className="hotelUpdate w-full p-[20px] box-shadow">
              <h4 className="hotelShowTitle text-[28px] font-semibold text-lightGray ">Edit Hotel</h4>

              <form onSubmit={handleUpdateHotel} className="newHotelForm flex flex-wrap gap-[20px] " >
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
                <div className="newHotelItem text-dark-gray w-[31%] flex flex-col">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >name</label>
                  <input onChange={handleChange} value={hotelData.name} name='name' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="name" />
                </div>
                {/* city */}
                <div className="newHotelItem text-dark-gray w-[31%] flex flex-col">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >city</label>
                  <input onChange={handleChange} value={hotelData.city} name='city' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="city" />
                </div>
                {/* address */}
                <div className="newHotelItem text-dark-gray w-[31%] flex flex-col">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >address</label>
                  <input onChange={handleChange} value={hotelData.address} name='address' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="address" />
                </div>
                {/* type */}
                <div className="newHotelItem text-dark-gray w-[31%] flex flex-col">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >type</label>
                  <input onChange={handleChange} value={hotelData.type} name='type' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="type" />
                </div>
                {/* distance */}
                <div className="newHotelItem text-dark-gray w-[31%] flex flex-col">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >distance</label>
                  <input onChange={handleChange} value={hotelData.distance} name='distance' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="distance" />
                </div>
                {/* city */}
                <div className="newHotelItem text-dark-gray w-[31%] flex flex-col">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >title</label>
                  <input onChange={handleChange} value={hotelData.title} name='title' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="title" />
                </div>
                {/* phone */}
                <div className="newHotelItem text-dark-gray w-[31%] flex flex-col">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >description</label>
                  <input onChange={handleChange} value={hotelData.description} name='description' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="Description" />
                </div>
                {/* phone */}
                <div className="newHotelItem text-dark-gray w-[31%] flex flex-col">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >rating</label>
                  <input onChange={handleChange} value={hotelData.rating} name='rating' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="number" placeholder="rating" />
                </div>
                {/* phone */}
                <div className="newHotelItem text-dark-gray w-[31%] flex flex-col">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >cheapestPrice</label>
                  <input onChange={handleChange} value={hotelData.cheapestPrice} name='cheapestPrice' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="number" placeholder="cheapestPrice" />
                </div>
                {/* rooms */}
                <div className="w-full text-dark-gray md:w-[31%] flex flex-col ">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >rooms</label>
                  <select multiple={false} onChange={handleChange} value={hotelData.rooms} name="rooms" className="border-[1px] border-dark-gray h-[40px] px-[12px] w-full rounded-[6px] blist-[1px] blist-gray-500 " >
                    <option value={'room1'}>Room 1</option>
                    <option value={'room2'}>Room 2</option>
                  </select>
                </div>
                {/* featured */}
                <div className="w-full text-dark-gray md:w-[31%] flex flex-col ">
                  <label className="capitalize mb-[10px] text-[16px] font-semibold text-lightGray " >featured</label>
                  <select multiple={false} onChange={handleChange} value={hotelData.featured} name="featured" className="border-[1px] border-dark-gray h-[40px] px-[12px] w-full rounded-[6px] blist-[1px] blist-gray-500 " >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
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

export default Hotel;