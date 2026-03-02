import React from 'react'
import Card from './card'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'
import {Title} from '../smallstyling'

function Styling({products , navigate}) {
    const navigation=useNavigate()
    return (
        <>
            <div className='px-3 max-w-[1150px] mx-auto pb-4'>
                
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3 overflowx-scroll py-5'>
                    {products? products.map((item, index) => (
                        <Card key={index} item={item} index={index} navigate={navigate}/>
                    )): <h1 className='text-white'>no product</h1>}
                </div>
                <button  className='text-[white] font-bold bg-gray-500 rounded-4 p-1 px-2 border-1 border-white text-capitalize' onClick={()=>navigation('/all/products')}>view more</button>
            </div>
        </>
    )
}


export default Styling