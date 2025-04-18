import React from "react";
import Navbar from "./components/Navbar"
import { Link, Outlet } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="w-full h-20 flex items-center justify-center gap-6 bg-gray-100 mt-10">
        <Link to="/signup" className="text-red-400 hover:underline">Signup</Link>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/card" className="hover:underline">Card</Link>
      </footer>
    );
  };

const Layout = () =>{
return (
    <>
<Navbar/>
<Outlet/>
<Footer/>
    </>
)
}


export default Layout;