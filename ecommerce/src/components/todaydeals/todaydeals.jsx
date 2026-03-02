import React from 'react';

import shoes from '../../assets/images/download1.webp'
import shake from '../../assets/images/download2.webp'
import hoody from '../../assets/images/wear.webp'
import shirt from '../../assets/images/accessories.webp'
// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper modules
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';



const TodayDealsSlider = () => {

   const navigation=useNavigate()
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

  return (
    <>
    <div className='px-4 py-5 border-y-1 border-gray-700 '>
      <p className='text-[30px] text-white text-center font-bold rounded-4 border-b-1 w-[200px] '>Flash Sales</p>
      <div className="w-full max-w-5xl mx-auto bg-gray-900 text-white rounded-lg shadow-xl hover:shadow-[0_0_15px_yellow] mt-4 border-1 border-green-500 ">

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
          {dealsData.map((deal) => (
            <SwiperSlide key={deal.id} className="p-2 flex flex-col justify-center items-center ">
              <div className='flex'>
                <div className="w-58 h-45 md:w-94 md:h-60 bg-gray-700 flex items-center justify-center rounded-lg relative">
                  <img src={deal.imageUrl} alt={deal.title} className="w-full h-full object-cover rounded-lg"  onClick={()=> navigation('/all/products')}/>
                </div>
                <div className='flex flex-col items-center justify-center w-[100%]'>
                   <p className="text-sm sm:text-md md:text-lg text-yellow-400 text-center mb-2 font-semibold uppercase ">{deal.tagline}</p>
                  <p className="text-xl md:text-4xl font-bold text-green-300 text-center mb-3">
                    {deal.title}
                  </p> 
                  <p className="text-gray-300 text-center text-[12px] sm:text-[14px] md:text-md mb-4 max-w-md px-2 sm:px-3">
                    {deal.description}
                  </p>
                  <button className="bg-indigo-600 hover:bg-yellow-600 text-white font-bold p-1  rounded-3 transition duration-300 ease-in-out" onClick={()=> navigation('/all/products')}>
                    {deal.cta}
                  </button>
                </div>
              </div>


            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
    </>
  );
};

export default TodayDealsSlider;