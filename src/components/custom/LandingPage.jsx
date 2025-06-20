import React from 'react'
import { Button } from '../ui/button'
import { Link } from "react-router-dom";


const LandingPage = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold mx-3 text-center text-[51px] mt-16'>
     <span className='text-[#901111fc]'>Plan Your Dream Getaway with AI:</span> 
     <span className='text-[#000000]'>Tailored Itineraries, Effortless Travel!</span> 
      </h1>
      <p className='text-gray-600 text-xl'>Your personal trip planner and travel curator,creating custom itineraries tailored to your interest and budget</p>
    <Link to={"/create-trip"}>
    <Button className="bg-orange-950" >Get Started For Free</Button>
    </Link>
    </div>
  )
}

export default LandingPage
