import React, { useState } from "react";
import Dashbd from "../components/dashboard/dashbd";
import Order from "../components/dashboard/order";
import Product from "../components/dashboard/product"
import {User,Menu,} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { TbH1 } from "react-icons/tb";


// Custom UI Compnent

const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition ${className}`}>
    {children}
  </button>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="border p-2 rounded-xl w-full bg-gray-300 dark:border-gray-600"
  />
);
const menuitem=["Dashboard", "Orders", "Products"]


// Main Component //

export default function AdminDashboard() {
  const [searchParams]=useSearchParams()
  const password= searchParams.get('password')
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [flag,setflag]=useState(0)



  if (password==='123786'){
  return (
    <div className="bg-gray-200  fixed ">
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300 bg-gray-900  shadow-xl p-4 min-h-screen border-e-1 border-gray-400 `}>
          <Button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={18} />
          </Button>

          <nav className="mt-6 space-y-4">
            {menuitem.map((item,index) => (
              <div key={index} className="hover:bg-gray-800 bg-gray-600 text-white p-2 rounded-xl cursor-pointer my-2" onClick={()=>setflag(index)}>
                {sidebarOpen ? item : item[0]}
              </div>
            ))}
          </nav>
        </div>

        {/* Main */}
        <div className="flex-1 ">

          {/* Topbar */}
          <div className="flex justify-between items-center bg-gray-900 px-4 h-[50px] py-4 w-[100%] border-b-1 border-gray-400">
            
            <div className="">
              <p className="font-bold text-[30px] text-yellow-500 mt-2"><span className="text-green-500">Forge</span> Dashboard</p>
            </div>

            <div className="flex items-center gap-4">

              

            </div>
          </div>

          {/* Stats */}
          <div className={`relative overflow-y-scroll h-screen p-2 pt-4 pb-5 min-w-[300px] bg-gray-700 max-w-[1300px] ${sidebarOpen ? 'w-[calc(100vw-260px)]' : 'w-[calc(100vw-80px)]'}`}>
           {flag == 0? <Dashbd/>:null}
           {flag == 1? <Order/>:null}
           {flag == 2? <Product/>:null}
          </div>
        </div>
      </div>
    </div>
  );
}else{
  return(<h1 className="text-white">Unauthorized</h1>)
 }
}
