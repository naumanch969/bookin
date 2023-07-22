import React from 'react'
import { DateRange } from 'react-date-range'


const DateRangeComponent = ({ dateRange, setDateRange, setShowDate }) => {

    return (
        <DateRange
            editableDateInputs={true}
            onChange={item => {setDateRange([item.selection]); setShowDate(false)}}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            minDate={new Date()}
            className='absolute top-[50px] z-[20] '
        />
    )
}

export default DateRangeComponent