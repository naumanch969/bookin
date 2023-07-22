import { useParams } from 'react-router-dom'
import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish, Clear, PriceCheck, ReduceCapacity, DateRange, RoomOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getRoom, updateRoom } from '../../redux/actions/room'
import { useState, useRef, useEffect } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'

const Room = () => {

    //////////////////////////////////////// Variables ////////////////////////////////////////
    const { id } = useParams()
    const dispatch = useDispatch()
    const fileBase64Ref = useRef(null)
    const { currentRoom: room, isFetching, error } = useSelector(state => state.room)
    const { currentColor } = useStateContext()

    //////////////////////////////////////// States ////////////////////////////////////////
    const fakeRoom = { _id: 415561, title: 'Room 15561', price: 43, description: '1 bathroom, 21 sq meters, two beds, 1 window', capacity: 2, roomNumbers: [101, 102, 103, 104, 105, 106, 17], createdAt: '1 month ago', }
    const [roomData, setRoomData] = useState(fakeRoom)

    //////////////////////////////////////// UseEffects ////////////////////////////////////////
    useEffect(() => {
        dispatch(getRoom(id))        // use useMemo here 
    }, [])


    //////////////////////////////////////// Functions ////////////////////////////////////////
    const handleUpdateRoom = (e) => {
        e.preventDefault()
        dispatch(updateRoom(id, roomData))
    }
    const handleChange = (e) => {
        setRoomData({ ...roomData, [e.target.name]: e.target.value })
    }



    return (
        <>
            {error && <div className="w-full bg-light-red text-center py-[8px] font-medium ">{error}</div>}
            <div className='flex-[4] h-full ' >

                {/* title */}
                <div className="w-full px-[2rem] pt-[12px] pb-[2rem] " >
                    <div className=" flex items-center justify-between ">
                        <h1 className="roomTitle font-bold text-[24px]  ">Edit Room</h1>
                        <Link to='/room/new' >
                            <button style={{ background: currentColor }} className="py-[4px] px-[1rem] rounded-[4px] cursor-pointer bg-darkBlue text-white text-[16px]  ">Create</button>
                        </Link>
                    </div>


                    <div className="roomContainer flex md:flex-row flex-col gap-[20px] mt-[20px] text-dark-gray ">
                        {/* left side - room display */}
                        <div className="flex-1 p-[20px] shadow-box ">
                            {/* top section */}
                            <div className="flex flex-col  gap-[12px] " >
                                <h2 className='text-[24px] font-bold ' >{roomData.title}</h2>
                                <p className='text-[18px] font-light ' >{roomData.description}</p>
                                <span className='flex gap-[12px] font-extralight text-[16px] ' ><PriceCheck />{roomData.price}</span>
                                <span className='flex gap-[12px] font-extralight text-[16px] ' ><ReduceCapacity /> Maximum {roomData.capacity} people</span>
                                <span className='flex gap-[12px] font-extralight text-[16px] ' ><DateRange />{roomData.createdAt}</span>
                                <span className='flex gap-[12px] font-extralight text-[16px] ' ><RoomOutlined />{roomData.roomNumbers.map(room => room + ', ')}</span>
                            </div>
                        </div>

                        {/* right side - edit option */}
                        <div className="flex-[1] p-[20px] shadow-box">
                            <h4 className="text-[24px] font-semibold text-lightGray mb-[12px] ">Edit the room</h4>

                            <form onSubmit={handleUpdateRoom} className="newRoomForm flex flex-col gap-[12px] " >
                                {/* title */}
                                <div className="newRoomItem w-full flex flex-col">
                                    <label className="mb-[10px] text-[16px] capitalize font-semibold text-lightGray " >title</label>
                                    <input onChange={handleChange} value={roomData.title} name='title' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="text" placeholder="title" />
                                </div>
                                {/* description */}
                                <div className="newRoomItem w-full flex flex-col">
                                    <label className="mb-[10px] text-[16px] capitalize font-semibold text-lightGray " >description</label>
                                    <input onChange={handleChange} value={roomData.description} name='description' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="text" placeholder="description" />
                                </div>
                                {/* capacity */}
                                <div className="newRoomItem w-full flex flex-col">
                                    <label className="mb-[10px] text-[16px] capitalize font-semibold text-lightGray " >capacity</label>
                                    <input onChange={handleChange} value={roomData.capacity} name='capacity' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="number" placeholder="capacity" />
                                </div>
                                {/* price */}
                                <div className="newRoomItem w-full flex flex-col">
                                    <label className="mb-[10px] text-[16px] capitalize font-semibold text-lightGray " >price</label>
                                    <input onChange={handleChange} value={roomData.type} name='type' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="number" placeholder="price" />
                                </div>
                                {/* roomNumbers */}
                                <div className="newRoomItem w-full flex flex-col">
                                    <label className="mb-[10px] text-[16px] capitalize font-semibold text-lightGray " >room numbers</label>
                                    <input onChange={handleChange} value={roomData.roomNumbers} name='type' className="h-[20px] px-[12px] py-[20px] blist-[1px] blist-gray-500 rounded-[4px] " type="text" placeholder="separated by commas" />
                                </div>
                                {/* buttons */}
                                <div className=" w-full flex justify-end " >
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

export default Room;