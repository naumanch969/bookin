import React, { useContext, useState } from 'react'
import { Bed, CalendarMonth, DirectionsCar, Flight, LocalTaxi, Person } from '@mui/icons-material'
import 'react-date-range/dist/styles.css'   // main css file
import 'react-date-range/dist/theme/default.css'    // theme css file
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import Options from './Options'
import DateRange from './DateRange'
import { SearchContext } from '../../context/SearchContext'
import { useSelector } from 'react-redux'

const Header = ({ type }) => {

    ////////////////////////////////////// VARIABLES ////////////////////////////////////
    const { dispatch } = useContext(SearchContext)
    const { loggedUser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const items = [
        {
            title: 'Stays',
            icon: Bed
        },
        {
            title: 'Flights',
            icon: Flight
        },
        {
            title: 'Car Rentals',
            icon: DirectionsCar
        },
        {
            title: 'Attractions',
            icon: Bed
        },
        {
            title: 'Airport taxis',
            icon: LocalTaxi
        },
    ]

    ////////////////////////////////////// STATES ////////////////////////////////////
    const [active, setActive] = useState('stays')
    const [destination, setDestination] = useState('')
    const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }])
    const [showDate, setShowDate] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 })

    ////////////////////////////////////// USE EFFECTS ////////////////////////////////////

    ////////////////////////////////////// FUNCTIONS ////////////////////////////////////
    const handleSearch = () => {
        dispatch({ type: 'NEW_SEARCH', payload: { destination, dateRange, options } })
        navigate('/hotels', { state: { destination, dateRange, options } })
    }



    return (
        <div className='bg-blue text-white flex justify-center relative ' >
            <div className={`w-full max-w-[1024px] mt-[20px] mb-[50px] `} >

                <div className="flex gap-[40px] ">

                    {
                        items.map((item, index) => (
                            <div key={index} className={`${active == item.title.toLowerCase() ? 'border-[1px] border-white p-[10px] rounded-[20px] ' : ''} flex items-center gap-[10px] cursor-pointer `}>
                                <item.icon />
                                <span>{item.title}</span>
                            </div>
                        ))
                    }

                </div>



                {
                    type == 'home' &&
                    <div className='flex flex-col gap-[1rem] mt-[2rem] ' >
                        <div className='flex flex-col ' >
                            <h1 className="text-[48px] font-bold ">A lifetime of discounts? It's Genius.</h1>
                            <p className="my-[20px] text-[20px] ">Get rewareded for your travels - unlock insntant savings of 10% or more with a free bookin account </p>
                        </div>
                        {!loggedUser && <Link to='/auth/register' className="bg-light-blue w-max text-white rounded-[4px] font-medium border-none p-[10px] cursor-pointer ">Sing in / Register</Link>}

                        {/* Search inputs */}
                        <div className="h-[60px] bg-white border-[3px] border-[#febb02] w-full max-w-[1024px] flex justify-around items-center py-[1px] rounded-[5px] absolute bottom-[-25px] ">
                            <div className="flex items-center gap-[10px] ">
                                <Bed className='text-gray-300 ' />
                                <input type="text" onChange={(e) => setDestination(e.target.value)} placeholder='Where are you going?' className='text-black outline-none border-none ' />
                            </div>
                            <div className="flex items-center gap-[10px] ">
                                <CalendarMonth className='text-gray-300 ' />
                                <span onClick={() => { setShowDate(pre => !pre); setShowOptions(false) }} className='text-gray-500 cursor-pointer' >{format(dateRange[0].startDate, 'dd/mm/yyyy')} to {format(dateRange[0].endDate, 'dd/mm/yyyy')}</span>
                                {showDate && <DateRange dateRange={dateRange} setDateRange={setDateRange} setShowDate={setShowDate} />}
                            </div>
                            <div className="flex items-center gap-[10px] ">
                                <Person className='text-gray-300 ' />
                                <span onClick={() => { setShowOptions(pre => !pre); setShowDate(false) }} className='text-gray-500 cursor-pointer' >{options.adult} adults . {options.children} children . {options.room} room</span>
                                {showOptions && <Options options={options} setOptions={setOptions} />}
                            </div>
                            <div className="flex items-center gap-[10px] ">
                                <button onClick={handleSearch} className='text-white bg-light-blue px-[.5rem] py-[4px] rounded-[4px] ' >Search</button>
                            </div>
                        </div>

                    </div>
                }


            </div>
        </div>
    )
}

export default Header