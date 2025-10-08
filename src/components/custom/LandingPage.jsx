import React from 'react'
import { Button } from '../ui/button'
import { Link } from "react-router-dom";
import travelBg from "../../assets/travel.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Main Hero Section */}
      <div 
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${travelBg})` }}
      >
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-emerald-900/60"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        
        {/* Hero Content */}
        <div className='relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-8 pt-24 pb-32'>
          {/* Hierarchical Text Layout */}
          <div className='max-w-6xl mx-auto space-y-8'>
            <div className='mb-6'>
              <span className='inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 text-sm font-semibold rounded-full border border-emerald-400/30 backdrop-blur-sm'>
                ✨ AI-Powered Travel Planning
              </span>
            </div>
            
            <h1 className='font-extrabold text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight'>
              <div className='text-transparent font-semibold bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 mb-4'>
                Discover Your Next
              </div>
              <div className='text-white font-semibold  mb-4'>
                Adventure with
              </div>
              <div className='text-transparent bg-clip-text text-8xl mt-6 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400'>
                Wanderlust AI
              </div>
            </h1>
            
            {/* <p className='text-slate-300 text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed mt-8 font-light'>
              Experience the future of travel planning with our intelligent AI companion that crafts 
              <span className='text-emerald-400 font-medium'> personalized journeys </span> 
              tailored to your dreams and budget.
            </p> */}


             <p className='text-slate-300 text-[1 rem] md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed mt-8 font-light'>
             Your personal trip planner and travel curator, creating 
              <span className='text-emerald-400 font-medium'> custom itineraries </span> 
              tailored to your dreams and budget.
            </p>

            {/* Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget. */}
            
            <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mt-16'>
              <Link to={"/create-trip"}>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-600 hover:via-cyan-600 hover:to-blue-600 text-white px-10 py-4 text-xl font-bold rounded-2xl h-12 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1"
                >
                  🚀 Start Your Journey
                </Button>
              </Link>
              {/* <Button 
                variant="outline"
                size="lg"
                className="border-2 border-slate-400 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-lg font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300"
              >
                📖 Learn More
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      
      
      {/* Enhanced Footer */}
      <footer className='bg-slate-950 border-t border-slate-800'>
        <div className='container mx-auto px-6 py-16'>
          {/* Main Footer Content */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
            {/* Brand Section */}
            <div className='space-y-6'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg'>
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h3 className='text-2xl font-bold text-white'>Wanderlust</h3>
                  <p className='text-xs text-emerald-400 font-medium'>AI Travel Companion</p>
                </div>
              </div>
              <p className='text-slate-400 leading-relaxed'>
                Transforming travel dreams into reality with cutting-edge AI technology. 
                Your personalized journey starts here.
              </p>
              <div className='flex space-x-4'>
                <div className='w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center'>
                  <span className='text-emerald-400 text-sm font-bold'>4.9</span>
                </div>
                <div>
                  <div className='flex text-yellow-400 text-sm'>★★★★★</div>
                  <p className='text-slate-500 text-xs'>Trusted by 50K+ travelers</p>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className='space-y-6'>
              <h4 className='text-lg font-semibold text-white'>Quick Links</h4>
              <ul className='space-y-3'>
                <li><a href="#destinations" className='text-slate-400 hover:text-emerald-400 transition-colors duration-200'>Popular Destinations</a></li>
                <li><a href="#packages" className='text-slate-400 hover:text-emerald-400 transition-colors duration-200'>Travel Packages</a></li>
                <li><a href="#experiences" className='text-slate-400 hover:text-emerald-400 transition-colors duration-200'>Unique Experiences</a></li>
                <li><a href="#blog" className='text-slate-400 hover:text-emerald-400 transition-colors duration-200'>Travel Blog</a></li>
                <li><a href="#support" className='text-slate-400 hover:text-emerald-400 transition-colors duration-200'>24/7 Support</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div className='space-y-6'>
              <h4 className='text-lg font-semibold text-white'>Get in Touch</h4>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center'>
                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className='text-slate-300 text-sm'>info@wanderlust.com</p>
                    {/* <p className='text-slate-500 text-xs'>General inquiries</p> */}
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center'>
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className='text-slate-300 text-sm'>+1 (555) 123-4567</p>
                    {/* <p className='text-slate-500 text-xs'>24/7 Support hotline</p> */}
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center'>
                    <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className='text-slate-300 text-sm'>Mumbai, India</p>
                    {/* <p className='text-slate-500 text-xs'>Headquarters</p> */}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media & Newsletter */}
            <div className='space-y-6'>
              <h4 className='text-lg font-semibold text-white'>Stay Connected</h4>
              <div className='flex space-x-4'>
                {/* <a href="https://instagram.com/wanderlust" target="_blank" rel="noopener noreferrer"  */}
                <a href="#" target="_blank" rel="noopener noreferrer" 
                   className='w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                   className='w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                   className='w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                   className='w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-200'>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <div className='space-y-3'>
                <p className='text-slate-400 text-sm'>Subscribe to our newsletter for travel tips and exclusive deals!</p>
                <div className='flex space-x-2'>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className='flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-400 transition-colors'
                  />
                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 px-4">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className='pt-8 border-t border-slate-800'>
            <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
              <div className='flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6'>
                <p className='text-slate-500 text-sm'>
                  © 2025 Wanderlust AI. All rights reserved.
                </p>
                <div className='flex space-x-6 text-sm'>
                  <a href="#privacy" className='text-slate-500 hover:text-emerald-400 transition-colors'>Privacy Policy</a>
                  <a href="#terms" className='text-slate-500 hover:text-emerald-400 transition-colors'>Terms of Service</a>
                  <a href="#cookies" className='text-slate-500 hover:text-emerald-400 transition-colors'>Cookie Policy</a>
                </div>
              </div>
              <div className='flex items-center space-x-4'>
                <span className='text-slate-500 text-sm'>Powered by</span>
                <div className='flex items-center space-x-2'>
                  <div className='w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded flex items-center justify-center'>
                    <span className='text-white text-xs font-bold'>AI</span>
                  </div>
                  <span className='text-emerald-400 text-sm font-semibold'>Advanced AI Technology</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
