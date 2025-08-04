import React, { useState } from 'react';
import logo from "../../assets/images/logo.png"; 
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from '@inertiajs/react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <nav className="w-full bg-transparent py-[25px] mb-[-120px] relative z-[9]">
        <div className="max-w-[1320px] mx-auto px-4 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
                <img src={logo} alt="Logo" className="" />
            </Link>
            <span className="text-white text-xl font-bold">certify<span className="font-normal">cars</span></span>
          </div>
  
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-white text-[20px] font-[500]">
            <a href="#" className="hover:text-red-500">Home</a>
            <a href="#" className="hover:text-red-500">Service</a>
            <a href="#" className="hover:text-red-500">About</a>
            <a href="#" className="hover:text-red-500">Contact</a>
          </div>
  
          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="cursor-pointer creatodisplayM min-w-[150px] px-[10px] py-[12px] border border-white rounded-full text-white text-[20px] font-w[500] hover:bg-white hover:text-black transition">
              Register
            </button>
            <button className="cursor-pointer creatodisplayM min-w-[150px] px-[10px] py-[12px] bg-[#D72638] rounded-full text-white text-[20px] font-[500] hover:bg-[#D72638] transition">
              Login
            </button>
          </div>
  
          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <IoMdClose size={28} />:  <RxHamburgerMenu size={28} />}
            </button>
          </div>
        </div>
  
        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-black bg-opacity-90 text-white px-6 py-4 space-y-4">
            <a href="#" className="block hover:text-red-500">Home</a>
            <a href="#" className="block hover:text-red-500">Service</a>
            <a href="#" className="block hover:text-red-500">About</a>
            <a href="#" className="block hover:text-red-500">Contact</a>
            <div className="flex flex-col space-y-2 mt-4">
              <button className="px-6 py-2 border border-white rounded-full text-white text-sm hover:bg-white hover:text-black transition">
                Register
              </button>
              <button className="px-6 py-2 bg-red-600 rounded-full text-white text-sm hover:bg-red-700 transition">
                Login
              </button>
            </div>
          </div>
        )}
      </nav>
    );
  };
  
  export default Header;
