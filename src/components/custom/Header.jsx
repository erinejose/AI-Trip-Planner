import React from 'react'
import { Button } from '../ui/button'
import logo from "../../assets/logoo.jpg";
import coverimage from "../../assets/cover.webp";

const Header = () => {
  return (
    <div className=' p-3 px-5 shadow-sm flex justify-between items-center sticky top-0 bg-white/85 border-amber-900 ' > 
    {/* <div className="absolute inset-0 bg-black/40"></div> */}
    
      {/* <img src='./logo.svg'/> */}
        <img className='h-[53px]' src={logo}/>
      <div className='flex justify-evenly items-center'>
        <div className='font-semibold text-xl text-amber-900  mx-5'>Home</div>
        <div className='font-semibold text-xl 
         text-amber-900 mx-5'>Explore </div>
        <div className='font-semibold text-xl  text-amber-900    mx-5'> Blogs </div>
        <div><Button className="bg-orange-950/95 mx-5">Sign In</Button></div>

      </div>
     
      
        {/* <Button className="bg-orange-950">Sign In</Button> */}
      
    </div>
  )
}

export default Header
/* style={{ backgroundImage: `url(${coverimage}) `}}>*/
