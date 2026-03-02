import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserSearch } from "lucide-react";

import Imagesfield from "./imagesfield";


function Inputfield({ formdata, handelform, darkMode, images, handleImageChange,removeImage }) {

 const [catagory, setcatagory]= useState([])

 useEffect(() => {
  const fetchCategory = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/catagory/');
      setcatagory(res.data)
      

    } catch (error) {
      console.error("Error fetching category:", error.response.data);

    }
  };

  fetchCategory();
}, []);
  return (

    <div className={`p-3 rounded-2xl ${darkMode ? 'bg-[#032647] shadow-[0px_0px_5px_gray]' : 'bg-white shadow-lg'}`}>
      <div className="space-y-4">
        <div>
          <label className="block text-lg mb-1">Product Name :</label>
          <input
            type="text"
            name="name"
            onChange={handelform}
            value={formdata.name || ''}
            required
            className={`w-full p-3 rounded-lg border-1 ${darkMode ? 'bg-gray-900 border-gray-500 placeholder-gray-400' : 'bg-gray-50 border-gray-300 placeholder-gray-400'}`}
            placeholder="Product name ..."
          />
        </div>
        <div>
          <label className="block text-lg mb-1">Brand Name : <span className="text-[12px] text-gray-500">(Optional)</span></label>
          <input
            type="text"
            name="brand"
            onChange={handelform}
            value={formdata.brand || ''}
            required
            className={`w-full p-3 rounded-lg border-1 ${darkMode ? 'bg-gray-900 border-gray-500 placeholder-gray-400' : 'bg-gray-50 border-gray-300 placeholder-gray-400'}`}
            placeholder="Brand name ..."
          />
        </div>
        <div>
          <label className="block text-lg mb-1">Description :</label>
          <textarea
            rows="4"
            name="desc"
            onChange={handelform}
            value={formdata.desc || ''}
            required
            className={`w-full p-3 rounded-lg border-1 ${darkMode ? 'bg-gray-900 border-gray-600 placeholder-gray-400' : 'bg-gray-50 border-gray-300 placeholder-gray-400'}`}
            placeholder="Describe your product..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-md mb-1">Strick Price (Rs.) :</label>
            <input
              type="number"
              name="price"
              onChange={handelform}
              value={formdata.price || ''}
              required
              className={`w-full p-3 rounded-lg border-1 ${darkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-md mb-1">Sale Price (Rs.) :</label>
            <input
              type="number"
              name="strikprice"
              onChange={handelform}
              value={formdata.strikprice || ''}
              required
              className={`w-full p-3 rounded-lg border-1 ${darkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-md mb-1">Category :</label>
            <select
              name="catagory"
              onChange={handelform}
              className={`w-full p-3 rounded-lg border-1'bg-gray-50 border-gray-300`}
            >
              <option>none</option>
              {catagory.map((item, index)=> <option key={index} value={index + 1}>{item.name}</option>)}
              
            </select>
          </div>
          <div>
            <label className="block text-md mb-1">Stock Quantity :</label>
            <input
              type="number"
              name="stock"
              onChange={handelform}
              value={formdata.stock || ''}
              required
              className={`w-full p-3 rounded-lg border-1 ${darkMode ? 'bg-gray-900 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
            />
          </div>
        </div>
        <Imagesfield images={images} handleImageChange={handleImageChange} removeImage={removeImage} darkMode={darkMode} />

      </div>
    </div>

  )
}



export default Inputfield