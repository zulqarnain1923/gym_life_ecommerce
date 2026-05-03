import React, { useContext } from 'react'

import Header_footer from '../components/header&footer'
import Hero from '../components/hero/hero'
import Catagory from '../components/catagory/catagory'
import Products from '../components/trending/trending_products'
import Todaydeals from '../components/todaydeals/todaydeals'
import Allproduct from '../components/allproduct/allproduct'
import Features from '../components/services/services'


import { Title , Loading} from '../components/smallstyling'
import { useState, useEffect } from 'react'
import { Authcontext } from '../components/context/context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const Home = () => {
  const [products, setproducts] = useState([]);
  const [trendproducts,settrendproducts]=useState([])
  const data = useContext(Authcontext);
  const navigation = useNavigate();
  const [prdloaidng,setprdloading]=useState(false)

// simple products 
  const getproducts = async () => {
    
    try {
      const res = await axios.get(`${data.url}/get/`, { params: { quantity: 8 } });
      const da = res.data;
      
      { Array.isArray(da) ? setproducts([...da]) : setproducts([]) }
    }
    catch (error) { console.log(error.response.data) }
    finally {
      setprdloading(false);
    }
  };

// trending products 
  const gettrendproducts = async () => {
    setprdloading(true);
    try {
      const res = await axios.get(`${data.url}/get/`, { params: { quantity: 6 } });
      const da = res.data;
      
      { Array.isArray(da) ? settrendproducts([...da]) : settrendproducts([]) }
      setprdloading(false);
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
        <Title className='ms-3'>Trending products</Title>
        <div className='overflow-x-scroll sharp-scrollbar'>
          <Products products={trendproducts} navigate={navigate} loading={prdloaidng} />
        </div>
        <Todaydeals />
        <Title className='ms-3'>All products</Title>
        <Allproduct products={products} navigate={navigate} />
        <Features />
      </Header_footer>
    </>
  )
}

export default Home
