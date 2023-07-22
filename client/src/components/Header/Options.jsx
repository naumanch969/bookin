import React from 'react'

const Options = ({ options, setOptions }) => {


    const handleOptionClick = (name, operation) => {
        setOptions(pre => {
            return {
                ...pre, [name]: operation == 'i' ? options[name] + 1 : options[name] - 1
            }
        })
    }

    return (
        <div style={{ boxShadow: '0px 0px 10px -5px rgba(0,0,0,0.4)' }} className="absolute top-[50px] z-[20] bg-white text-gray-500 rounded-[5px] ">
            <div className="w-[200px] flex justify-between m-[10px] ">
                <span className="">Adult</span>
                <div className='flex items-center gap-[10px] text-[12px] tex-black ' >
                    <button disabled={options.adult <= 1} onClick={() => handleOptionClick('adult', 'd')} className="w-[30px] h-[30px] border-[1px] border-blue text-blue cursor-pointer bg-white rounded-[5px] disabled:cursor-not-allowed ">-</button>
                    <span className="w-[30px] h-[30px] flex justify-center items-center border-[1px] border-blue text-blue cursor-pointer bg-white rounded-[5px] ">{options.adult}</span>
                    <button onClick={() => handleOptionClick('adult', 'i')} className="w-[30px] h-[30px] border-[1px] border-blue text-blue cursor-pointer bg-white rounded-[5px] ">+</button>
                </div>
            </div>
            <div className="w-[200px] flex justify-between m-[10px] ">
                <span className="">Children</span>
                <div className='flex items-center gap-[10px] text-[12px] tex-black ' >
                    <button disabled={options.adult <= 0} onClick={() => handleOptionClick('children', 'd')} className="w-[30px] h-[30px] border-[1px] border-blue text-blue cursor-pointer bg-white rounded-[5px] disabled:cursor-not-allowed ">-</button>
                    <span className="w-[30px] h-[30px] flex justify-center items-center border-[1px] border-blue text-blue cursor-pointer bg-white rounded-[5px] ">{options.children}</span>
                    <button onClick={() => handleOptionClick('children', 'i')} className="w-[30px] h-[30px] border-[1px] border-blue text-blue cursor-pointer bg-white rounded-[5px] ">+</button>
                </div>
            </div>
            <div className="w-[200px] flex justify-between m-[10px] ">
                <span className="">Room</span>
                <div className='flex items-center gap-[10px] text-[12px] tex-black ' >
                    <button disabled={options.adult <= 1} onClick={() => handleOptionClick('room', 'd')} className="w-[30px] h-[30px] border-[1px] border-blue text-blue cursor-pointer bg-white rounded-[5px] disabled:cursor-not-allowed ">-</button>
                    <span className="w-[30px] h-[30px] flex justify-center items-center border-[1px] border-blue text-blue cursor-pointer bg-white rounded-[5px] ">{options.room}</span>
                    <button onClick={() => handleOptionClick('room', 'i')} className="w-[30px] h-[30px] border-[1px] border-blue text-blue cursor-pointer bg-white rounded-[5px] ">+</button>
                </div>
            </div>
        </div>
    )
}

export default Options