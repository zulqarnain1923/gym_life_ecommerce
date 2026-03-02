import React from 'react'
import HeaderFooter from '../components/header&footer'
import Allproducts from '../components/allproduct/allproduct'
import Services from '../components/services/services'
import { useState, useRef, useEffect, useContext } from 'react'
import { Authcontext } from '../components/context/context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import { useSearchParams } from "react-router-dom";




function All_products() {
    const [searchParams] = useSearchParams();
    const ctg=searchParams.get('catagory')
    const name=searchParams.get('name')
    const data= useContext(Authcontext)
    const [catagory,setcatagory]=useState({})
    const [products, setproducts] = useState([])
    const [filter, setfilter] = useState({})
    const [price, setprice] = useState({ minprice: '', maxprice: '' })
    const navigation = useNavigate()
          

    const getproducts = async () => {
        try {
       
            const res = await axios.get(`${data.url}/get/`, { params: {...filter,catagory:ctg,name:name} });
            const da = res.data;
            Array.isArray(da) ? setproducts([...da]) : setproducts([]);
        }
        catch (error) { console.log(error.response.data) }
    };

     useEffect(() => {
            getproducts();
        }, [ctg,name,filter]);

    const navigate = (id) => {
        navigation(`/product/priview/${id}`);
    }

    function prices(e) {
        setprice({...price, [e.target.name]: e.target.value });
    }
    function call (){
        if (price.maxprice && price.minprice){setfilter({...price})}
        else{alert('please provide both values')};
    }

  return (
    <div>
      <HeaderFooter>
        <div className='relative'>
          <div className='flex items-center border-1 border-gray-700 h-[50px] gap-5 w-full  bg-gray-900 '>
            <p className='text-white  block pt-3 text-[20px]'>Filters:</p>
            <div className='  flex  items-center w-[100%] gap-3'>

              <div className='flex items-center justify-center gap-2 '>
                <label className='text-white text-[9px] sm:text-[12px]'>Min price:</label>
                <input type="number" name="minprice" value={price.minprice} className='bg-gray-200 rounded-2 border-gray-700 h-[25px] w-[70px] outline-none ps-2' onChange={(e) => prices(e)} />

              </div>
              <div className='flex items-center justify-center gap-2 '>
                <label className='text-white text-[9px] sm:text-[12px]'>Max price:</label>
                <input type="number" name="maxprice" value={price.maxprice} className='bg-gray-200 rounded-2 border-gray-700 h-[25px] w-[70px] outline-none ps-2' onChange={(e) => prices(e)} />

              </div>
              <button className='bg-blue-800 rounded-pill h-7 w-7 ms-3 text-white hover:bg-blue-700'><ArrowRight onClick={() => call()} /> </button>

            </div>
          </div>
          <Allproducts products={products} navigate={navigate}/>
        </div>
        <Services />

      </HeaderFooter>
    </div>
  )
}


export default All_products
