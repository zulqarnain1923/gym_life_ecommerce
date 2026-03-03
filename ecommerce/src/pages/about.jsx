import React from 'react'
import Header_footer from '../components/header&footer';
import Services from '../components/services/services'


const Home = () => {
  return (
    <>
      <Header_footer>
       <p className='text-[50px] text-center font-bold m-auto text-white'>About Page</p>
      <Services></Services>
      </Header_footer>
    </>
  )
}

export default Home
