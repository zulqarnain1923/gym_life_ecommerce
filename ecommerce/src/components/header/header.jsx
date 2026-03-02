import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faHeart, faCartShopping, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { Authcontext } from "../context/context";
import axios from 'axios'


const Header = () => {
    const data = useContext(Authcontext)
    const Navigation = useNavigate()
    const [catagory, setcatagory] = useState()
    const [check, setcheck] = useState({ profile: false, cart: false, catg: false })
    const [headcheck, setheadcheck] = useState(true)
    const [navb_active, setnavb_active] = useState(true);
    const [open, setOpen] = useState(false);

    const [search,setsearch]=useState({name:''})

    // const [checksearch,setchecksearch]= useState(true)

    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            setnavb_active(false);
        }
        else if (window.scrollY == 0) {
            setnavb_active(true)
        }
    })
    const pr_page = (id) => {
        Navigation(`/product/priview/${id}`)
    }

    async function ctg() {
        try {
            const res = await axios.get(`${data.url}/catagory/`)
            setcatagory(res.data)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        ctg()
    }, [])

// navigation 
    function call(name) {
        Navigation(`/all/products?catagory=${name}`)
    }

// card show  
    function boxcheck(type) {

        if (type === "cart") {
            data.runfunctions(null, 'getcartitem', null)
            check.cart == true ? setcheck({ ...check, cart: false }) : setcheck({ ...check, cart: true })
        }
        if (type === "profile") {

            check.profile ? setcheck({ ...check, profile: false }) : setcheck({ ...check, profile: true })
        }
        if (type === "catagory") {

            check.profile ? setcheck({ ...check, catg: false }) : setcheck({ ...check, catg: true })
        }


    }

// card show of
    useEffect(() => {
        const handleClick = () => {
            setcheck(prev => ({ ...prev, profile: false, cart: false, catg: false }))
            setheadcheck(true)
        };
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };

    }, [check, headcheck]);
// search call  
    const searchprd=()=>{
        console.log(search.name)
        // const queryString = new URLSearchParams(search).toString();
        Navigation(`/all/products?name=${search.name}`)
    }

    return (
        <>

            {open && (
                <div className="fixed  bottom-0 inset-0 h-[100%] bg-[rgba(255,255,255,.2)] bg-opacity-40 z-10" onClick={() => setOpen(false)}></div>)}

            {/*Side Menu */}
            <div className={`fixed bottom-0 right-0 h-[100%] w-64 bg-white shadow-lg z-20 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-4 font-bold border-b">Menu</div>
                <div className="flex flex-col p-4 gap-4">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/all/products" >Products</NavLink>
                </div>
            </div>
            <div className={` ${navb_active ? 'navb' : 'navb_active'} sticky-top  z-3 rounded-3 `}>
                {/* short input bar  */}
                <div className={`w-full bg-gray-900  h-12 px-3 flex items-center justify-center gap-2 tosearch ${headcheck ? 'hidden' : "block"}`} onClick={(e) => e.stopPropagation()}>
                    <input type="text" name="search" value={search.name} onChange={(e)=> setsearch({name:e.target.value})} placeholder="Search here ....." className="h-5 bg-gray-800 border-1 border-gray-600 rounded p-3 w-full outline-none text-white" />
                    <button className="bg-yellow-500 rounded-2 text-white p-1 hover:bg-yellow-400" onClick={()=> searchprd()}> search</button>
                </div>
                {/* header */}
                <header className={`container-fluid  col-12 d-flex w-100 gap-5 align-items-center justify-content-between top_header ${headcheck ? 'd-block' : "d-none"}`}>
                    <h1 className="text-warning ">
                        SigmaForge
                    </h1>
                    <div className=" position-relative d-flex gap-1 align-items-center justify-content-center search" >

                        <input type="text" name='search' value={search.name} onChange={(e)=> setsearch({name:e.target.value})} placeholder="Search Products..." required="" className="rounded-3 text-light ps-5 inp " />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="position-absolute d-none d-sm-block s_icon " />
                        <button className="rounded-3 d-none d-md-block p-1 text-bold bttn_green border-0 outline-none bg-yellow-500 hover:shadow-[0px_0px_10px_yellow] transition-[.5s] text-white font-md" onClick={()=> searchprd()}>search</button>
                        <button className="rounded-4 bg-yellow-500 d-flex align-items-center justify-content-center d-md-none position-absolute border-0 outline-none inside_bt d-none d-sm-block"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-light" /></button>
                        <button className="rounded-4 bg-yellow-500 d-flex align-items-center justify-content-center d-block position-absolute border-0 outline-none inside_bt d-sm-none" onClick={()=> searchprd()}><FontAwesomeIcon icon={faMagnifyingGlass} className="text-light " onClick={(e) => (e.stopPropagation(), headcheck ? setheadcheck(false) : setheadcheck(true))} /></button>

                    </div>
                    <div className="h-100 d-flex gap-4 align-items-center justify-content-center ">
                        <FontAwesomeIcon icon={faUser} className="text-[20px] text-green-500 cursor-pointer rounded-md social hover:border-1 hover:shadow-[0px_0px_10px_lightgreen] py-1 transition-[.5s] profileicon" onClick={(e) => (e.stopPropagation(), boxcheck("profile"), data.runfunctions(null,'check',null))} />
                        <div className={`min-h-[150px] w-[200px] bg-gray-900 rounded-4 top-10 right-9 px-3 py-5 text-center text-white profilebox ${check.profile ? "block" : "hidden"}`}>
                            {data.showuser?<div className="underline text-blue-500 cursor-pointer hover:text-blue-600" onClick={()=> data.runfunctions(null,"logout",null)}>Logout</div>:

                            <div className="flex gap-3">
                            <div className="underline text-blue-500 cursor-pointer hover:text-blue-600" onClick={()=>Navigation('/login')}>Login</div>
                            <div className="underline text-blue-500 cursor-pointer hover:text-blue-600" onClick={()=> Navigation('/register')}>Register</div>
                            </div>
                            }
                        </div>

                        <FontAwesomeIcon icon={faCartShopping} className="text-[22px] text-yellow-500 cursor-pointer rounded-md social hover:border-1 hover:shadow-[0px_0px_10px_lightgreen] py-1 transition-[.5s] carticon " onClick={(e) => (e.stopPropagation(), boxcheck("cart"))} />
                        <div className="bg-red-500 absolute rounded-pill text-[10px] text-white h-4 w-4 flex items-center justify-center font-bold right-2 top-1 "> {data.showcart && data.showcart.product ? data.showcart.product.length : 0}</div>
                        <div className={` min-h-[100px] max-h-[300px] min-w-[230px] max-w-[270px] bg-gray-900 rounded-4 top-10 right-2 px-3 py-5 text-center flex flex-column gap-2  overflow-y-scroll cartbox ${check.cart ? "block" : "hidden"} `}> {data.showcart && Array.isArray(data.showcart.product) && data.showcart.product.length > 0 ? (data.showcart.product.map((item, index) => (
                            <div key={index} className="flex gap-2 hover:bg-gray-500 p-1 rounded-2 " >
                                <img src={item.image} width='50px' className="rounded-3 cursor-pointer" onClick={() => (pr_page(item.pr_id))} />
                                <div className="flex flex-column justify-between ">
                                    <span className="text-white text-[12px] text-start">{item.pr_name}</span>
                                    <span className="w-[40px] bg-red-600 rounded-1 h-[15px] me-0 text-[10px] text-white cursor-pointer" onClick={() => (data.runfunctions(null, 'deletecartitem', item.pr_id))}>Delete</span>
                                </div>

                            </div>
                        ))) : <p className="text-white">your cart is empty</p>}
                        </div>

                    </div>
                </header>

                <nav className="container-fluid rounded-3 col-12 d-flex justify-content-center align-items-center w-100 pb-1" >

                    <div className="relative col-6 col-md-3 text-white text-[22px] cursor-pointer " onClick={(e) => (e.stopPropagation(), boxcheck("catagory"))} >
                        All Catagory <FontAwesomeIcon icon={faCaretDown} />
                        <div className={`absolute bg-white  w-[200px] rounded p-2 flex flex-column gap-2 ${check.catg ? 'block' : 'hidden'}`}>
                            {catagory ? catagory.map((item, index) => (
                                <div key={index} className="text-black text-[15px] bg-gray-200 rounded p-1 cursor-pointer hover:bg-gray-300" onClick={() => call(item.name)}>{item.name}</div>
                            )) : null}
                        </div>
                    </div>



                    <div className="h-100 col-0 col-md-6 d-none h-100 text-light d-md-flex gap-3 align-items-center justify-content-center list-unstyled ">
                        <NavLink to="/" className="link" >Home </NavLink>
                        <NavLink to="/about" className="link" >About </NavLink>
                        {/* <NavLink to="/product" className="link" >product</NavLink> */}
                        {/* <NavLink to="/" className="link" >Priview </NavLink> */}
                        <NavLink to="/all/products" className="link" >All Products </NavLink>

                    </div>
                    <div className=" col-6 col-md-3 h-100 text-light d-flex gap-3 align-items-center justify-content-end list-unstyled">
                        <button
                            className="text-2xl md:hidden"
                            onClick={() => setOpen(!open)}>
                            ☰
                        </button>
                        

                    </div>
                </nav>
            </div >
        </>
    )
}


export default Header;
