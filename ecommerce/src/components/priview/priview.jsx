import React, { useEffect, useState, useContext, useRef } from 'react'

import { Check } from 'lucide-react'
import { Authcontext } from '../context/context'

const Prd_priview = ({ product, toggle }) => {
    const [prd, setprd] = useState()
    const [imgs, setimgs] = useState([])
    const [sizes, setsizes] = useState([])
    const [colors, setcolors] = useState([])
    const [weights, setweights] = useState([])
    const [quantity, setquantity] = useState(1)
    const [index, setindex] = useState(0)
    const [checkmark, setcheckmark] = useState({ size: 0, color: 0 })


    const data = useContext(Authcontext)


    useEffect(() => {
        const data = async () => {
            const res = await product
            if (product) {
                setprd(product)
                setimgs([...product.images])
                setsizes([...product.sizes])
                setcolors([...product.colors])
                setweights([...product.weights])
            }
        }
        data()
    }, [product])

    function handelcheck(type, idx) {
        if (type === 'size') {
            setcheckmark({ ...checkmark, size: idx })
        }
        if (type === 'color') {
            setcheckmark({ ...checkmark, color: idx })
        }
        if (type === 'weight') {
            setcheckmark({ ...checkmark, weight: idx })
        }
    }

    const [zoomStyle, setZoomStyle] = useState({ display: "block" });

    const handleMouseMove = (e) => {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const { offsetWidth, offsetHeight } = target;

        const xPercent = (offsetX / offsetWidth) * 100;
        const yPercent = (offsetY / offsetHeight) * 100;

        setZoomStyle({
            display: "block",
            backgroundImage: `url(${imgs[index]})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "800% 800%",
            backgroundPosition: `${xPercent}% ${yPercent}%`,
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({ display: "block" });
    };

    const handleclick = (e) => {
        e.preventDefault()
    }

    const handleadd = () => {
        setquantity(quantity + 1)
    }
    const handleremove = () => {
        if (quantity > 1) {
            setquantity(quantity - 1)
        }
    }

    const orderinfo = useRef({})
    const variant = useRef({})
    const formdata = () => {
        if (!product.sizes.length < 1) {
            variant.current = (({ ...variant.current, size: sizes[checkmark.size] }))
        }
        if (!product.colors.length < 1) {
            variant.current = (({ ...variant.current, color: colors[checkmark.color] }))
        }
        if (!product.weights.length < 1) {
            variant.current = (({ ...variant.current, weight: weights[checkmark.weight] }))
        }
        orderinfo.current = (({ ...orderinfo.current, pr_id: product.pr_id }))
        orderinfo.current = (({ ...orderinfo.current, total_amount: product.pr_price }))
        orderinfo.current = (({ ...orderinfo.current, quantity: quantity }))

        const d = Object.entries(variant.current)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");


        // console.log(orderinfo.current)
        data.setorderprd({ ...orderinfo.current, variant: d })
    }

    return (
        <>
            (<div className='w-full flex items-center justify-center border-1 border-bottom-[1px solid gray] mx-auto mb-5 pb-5 max-w-[1200px]'>
                <div className='grid grid-cols-12 md:gap-4 p-2 items-center min-w-[100%]'>

                    <div className='col-span-12 sm:col-span-6 md:col-span-5 rounded-4 overflow-hidden w-[100%] position-relative ' >
                        <div className='max-w-[450px]  @container' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                            <div className=' shrink-0 w-[clamp(90px,5cqw,120px)] h-[clamp(90px,5cqw,120px)] position-absolute left-2 top-2 border-1 border-gray-200' style={zoomStyle} ></div>
                            <img src={imgs[index]} alt="" width="100%" className='rounded-3 ' />

                        </div>
                        <div className='@container flex flex-wrap border border-white px-1 mt-2 rounded-4 '>
                            {imgs.map((item, index) => (<div key={index} className='px-1 py-2 shrink-0 w-[clamp(40px,10cqw,60px)] ' onClick={() => setindex(index)}>
                                <img src={item} alt="" className="w-full h-auto object-cover rounded-3" />
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className="hidden md:block md:col-span-1"></div>

                    <div className='col-span-12 sm:col-span-6 bg-black p-4 w-[100%]'>
                        {/* <p className='text-[30px] font-bold text-green-500 text-center'>SigmaForge<span className='text-yellow-500'>.pk</span></p> */}
                        <div className='flex justify-between'>
                            <p className='text-[28px] text-green-500 font-bold text-capitalize'>{product ? product.pr_name : null}</p>
                            <a href='#review' className='text-[18px] text-gray-500 text-capitalize ' onClick={handleclick}>check review</a>
                        </div>
                        <p className='min-w-[100%] max-w-[100%] w-full  text-gray-400'>{product ? product.pr_desc : null}</p>

                        <p className='tex-white capitalize text-[20px] text-yellow-500 font-bold'>{product ? product.pr_price : null} <strike className='text-[13px]'> {product ? product.strick_price : null}</strike></p>

                        {sizes.length > 0 ? <span className='font-bold capitalize text-white text-[20px]'>size</span> : null}
                        <div className='flex gap-3 '>
                            {checkmark ? (
                                sizes.map((item, index) => (<p key={index} className='p-2 text-white relative cursor-pointer' onClick={() => handelcheck('size', index)}>{item}
                                    {checkmark.size === index ? <Check color="green" size={18} className='absolute' /> : null}
                                </p>))) : null}
                        </div>
                        {colors.length > 0 ? <span className=' font-bold capitalize text-white text-[20px]'>color</span> : null}
                        <div className='flex gap-3 '>
                            {checkmark ? colors.map((item, index) => (<p key={index} className="p-1 rounded-pill cursor-pointer mt-2 text-white text-[14px]" onClick={() => handelcheck('color', index)}>{item}
                                {checkmark.color === index ? <Check color="green" size={18} className='absolute' /> : null}

                            </p>)) : null}
                        </div>
                        {weights.length > 0 ? <span className=' font-bold capitalize text-white text-[20px]'>weight</span> : null}
                        <div className='flex gap-3 '>
                            {checkmark ? weights.map((item, index) => (<p key={index} className="p-1 rounded-pill cursor-pointer mt-2 text-white text-[14px]" onClick={() => handelcheck('weight', index)}>{item}
                                {checkmark.weight === index ? <Check color="green" size={18} className='absolute' /> : null}

                            </p>)) : null}
                        </div>
                        <span className='font-bold text-white'>Quantity : </span>

                        <div className='flex gap-4 mt-3 ps-5'>
                            <button onClick={handleadd} className='border-1 border-green-500 rounded text-[50px] text-white w-7 h-7'>+</button>
                            <div className='text-white'>{quantity}</div>
                            <button onClick={handleremove} className='border-1 border-red-500 rounded text-[50px] text-white w-7 h-7 '>-</button>
                        </div>
                        <div className='w-full px-2 flex justify-between mt-4'>
                            <button className='w-[78%] bg-yellow-500 rounded-3 h-[40px] font-bold text-white ' onClick={() => (data.runfunctions(null, 'checkuser', null), formdata(), toggle(false))}><span className='text-[20px] capitalize hover:text-[22px] transition-all duration-[.4s] w-[100%] block'> order now</span></button>   {/*,toggle(false) */}
                            <button className='w-[20%] bg-green-500 rounded-3 h-[40px] font-bold text-white '><span className='text-[20px] capitalize hover:text-[22px] transition-all duration-[.4s] w-[100%] block'> cart</span></button>
                        </div>
                    </div>
                </div>
            </div>)
        </>
    )
}



export default Prd_priview

