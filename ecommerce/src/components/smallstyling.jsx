import React from 'react'

export default function Function() {
    return <>
        hellow
    </>
}

export const Title = ({ children, className = '' }) => {
    return (
        <>
            <div className='w-[100%] ' style={{ paddingLeft: "50%" }} >
                <p className={`text-[30px] md:text-[45px] text-white text-center font-bold rounded-4 border-b-1 w-auto translate-x-[-50%] capitalize ${className}`}>{children}</p>

            </div>

        </>
    )
}




