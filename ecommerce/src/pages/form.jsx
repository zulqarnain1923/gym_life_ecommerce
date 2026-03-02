
import React, { useState, useRef, useEffect,useContext } from "react";
import { motion } from "framer-motion";
import { Upload, X, Plus } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../components/context/context";


export default function ProductWithVariantsForm() {
  const data=useContext(Authcontext);
  const Navigation=useNavigate();
  const [showimage, setshowimage] = useState([]);
  const refimage = useRef([]);
  const [product, setProduct] = useState({
    pr_name: "",
    pr_desc: "",
    base_price: "",
    base_stock: "",
    strike_price: "",
    brand: "",
  });

  // product change and sotre data in state 
  const handleProductChange = (e) => {
    if (e.target.name === 'images') {
      const files = Array.from(e.target.files);
      setshowimage([...showimage, ...files.map(file => URL.createObjectURL(file))]);
      refimage.current = [...files];
      setProduct({ ...product, images: refimage.current });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const removeImage = (e, index) => {
    e.preventDefault();
    setshowimage(showimage.filter((_, i) => i !== index));
    refimage.current = refimage.current.filter((_, i) => i !== index);
    setProduct({ ...product, images: refimage.current });
  }


  // form data creation for sending to backend 
  let finaldata = new FormData()

  const creatformdata = () => {
    finaldata = new FormData()
    finaldata.append('pr_name', product.pr_name)
    finaldata.append('pr_desc', product.pr_desc)
    finaldata.append('pr_price', product.base_price)
    finaldata.append('strick_price', product.strike_price)
    finaldata.append('brand', product.brand)
    finaldata.append('stock', product.base_stock)
    finaldata.append('catagory', product.catagory)
    if (!product.images) {
      alert('please enter images')
    }
    product.images.forEach((img, index) => { finaldata.append('images', img) })
    if (!product.keywords) {
      alert('please anter keywords')
    }
    product.keywords.forEach((k, index) => { finaldata.append('keywords', k) })
    variants.sizes.forEach((s,index) =>{finaldata.append('sizes',s)})
    variants.colors.forEach((c,index) =>{finaldata.append('colors',c)})
    variants.weights.forEach((w,index) =>{finaldata.append('weights',w)})
    
  }

// submit the form data t backend 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product)
    const finalData = { product, variants };
    console.log("Submitting:", finalData);
    creatformdata()
    call()
  };

// variants add and remove functions 
  const [tempvariant, setTempvariant] = useState({ keywords:'', colors: '', sizes: '', weights: '' })

  const [variants, setvariants] = useState({ keywords: [], colors: [], sizes: [],  weights: []})
  const handeladd = (e = null, type = 'nul', name) => {
    if (e && e.key === 'Enter') {
      if (tempvariant[name] === "") { alert('null value cannot be enter') }
      else {
        e.preventDefault()
        setvariants(prev => ({ ...prev, [name]: [...prev[name], tempvariant[name]] }))
        setProduct(prev => ({ ...prev, [name]: variants[name] }))
        setTempvariant(prev => ({ ...prev, [name]: "" }))
      }
    }
    else if (type === 'keyw') {
      e.preventDefault()
      if (tempvariant[name] === "") { alert('null value cannot be enter') }
      else {
        setvariants(prev => ({ ...prev, [name]: [...prev[name], tempvariant[name]] }))
        setProduct(prev => ({ ...prev, [name]: variants[name] }))
        setTempvariant(prev => ({ ...prev, [name]: "" }))
      }
    }
  }

  const removeTag = (e, type, index, name) => {
    e.preventDefault()
    if (type === 'keyw') {
      const updated = variants[name].filter((_, i) => i !== index)
      setvariants(prev => ({ ...prev, [name]: updated }))
      setProduct(prev => ({ ...prev, [name]: updated }))
    }
  }
  // call to catagory api to get catagory list for dorpdown 
  const [catagory, setcatagory] = useState([])
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${data.url}/catagory/`);
        setcatagory(res.data);
      } catch (error) {
        console.error("Error fetching category:", error.response.data);
      }
    };
    fetchCategory();
  }, []);


  // api call function to send data to backend 
  async function call() {
    try {
      const res = await axios.post(`${data.url}/post/`, finaldata);
      console.log(res.data);
    }
    catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <div className="">
      <div className="min-h-screen  bg-gray-900 text-gray-900 text-white p-6 transition-all">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold h-12">Add Product With Variants</h1>
            <X  className="border-1 rounded-2 me-3 cursor-pointer" onClick={()=>Navigation(-1)}></X>
          </div>

          <form onSubmit={handleSubmit} className="p-2 ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className=" bg-gray-800 p-6 rounded-2xl shadow-lg p-2 flex flex-column gap-3" >
              <h2 className="text-xl font-semibold h-9">Product Details</h2>
              <label className="block text-md mb-1">Product Name :</label>

              <input
                type="text"
                name="pr_name"
                placeholder="Product Name"
                value={product.pr_name}
                onChange={handleProductChange}
                className="w-full p-3 rounded-xl bg-gray-700"
                required
              />
              <label className="block text-md mb-1">Description :</label>

              <textarea
                name="pr_desc"
                placeholder="Product Description"
                value={product.pr_desc}
                onChange={handleProductChange}
                className="w-full p-3 rounded-xl bg-gray-700"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-md mb-1">Base price :</label>
                  <input
                    type="number"
                    name="base_price"
                    placeholder="Base Price"
                    value={product.base_price}
                    onChange={handleProductChange}
                    className="p-3 rounded-xl bg-gray-700 block w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-md mb-1">Strike price :</label>
                  <input
                    type="number"
                    name="strike_price"
                    placeholder="Strike Price"
                    value={product.strike_price}
                    onChange={handleProductChange}
                    className="p-3 rounded-xl bg-gray-700 block w-full"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-md mb-1">Base stock : (optional)</label>
                  <input
                    type="number"
                    name="base_stock"
                    placeholder="Base Stock"
                    value={product.base_stock}
                    onChange={handleProductChange}
                    className="p-3 rounded-xl bg-gray-700 block w-full"
                  />
                </div>
                <div >
                  <label className="block text-md mb-1 block">Category :</label>
                  <select
                    name="catagory"
                    required
                    onChange={handleProductChange}
                    className={`w-full p-3 rounded-lg border-1 bg-gray-700 border-gray-600 block`}
                  >
                    <option>none</option>
                    {catagory.map((item, index) => <option key={index} value={index + 1}>{item.name}</option>)}

                  </select>
                </div>
              </div>
              <label className="block text-md mb-1">Brand :(optional)</label>

              <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={product.brand}
                onChange={handleProductChange}
                className="w-full p-3 rounded-xl bg-gray-700"
              />

            </motion.div>

            {/* image upload section  */}
            <div className={`p-6 rounded-2xl ps-3 mt-4 bg-gray-800 p-2`}>
              <h2 className="text-xl font-semibold mb-4">Product Images</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                {showimage.map((img, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img src={img} className="w-full h-full object-cover rounded-lg" alt="preview" />
                    <button onClick={(e) => removeImage(e, index)} className="absolute -top-2 -right-2 bg-red-500 rounded-pill p-1">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <label
                  className={`w-24 h-24 p-1 flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:bg-gray-100`}>
                  <Upload size={24} className="mx-auto" />
                  <span className="text-[10px] mt-1">Upload</span>
                  <input type="file" name="images" multiple required onChange={(e)=>handleProductChange(e)} accept=".png,.webp" className="hidden" />
                </label>
              </div>
            </div>

            {/* varient secion */}
            <div className="mt-4 flex flex-column gap-3 bg-gray-800 p-2 rounded-4">
              <h1>Variants</h1>
              <div className="">
                <label className="block text-sm mb-1">Relatd Keywords</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={tempvariant.keywords}
                    name="keywords"
                    onChange={(e) => setTempvariant({ keywords: e.target.value })}
                    onKeyDown={(e) => handeladd(e, null, 'keywords')}
                    type="text"
                    className={`flex-1 p-2 rounded border-1 bg-gray-700 border-gray-700`}
                    placeholder="e.g. Red"
                  />
                  <button type="button" onClick={(e) => handeladd(e, 'keyw', 'keywords')} className="p-2 bg-blue-600 rounded">
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.keywords ? variants.keywords.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/50 relative">
                      {c}
                      <button onClick={(e) => removeTag(e, 'keyw', i, 'keywords')} className="absolute -top-2 -right-2 bg-red-500 rounded-pill p-1">
                        <X size={12} />
                      </button>
                    </span>
                  )) : null}
                </div>
              </div>
              <div className="">
                <label className="block text-sm mb-1">Colors</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={tempvariant.colors}
                    name="colors"
                    onChange={(e) => setTempvariant({colors:e.target.value})}
                    onKeyDown={(e) => handeladd(e,null,'colors')}
                    type="text"
                    className={`flex-1 p-2 rounded border-1 bg-gray-700 border-gray-700`}
                    placeholder="e.g. Red"
                  />
                  <button type="button" onClick={(e) => handeladd(e, 'keyw','colors')} className="p-2 bg-blue-600 rounded">
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.colors? variants.colors.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/50 relative">
                      {c}
                      <button onClick={(e) => removeTag(e,'keyw', i,'colors')} className="absolute -top-2 -right-2 bg-red-500 rounded-pill p-1">
                        <X size={12} />
                      </button>
                    </span>
                  )):null}
                </div>
              </div>
              <div className="">
                <label className="block text-sm mb-1">Sizes</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={tempvariant.sizes}
                    name="sizes"
                    onChange={(e) => setTempvariant({sizes:e.target.value})}
                    onKeyDown={(e) => handeladd(e,null,'sizes')}
                    type="text"
                    className={`flex-1 p-2 rounded border-1 bg-gray-700 border-gray-700`}
                    placeholder="e.g. Red"
                  />
                  <button type="button" onClick={(e) => handeladd(e, 'keyw','sizes')} className="p-2 bg-blue-600 rounded">
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.sizes? variants.sizes.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/50 relative">
                      {c}
                      <button onClick={(e) => removeTag(e,'keyw', i,'sizes')} className="absolute -top-2 -right-2 bg-red-500 rounded-pill p-1">
                        <X size={12} />
                      </button>
                    </span>
                  )):null}
                </div>
              </div>
              <div className="">
                <label className="block text-sm mb-1">Weights</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={tempvariant.weights}
                    name="weights"
                    onChange={(e) => setTempvariant({weights:e.target.value})}
                    onKeyDown={(e) => handeladd(e,null,'weights')}
                    type="text"
                    className={`flex-1 p-2 rounded border-1 bg-gray-700 border-gray-700`}
                    placeholder="e.g. Red"
                  />
                  <button type="button" onClick={(e) => handeladd(e, 'keyw','weights')} className="p-2 bg-blue-600 rounded">
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.weights? variants.weights.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/50 relative">
                      {c}
                      <button onClick={(e) => removeTag(e,'keyw', i,'weights')} className="absolute -top-2 -right-2 bg-red-500 rounded-pill p-1">
                        <X size={12} />
                      </button>
                    </span>
                  )):null}
                </div>
              </div>
              
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-3 text-lg font-semibold mt-2"
            >
              Save Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
