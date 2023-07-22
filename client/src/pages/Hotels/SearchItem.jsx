import { Link, useNavigate } from 'react-router-dom'
import { image9 } from '../../assets'

const SearchItem = ({ item }) => {

    const navigate = useNavigate()

    return (
        <div className='border-[1px] border-gray-500 p-[10px] rounded-[5px] flex justify-between gap-[20px] mb-[20px] ' >

            <img src={item.images[0]} alt="" className='w-[200px] h-[230px] object-cover ' />

            <div className="flex flex-col gap-[10px] flex-[2] ">
                <h1 className='text-[20px] text-blue ' >{item.title}</h1>
                <span className='text-[14px] ' >{item.distance} from center</span>
                <span className='text-[14px] bg-green-700 text-white w-max p-[3px] rounded-[5px] ' >Free airport taxi</span>
                <span className='text-[14px] font-bold ' >Studion Apartment with Air conditioning</span>
                <span className='text-[12px] ' >{item.description}</span>
                <span className='text-[14px] font-bold text-green-700 ' >Free cancellation</span>
                <span className='text-[14px] text-green-700 '  >You can cancel later, so lock in this great price today!</span>
            </div>

            <div className="flex-[1] flex flex-col justify-between ">

                {
                    item.rating &&
                    <div className="flex justify-between items-center ">
                        <span className='font-semibold ' >Excellent</span>
                        <button className='bg-blue text-white p-[5px] font-bold border-none rounded-[2px] ' >7.7</button>
                    </div>
                }

                <div className="text-right flex flex-col gap-[5px]  ">
                    <span className="text-[24px] ">${item.cheapestPrice}</span>
                    <span className="text-[14px] text-[#555] ">Includes taxes and fees</span>
                    <Link to={`/hotel/${item._id}`} className='bg-blue text-white font-bold py-[5px] px-[10px] w-full rounded-[5px] cursor-pointer ' >See Availability</Link>
                </div>

            </div>

        </div>
    )
}

export default SearchItem