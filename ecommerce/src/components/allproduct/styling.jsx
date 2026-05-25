import React from 'react'
import Card from './card'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../smallstyling'
import { Link } from 'react-router-dom'


function Styling({ products, navigate, prdloading }) {
    const navigation = useNavigate()

    if (prdloading) {
        return (
            <div className='h-[calc(100vh-150px)] w-full flex items-center justify-center '>
                <Loading className='w-[120px] flex items-center justify-center  '></Loading>
            </div>
        )
    }
    if (products && products.length === 0) {

        return <>
            <div className='h-[calc(100vh-150px)] w-full  flex items-center justify-center '>
                <h1 className="text-gray-300 text-center text-[40px]">No products available</h1>
            </div>
        </>
    }


    return (
        <>
            <div className='px-3 max-w-[1150px] mx-auto pb-4' id='collection'>

                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3 overflowx-scroll py-5'>
                    {products ? products.map((item, index) => (
                        <Card key={index} item={item} index={index} navigate={navigate} />
                    )) : <h1 className='text-white'>no product</h1>}
                </div>
                {/* <button  className='text-[white] font-bold bg-gray-500 rounded-4 p-1 px-2 border-1 border-white text-capitalize' onClick={()=>navigation('/all/products')}>view more</button> */}
            </div>
        </>
    )

}


export default Styling