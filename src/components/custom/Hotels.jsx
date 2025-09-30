import React from 'react'
import place from "../../assets/place.jpg";

function Hotels({trip}) {
  return (
    <div>
        {/* <h2 className='font-bold text-xl mt-5'> Hotel Recommendations</h2>


        <div>
            {trip?.tripData?.hotels?.map((item,i)=>(
                <div>
                    <img src={place} className='rounded-xl' />
                 
                </div>

            )
        )
            }
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 border-gray-700">
        {trip?.tripData?.hotels?.map((item, i) => (
          

            <div className='my-2 hover:scale-105 transition-all cursor-pointer'>
                <div key={i} className="border p-3 rounded-lg shadow-md">
            <img src={place} className="rounded-xl w-full h-40 object-cover" />
                <h3 className="font-bold capitalize  mt-2">📌{item?.hotelName}</h3>
            <br></br>
            <p className="text-gray-800 text-sm mx-3">{item?.description}</p>
            <p className="text-sm font-medium text-gray-800mt-1 mx-3">Rating: {item?.rating} ⭐</p>
            <p className="text-sm font-semibold text-right mt-1">Price: {item?.price} /day</p>
            
             

            </div>
            
          </div>
        ))}
      </div>
      
    </div>
  )
}


export default Hotels
