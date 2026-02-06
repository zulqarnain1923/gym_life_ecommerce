import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <>
      <div className='bg-black pb-4'>
      <div className="w-[100%] p-4 md:flex wrap gap-5 justify-evenly">

        <div className='w-[300px]'>
          <p className='text-[25px] font-bold text-green-500'>SigmaForge<span className='text-yellow-500'>.pk</span></p>
          <p className='text-white'>Premium gym wear and lifestyle accessories for the modern sigma male. Forge your aura.</p>
          <div className='text-[30px] flex items-center justify-between '>
            <FontAwesomeIcon icon={faFacebookF} className='cursor-pointer text-blue-300 social rounded-3 py-1 ' />
            <FontAwesomeIcon icon={faInstagram} className='cursor-pointer text-red-400 social rounded-3 py-1' />
            <FontAwesomeIcon icon={faLinkedinIn} className='cursor-pointer text-blue-900 social rounded-3 py-1' />
            <FontAwesomeIcon icon={faTwitter} className='cursor-pointer text-yellow-400 social rounded-3 py-1' />
          </div>
        </div>
        <div className='text-gray-500 mt-4 md:mt-0'>
          <p className='text-white text-[25px] font-bold'>Quick Links</p>
          <p><a href='#' className='no-underline'> Track order</a></p>
          <p><a href='#' className='no-underline'> Sales</a></p>
          <p><a href='#' className='no-underline'> Most famous</a></p>
          <p><a href='#' className='no-underline'> New arival</a></p>
        </div>
        <div className='text-gray-500 mt-4 md:mt-0'>
          <p className='text-white text-[25px] font-bold'>Contact us</p>
          <p><FontAwesomeIcon icon={faPhone} className='text-blue-300'/>  03012345678</p>
          <a href=''><p><FontAwesomeIcon icon={faLocationDot} className='text-blue-300'/>  Location</p></a>
          <p><FontAwesomeIcon icon={faEnvelope} className='text-blue-300' />  example@gmail.com</p>
        </div>
      </div>
      
      <div className='text-[14px] text-gray-700 w-[100%] flex justify-center '>
       <p className='w-[300px] text-center'> © 2026 SIGMAFORGE.PK. All rights reserved. Designed for the modern sigma male.</p>
      </div>
      <div className='border-b'></div>
      </div>
    </>
  )
}

export default Footer
