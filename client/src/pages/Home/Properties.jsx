import { useDispatch, useSelector } from "react-redux"
import { image4, image5, image6, image7, image8 } from "../../assets"
import { useFetch } from "../../hooks/useFetch"
import { useEffect } from "react"
import { getHotels } from "../../redux/actions/hotel"

const FeaturedProperties = () => {

    const dispatch = useDispatch()
    const { hotels, isFetching, error } = useSelector(state => state.hotel)
    const images = [image4, image5, image6, image7, image8]

    const properties = [
        {
            image: image4,
            name: 'Stare Aparthotel Miasto',
            city: 'Madrid',
            price: '$12000',
            rating: '7.8'
        },
        {
            image: image5,
            name: 'Stare Aparthotel Miasto',
            city: 'Madrid',
            price: '$12000',
            rating: '7.8'
        },
        {
            image: image6,
            name: 'Bella Ciao Madrid',
            city: 'Madrid',
            price: '$12000',
            rating: '7.8'
        },
        {
            image: image7,
            name: 'Stare Aparthotel Miasto',
            city: 'Madrid',
            price: '$12000',
            rating: '7.8'
        },
    ]

    useEffect(() => {
        dispatch(getHotels(`featured=${false}&limit=${4}`))
    }, [])

    return (
        <div className="flex flex-col gap-[8px] my-[8px] ">
            <h1 className='w-[1024px] text-[24px] font-medium ' >Homes guests love</h1>

            <div className='w-full max-w-[1024px] flex justify-between gap-[10px] overflow-hidden ' >

                {
                    isFetching
                        ?
                        <span>Loading...</span>
                        :
                        <>
                            {
                                hotels?.map((item, index) => (
                                    <div key={index} className="flex-1 flex flex-col gap-[5px] rounded-[10px] bg-gray-200 ">
                                        <img src={images[index]} alt="" className='w-full h-[15rem] object-cover rounded-t-[10px] ' />
                                        <div className="p-[5px] flex flex-col gap-[4px] ">
                                            <div className='flex flex-col  ' >
                                                <span className='font-medium text-[18px] capitalize ' >{item.name}</span>
                                                <span className='font-light capitalize ' >{item.city} </span>
                                                <span className=' ' >Sarting from <span className="font-medium " >${item.cheapestPrice}</span></span>
                                            </div>
                                            {
                                                item.rating &&
                                                <div className="flex items-center gap-[10px] ">
                                                    <button className='bg-light-blue text-white border-none font-bold p-[2px] rounded-[2px] ' >{item.rating}</button>
                                                    <span className='text-[14px] ' >Excellent</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                }

            </div>
        </div>
    )
}

export default FeaturedProperties