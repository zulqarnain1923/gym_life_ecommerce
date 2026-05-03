import React from 'react'

import loading from '../assets/loading.svg'


export default function Function() {
    return <>
        hellow
    </>
}

export const Title = ({ children, className = '' }) => {
    return (
        <>
            <div className='pt-4  pb-4 '>
                <span className={`text-[20px] sm:text-[25px]  text-white font-bold rounded-4 border-b-1 px-4  capitalize ${className}`}>{children}</span>

            </div>

        </>
    )
}


export const Loading= ({className=''})=>{

    return(
        <>
        <div className={` ${className}`}>
            <img src={loading} alt="Loading..." />
        </div>
        </>
    )
    
}




