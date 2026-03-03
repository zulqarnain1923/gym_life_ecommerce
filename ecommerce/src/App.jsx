import React from 'react';
import Home from './pages/home'
import About from './pages/about'

import Allproducts from './pages/all_products';
import Prd_priview from './pages/prd_priview';
import Productform from './pages/form';
import Context from './components/context/context'
import Login from './components/login_signup_form/login'
import Register from './components/login_signup_form/register'
import Dashboard from './pages/dashboard'

// import Orderform from './pages/orderform'
import ProductWithvarient from './pages/orderform'

// import Dashboard from './pages/dashboard'

import { Routes, Route, useLocation } from 'react-router-dom'

import { useEffect } from 'react';



function App() {
  const {pathname}= useLocation()
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  },[pathname])

  
  return (
     <Context>
    <Routes>
    
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      {/* <Route path='/product' element={<Product />} /> */}
      <Route path='/all/products' element={<Allproducts/>} />
      <Route path='/product/priview/:id' element={<Prd_priview/>} />
      <Route path='/productform' element={<Productform/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/orderform' element={<ProductWithvarient/>} />
      {/* <Route path='/sidenav' element={<SimpleSideNav/>} /> */}

    
    </Routes>
    </Context>
    
   

  )
}


export default App;