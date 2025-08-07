import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import footlogo from "../../assets/images/footlogo.png";
import footerredangle from "../../assets/images/footerredangle.png";
import { Link } from '@inertiajs/react';

const Footer = () => {
  return (
    <footer className="relative bg-black text-white h-[400px] overflow-hidden">
      <div className='absolute top-[0] left-[0]'>
        <img className='w-full' src={footerredangle} alt="img" />
      </div>
      <div className="relative z-[1] w-full border-b border-gray-700 pt-[42px]">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
          {/* Logo & Social Icons */}
          <div>
            <h1 className="text-4xl font-cursive text-white mb-6">
              <Link to="/">
              <img src={footlogo} alt="" />
              </Link>
            </h1>
            <div className="flex space-x-4">
              <div className="bg-gray-200 text-black p-2 rounded-full">
              <Link to="/">
                <FaFacebookF />
                </Link>
              </div>
              <div className="bg-gray-200 text-black p-2 rounded-full">
              <Link to="/">
                <FaInstagram />
                </Link>
              </div>
              <div className="bg-gray-200 text-black p-2 rounded-full">
              <Link to="/">
                <FaXTwitter />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
             
              <li> <Link to="/">Home</Link></li>
              <li><Link to="/">Service</Link></li>
              <li><Link to="/">Pricing</Link></li>
              <li><Link to="/">About</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/">Pre-Purchase Car Inspection</Link></li>
              <li><Link to="/">Pre-Sale Vehicle Health Check</Link></li>
              <li><Link to="/">Ownership Diagnostics</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-xl text-gray-300 mb-2">+1 (202) 456 8798</p>
            <p className="text-gray-400 mb-2">mail@example.com</p>
            <p className="text-gray-400">
              21 Jump street, California, Navada,<br /> USA 202555
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center py-[10px] pt-[23px] text-gray-400 text-sm">
        © 2025 Rivian. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
