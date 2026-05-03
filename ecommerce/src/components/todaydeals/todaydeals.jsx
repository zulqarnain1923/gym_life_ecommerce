import React, { useEffect, useContext, useState } from 'react';

import shoes from '../../assets/images/download1.webp'
import shake from '../../assets/images/download2.webp'
import hoody from '../../assets/images/wear.webp'
import shirt from '../../assets/images/accessories.webp'
import { Title } from '../smallstyling'

// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper modules
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Authcontext } from '../context/context';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';



const TodayDealsSlider = () => {
  const context = useContext(Authcontext)
  const navigation = useNavigate()
  const [sales, setSales] = useState()
  const dealsData = [
    {
      id: 1,
      tagline: "Flash Sale Alert!",
      title: "Upto 50% Off on Footer!",
      description: "Grab the latest gadgets at unbeatable prices. Limited stock available!",
      cta: "Explore Now",
      imageUrl: shoes
    },
    {
      id: 2,
      tagline: "Fashion Fiesta!",
      title: "20-70% Off on All Accessries!",
      description: "Upgrade your wardrobe with trendy collections. New arrivals daily!",
      cta: "Explore Fashion",
      imageUrl: shake,
    },
    {
      id: 3,
      tagline: "Top wearing!",
      title: "Save Big on clothes",
      description: "Transform your space with amazing deals. Don't miss out!",
      cta: "Discover Deals",
      imageUrl: shirt,
    },
    {
      id: 4,
      tagline: "Sales on Accessories!",
      title: "20% of sale",
      description: "Pamper yourself with top brands at incredible discounts.",
      cta: "View Products",
      imageUrl: hoody,

    },
  ]

  useEffect(() => {
    const fetchsales = async () => {
      axios.get(`${context.url}/sales/get/`, { params: { ecommerce: "true" } })
        .then((res) => (setSales(res.data)))
        .catch((err) => console.log(err))
    }
    fetchsales()
  }, [])

  return (
    <>

      <div className='px-4 pb-5  border-y-1 border-gray-700 '>
        <Title>flash sales</Title>
        <div className="w-full max-w-5xl mx-auto bg-gray-900 text-white rounded-lg shadow-xl hover:shadow-[0_0_15px_yellow] mt-4 border-1 border-green-500 up_section">

          <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={30} // Slides ke beech space
            slidesPerView={1} // Aik time mein aik slide dikhegi
            navigation // Next/Prev buttons
            pagination={{ clickable: true, dynamicBullets: true }} // Bottom circles, dynamic means size change with active
            autoplay={{
              delay: 6000, // 4 seconds baad auto-change
              disableOnInteraction: false, // User interaction ke baad bhi chalta rahega
            }}
            loop={true} // Infinite loop
            className="mySwiper w-full h-50 md:h-66" // Height aur width adjust ki hai
          >
            {sales && sales.length > 0? sales.map((deal,index) => (
              <SwiperSlide key={index} className="p-2 flex flex-col justify-center items-center ">
                <div className=' relative'>
                  <div className="w-full h-51  md:h-60 bg-gray-700 flex items-center justify-center rounded-lg relative">
                    <img src={deal.banner_image} alt={deal.name} className="w-full h-full object-cover rounded-lg" onClick={() => navigation('/all/products')} />
                  </div>
                  <div className='w-full max-w-[600px] absolute flex justify-center items-center top-5 left-[50%] translate-x-[-50%] '>
                    <div className='flex flex-col items-center justify-center w-[100%] '>
                      <p className="text-sm sm:text-md md:text-lg text-yellow-400 text-center mb-2 font-semibold uppercase text-shadow-[0_0_5px_black]">{deal.name}</p>
                      <div>
                        <p className="text-2xl md:text-4xl font-bold white text-center block mb-3 capitalize text-shadow-[0_0_5px_black]">
                          {deal.title}
                        </p>
                        <p className="text-center  text-gray-100 text-shadow-[0_0_5px_black] text-center text-[12px] sm:text-[14px] md:text-md mb-4 max-w-md px-2 sm:px-3">
                          {deal.description}
                        </p>
                      </div>
                      <button className="bg-indigo-600 hover:bg-yellow-600 text-white font-bold p-1 px-3  rounded-2 transition duration-300 ease-in-out" onClick={() => navigation(`/all/products/${deal.id}`)}>
                        Explore 
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )) : (
              <SwiperSlide >
                <div className=' h-[200px]'>
                  <h1 className='font-bold text-center mt-3'>Hi! There</h1>
                  <p className='text-gray-500 text-[20px] text-center mt-4 '>   No active sale available.</p>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TodayDealsSlider;