import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header_footer from '../components/header&footer';
import Priview from '../components/priview/priview';
import Reviews from '../components/review_comment/review_comment';
import Order_form from './orderform'
import Services from '../components/services/services'

import { Authcontext } from '../components/context/context';

const Prd_priview = () => {
    const data=useContext(Authcontext)
    const [product, setproduct]=useState()
    const pram = useParams()
    const id = pram.id
    
    useEffect(() => {
        async function params() {            
            try{
                const res= await axios.get(`${data.url}/get/${id}`)
                console.log(res.data)
                res.data?setproduct(res.data):{msg:'data not fetched'}
                console.log(pram)
            }
            catch (error){
                console.log(error.response.data)
            }
        }
        params()
    },[id])
    
    const [toggle , setToggle]=useState(true)

    return (
        <>
            <div className={toggle?`hidden`:null}>
            <Order_form toggle={setToggle}></Order_form>
            </div>
            <Header_footer>
                <Priview product={product} toggle={setToggle}/>
                <Reviews />
                <Services/>
            </Header_footer>
        </>
    )
}


export default Prd_priview
