import React from 'react'
import travel from "../../assets/travel.jpg";
import { Button } from '../ui/button';
import { FaShareAlt } from "react-icons/fa";

function Infosection({trip}) {
  return (
    <div>
        <img src={travel} className='h-[340px] w-full object-cover rounded shadow-2xl'/>
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.destination}</h2>
        
            <div className='flex gap-5'>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 '>📅{trip?.userSelection?.days} Day</h2>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 '>💴{trip?.userSelection?.budget} Budget</h2>
              <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 '>😊{trip?.userSelection?.people} People</h2>
            </div>
        
        </div>
        <Button><FaShareAlt /></Button>
        </div>
      
    </div>
  )
}

export default Infosection
