import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass, faHeart, faCartShopping, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef } from "react";



const Header = () => {
    const [navb_active, setnavb_active] = useState(true);
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            setnavb_active(false);
        }
        else if (window.scrollY == 0) {
            setnavb_active(true)
        }
    })

    return (
        <>
            <div className={` ${navb_active ? 'navb' : 'navb_active'} sticky-top z-3 rounded-3`}>
                <header className="container-fluid  col-12 d-flex w-100 gap-5 align-items-center justify-content-between top_header ">
                    <h1 className="text-warning ">
                        SigmaForge
                    </h1>
                    <div className=" position-relative d-flex gap-1 align-items-center justify-content-center search" >

                        <input type="text" placeholder="Search Products..." required="" className="rounded-3 text-light ps-5 d-none d-sm-block " />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="position-absolute s_icon " /> 
                        <button className="rounded-3 d-none d-md-block p-1 text-bold bttn_green border-0 outline-none bg-yellow-500 hover:shadow-[0px_0px_10px_yellow] transition-[.5s] text-white font-md">search</button>
                        <button className="rounded-4 bg-info d-flex align-items-center justify-content-center d-md-none position-absolute border-0 outline-none inside_bt "><FontAwesomeIcon icon={faMagnifyingGlass} className="text-light" /></button>

                    </div>
                    <div className="h-100 d-flex gap-4 align-items-center justify-content-center ">
                        <FontAwesomeIcon icon={faUser} className="text-[20px] text-green-500 cursor-pointer rounded-md social hover:border-1 hover:shadow-[0px_0px_10px_lightgreen] py-1 transition-[.5s]" />
                        <FontAwesomeIcon icon={faCartShopping} className="text-[22px] text-yellow-500 cursor-pointer rounded-md social hover:border-1 hover:shadow-[0px_0px_10px_lightgreen] py-1 transition-[.5s]" />

                    </div>
                </header>

                <nav className="container-fluid rounded-3 col-12 d-flex justify-content-center align-items-center w-100 pb-1" >
                    <div className=" col-6 col-md-3 text-white text-[22px] ">
                        All Catagory <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                    <div className="h-100 col-0 col-md-6 d-none h-100 text-light d-md-flex gap-3 align-items-center justify-content-center list-unstyled ">
                        <a href="#" className="link" >Home </a>
                        <a href="#" className="link" >About </a>
                        <a href="#" className="link" >Contact</a>
                        <a href="#" className="link" >All Products </a>

                    </div>
                    <div className="col-6 col-md-3 h-100 text-light d-flex gap-3 align-items-center justify-content-end list-unstyled">
                        <FontAwesomeIcon icon={faHeart} className="text-[20px] text-red-500 cursor-pointer hover:shadow-[0px_0px_10px_red]" />
                    </div>
                </nav>
            </div >
        </>
    )
}


export default Header;
