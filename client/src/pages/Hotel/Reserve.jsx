import { Close } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { getHotelRooms } from '../../redux/actions/hotel'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '@mui/material'

const Reserve = ({ open, setOpen, hotelId }) => {

    //////////////////////////////////// VARIABLES /////////////////////////////////////
    const { dateRange } = useContext(SearchContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { hotelRooms, isFetching, error } = useSelector(state => state.hotel)

    //////////////////////////////////// STATES ////////////////////////////////////////
    const [selectedRooms, setSelectedRooms] = useState([])

    //////////////////////////////////// USE EFFECTS ///////////////////////////////////
    useEffect(() => {
        dispatch(getHotelRooms(hotelId))
    }, [])

    //////////////////////////////////// FUNCTIONS ///////////////////////////////////
    const getDates = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        let list
        while (date <= end) {
            list.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }
    }
    const allDates = dateRange && getDates(dateRange[0].startDate, dateRange[0].endDate)
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date =>
            allDates.includes(new Date(date).getTime()))

        return !isFound
    }
    const handleSelect = (e) => {
        const selected = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(room => room !== value))
    }
    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const { data } = axios.put(`/room/availability/${roomId}`, { dates: allDates })
                return data
            }))
            setOpen(false)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    
    console.log(hotelRooms)

    return (
        <Modal open={open} onClose={() => setOpen(false)} className=' w-screen h-screen fixed top-0 left-0 flex justify-center items-center ' >
            <div className="w-[25rem] min-h-[50vh] h-auto max-h-[80vh] overflow-y-scroll bg-white p-[20px] relative ">

                <Close className='absolute top-0 right-0 cursor-pointer ' />
                <span>Select your rooms:</span>


                {
                    hotelRooms.map((room, index) => (
                        <div key={index} className="flex items-center gap-[50px] p-[20px] ">
                            <div className="flex flex-col gap-[5px] ">
                                <div className="font-semibold">{room.title}</div>
                                <div className="font-light">{room.description}</div>
                                <div className="font-medium">Max people <b>{room.capacity}</b></div>
                                <div className="font-medium">{room.price}</div>
                            </div>
                            <div className="flex flex-wrap gap-[5px] text-[10px] text-gray ">
                                {
                                    room.roomNumbers.map((roomNumber, index) => (
                                        <div key={index} className="flex flex-col ">
                                            <label >{roomNumber.number}</label>
                                            <input
                                                type="checkbox"
                                                value={roomNumber._id}
                                                disabled={() => isAvailable(roomNumber)}
                                                onChange={handleSelect} />
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    ))
                }


                <button onClick={handleClick} >Reserve Now!</button>


            </div>
        </Modal>
    )
}

export default Reserve