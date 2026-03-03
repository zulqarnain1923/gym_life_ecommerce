

import React, { useState, useEffect, useRef, useContext } from 'react';
import { X } from 'lucide-react';
import { Authcontext } from '../components/context/context';

const OpenStreetMapForm = ({ toggle }) => {
  const data = useContext(Authcontext)
  const da = useRef({
    full_name: '',
    phone: '',
    city: '',
    street_address: '',
    postal_code: '',
    payment_method: '',
    address: '',
  })
  const [formData, setFormData] = useState({ ...da.current });

  const [errors, setErrors] = useState({});
  const [query, setQuery] = useState(''); 
  const [suggestions, setSuggestions] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef(null);

  const timeoutRef = useRef(null);
// for address field 
  const searchAddress = (searchText) => {
    if (searchText.length < 3) {
      setSuggestions([]);
      return;
    }

    // Ye Free API hai, isme koi key nahi lagti
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`)
      .then((res) => res.json())
      .then((data) => {
        // Sirf top 5 results dikhayenge
        setSuggestions(data.slice(0, 6));
      })
      .catch((err) => console.error(err));
  };


  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsValid(false); // User nayi cheez likh raha hai to abhi valid nahi

    // Clear previous timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Set new timer (Debounce effect)
    timeoutRef.current = setTimeout(() => {
      searchAddress(value);
    }, 500); // 500ms baad search karega
  };

  // Jab user kisi suggestion par click kare
  const handleSuggestionClick = (place) => {
    const fullAddress = place.display_name;
    setQuery(fullAddress);
    setFormData((prev) => ({ ...prev, address: fullAddress }));
    setSuggestions([]); // List band kar do
    setIsValid(true); // Ab address valid hai
    if (errors.address) setErrors((prev) => ({ ...prev, address: null }));
  };

  // Standard fields handle karna
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Full Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Contact Number is required';
    if (!formData.city.trim()) newErrors.city = 'city is required';
    if (!formData.postal_code.trim()) newErrors.postal_code = 'postal code is required';
    if (!formData.street_address.trim()) newErrors.street_address = 'street address is required';
    if (!formData.payment_method.trim()) newErrors.payment_method = 'payment method is required';

    // Address Validation
    if (!query.trim()) {
      newErrors.address = 'Address is required';
    } else if (!isValid) {
      newErrors.address = 'Invalid Address! Please select a valid address from the dropdown list.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const s= data.setorderprd({...data.orderprd,...formData,address:query});
    const res=data.runfunctions(null,'placeorder',{...formData,address:query});
    console.log(s)
    setFormData({...da.current})
    setQuery('')
    toggle(true)
    
  };
 
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center p-4 absolute  z-100 fixed backdrop-blur-sm " >
      <div className="bg-gray-900 max-h-[550px] max-w-[500px] p-6 rounded-lg shadow-md w-full max-w-lg z-200 p-2 overflow-y-scroll">
        <div className=''>
          <div className='relative'>
            <h1 className="text-xl font-bold mb-4 text-center text-white">
              Order Details
            </h1>
            <button className='text-gray-400 border-1 rounded-1 absolute right-0 top-0 hover:text-gray-500' onClick={() => toggle(true)}><X ></X></button>
          </div>
          <form onSubmit={handleSubmit} className="p-3 border-1 border-white rounded-2">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-white">Full Name</label>
              <input
                name="full_name"
                type="text"
                value={formData.full_name}
                onChange={handleChange}
                className="text-white mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-white">Contact Number</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="text-white mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* city */}
            <div>
              <label className="block text-sm font-medium text-white">City </label>
              <input
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="text-white mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            {/* street  */}
            <div>
              <label className="block text-sm font-medium text-white">Street address </label>
              <input
                name="street_address"
                type="text"
                value={formData.street_address}
                onChange={handleChange}
                className="text-white mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.street_address && <p className="text-red-500 text-xs mt-1">{errors.street_address}</p>}
            </div>
            {/* postal code  */}
            <div className='flex gap-3'>
              <div>
                <label className="block text-sm font-medium text-white ">Postal code </label>
                <input
                  name="postal_code"
                  type="text"
                  value={formData.postal_code}
                  onChange={handleChange}
                  className="text-white mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none text-white block"
                />
                {errors.postal_code && <p className="text-red-500 text-xs mt-1">{errors.postal_code}</p>}
              </div>
              {/* /////////////////// */}
              <div>
                <label className="block text-sm font-medium text-white">Payment method </label>

                <select name="payment_method" onChange={handleChange} className='mt-1 w-full p-2  border rounded focus:ring-2 focus:ring-blue-500 outline-none text-white'>
                  <option value=""></option>
                  <option value="cash on delivery" className='bg-gray-500'>cash on delivery</option>

                </select>
                {errors.payment_method && <p className="text-red-500 text-xs mt-1">{errors.payment_method}</p>}
              </div>
            </div>
            {/* ADDRESS FIELD (OPENSTREETMAP) */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300">Delivery Address</label>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Type address (e.g. Lahore, Main Boulevard)..."
                className={` text-white mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none ${errors.address ? 'border-red-500' : ''}`}
                style={{ fontSize: '16px' }} // Prevent zoom on mobile
              />

              {/* Dropdown Suggestions List */}
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto shadow-lg">
                  {suggestions.map((place, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(place)}
                      className="p-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b last:border-0"
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}

              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              {!errors.address && query.length > 0 && !isValid && (
                <p className="text-gray-400 text-xs mt-1">Please select an address from the list below.</p>
              )}
            </div>

            <button
              onClick={(e)=>(handleSubmit(e))}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition mt-3"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OpenStreetMapForm;