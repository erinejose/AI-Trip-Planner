import React from 'react'
import { Button } from '../ui/button'
import { Link } from "react-router-dom";
import coverimage from "../../assets/coverimage.jpg";
import cover from "../../assets/coverr.jpg";




const LandingPage = () => {
  return (
    // <div
    //   className="h-screen w-full bg-cover bg-center"
    // style={{ backgroundImage: "url('/coverimage.png')" }}>

    //     <div className='flex flex-col items-center mx-56 gap-9'>
    //       <h1 className='font-extrabold mx-3 text-center text-[51px] mt-16'>
    //     <span className='text-[#901111fc]'>Plan Your Dream Getaway with AI:</span> 
    //     <span className='text-[#000000]'>Tailored Itineraries, Effortless Travel!</span> 
    //       </h1>
    //       <p className='text-gray-600 text-xl'>Your personal trip planner and travel curator,creating custom itineraries tailored to your interest and budget</p>
    //     <Link to={"/create-trip"}>
    //     <Button className="bg-orange-950" >Get Started For Free</Button>
    //     </Link>
    //    </div>
    // </div>
    <div
  className="h-screen w-full bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${cover}) `}}
>

  {/* <div className="absolute inset-0 bg-black/40"></div> */}
  <div className='flex flex-col items-center text-center px-4 md:px-20 gap-6 '>
    <h1 className='font-extrabold text-[51px] mt-40'>
      <span className='text-[#901111fc] '>Plan Your Dream Getaway with AI: </span>
      <span className='text-[#000000]'>Tailored Itineraries, Effortless Travel!</span>
    </h1>
    <p className='text-gray-600 text-xl'>
      Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
    </p>
    <Link to={"/create-trip"}>
      <Button className="bg-orange-950 px-6 py-3 rounded-lg hover:bg-orange-800">
        Get Started For Free
      </Button>
    </Link>
  </div>
</div>

  )
}

export default LandingPage
