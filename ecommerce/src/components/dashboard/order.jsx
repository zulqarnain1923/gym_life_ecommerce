import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent } from './component'
import { Authcontext } from '../context/context'
import axios from 'axios';
import { RefreshCcw, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Order = () => {
  const [order, setorder] = useState()
  const [params, setparams] = useState({ status: 'pending' })
  const data = useContext(Authcontext)
  const [orderupdate, setorderupdate] = useState({ id: null, status: '' })
  const [orderdetail, setorderdetail] = useState([])
  const [check, setcheck] = useState(true)
  const navigation = useNavigate()

  const getorder = async () => {
    
      const refresh = localStorage.getItem('refresh')
      const access = localStorage.getItem('access')
      if (refresh) {
        // data.runfunctions(null,'checkuser',null)
        try {
          const res = await axios.get(`${data.url}/order/add/`, { headers: { Authorization: `Bearer ${access}`}, params: { ...params } } )
          setorder(res.data)
        }
        catch (error) {
          if (error.response && error.response.status === 401) {
            alert('please login with your staff account')
            const user =await data.runfunctions(null, 'checkuser', null)
            if (user) {
              const newaccess=localStorage.getItem('access')
              try{
              const res = await axios.get(`${data.url}/order/add/`, { headers: { Authorization: `Bearer ${access}`}, params: { ...params }  })
              setorder(res.data)
              }catch(error){
                if (error.response && error.response.status===403){
                  alert('please login with your staff account')
                  navigation('/login')
                }
              }
            }
          }
        }
      }
      else {
        alert('please register first and approve your staff account')
      }

    }


  const updateorder = async () => {
    try {
      const res = await axios.put(`${data.url}/order/add/`, { ...orderupdate })
      console.log(res.data)
    }
    catch (error) {
      console.log(error.response.data)
    }

  }

  useEffect(() => {
    updateorder()
    getorder()
  }, [orderupdate])

  useEffect(() => {
    getorder()
  }, [params])

  function add_detail(index) {
    setorderdetail([order[index]])
    setcheck(false)
    console.log('helo')
  }

  return (

    <>
      <div className={`relative min-h-full  max-w-[600px] bg-white p-4 pt-5 ${check ? "hidden" : 'block'}`}>
        {orderdetail ? orderdetail.map((item, index) => <div key={index}>

          <p className='font-bold'>User Name: <span className='font-normal'>{item.full_name}</span></p>
          <p className='font-bold'>Phone: <span className='font-normal'>{item.phone}</span></p>
          <p className='font-bold'>City: <span className='font-normal'>{item.city}</span></p>
          <p className='font-bold'>Address: <span className='font-normal'>{item.address}</span></p>
          <p className='font-bold'>Postal code: <span className='font-normal'>{item.postal_code}</span></p>
          <p className='font-bold'>Street Address: <span className='font-normal'>{item.street_address}</span></p>
          <p className='font-bold'>Total amount: <span className='font-normal'>{item.total_amount}</span></p>
          <p className='font-bold'>Quantity: <span className='font-normal'>{item.quantity}</span></p>
          <p className='font-bold'>Payment method: <span className='font-normal'>{item.payment_method}</span></p>
          <p className='font-bold'>Product variants: <span className='font-normal'>{item.variant}</span></p>
        </div>

        ) : null}
        <button className='absolute border-1 rounded top-2 right-2' onClick={() => setcheck(true)}><X></X></button>
      </div>
      <div className={`p-2 mb-4 m-auto ${check ? 'block' : 'hidden'} `} style={{ marginLeft: '50%' }}>
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-2">
            {/* filter  */}
            <div className='flex justify-between'>
              <h3 className="font-semibold mb-4 text-white">Orders</h3>
              <div className='flex h-[50px] justify-center items-center gap-3'>
                <p className='text-white h-[30px] flex justify-center items-center mt-3 text-xl'>Filter : </p>
                <select className='border-1 text-white h-[30px] rounded-2 w-[100px]' onChange={(e) => setparams({ status: e.target.value })}>
                  <option className='text-white bg-gray-800' value="pending">Pending</option>
                  <option className='text-white bg-gray-800' value="shipped">Shipped</option>
                  <option className='text-white bg-gray-800' value="delivered">Delivered</option>
                </select>
              </div>

            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-white">
                  <th className="border px-1">ID</th>
                  <th className="border px-1">Customer</th>
                  <th className="border px-1">Amount</th>
                  <th className="border px-1">Status</th>
                </tr>
              </thead>
              <tbody>
                {order && order.length > 1 ? order.map((o, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 text-white" >
                    <td className="border px-1 hover:text-blue-500" onClick={() => add_detail(index)}>{o.id}</td>
                    <td className="border px-1">{o.full_name}</td>
                    <td className="border px-1">{o.total_amount}</td>
                    <td className="border px-1">
                      <select className=" rounded-lg px-1 dark:bg-gray-700 my-1 " value={o.status} onChange={(e) => setorderupdate({ ...orderupdate, id: o.id, status: e.target.value })}>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                )) : <tr><td className='text-white mt-4'>No related items</td></tr>}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Order
