import React from 'react'
import { image1, image2, image3, image4, image5 } from '../../assets'
import { useFetch } from '../../hooks/useFetch'

const PropertyTypes = () => {


    const { loading, error, data, } = useFetch('/hotel/count/type')

    const images = [image1, image2, image3, image4, image5]

    return (
        <div className="flex flex-col gap-[8px] my-[8px] ">
            <h1 className='w-[1024px] text-[24px] font-medium ' >Browse by property type</h1>

            <div className='w-full max-w-[1024px] flex justify-between gap-[20px] ' >
                {
                    loading
                        ?
                        <span>Loading...</span>
                        :
                        <>
                            {
                                data?.map((item, index) => (
                                    <div key={index} className="rounded-[10px] bg-gray-200 overflow-hidden cursor-pointer flex-1 ">
                                        <img src={images[index]} alt="" className='w-full h-[150px] object-cover ' />
                                        <div className="p-[5px] ">
                                            <h1 className='text-[18px] capitalize ' >{item?.type}</h1>
                                            <h2 className='text-[14px] font-light ' >{item?.count}</h2>
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

export default PropertyTypes