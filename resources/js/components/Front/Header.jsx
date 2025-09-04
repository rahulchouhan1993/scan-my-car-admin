import React, { useState, useEffect, useRef } from 'react';
import logo from "../../assets/images/logo.png";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from '@inertiajs/react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Outside click handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full bg-transparent py-[25px] mb-[-120px] relative z-[9]">
      <div className="max-w-[1320px] mx-auto px-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img src={logo} alt="Logo" width="225px" height="60px" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-[15px] md:gap-[15px] lg:gap-[20px] xl:gap-[40px] text-white text-[20px] creatodisplayM ">
          <Link href="/" className="hover:text-red-500">Home</Link>
          <Link href="/book-inspection" className="hover:text-red-500">Book An Inspection</Link>
          <Link href="/about-us" className="hover:text-red-500">About</Link>
          <Link href="/contact-us" className="hover:text-red-500">Contact</Link>
        </div>

        {/* Buttons */}
        <div className="hidden lg:flex items-center gap-[10px]">
          <Link href="/register-dealer" className="creatodisplayM inline-flex justify-center cursor-pointer min-w-[90px] md:min-w-[110px] lg:min-w-[150px] xl:min-w-[170px] px-[7px] py-[8px] border border-white rounded-full text-white text-[15px] font-[500] hover:bg-white hover:text-black transition">
            Dealer Registration
          </Link>
          <a href="/dealer" className="creatodisplayM inline-flex justify-center cursor-pointer min-w-[90px] md:min-w-[110px] lg:min-w-[100px] xl:min-w-[150px] px-[7px] py-[9px] bg-[#D72638] rounded-full text-white text-[15px] font-[500] hover:bg-[#D72638] transition">
            Login
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <IoMdClose size={28} /> : <RxHamburgerMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          className="creatodisplayM mobileName lg:hidden bg-[#0D1B2A] bg-opacity-90 text-black flex flex-col absolute z-50 right-[15px] top-[55px] shadow rounded-[8px] w-[220px]"
        >
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center justify-start px-[10px] py-[8px] text-[15px] text-white border-b border-b-[#13283f] hover:text-red-500">Home</Link>
          <Link href="/book-inspection" onClick={() => setIsOpen(false)} className="flex items-center justify-start px-[10px] py-[8px] text-[15px] text-white border-b border-b-[#13283f] hover:text-red-500">Book An Inspection</Link>
          <Link href="/about-us" onClick={() => setIsOpen(false)} className="flex items-center justify-start px-[10px] py-[8px] text-[15px] text-white border-b border-b-[#13283f] hover:text-red-500">About</Link>
          <Link href="/contact-us" onClick={() => setIsOpen(false)} className="flex items-center justify-start px-[10px] py-[8px] text-[15px] text-white border-b border-b-[#13283f] hover:text-red-500">Contact</Link>

          <div className="creatodisplayM flex flex-col">
            <Link href="/register-dealer" onClick={() => setIsOpen(false)} className="inline-flex justify-center px-[10px] py-2 text-[15px] bg-white text-black transition text-center">Dealer Registration</Link>
            <Link href="/dealer" onClick={() => setIsOpen(false)} className="creatodisplayM inline-flex justify-center px-6 py-2 rounded-b-[8px] bg-red-600 text-white text-[15px] hover:bg-red-700 transition text-center">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
