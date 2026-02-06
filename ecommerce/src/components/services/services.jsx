import React from "react";

import { MdLocalShipping } from "react-icons/md"
import { FaRegHandshake } from "react-icons/fa6";
import { TbHours24 } from "react-icons/tb";
import { GrSecure } from "react-icons/gr"

import { useState } from "react";

const features = [
    {
      id: 1,
      icon: <MdLocalShipping className="text-4xl" />,
      title: "Free Shipping",
      desc: "On all orders over $100",
    },
    {
      id: 2,
      icon: <TbHours24 className="text-4xl" />,
      title: "24/7 Support",
      desc: "Get help whenever you need",
    },
    {
      id: 3,
      icon: <GrSecure className="text-4xl" />,
      title: "Secure Payment",
      desc: "100% safe payment methods",
    },
    {
      id: 4,
      icon: <FaRegHandshake className="text-4xl" />,
      title: "Easy Returns",
      desc: "30 days return policy",
    },
  ];

const Features = () => {
  const [feature,setfeature]= useState(features)

  return (
    <div className=" py-5 border-y-1  border-gray-100">
        <p className='ms-4 text-[30px] text-white text-center font-bold rounded-4 border-b-1 w-[150px] '>Features</p>

      <div className="max-w-[1100px] mx-auto px-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {feature.map((item,index) => (
            <div key={index} className="flex items-center gap-4 group cursor-default bg-black border-1 border-yellow-500 rounded-4 p-2 hover:translate-y-[-5px] transition-all duration-500">
              
              <div className="w-16 h-16 bg-gray-300 shadow-sm rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-green-400 group-hover:text-white  ">
                {item.icon}
              </div>
              
              <div>
                <p className="font-bold text-green-500 text-lg leading-tight">{item.title}</p>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Features;