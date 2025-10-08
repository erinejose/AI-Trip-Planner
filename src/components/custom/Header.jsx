import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 shadow-2xl'>
      <div className='container mx-auto px-6 py-3 flex justify-between items-center'>
        {/* Logo and Brand */}
        <div className='flex items-center space-x-3'>
          <div className='relative'>
            <div className='w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg'>
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className='absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse'></div>
          </div>
          <div>
            <h1 className='text-2xl font-bold text-white tracking-tight'>Wanderlust</h1>
            <p className='text-xs text-emerald-400 font-medium'>AI Travel Companion</p>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className='hidden lg:flex items-center space-x-8'>
          <a href="#home"  className='text-slate-300 hover:text-emerald-400 transition-all duration-300 font-medium relative group'>
            {/* Destinations */}Home
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full'></span>
          </a>

          <a href="#blogs" className='text-slate-300 hover:text-emerald-400 transition-all duration-300 font-medium relative group'>
            {/* Packages */}Blogs
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full'></span>
          </a>
          {/* <a href="#experiences" className='text-slate-300 hover:text-emerald-400 transition-all duration-300 font-medium relative group'>
            Experiences
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full'></span>
          </a> */}
          <a href="#about" className='text-slate-300 hover:text-emerald-400 transition-all duration-300 font-medium relative group'>
            About
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full'></span>
          </a>
          <a href="#contact" className='text-slate-300 hover:text-emerald-400 transition-all duration-300 font-medium relative group'>
            Contact
            <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full'></span>
          </a>
        </nav>
        
        {/* Action Buttons */}
        <div className='flex items-end space-x-4'>
          {/* <Button 
            variant="ghost" 
            className="text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 hidden md:flex"
          >
            Log In
          </Button> */}
          <Button 
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {/* Get Started */}Sign In
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button className='lg:hidden text-white p-2'>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Header
/* style={{ backgroundImage: `url(${coverimage}) `}}>*/
