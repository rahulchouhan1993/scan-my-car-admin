import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import footlogo from "../../assets/images/footlogo.png";
import logo from "../../assets/images/logo.png";
import redangleleft2 from "../../assets/images/redangleright.png";
import whatsapp from "../../assets/images/whatsapp.svg";
import { Link } from '@inertiajs/react';

const Footer = () => {
  return (
    <>
    <div className='whatsapp'>
      <a target="_blank" href="https://api.whatsapp.com/send?phone=971585581172&text=Hey 👋, I need some support with a car inspection.">
       <img src={whatsapp} alt="img" />
      </a>
    </div>
      <footer className="relative overflow-hidden bg-black text-white pt-[60px] overflow-hidden">
        <div className='absolute h-full top-[-100px] left-[-100px]'>
          <img className='w-full' src={redangleleft2} alt="img" />
        </div>
        <div className="relative z-[1] w-full border-b border-b-[#ffffff3b] pb-[40px]">
          <div className="container  flex flex-wrap md:flex-nowrap gap-4 md:gap-8">
            {/* Logo & Social Icons */}
            <div className='w-full md:w-[35%]'>
              <h1 className="text-4xl font-cursive text-white mb-[20px] md:mb-[40px]">
                {/* <Link href="/">
              <img src={footlogo} alt="" />
              </Link> */}

                <Link href="/">
                  <img src={logo} alt="Logo" className="" />
                </Link>
              </h1>
              <div className="flex space-x-4">
                <div>
                  <a target="_blank" href="https://www.facebook.com/share/1CDYhuZT4d/?mibextid=wwXIfr" className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.4617 11.0001C19.4617 6.32934 15.6709 2.53857 11.0001 2.53857C6.32934 2.53857 2.53857 6.32934 2.53857 11.0001C2.53857 15.0955 5.44934 18.5055 9.30781 19.2924V13.5386H7.6155V11.0001H9.30781V8.88473C9.30781 7.25165 10.6363 5.92319 12.2693 5.92319H14.3847V8.46165H12.6924C12.227 8.46165 11.8463 8.84242 11.8463 9.30781V11.0001H14.3847V13.5386H11.8463V19.4193C16.1193 18.9963 19.4617 15.3917 19.4617 11.0001Z" fill="#000315" />
                    </svg>

                  </a>
                </div>
                <div >
                  <a target="_blank" href="https://www.instagram.com/certifycars.ae?igsh=MXhrenI0ZXF1aGpmaQ==" className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.0103 2.5127C11.9478 2.5152 12.4236 2.5202 12.8345 2.53186L12.9961 2.5377C13.1828 2.54436 13.367 2.5527 13.5895 2.5627C14.4761 2.60436 15.0811 2.74436 15.612 2.9502C16.162 3.16186 16.6253 3.44853 17.0886 3.91103C17.5125 4.32747 17.8405 4.83142 18.0495 5.3877C18.2553 5.91853 18.3953 6.52353 18.437 7.41103C18.447 7.6327 18.4553 7.81686 18.462 8.00436L18.467 8.16603C18.4795 8.57603 18.4845 9.05186 18.4861 9.98936L18.487 10.611V11.7027C18.489 12.3105 18.4826 12.9184 18.4678 13.526L18.4628 13.6877C18.4561 13.8752 18.4478 14.0594 18.4378 14.281C18.3961 15.1685 18.2545 15.7727 18.0495 16.3044C17.8405 16.8606 17.5125 17.3646 17.0886 17.781C16.6722 18.2049 16.1682 18.5328 15.612 18.7419C15.0811 18.9477 14.4761 19.0877 13.5895 19.1294L12.9961 19.1544L12.8345 19.1594C12.4236 19.171 11.9478 19.1769 11.0103 19.1785L10.3886 19.1794H9.2978C8.68968 19.1815 8.08157 19.1751 7.47363 19.1602L7.31196 19.1552C7.11414 19.1477 6.91636 19.1391 6.71863 19.1294C5.83196 19.0877 5.22696 18.9477 4.6953 18.7419C4.13932 18.5327 3.63567 18.2048 3.21946 17.781C2.79525 17.3647 2.46706 16.8607 2.2578 16.3044C2.05196 15.7735 1.91196 15.1685 1.8703 14.281L1.8453 13.6877L1.84113 13.526C1.82577 12.9184 1.81882 12.3105 1.8203 11.7027V9.98936C1.81799 9.38153 1.8241 8.77369 1.83863 8.16603L1.84446 8.00436C1.85113 7.81686 1.85946 7.6327 1.86946 7.41103C1.91113 6.52353 2.05113 5.91936 2.25696 5.3877C2.46671 4.83119 2.79548 4.32723 3.2203 3.91103C3.63626 3.48732 4.13962 3.15942 4.6953 2.9502C5.22696 2.74436 5.83113 2.60436 6.71863 2.5627C6.9403 2.5527 7.1253 2.54436 7.31196 2.5377L7.47363 2.5327C8.08129 2.51789 8.68913 2.5115 9.29696 2.51353L11.0103 2.5127ZM10.1536 6.67936C9.04856 6.67936 7.98875 7.11835 7.20735 7.89975C6.42595 8.68115 5.98696 9.74096 5.98696 10.846C5.98696 11.9511 6.42595 13.0109 7.20735 13.7923C7.98875 14.5737 9.04856 15.0127 10.1536 15.0127C11.2587 15.0127 12.3185 14.5737 13.0999 13.7923C13.8813 13.0109 14.3203 11.9511 14.3203 10.846C14.3203 9.74096 13.8813 8.68115 13.0999 7.89975C12.3185 7.11835 11.2587 6.67936 10.1536 6.67936ZM10.1536 8.34603C10.4819 8.34597 10.807 8.41058 11.1104 8.53617C11.4137 8.66176 11.6893 8.84586 11.9215 9.07797C12.1537 9.31007 12.3379 9.58564 12.4636 9.88894C12.5893 10.1922 12.654 10.5173 12.654 10.8456C12.6541 11.1739 12.5895 11.499 12.4639 11.8024C12.3383 12.1057 12.1542 12.3813 11.9221 12.6135C11.69 12.8457 11.4144 13.0299 11.1111 13.1556C10.8078 13.2813 10.4828 13.346 10.1545 13.346C9.49142 13.346 8.85554 13.0826 8.3867 12.6138C7.91786 12.145 7.65447 11.5091 7.65447 10.846C7.65447 10.183 7.91786 9.5471 8.3867 9.07826C8.85554 8.60942 9.49142 8.34603 10.1545 8.34603M14.5295 5.42936C14.2532 5.42936 13.9882 5.53911 13.7929 5.73446C13.5975 5.92981 13.4878 6.19476 13.4878 6.47103C13.4878 6.7473 13.5975 7.01225 13.7929 7.2076C13.9882 7.40295 14.2532 7.5127 14.5295 7.5127C14.8057 7.5127 15.0707 7.40295 15.266 7.2076C15.4614 7.01225 15.5711 6.7473 15.5711 6.47103C15.5711 6.19476 15.4614 5.92981 15.266 5.73446C15.0707 5.53911 14.8057 5.42936 14.5295 5.42936Z" fill="black" />
                    </svg>

                  </a>
                </div>
                <div>
                  <a  target="_blank" href="/" className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                    <svg  width="21" height="21"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" version="1.1"  viewBox="0 0 93.06 93.06" xml:space="preserve">
                      <g>
                        <g>
                          <path d="M11.185,0.08C5.004,0.08,0.001,5.092,0,11.259c0,6.173,5.003,11.184,11.186,11.184c6.166,0,11.176-5.011,11.176-11.184    C22.362,5.091,17.351,0.08,11.185,0.08z"/>
                          <rect x="1.538" y="30.926" width="19.287" height="62.054"/>
                          <path d="M69.925,29.383c-9.382,0-15.673,5.144-18.248,10.022h-0.258v-8.479H32.921H32.92v62.053h19.27V62.281    c0-8.093,1.541-15.932,11.575-15.932c9.89,0,10.022,9.256,10.022,16.451v30.178H93.06V58.942    C93.06,42.235,89.455,29.383,69.925,29.383z"/>
                        </g>
                      </g>
                      </svg>

                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className='pt-[10px] md:pt-[0] md:pl-[30px] lg:md:pl-[50px] xl:md:pl-[100px] w-full md:w-[35%] border-b-[#ffffff3b] border-b-[1px] border-t-[#ffffff3b] border-t-[1px] pb-[20px] md:border-none'>
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
              <p className="text-xl creatodisplayM text-[18px] md:text-[22px] lg:text-[28px] xl:lg:text-[36px]  text-[#ffffffc7]  mb-2">+971 585581172</p>
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

    </>
  );
};

export default Footer;
