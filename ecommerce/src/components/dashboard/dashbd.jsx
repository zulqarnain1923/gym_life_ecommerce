import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import { Card, CardContent } from './component'
import axios from 'axios';
import { useState, useContext } from 'react';
import { Authcontext } from '../context/context';
import { ShoppingBag,Users,Package } from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";


const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4780 },
  { name: "May", sales: 5890 },
];

const Dashbd = () => {

  const [monthdata, setmonthdata] = useState({})
 
  const data = useContext(Authcontext)
  const fetchdata = async () => {
    try {
      const res = await axios.get(`${data.url}/order/month/data/`)
      setmonthdata({...res.data})
    }
    catch (error) {
      alert(error.response.data)
    }
  }

useEffect(() => {
  fetchdata()
}, [])


const chartdata = monthdata?.monthly_data?.map(item => ({
  name: new Date(item.month).toLocaleString('default', { month: 'short' }),
  revenue: item.total_amount  // Revenue
}))

const orderschartdata = monthdata?.monthly_data?.map(item => ({
  name: new Date(item.month).toLocaleString('default', { month: 'short' }),
  sales: item.total_orders
}))
return (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-2 pt-3">

      <motion.div whileHover={{ scale: 1.04 }}>
        <Card className="rounded-2xl shadow-lg px-3 py-1">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-white">Total Orders</p>
              <h2 className="text-2xl font-bold text-white">{monthdata ? monthdata.total_orders : null}</h2>
            </div>
            <span className="text-green-500 text-"><ShoppingBag/></span>
            
          </CardContent>
        </Card>
      </motion.div>

      <motion.div  whileHover={{ scale: 1.04 }}>
        <Card className="rounded-2xl shadow-lg px-3 py-1">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-white">Total Products</p>
              <h2 className="text-2xl font-bold text-white">{monthdata ? monthdata.total_products : null}</h2>
            </div>
             <span className="text-green-500 text-sm"><Package/></span>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div  whileHover={{ scale: 1.04 }}>
        <Card className="rounded-2xl shadow-lg px-3 py-1">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-white">Customers</p>
              <h2 className="text-2xl font-bold text-white">{monthdata ? monthdata.total_users : null}</h2>
            </div>
              <span className="text-green-500 text-sm"><Users/></span>
          </CardContent>
        </Card>
      </motion.div>

    </div>

    {/* Charts */}

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-2 mt-4 border-t border-gray-400 ">
      <Card className="rounded-2xl shadow-lg  ">
        <CardContent className="p-2">
          <h3 className="mb-4 font-semibold text-white">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartdata} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey='revenue' />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-lg ">
        <CardContent className="p-2">
          <h3 className="mb-4 font-semibold text-white">Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderschartdata}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>

)
}


export default Dashbd
