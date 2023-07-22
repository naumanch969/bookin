import React from 'react'
import { image6, image7, image8 } from '../../assets'
import { useFetch } from '../../hooks/useFetch'

const Cities = () => {

    const { data, loading, error } = useFetch('/hotel/count/city?cities=madrid,london,paris')

    const cities = [
        {
            image: image6,
            title: 'Madrid',
            properties: data[0]
        },
        {
            image: image7,
            title: 'London',
            properties: data[1]
        },
        {
            image: image8,
            title: 'Paris',
            properties: data[2]
        },
    ]



    return (
        <div className='w-full max-w-[1024px] flex justify-between gap-[20px] z-[10] my-[8px] ' >
            {
                loading
                    ?
                    <span  >Loading....</span>
                    :
                    <>
                        {
                            cities.map((city, index) => (
                                <div key={index} className="relative text-white rounded-[10px] overflow-hidden flex-1 h-[250px] ">
                                    <img src={city.image} alt="" className="w-full h-full object-cover " />
                                    <div className="absolute bottom-[20px] left-[20px] ">
                                        <h2 className='text-[32px] font-bold ' >{city.title}</h2>
                                        <span>{city.properties} properties</span>
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