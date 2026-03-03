import React from 'react'
import Styling from './styling'


function Allproducts({products,navigate}) {
    return (
        <>
            <Styling products={products} navigate={navigate}  />
        </>
    )
}


export default Allproducts