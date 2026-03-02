import React from 'react'
import { useContext } from 'react';
import { Authcontext } from '../context/context';

import { FaRegHeart } from "react-icons/fa6";
import { BiSolidCart } from "react-icons/bi";
import { PiStarLight } from "react-icons/pi";
import { PiStarFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom';




export default function card({item ,navigate}) {
    const data=useContext(Authcontext)
    return (
        <div>
            {/* Card Main Container - Isay bhi @container banaya ja sakta hai agar zaroorat ho */}
            <div className="px-1 pt-1 bg-black rounded-2 relative cursor-pointer border-green-500 hover:shadow-[0_0_20px_#ebd234] hover:border-yellow-500 transition-all duration-[.3s] hover:translate-y-[-10px] card">
                
                <BiSolidCart className='absolute right-2 top-2 text-green-700 text-[33px] z-1 cursor-pointer rounded-[50%] hover:bg-green-300 p-1 transition-all' onClick={()=> (data.runfunctions(null,'cartitem',{pr_id:item.pr_id} ),console.log('helo'))}/>
                {/* <FaRegHeart className='absolute right-2 top-[40px] text-red-500 text-[30px] z-1 cursor-pointer rounded-[50%] hover:bg-red-300 p-1 transition-all' /> */}
                
                <div className='w-[100%] overflow-hidden rounded-2 relative' onClick={()=>navigate(item.pr_id)}>
                    {item?.images? <img src={item.images[0]} alt={item.pr_name} width="100%" className='object-cover object-center hover:scale-[1.1] transition-all duration-[.4s]' />: <h1>data is comming</h1>}
                </div>

                <div className='relative ps-1 py-1 sm:h-[auto]'>
                    <div className='@container flex items-center justify-between w-full'>
                        <span className="text-[clamp(18px,12cqw,30px)] text-white font-[Oswald] block truncate mr-2 pe-2"> 
                            {item.pr_name} 
                        </span>
                        
                        <div className='flex items-center text-[10px] sm:text-[14px] shrink-0'>
                            {[...Array(4 - 2)].map((_, i) => (
                                <PiStarFill key={`fill-${i}`} className='text-yellow-500' />
                            ))}
                            {[...Array(2)].map((_, i) => (
                                <PiStarLight key={`light-${i}`} className='text-gray-500' />
                            ))}
                        </div>
                    </div>
                    <span className='text-gray-300 text-[9px] sm:text-[12px] block leading-tight clamping' >{item.pr_desc} </span>

                    <span className='block text-yellow-500 font-bold text-[13px] sm:text-[20px] font-[Oswald] pt-2'> 
                        Rs. {item.pr_price} 
                        <span><strike className='text-gray-400 text-[14px] font-normal ml-1'>{item.strick_price}</strike></span>
                    </span>
                </div>
                
                <NavLink to={`/product/priview/${item.pr_id}`}>
                    <button className='bg-yellow-600 rounded-2 text-white absolute float_bt'>Order Now</button>
                </NavLink>
            </div>
        </div>
    )
}





