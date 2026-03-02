
import { useState, useRef, useEffect } from 'react'
import gym1 from '../../assets/video/gym1.mp4'
import gym2 from '../../assets/video/gym2.mp4'
import gym3 from '../../assets/video/gym3.mp4'



const videos = [gym1, gym2, gym3]
function Hero() {

  const [current, setCurrent] = useState(gym1);
  let count = useRef(1)

  useEffect(() => {

    const interval = setInterval(() => {
      if (count.current + 1 === videos.length) {
        setCurrent(videos[count.current])
        count.current = 0
      }
      else {
        setCurrent(videos[count.current])
        count.current = count.current + 1
      }
    }, 6500)

    return () => { clearInterval(interval) }
  }, [])

  return (
    <>
      <div className="relative w-full h-[480px] ">
        <video src={current} autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 " />
        <div className='absolute h-[100%] w-[100%] flex flex-col items-center  ' >
          <p></p>
          <p className='text-white w-[100%] text-[60px] lg:text-[70px]  font-bold text-center mt-[0px] mt-5 pt-5 text_shadow font-[Oswald]' >FORAGE YOUR AURA</p>
          <p className='text-white text-base md:text-lg max-w-[400px] mx-auto text-center mb-5 text_shadow'>Premium gym wear and lifestyle accessories for the modern sigma male. Elevate your fitness journey.</p>
          <div className='flex items-center justify-evenly w-[390px] mt-4'>
            <button className='bg-green-500 border-none px-3 h-[45px] text-white font-bold rounded-3 shadow-[0_0_30px_green] hover:scale-x-115 hover:brightness-110 transition-all duration-400 ease-in-out  '>SHOPE NOW</button>
            <button className=' border-3 border-black px-3 h-[45px] text-white font-bold rounded-3 hover:scale-105 hover:bg-black transition-all duration-500 ease-in-out'>Explore Collection</button>
            
          </div>
        </div>
      </div>


    </>
  )
}


export default Hero