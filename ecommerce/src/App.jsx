import React from 'react';
import Header_footer from './components/header&footer';
import Hero from './components/hero/hero'
import Catagory from './components/catagory/catagory';
import Products from './components/trending/trending_products'
import Todaydeals from './components/todaydeals/todaydeals'
import Allproduct from './components/allproduct/allproduct'
import Features from './components/services/services'

function App() {
  return (
    <>
      <Header_footer>
        <Hero />
        <Catagory/>
         <Products/>
         
         <Todaydeals/>
         <Allproduct/>
         <Features/>
      </Header_footer>
    </>

  )
}


export default App;