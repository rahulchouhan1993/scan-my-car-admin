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
            <Link href="/">
                <img src={logo} alt="Logo" className="" />
            </Link>
          </div>
  
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-[15px] md:gap-[15px] lg:gap-[20px] xl:gap-[40px] text-white text-[20px] creatodisplayM ">
            <Link href="/" className="hover:text-red-500">
              Home
            </Link>

            <Link href="/book-inspection" className="hover:text-red-500">
              Book An Inspection
            </Link>

            <Link href="/about-us" className="hover:text-red-500">
              About
            </Link>

            <Link href="/contact-us" className="hover:text-red-500">
              Contact
            </Link>
          </div>
  
          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-[10px]">
           
            <Link href="/register-dealer" className="creatodisplayM inline-flex justify-center cursor-pointer creatodisplayM min-w-[90px] md:min-w-[110px] lg:min-w-[150px] xl:min-w-[170px] px-[7px] md:px-[8px] lg:px-[15px] py-[8px] md:py-[9px] lg:py-[11px] border border-white rounded-full text-white text-[15px] lg:text-[18px] xl:text-[20px] font-w[500] hover:bg-white hover:text-black transition">Dealer Registration</Link>

            <a href="/dealer" className="creatodisplayM inline-flex justify-center cursor-pointer creatodisplayM min-w-[90px] md:min-w-[110px] lg:min-w-[100px] xl:min-w-[150px] px-[7px] md:px-[8px] lg:px-[10px] py-[8px] md:py-[9px] lg:py-[12px] bg-[#D72638] rounded-full text-white text-[15px] lg:text-[18px] xl:text-[20px] font-[500] hover:bg-[#D72638] transition">Login</a>

           
          </div>
  
          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <IoMdClose size={28} />:  <RxHamburgerMenu size={28} />}
            </button>
          </div>
        </div>
  
        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="creatodisplayM lg:hidden bg-white bg-opacity-90 text-black flex flex-col absolute z-[1] right-[15px] top-[55px] w-[220px]  ">
             <Link href="/" className="flex items-center justify-end px-[10px] py-[8px] text-[15px] text-black border-b-[1px] border-b-[#f2f2f2] hover:text-red-500 ">
              Home
            </Link>

            <Link href="/book-inspection" className="flex items-center  justify-end px-[10px] py-[8px] text-[15px] text-black border-b-[1px] border-b-[#f2f2f2] hover:text-red-500 ">
            Book An Inspection
            </Link>

            <Link href="/about-us" className="flex items-center  justify-end px-[10px] py-[8px] text-[15px] text-black border-b-[1px] border-b-[#f2f2f2] hover:text-red-500 ">
              About
            </Link>

            <Link href="/contact-us" className="flex items-center  justify-end px-[10px] py-[8px] text-[15px] text-black border-b-[1px] border-b-[#f2f2f2] hover:text-red-500 ">
            Contact
            </Link>

            <div className="creatodisplayM flex flex-col space-y-2 mt-4 px-[10px] pb-[15px]">
            <Link href="/register-dealer" className=" inline-flex justify-center px-6 py-2 border border-white rounded-full text-white text-sm bg-black hover:bg-white hover:text-black transition text-center">
            Dealer Registration
            </Link>
            <Link href="/dealer" className="creatodisplayM inline-flex justify-center px-6 py-2 bg-red-600 rounded-full text-white text-sm hover:bg-red-700 transition text-center">
                Login 
            </Link>
            </div>
          </div>
        )}
      </nav>
    );
  };
  
  export default Header;
