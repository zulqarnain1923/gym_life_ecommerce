import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/*Top Navbar */}
      <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <button className="text-2xl md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-10" onClick={() => setOpen(false)}></div>)}

      {/*Side Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full" }`}>
        <div className="p-4 font-bold border-b">Menu</div>
        <div className="flex flex-col p-4 gap-4">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
        </div>
      </div>

    </div>
  );
};

export default SideNav;