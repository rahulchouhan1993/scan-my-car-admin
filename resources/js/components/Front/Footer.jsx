import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import footlogo from "../../assets/images/footlogo.png";
import redangleleft2 from "../../assets/images/redangleright.png";
import { Link } from '@inertiajs/react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-white pt-[60px] overflow-hidden">
      <div className='absolute h-full top-[-100px] left-[-100px]'>
        <img className='w-full' src={redangleleft2} alt="img" />
      </div>
      <div className="relative z-[1] w-full border-b border-b-[#ffffff3b] pb-[40px]">
        <div className="container  flex flex-wrap md:flex-nowrap gap-4 md:gap-8">
          {/* Logo & Social Icons */}
          <div className='w-full md:w-[35%]'>
            <h1 className="text-4xl font-cursive text-white mb-6">
              <Link href="/">
              <img src={footlogo} alt="" />
              </Link>
            </h1>
            <div className="flex space-x-4">
              <div>
              <Link href="/"  className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                <FaFacebookF />
                </Link>
              </div>
              <div >
              <Link href="/" className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                <FaInstagram />
                </Link>
              </div>
              <div>
              <Link href="/" className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                <FaXTwitter />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className='md:pl-[50px] w-full md:w-[35%] border-b-[#ffffff3b] border-b-[1px] border-t-[#ffffff3b] border-t-[1px] pt-[20px] pb-[20px] md:border-none'>
            <h3 className="creatodisplayM text-[24px] mb-4">Quick Links</h3>
            <ul className="space-y-2 creatodisplayM text-[18px] text-[#ffffffc7] hover:text-[#fff]">
             
              <li><Link href="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Home</Link></li>
              <li><Link href="/book-inspection" className=' text-[#ffffffc7] hover:text-[#fff]'>Book An Inspection</Link></li>
              <li><Link href="/about-us" className=' text-[#ffffffc7] hover:text-[#fff]'>About</Link></li>
              <li><Link href="/contact-us" className=' text-[#ffffffc7] hover:text-[#fff]'>Contact</Link></li>
              <li><Link href="/terms-and-conditions" className=' text-[#ffffffc7] hover:text-[#fff]'>Terms & Condition</Link></li>
            </ul>
          </div>

          {/* Services */}
          {/* <div className='border-b-[#ffffff3b] border-b-[1px] border-t-[#ffffff3b] border-t-[1px] pt-[20px] pb-[20px] md:border-none'>
            <h3 className="creatodisplayM text-[24px] mb-4">Services</h3>
            <ul className="space-y-2 creatodisplayM text-[18px] text-[#ffffffc7]">
              <li><Link href="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Pre-Purchase Car Inspection</Link></li>
              <li><Link href="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Pre-Sale Vehicle Health Check</Link></li>
              <li><Link href="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Ownership Diagnostics</Link></li>
            </ul>
          </div> */}

          {/* Contact Info */}
          <div className='w-full md:w-[30%]'>
            <h3 className="creatodisplayM text-[24px] mb-4">Contact Us</h3>
            <p className="text-xl creatodisplayM text-[18px] md:text-[22px] lg:text-[28px] xl:lg:text-[36px]  text-[#ffffffc7]  mb-2">+1 (202) 456 8798</p>
            <p className="creatodisplayM text-[18px]  text-[#ffffffc7]  mb-2">info@certifycars.ae</p>
            <p className="creatodisplayM text-[18px] text-[#ffffffc7]">
             Al Ghaizi Palaza, Al Garhoud, <br /> Dubai
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-[1] text-center  pt-[23px] pb-[25px] creatodisplayM text-[18px] text-[#ffffffc7]">
        &copy; 2025. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
