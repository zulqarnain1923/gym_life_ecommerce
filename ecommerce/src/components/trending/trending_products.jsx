import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'

import { FaRegHeart } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { BiSolidCart } from "react-icons/bi";

import shoes from '../../assets/images/shoes5.webp'
import shake from '../../assets/images/shake3.webp'
import hoody from '../../assets/images/hoody2.webp'
import shirt from '../../assets/images/shirt4.webp'



const tren_prod = [
  { name: "primium hoody", img: hoody, price: 2499, brand: "nike" },
  { name: "protien shaker", img: shake, price: 1499, brand: "bloger" },
  { name: "jogar shoes", img: shoes, price: 2999, brand: "addidas" },
  { name: "shirt", img: shirt, price: 999, brand: "hoser" }
]

function Products() {
  const [trend_prod, settrend_prod] = useState(tren_prod)
  return (
    <>
      <div className='px-4 pt-5  pb-3'>
        <p className='text-[30px] text-white text-center font-bold rounded-4 border-b-1 w-[290px] '>Trending Products</p>
        <div className='flex gap-3 overflowx-scroll py-5 '>
          {trend_prod.map((item, index) => (
            <div key={index} className="p-1 pb-2 bg-black w-[240px] rounded-4 relative cursor-pointer hover:shadow-[0_0_20px_yellow] border-1 hover:border-yellow-500 transition-all duration-[.3s] hover:translate-y-[-10px]">
              <BiSolidCart  className='absolute right-2 top-2 text-green-700 text-[33px] z-1 cursor-pointer rounded-[50%] hover:bg-green-300 p-1 transition-all' />
              <FaRegHeart className='absolute right-2 top-[40px] text-red-500 text-[30px] z-1 cursor-pointer rounded-[50%] hover:bg-red-300 p-1 transiton-all' />
              <div className='w-[232px] h-[220px] overflow-hidden rounded-4 relative'>
                <div className='h-[18px] w-[100px] bg-red-900 z-1 rotate-[-45deg] absolute text-white top-3 left-[-30px] text-center text-[13px]'>Trending</div>

                <img src={item.img} alt={item.name} width="100%" className='hover:scale-[1.1] transition-all duration-[.4s]' />
              </div>
              <div className='relative ps-1'>
                <span className="  text-[24px] text-white font-[Oswald] "> {item.name} </span><br />
                <span className='text-yellow-500 font-bold font-[Oswald]'>{item.price} Rs</span> <span><strike className='text-gray-400 text-[13px]'>{item.price+500}</strike></span>
                <MdArrowOutward  className='text-gray-400 text-[40px] absolute left-[100%] top-[15px] translate-x-[-120%] hover:text-yellow-400 cursor-pointer transition-all duration-[.3s] rounded-[50%] bg-gray-200 p-1' />

              </div>

            </div>
          ))}
        </div>



      </div>
    </>
  )
}


export default Products