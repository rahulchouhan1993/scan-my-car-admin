import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="w-full border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
          {/* Logo & Social Icons */}
          <div>
            <h1 className="text-4xl font-cursive text-white mb-6">
              Certifyyourcar
            </h1>
            <div className="flex space-x-4">
              <div className="bg-gray-200 text-black p-2 rounded-full">
                <FaFacebookF />
              </div>
              <div className="bg-gray-200 text-black p-2 rounded-full">
                <FaInstagram />
              </div>
              <div className="bg-gray-200 text-black p-2 rounded-full">
                <FaXTwitter />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
             
              <li> Home</li>
              <li>Service</li>
              <li>Pricing</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Pre-Purchase Car Inspection</li>
              <li>Pre-Sale Vehicle Health Check</li>
              <li>Ownership Diagnostics</li>
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
      <div className="text-center py-4 text-gray-400 text-sm">
        © 2025 Rivian. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
