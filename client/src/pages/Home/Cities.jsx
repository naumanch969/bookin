import React, { useEffect } from 'react'
import { image5, image6, image7, image8 } from '../../assets'
import { useFetch } from '../../hooks/useFetch'
import { useDispatch, useSelector } from 'react-redux'
import { countHotelsByCityName } from '../../redux/actions/hotel'

const Cities = () => {

    const dispatch = useDispatch()
    const { hotelsCountInCities, isFetching } = useSelector(state => state.hotel)
    const images = [image6, image7, image8]

    useEffect(() => {
        dispatch(countHotelsByCityName('madrid,london,paris'))
    }, [])

    return (
        <div className='w-full max-w-[1024px] flex justify-between gap-[20px] z-[10] my-[8px] ' >
            {
                isFetching
                    ?
                    <span  >Loading....</span>
                    :
                    <>
                        {
                            hotelsCountInCities.map((item, index) => (
                                <div key={index} className="relative text-white rounded-[10px] overflow-hidden flex-1 h-[250px] ">
                                    <img src={images[index]} alt="" className="w-full h-full object-cover " />
                                    <div className="absolute bottom-[20px] left-[20px] ">
                                        <h2 className='text-[32px] font-bold capitalize ' >{item.city}</h2>
                                        <span>{item.count} properties</span>
                                    </div>
                                </div>
                            ))
                        }
                    </>
            }

        </div>
    )
}

export default Cities