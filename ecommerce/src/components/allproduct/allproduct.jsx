import React from 'react'
import Styling from './styling'



function Allproducts({products,navigate,prdloading}) {
    return (
        <>

            <Styling products={products} navigate={navigate} prdloading={prdloading}  />
        </>
    )
}


export default Allproducts