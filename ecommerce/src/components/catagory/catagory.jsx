import React from 'react'
import { useState,useContext,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faPills, faShirt, faShoePrints, faGlasses } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { Authcontext } from '../context/context'

const ctg_list = [
    { name: "All", icon: faBorderAll },
    { name: "Diet-Supplements", icon: faPills },
    { name: "Gym apparel", icon: faShirt },
    { name: "Footwear", icon: faShoePrints },
    { name: "Accessries", icon: faGlasses }

]

function Catagory() {
    const Navigation=useNavigate()
    const data=useContext(Authcontext)
    const [catagory,setcatagory]=useState({})
    const ctg=useRef(['All','Diet & Supplements','Gym Apparel','Footer','Accessories'])
    const [catagories, setcatagories] = useState(ctg_list)
    

    async function call(i){
        console.log(ctg.current[i])
        Navigation(`/all/products?catagory=${ctg.current[i]}`)
}
    return (
        <>
            <div className='bg-dark pb-5 flex flex-col justify-center items-center'>
                <div className='w-[330px] text-white text-[35px] font-bold text-center mt-5 mb-5 rounded-3 border-b-1'>Shop by Catagory</div>
                <div className='flex flex-wrap gap-4 p-3 min-h-[150px] w-full justify-center items-center'>
                    {catagories.map((item, index) => (
                        <div key={index} className='h-[130px] w-full max-w-[120px] bg-[#020617] p-3 flex flex-col items-center justify-between rounded-md hover:shadow-[0px_0px_30px_green] hover:bg-green-400 hover:scale-[1.1] transition-all duration-300 cursor-pointer' onClick={()=>call(index)}>
                            <FontAwesomeIcon icon={item.icon} className='text-green-600 text-[35px] mt-1'></FontAwesomeIcon>
                            <p className='text-white text-[18px] text-center font-bold font-medium mb-0'>{item.name}</p>

                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Catagory
