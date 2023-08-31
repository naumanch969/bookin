import { ArrowLeft, ArrowRight, Cancel, LocationCityOutlined } from '@mui/icons-material'
import { Footer, Header, MailList, Navbar } from '../../components'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { image1, image2, image3, image4, image5, image6, image7, image8, image9, image0, } from '../../assets'
import { Modal } from '@mui/material'
import { useFetch } from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import Reserve from './Reserve'
import { useSelector, useDispatch } from 'react-redux'
import { getHotel } from '../../redux/actions/hotel'

const Hotel = () => {

  //////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const hotelId = location.pathname.split('/')[2]
  const { dateRange, options } = useContext(SearchContext)
  const { loggedUser } = useSelector(state => state.user)
  const { currentHotel: hotel, isFetching, error } = useSelector(state => state.hotel)
  const images = [image1, image2, image3, image4, image5, image6]

  //////////////////////////////////////// STATES ///////////////////////////////////////
  const [slideIndex, setSlideIndex] = useState(0)
  const [openImagesSlidere, setOpenImagesSlider] = useState(false)
  const [openReserveModal, setOpenReserveModal] = useState(false)


  //////////////////////////////////////// USE EFFECTS ///////////////////////////////////////
  useEffect(() => {
    dispatch(getHotel(hotelId))
  }, [hotelId])


  //////////////////////////////////////// FUNCTION ///////////////////////////////////////
  const handleMove = (direction) => {
    let newSlideIndex;

    if (direction == 'left') {
      newSlideIndex = slideIndex == 0 ? images.length : slideIndex - 1
    }
    else {
      newSlideIndex = slideIndex == images.length ? 0 : slideIndex + 1
    }
    setSlideIndex(newSlideIndex)

  }
  const handleReserve = () => {
    if (!loggedUser) return navigate('/')
    setOpenReserveModal(true)
  }

  const dayDifference = (date1, date2) => {
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const dayDiff = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return dayDiff
  }
  const days = dateRange && dayDifference(dateRange[0]?.endDate, dateRange[0]?.startDate)


  return (
    <div className=' ' >

      <Navbar />
      <Header />

      {openReserveModal && <Reserve hotelId={hotelId} open={openReserveModal} setOpen={setOpenReserveModal} />}
      <Modal open={openImagesSlidere} >
        <div className="w-screen h-screen  ">

          <div className=" ">
            <Cancel onClick={() => setOpenImagesSlider(false)} className='absolute top-[20px] right-[20px] text-[30px] text-[#555] cursor-pointer ' />
            <ArrowLeft onClick={() => handleMove('left')} className='m-[20px] text-[50px] text-[#555] bg-white cursor-pointer ' />
            <div className="w-full h-full flex justify-center items-center ">
              <img src={images[slideIndex]} alt="" className='w-[80%] h-[80vh] ' />
            </div>
            <ArrowRight onClick={() => handleMove('right')} className='m-[20px] text-[50px] text-[#555] bg-white cursor-pointer ' />
          </div>

        </div>
      </Modal>

      <div className="flex justify-center mt-[20px] ">

        <div className="w-full max-w-[1024px] flex flex-col gap-[10px] relative ">

          {/* reserve button */}
          <button onClick={handleReserve} className='absolute top-[10px] right-0 bg-blue text-white font-bold py-[10px] px-[20px] border-none cursor-pointer rounded-[5px] ' >Reserve or Book Now</button>



          <div className="text-[38px] font-semibold ">{hotel?.title}</div>
          <div className="text-[16px] flex items-center gap-[10px] ">
            <LocationCityOutlined />
            <span>Elton St 123 New York</span>
          </div>
          <span className='text-blue font-medium ' >Excellent locatin - {hotel?.distance}m from center</span>
          <span className='text-green-700 font-medium ' >Book a stay over ${hotel?.cheapestPrice} at this property and get a free airport taxi</span>

          {/* images */}
          <div className="flex flex-wrap justify-between gap-[10px] ">
            {
              hotel?.images.map((image, index) => (
                <div key={index} className="w-[32.65%] h-[20rem] ">
                  <img onClick={() => { setSlideIndex(index); setOpenImagesSlider(true) }} src={image} alt="" className='w-full h-full object-cover ' />
                </div>
              ))
            }
          </div>


          {/* details */}
          <div className="flex justify-between gap-[20px] mt-[20px] ">

            <div className="flex-[3] ">
              <h2 className="text-[28px] font-medium ">{hotel?.title}</h2>
              <p className="text-[14px] mt-[10px] ">{hotel?.description}</p>
            </div>

            <div className="flex-[1] bg-slate-200 rounded-[5px] p-[20px] flex flex-col gap-[20px] ">
              <h2 className='text-[20px] text-[#555] ' >Perfect for a {days}-night stay!</h2>
              <span className='text-[14px] ' >Located in the real heart of {hotel?.city}, this property has an excellent location score of 9.8!</span>
              <h2 className='font-light ' >
                <b>${days * hotel?.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleReserve} className='bg-blue text-white border-none py-[10px] px-[20px] cursor-pointer rounded-[5px] ' >Reserve or Book Now</button>
            </div>

          </div>


        </div>
      </div>


      <MailList />
      <Footer />


    </div>
  )
}

export default Hotel