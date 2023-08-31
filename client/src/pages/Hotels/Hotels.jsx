import React, { useEffect, useState } from 'react'
import { Header, Navbar } from '../../components'
import Search from './Search'
import SearchItem from './SearchItem'
import { useFetch } from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHotels } from '../../redux/actions/hotel'


const List = () => {

  const location = useLocation()
  const dispatch = useDispatch()

  const [destination, setDestination] = useState(location.state.destination)
  const [dateRange, setDateRange] = useState(location.state.dateRange)
  const [options, setOptions] = useState(location.state.options)
  const [showDate, setShowDate] = useState(false)
  const [min, setMin] = useState(false)
  const [max, setMax] = useState(false)
  const { hotels, isFetching, error } = useSelector(state => state.hotel)


  useEffect(() => {
    dispatch(getHotels(`city=${destination}`))
  }, [])


  return (
    <div>

      <Navbar />
      <Header />

      <div className="flex justify-center mt-[20px] ">
        <div className="w-full max-w-[1024px] flex gap-[20px] ">k

          <div className="flex-[1] bg-[#febb02] h-max rounded-[10px] sticky top-[10px] ">
            <Search destination={destination} dateRange={dateRange} options={options} showDate={showDate} setDestination={setDestination} setDateRange={setDateRange} setOptions={setOptions} setShowDate={setShowDate} min={min} setMin={setMin} max={max} setMax={setMax} />
          </div>

          <div className="flex-[3] ">
            {
              isFetching
                ?
                <span>Loading...</span>
                :
                <>
                  {
                    hotels?.map((item, index) => (
                      <SearchItem item={item} key={index} />
                    ))
                  }
                </>
            }
          </div>

        </div>
      </div>


    </div>
  )
}

export default List