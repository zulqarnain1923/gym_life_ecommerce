
import { useState, useRef, useEffect } from 'react'
import video from '../../assets/video/video.mp4'
import { useNavigate } from 'react-router-dom'



function Hero() {
  const navigation = useNavigate()

  return (
    <>
      <div className="relative w-full h-[480px] ">
        <video src={video} autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 " />
        <div className='absolute h-[100%] w-[100%] flex flex-col items-center up_section ' >
          <p></p>
          <p className='text-white w-[100%] text-[46px] sm:text-[60px] lg:text-[70px]  font-bold text-center mt-[0px] mt-5 sm:pt-5 text_shadow font-[Oswald]' >FORAGE YOUR AURA</p>
          <p className='text-white  text-[14px] sm:text-base md:text-lg max-w-[400px] mx-auto text-center mb-5 text_shadow px-2'>Premium gym wear and lifestyle accessories for the modern sigma male. Elevate your fitness journey.</p>
          <div className='flex items-center justify-evenly w-[390px] mt-4'>
            <button className='bg-green-500 border-none px-3 h-[35px]  sm:h-[45px] text-white  font-bold rounded-3 shadow-[0_0_30px_green] hover:scale-x-115 hover:brightness-110 transition-all duration-400 ease-in-out  ' on onClick={() => navigation('/all/products')}>SHOPE NOW</button>
            <button className=' border-3 border-black px-3 h-[35px] sm:h-[45px] text-white font-bold rounded-3 hover:scale-105 hover:bg-black transition-all duration-500 ease-in-out' onClick={() => document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })}>Explore Collection</button>
          </div>
        </div>
      </div>
    </>
  )
}


export default Hero