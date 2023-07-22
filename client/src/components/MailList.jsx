import React from 'react'

const MailList = () => {
    return (
        <div className='w-full my-[50px] flex flex-col items-center gap-[20px] py-[7rem] bg-blue text-white ' >

            <h1 className='text-[40px] font-bold ' >Save time, save money!</h1>
            <p className='text-[18px]  ' >Sign and we'll send the best deals to you</p>
            <div className="flex gap-[8px] ">
                <input type="email" placeholder='Your Email' className='w-[300px] h-[44px] px-[12px] border-none outline-none rounded-[5px] ' />
                <button className='bg-light-blue h-[44px] px-[12px] text-white font-medium border-none rounded-[5px] cursor-pointer ' >Subscribe</button>
            </div>

        </div>
    )
}

export default MailList