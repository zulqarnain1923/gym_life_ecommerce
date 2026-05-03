import React from 'react';
import Home from './pages/home'
import About from './pages/about'

import Allproducts from './pages/all_products';
import Prd_priview from './pages/prd_priview';
import Productform from './pages/form';
import Login from './components/login_signup_form/login'
import Register from './components/login_signup_form/register'
import Dashboard from './pages/dashboard'
import useScrollAnimation from './index.js'


// import Orderform from './pages/orderform'
import ProductWithvarient from './pages/orderform'

// import Dashboard from './pages/dashboard'

import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react';
import { Authcontext } from './components/context/context';



function App() {

  const location = useLocation();
  const data = useContext(Authcontext)
  const [msgalert, setmsgalert] = useState(false)
  const { pathname } = useLocation()

  useScrollAnimation(location);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [pathname])


  useEffect(() => {
    setmsgalert(true)
    setTimeout(() => {
      setmsgalert(false)
    }, 5000);
  }, [data.bottomnote])

  return (
    <>
      <div className={`top-[89%] bottom-5 px-3 min-w-[100px] max-w-[250px] z-50 message ${msgalert ? 'right-5 ' : 'right-[-100%]'} `}>{data.bottomnote.msg} </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/all/products' element={<Allproducts />} />
        <Route path='/all/products/:sale_id' element={<Allproducts />} />
        <Route path='/product/priview/:id' element={<Prd_priview />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}


export default App;