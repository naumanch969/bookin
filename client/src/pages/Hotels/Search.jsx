import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import {useFetch} from '../../hooks/useFetch'


const Search = ({ destination,  dateRange, options, showDate, setDestination,  setDateRange, setOptions, setShowDate, min, setMin, max, setMax }) => {


    const { reFetch } = useFetch(`/hotel/all?city=${destination}&min=${min || 0}&max=${max || 999999}`)

    const handleSearch = () => {
        reFetch()
    }

    return (
        <div className='w-full p-[10px] ' >

            <h1 className='text-[24px] text-[#555] mb-[10px] ' >Search</h1>

            <div className="flex flex-col gap-[5px] mb-[10px] ">
                <label className='text-[16px] ' >Destination</label>
                <input className='h-[30px] p-[5px] border-none outline-none ' type="text" value={destination} placeholder='Your Destination' onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="flex flex-col gap-[5px] mb-[10px] ">
                <label className='text-[16px] ' >Check-In Date</label>
                <span onClick={() => setShowDate(pre => !pre)} className='h-[30px] p-[5px] bg-white flex items-center cursor-pointer ' >{format(dateRange[0].startDate, 'dd/mm/yyyy')} to {format(dateRange[0].endDate, 'dd/mm/yyyy')}</span>
                {
                    showDate &&
                    <DateRange
                        onChange={item => setDateRange([item.selection])}
                        minDate={new Date()}
                        ranges={dateRange}
                    />
                }
            </div>

            <div className=" ">
                <label className='text-[16px] ' >Options</label>
                <div className="p-[10px] ">
                    <div className="flex justify-between mb-[10px] text-[#555] ">
                        <span className='text-[14px] ' >Min Price <small>per night</small> </span>
                        <input type="number" placeholder='' value={min} onChange={(e) => setMin(e.target.value)} className='w-[50px] ' />
                    </div>
                    <div className="flex justify-between mb-[10px] text-[#555] ">
                        <span className='text-[14px] ' >Max Price <small>per night</small> </span>
                        <input type="number" placeholder='' value={max} onChange={(e) => setMax(e.target.value)} className='w-[50px] ' />
                    </div>
                    <div className="flex justify-between mb-[10px] text-[#555] ">
                        <span className='text-[14px] ' >Adult </span>
                        <input type="number" min={1} placeholder={options.adult} className='w-[50px] ' />
                    </div>
                    <div className="flex justify-between mb-[10px] text-[#555] ">
                        <span className='text-[14px] ' >Children</span>
                        <input type="number" min={0} placeholder={options.adult} className='w-[50px] ' />
                    </div>
                    <div className="flex justify-between mb-[10px] text-[#555] ">
                        <span className='text-[14px] ' >Room </span>
                        <input type="number" min={1} placeholder={options.adult} className='w-[50px] ' />
                    </div>
                </div>

                <button onClick={handleSearch} className='p-[5px] bg-light-blue text-white rounded-[5px] border-none w-full font-medium cursor-pointer ' >Search</button>

            </div>

        </div>
    )
}

export default Search