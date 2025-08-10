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
        <div className="container   grid md:grid-cols-4 gap-8">
          {/* Logo & Social Icons */}
          <div>
            <h1 className="text-4xl font-cursive text-white mb-6">
              <Link to="/">
              <img src={footlogo} alt="" />
              </Link>
            </h1>
            <div className="flex space-x-4">
              <div>
              <Link to="/"  className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                <FaFacebookF />
                </Link>
              </div>
              <div >
              <Link to="/" className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                <FaInstagram />
                </Link>
              </div>
              <div>
              <Link to="/" className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                <FaXTwitter />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className='md:pl-[50px]'>
            <h3 className="creatodisplayM text-[24px] mb-4">Quick Links</h3>
            <ul className="space-y-2 creatodisplayM text-[18px] text-[#ffffffc7] hover:text-[#fff]">
             
              <li><Link to="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Home</Link></li>
              <li><Link to="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Service</Link></li>
              <li><Link to="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Pricing</Link></li>
              <li><Link to="/" className=' text-[#ffffffc7] hover:text-[#fff]'>About</Link></li>
              <li><Link to="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className='border-b-[#ffffff3b] border-b-[1px] border-t-[#ffffff3b] border-t-[1px] pt-[20px] pb-[20px] md:border-none'>
            <h3 className="creatodisplayM text-[24px] mb-4">Services</h3>
            <ul className="space-y-2 creatodisplayM text-[18px] text-[#ffffffc7]">
              <li><Link to="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Pre-Purchase Car Inspection</Link></li>
              <li><Link to="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Pre-Sale Vehicle Health Check</Link></li>
              <li><Link to="/" className=' text-[#ffffffc7] hover:text-[#fff]'>Ownership Diagnostics</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="creatodisplayM text-[24px] mb-4">Contact Us</h3>
            <p className="text-xl creatodisplayM text-[18px] md:text-[22px] lg:text-[28px] xl:lg:text-[36px]  text-[#ffffffc7]  mb-2">+1 (202) 456 8798</p>
            <p className="creatodisplayM text-[18px]  text-[#ffffffc7]  mb-2">mail@example.com</p>
            <p className="creatodisplayM text-[18px] text-[#ffffffc7]">
              21 Jump street, California, Navada,<br /> USA 202555
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-[1] text-center  pt-[23px] pb-[25px] creatodisplayM text-[18px] text-[#ffffffc7]">
        &copy; 2025 Rivian. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
