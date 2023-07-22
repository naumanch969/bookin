import { useSelector, useDispatch } from 'react-redux'
import { createRoom } from '../../redux/actions/room'
import { useEffect, useState } from 'react'
import { Clear, Close } from '@mui/icons-material'
import { useStateContext } from '../../contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'

const NewRoom = () => {

  //////////////////////////////////////// Variables ////////////////////////////////////////
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector(state => state.room)
  const navigate = useNavigate()
  const { currentColor } = useStateContext()

  //////////////////////////////////////// States ////////////////////////////////////////

  const initialRoomState = { capacity: '', price: '', roomNumbers: [], title: '', description: '' }
  const [roomData, setRoomData] = useState(initialRoomState)
  const [roomNumbers, setRoomNumbers] = useState([101, 102])
  const [tagValue, setTagValue] = useState('')

  //////////////////////////////////////// UseEffects ////////////////////////////////////////
  useEffect(() => {
    console.log('tagValue', tagValue)
  }, [tagValue])

  //////////////////////////////////////// Functions ////////////////////////////////////////
  const handleCreateRoom = (e) => {
    e.preventDefault()
    const { capacity, price, roomNumbers, title, description } = roomData
    if (!capacity || !price || !roomNumbers || !title || !description)
      return alert('make sure to provide all the fields')
    dispatch(createRoom(roomData))
    // setRoomData(initialRoomState)
  }
  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value })
  }
  const handleAddTag = (e) => {
    e.preventDefault();
    e.key == 'Enter' && setRoomNumbers([...roomNumbers, e.target.value])
    setTagValue('')
  }




  const RoomNumber = ({ roomNumber }) => (
    <span style={{ borderColor: currentColor, borderWidth: '1px', color: currentColor }} className='flex items-center gap-[8px] px-[8px] py-[2px] rounded-[1rem] bg-white ' >
      {roomNumber}
      <Close onClick={() => setRoomNumbers(roomNumbers.filter(r => r != roomNumber))} style={{ border: '1px solid', borderColor: currentColor, borderRadius: '50%', cursor: 'pointer', fontSize: '18px' }} />
    </span>
  )

  return (
    <>
      {error && <div className="w-full bg-light-red text-center py-[8px] font-medium ">{error}</div>}
      <div className='w-full md:flex-[4] h-full ' >

        <div className="w-full px-[2rem] pt-[12px] pb-[2rem] text-dark-gray " >
          <h1 className="roomTitle font-bold text-[32px] mb-[1rem]  ">Create Room</h1>

          <form onSubmit={handleCreateRoom} className="newRoomForm flex flex-wrap gap-[20px] " >
            {/* title */}
            <div className="w-[48%] flex flex-col">
              <label className="mb-[10px] text-[16px] font-semibold capitalize " >title</label>
              <input style={{ outlineColor: currentColor }} onChange={handleChange} value={roomData.title} name='title' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="title" />
            </div>
            {/* description */}
            <div className="w-[48%] flex flex-col">
              <label className="mb-[10px] text-[16px] font-semibold capitalize " >description</label>
              <input style={{ outlineColor: currentColor }} onChange={handleChange} value={roomData.description} name='description' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="text" placeholder="description" />
            </div>
            {/* capacity */}
            <div className="w-[48%] flex flex-col">
              <label className="mb-[10px] text-[16px] font-semibold capitalize " >capacity</label>
              <input style={{ outlineColor: currentColor }} onChange={handleChange} value={roomData.capacity} name='capacity' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="number" placeholder="capacity" />
            </div>
            {/* price */}
            <div className="w-[48%] flex flex-col">
              <label className="mb-[10px] text-[16px] font-semibold capitalize " >price</label>
              <input style={{ outlineColor: currentColor }} onChange={handleChange} value={roomData.type} name='type' className="border-[1px] border-dark-gray h-[20px] px-[12px] py-[20px] rounded-[4px] " type="number" placeholder="price" />
            </div>
            {/* roomNumbers */}
            <div className="w-[48%] flex flex-col">
              <label className="mb-[10px] text-[16px] font-semibold capitalize " >room numbers</label>
              <div style={{ outlineColor: currentColor }} className="border-[1px] border-dark-gray px-[12px] h-[40px] rounded-[4px] flex flex-wrap justify-start items-center gap-[8px] bg-white ">
                {roomNumbers.map((roomNumber, index) => (
                  <RoomNumber key={index} roomNumber={roomNumber} />
                ))}
                <input onChange={(e) => setTagValue(e.target.value)} onKeyDown={handleAddTag} value={tagValue} name='type' className="h-full outline-none " type="number" placeholder="room numbers separated by enter" />
              </div>
            </div>
            {/* buttons */}
            <div className=" w-full flex justify-start " >
              <button type='submit' style={{ background: currentColor }} className="text-white px-[1rem] py-[8px] rounded-[8px] ">
                {isFetching ? 'Loading...' : 'Create'}
              </button>
            </div>

          </form>
        </div>

      </div>
    </>
  )
}

export default NewRoom;