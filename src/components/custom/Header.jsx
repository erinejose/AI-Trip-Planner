import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className=' p-3 px-5 shadow-sm flex justify-between items-center'>
      <img src='./logo.svg'/>
     
      <div>
        <Button className="bg-orange-950">Sign In</Button>
      </div>
    </div>
  )
}

export default Header
