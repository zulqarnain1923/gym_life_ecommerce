import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'

import { FaRegHeart } from "react-icons/fa6";
// import { MdArrowOutward } from "react-icons/md";
import { BiSolidCart } from "react-icons/bi";
import { PiStarLight } from "react-icons/pi";
import { PiStarFill } from "react-icons/pi";

import hoody from '../../assets/images/ai-images/iron-beast-ring.png'
import short from '../../assets/images/ai-images/alpha-shorts.png'
import traksuit from '../../assets/images/ai-images/tracksuit-black.png'
import shaker from '../../assets/images/ai-images/gym-tank.png'



const tren_prod = [
    { name: "primium ring", img: hoody, price: 2499, brand: "nike", star: 2 },
    { name: "gym tank", img: shaker, price: 1499, brand: "bloger", star: 2 },
    { name: "short", img: short, price: 2999, brand: "addidas", star: 1 },
    { name: "tracksuit", img: traksuit, price: 999, brand: "hoser", star: 2 },
    { name: "primium ring", img: hoody, price: 2499, brand: "nike", star: 2 },
    { name: "gym tank", img: shaker, price: 1499, brand: "bloger", star: 2 },
    { name: "short", img: short, price: 2999, brand: "addidas", star: 1 },
    { name: "tracksuit", img: traksuit, price: 999, brand: "hoser", star: 2 },
]

function Allproducts() {
    const [trend_prod, settrend_prod] = useState(tren_prod)
    // const [stars,setstars]= useState(4)
    // setstars(stars-tren_prod.star)

    return (
        <>
            <div className='px-3 pt-5 max-w-[1100px] mx-auto'>
                <div className='w-[100%] ' style={{ paddingLeft: "50%" }} >
                    <p className='text-[30px] md:text-[45px] text-white text-center font-bold rounded-4 border-b-1 w-auto translate-x-[-50%]' >All Products</p>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3 overflowx-scroll py-5'>
                    {trend_prod.map((item, index) => (
                        <div key={index} className="px-1 pt-1 bg-red-500 bg-black rounded-2 relative cursor-pointer border-green-500 hover:shadow-[0_0_20px_#ebd234] hover:border-yellow-500 transition-all duration-[.3s] hover:translate-y-[-10px] card">
                            <BiSolidCart className='absolute right-2 top-2 text-green-700 text-[33px] z-1 cursor-pointer rounded-[50%] hover:bg-green-300 p-1 transition-all' />
                            <FaRegHeart className='absolute right-2 top-[40px] text-red-500 text-[30px] z-1 cursor-pointer rounded-[50%] hover:bg-red-300 p-1 transiton-all' />
                            <div className='w-[100%] overflow-hidden rounded-2  relative'>
                                <img src={item.img} alt={item.name} width="100%" className='object-cover object-center hover:scale-[1.1] transition-all duration-[.4s]' />
                            </div>
                            <div className='relative ps-1 py-1  sm:h-[auto]'>
                                <div className='flex item-center justify-between '>
                                    <span className="text-[18px] sm:text-[28px] text-white font-[Oswald] "> {item.name} </span><br />
                                    <div key={index} className='flex items-center text-[10px] sm:text-[14px]  '>
                                        {[...Array(4 - item.star)].map((index) => (
                                            <PiStarFill className='text-yellow-500 ' />
                                        ))}
                                        {[...Array(item.star)].map((index) => (
                                            <PiStarLight className='text-gray-500 ' />
                                        ))}
                                    </div>
                                </div>
                                <span className='text-gray-300 text-[9px] sm:text-[12px] block leading-tight'>Lorem ipsum dolor sit amet consectur, adipisicing else.</span>
                                <span className='block text-yellow-500 font-bold text-[13px] sm:text-[20px] font-[Oswald] pt-2 '> Rs. {item.price} <span><strike className='text-gray-400 text-[10px] font-normal'>{item.price + 500}</strike></span></span>
                            </div>
                            <button className='bg-yellow-600 rounded-2 text-white  absolute float_bt'>Order Now</button>
                        </div>
                    ))}
                </div>



            </div>
        </>
    )
}


export default Allproducts