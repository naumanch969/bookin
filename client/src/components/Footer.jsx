import React from 'react'

const Footer = () => {

  const lists = [
    {
      ul: ['Countries', 'Regions', 'Cities', 'Districts', 'Airports', 'Hotels',]
    },
    {
      ul: ['Countries', 'Regions', 'Cities', 'Districts', 'Airports', 'Hotels',]
    },
    {
      ul: ['Countries', 'Regions', 'Cities', 'Districts', 'Airports', 'Hotels',]
    },
    {
      ul: ['Countries', 'Regions', 'Cities', 'Districts', 'Airports', 'Hotels',]
    },
    {
      ul: ['Countries', 'Regions', 'Cities', 'Districts', 'Airports', 'Hotels',]
    },
  ]

  return (

    <div className='w-full max-w-[1024px] text-[12x] my-[1rem] ' >
      <div className="flex justify-between w-full mb-[50px]  ">

        {
          lists.map((list, index) => (
            <ul key={index} className='list-none p-0 flex flex-col gap-[10px] ' >
              {list.ul.map((li, index) => (
                <li key={index} className='text-blue cursor-pointer ' >{li}</li>
              ))}
            </ul>
          ))
        }

      </div>

      <div className="w-full text-center text-[18px]  ">Copyright &copy; 2023 NC Organization </div>
    </div>
  )
}

export default Footer