import React from 'react'
import { useContext, useState } from 'react'

import { MdArrowOutward } from "react-icons/md";
import { BiSolidCart } from "react-icons/bi";
import { Authcontext } from '../context/context'
import {Loading} from '../smallstyling'


function Products({products,navigate,loading}) {
  const data = useContext(Authcontext);

  if (loading){
    return(
      <div className='h-[calc(100vh-100px)] w-full flex items-center justify-center '>
        <Loading className='w-[120px] flex items-center justify-center  '></Loading>
      </div>
    )}

   if (products && products.length === 0){
        return (
        <div className='h-[calc(100vh-100px)] w-full  flex items-center justify-center '> 
         <h1 className="text-gray-300 text-center text-[40px]">No products available</h1>
        </div>
    ) }

  return (
    <>
      <div className='px-4 pb-3 '>
        <div className='flex gap-3 overflowx-scroll py-5 '>
          {products?products.map((item, index) => (
            <div key={index} className="p-1 pb-2 bg-black w-[240px] rounded-4 relative cursor-pointer hover:shadow-[0_0_20px_yellow] border-1 hover:border-yellow-500 transition-all duration-[.3s] hover:translate-y-[-10px] ">
              <BiSolidCart  className='absolute right-2 top-2 text-green-700 text-[33px] z-1 cursor-pointer rounded-[50%] hover:bg-green-300 p-1 transition-all' onClick={()=> (data.runfunctions(null,'cartitem',{pr_id:item.pr_id} ))} />
              <div className='w-[232px] h-[220px] overflow-hidden rounded-4 relative'>
                <div className='h-[18px] w-[100px] bg-red-900 z-1 rotate-[-45deg] absolute text-white top-3 left-[-30px] text-center text-[13px]'>Trending</div>

                <img src={item.images[0]} alt={item.pr_name} width="100%" className='hover:scale-[1.1] transition-all duration-[.4s]' onClick={()=> navigate(item.pr_id)} />
              </div>
              <div className='relative ps-1'>
                <span className="  text-[24px] text-white font-[Oswald] "> {item.pr_name} </span><br />
                <span className='text-yellow-500 font-bold font-[Oswald]'>{item.pr_price} Rs</span> <span><strike className='text-gray-400 text-[13px]'>{item.strick_price}</strike></span>
                <MdArrowOutward  className='text-gray-400 text-[40px] absolute left-[100%] top-[15px] translate-x-[-120%] hover:text-yellow-400 cursor-pointer transition-all duration-[.3s] rounded-[50%] bg-gray-200 p-1' onClick={()=> navigate(item.pr_id)}/>

              </div>

            </div>
          )):<h1 className='text-white' >no product</h1>}
        </div>



      </div>
    </>
  )
}


export default Products