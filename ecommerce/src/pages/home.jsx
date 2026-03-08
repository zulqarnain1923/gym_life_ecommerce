import React, { useContext } from 'react'

import Header_footer from '../components/header&footer'
import Hero from '../components/hero/hero'
import Catagory from '../components/catagory/catagory'
import Products from '../components/trending/trending_products'
import Todaydeals from '../components/todaydeals/todaydeals'
import Allproduct from '../components/allproduct/allproduct'
import Features from '../components/services/services'

import { Title } from '../components/smallstyling'
import { useState, useEffect } from 'react'
import { Authcontext } from '../components/context/context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const Home = () => {
  const [products, setproducts] = useState([]);
  const [trendproducts,settrendproducts]=useState([])
  const data = useContext(Authcontext);
  const navigation = useNavigate();

// simple products 
  const getproducts = async () => {
    try {
      const res = await axios.get(`${data.url}/get/`, { params: { quantity: 10 } });
      const da = res.data;
      { Array.isArray(da) ? setproducts([...da]) : setproducts([]) }
    }
    catch (error) { console.log(error.response.data) }
  };

// trending products 
  const gettrendproducts = async () => {
    try {
      const res = await axios.get(`${data.url}/get/`, { params: { quantity: 6 } });
      const da = res.data;
      { Array.isArray(da) ? settrendproducts([...da]) : settrendproducts([]) }
    }
    catch (error) { console.log(error.response.data) }
  };

  // api call ob change dapendency 
  useEffect(() => {
    getproducts();
    gettrendproducts();
  }, []);


  const navigate = (id) => {
    navigation(`/product/priview/${id}`);
  }

  return (
    <>
      <Header_footer>
        <Hero />
        <Catagory />
        <div className='overflow-x-scroll'>
          <Products products={trendproducts} navigate={navigate} />
        </div>
        <Todaydeals />
        <Title>All products</Title>
        <Allproduct products={products} navigate={navigate} />
        <Features />
      </Header_footer>
    </>
  )
}

export default Home
