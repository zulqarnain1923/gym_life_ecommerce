import React from 'react'
import Header from './header/header'
import Footer from './footer/footer'


function Header_footer({children}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}


export default Header_footer