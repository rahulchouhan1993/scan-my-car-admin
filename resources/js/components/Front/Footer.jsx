import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import footlogo from "../../assets/images/footlogo.png";
import logo from "../../assets/images/logo.png";
import redangleleft2 from "../../assets/images/redangleright.png";
import { Link } from '@inertiajs/react';

const Footer = () => {
  return (
    <>
    <div className='whatsapp'>
      <Link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2C17.5238 2 22.001 6.47715 22.001 12C22.001 17.5228 17.5238 22 12.001 22C10.1671 22 8.44851 21.5064 6.97086 20.6447L2.00516 22L3.35712 17.0315C2.49494 15.5536 2.00098 13.8345 2.00098 12C2.00098 6.47715 6.47813 2 12.001 2ZM8.59339 7.30019L8.39232 7.30833C8.26293 7.31742 8.13607 7.34902 8.02057 7.40811C7.93392 7.45244 7.85348 7.51651 7.72709 7.63586C7.60774 7.74855 7.53857 7.84697 7.46569 7.94186C7.09599 8.4232 6.89729 9.01405 6.90098 9.62098C6.90299 10.1116 7.03043 10.5884 7.23169 11.0336C7.63982 11.9364 8.31288 12.8908 9.20194 13.7759C9.4155 13.9885 9.62473 14.2034 9.85034 14.402C10.9538 15.3736 12.2688 16.0742 13.6907 16.4482C13.6907 16.4482 14.2507 16.5342 14.2589 16.5347C14.4444 16.5447 14.6296 16.5313 14.8153 16.5218C15.1066 16.5068 15.391 16.428 15.6484 16.2909C15.8139 16.2028 15.8922 16.159 16.0311 16.0714C16.0311 16.0714 16.0737 16.0426 16.1559 15.9814C16.2909 15.8808 16.3743 15.81 16.4866 15.6934C16.5694 15.6074 16.6406 15.5058 16.6956 15.3913C16.7738 15.2281 16.8525 14.9166 16.8838 14.6579C16.9077 14.4603 16.9005 14.3523 16.8979 14.2854C16.8936 14.1778 16.8047 14.0671 16.7073 14.0201L16.1258 13.7587C16.1258 13.7587 15.2563 13.3803 14.7245 13.1377C14.6691 13.1124 14.6085 13.1007 14.5476 13.097C14.4142 13.0888 14.2647 13.1236 14.1696 13.2238C14.1646 13.2218 14.0984 13.279 13.3749 14.1555C13.335 14.2032 13.2415 14.3069 13.0798 14.2972C13.0554 14.2955 13.0311 14.292 13.0074 14.2858C12.9419 14.2685 12.8781 14.2457 12.8157 14.2193C12.692 14.1668 12.6486 14.1469 12.5641 14.1105C11.9868 13.8583 11.457 13.5209 10.9887 13.108C10.8631 12.9974 10.7463 12.8783 10.6259 12.7616C10.2057 12.3543 9.86169 11.9211 9.60577 11.4938C9.5918 11.4705 9.57027 11.4368 9.54708 11.3991C9.50521 11.331 9.45903 11.25 9.44455 11.1944C9.40738 11.0473 9.50599 10.9291 9.50599 10.9291C9.50599 10.9291 9.74939 10.663 9.86248 10.5183C9.97128 10.379 10.0652 10.2428 10.125 10.1457C10.2428 9.95633 10.2801 9.76062 10.2182 9.60963C9.93764 8.92565 9.64818 8.24536 9.34986 7.56894C9.29098 7.43545 9.11585 7.33846 8.95659 7.32007C8.90265 7.31384 8.84875 7.30758 8.79459 7.30402C8.66053 7.29748 8.5262 7.29892 8.39232 7.30833L8.59339 7.30019Z"></path></svg>
      </Link>
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
                  <Link href="/" className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.4617 11.0001C19.4617 6.32934 15.6709 2.53857 11.0001 2.53857C6.32934 2.53857 2.53857 6.32934 2.53857 11.0001C2.53857 15.0955 5.44934 18.5055 9.30781 19.2924V13.5386H7.6155V11.0001H9.30781V8.88473C9.30781 7.25165 10.6363 5.92319 12.2693 5.92319H14.3847V8.46165H12.6924C12.227 8.46165 11.8463 8.84242 11.8463 9.30781V11.0001H14.3847V13.5386H11.8463V19.4193C16.1193 18.9963 19.4617 15.3917 19.4617 11.0001Z" fill="#000315" />
                    </svg>

                  </Link>
                </div>
                <div >
                  <Link href="/" className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.0103 2.5127C11.9478 2.5152 12.4236 2.5202 12.8345 2.53186L12.9961 2.5377C13.1828 2.54436 13.367 2.5527 13.5895 2.5627C14.4761 2.60436 15.0811 2.74436 15.612 2.9502C16.162 3.16186 16.6253 3.44853 17.0886 3.91103C17.5125 4.32747 17.8405 4.83142 18.0495 5.3877C18.2553 5.91853 18.3953 6.52353 18.437 7.41103C18.447 7.6327 18.4553 7.81686 18.462 8.00436L18.467 8.16603C18.4795 8.57603 18.4845 9.05186 18.4861 9.98936L18.487 10.611V11.7027C18.489 12.3105 18.4826 12.9184 18.4678 13.526L18.4628 13.6877C18.4561 13.8752 18.4478 14.0594 18.4378 14.281C18.3961 15.1685 18.2545 15.7727 18.0495 16.3044C17.8405 16.8606 17.5125 17.3646 17.0886 17.781C16.6722 18.2049 16.1682 18.5328 15.612 18.7419C15.0811 18.9477 14.4761 19.0877 13.5895 19.1294L12.9961 19.1544L12.8345 19.1594C12.4236 19.171 11.9478 19.1769 11.0103 19.1785L10.3886 19.1794H9.2978C8.68968 19.1815 8.08157 19.1751 7.47363 19.1602L7.31196 19.1552C7.11414 19.1477 6.91636 19.1391 6.71863 19.1294C5.83196 19.0877 5.22696 18.9477 4.6953 18.7419C4.13932 18.5327 3.63567 18.2048 3.21946 17.781C2.79525 17.3647 2.46706 16.8607 2.2578 16.3044C2.05196 15.7735 1.91196 15.1685 1.8703 14.281L1.8453 13.6877L1.84113 13.526C1.82577 12.9184 1.81882 12.3105 1.8203 11.7027V9.98936C1.81799 9.38153 1.8241 8.77369 1.83863 8.16603L1.84446 8.00436C1.85113 7.81686 1.85946 7.6327 1.86946 7.41103C1.91113 6.52353 2.05113 5.91936 2.25696 5.3877C2.46671 4.83119 2.79548 4.32723 3.2203 3.91103C3.63626 3.48732 4.13962 3.15942 4.6953 2.9502C5.22696 2.74436 5.83113 2.60436 6.71863 2.5627C6.9403 2.5527 7.1253 2.54436 7.31196 2.5377L7.47363 2.5327C8.08129 2.51789 8.68913 2.5115 9.29696 2.51353L11.0103 2.5127ZM10.1536 6.67936C9.04856 6.67936 7.98875 7.11835 7.20735 7.89975C6.42595 8.68115 5.98696 9.74096 5.98696 10.846C5.98696 11.9511 6.42595 13.0109 7.20735 13.7923C7.98875 14.5737 9.04856 15.0127 10.1536 15.0127C11.2587 15.0127 12.3185 14.5737 13.0999 13.7923C13.8813 13.0109 14.3203 11.9511 14.3203 10.846C14.3203 9.74096 13.8813 8.68115 13.0999 7.89975C12.3185 7.11835 11.2587 6.67936 10.1536 6.67936ZM10.1536 8.34603C10.4819 8.34597 10.807 8.41058 11.1104 8.53617C11.4137 8.66176 11.6893 8.84586 11.9215 9.07797C12.1537 9.31007 12.3379 9.58564 12.4636 9.88894C12.5893 10.1922 12.654 10.5173 12.654 10.8456C12.6541 11.1739 12.5895 11.499 12.4639 11.8024C12.3383 12.1057 12.1542 12.3813 11.9221 12.6135C11.69 12.8457 11.4144 13.0299 11.1111 13.1556C10.8078 13.2813 10.4828 13.346 10.1545 13.346C9.49142 13.346 8.85554 13.0826 8.3867 12.6138C7.91786 12.145 7.65447 11.5091 7.65447 10.846C7.65447 10.183 7.91786 9.5471 8.3867 9.07826C8.85554 8.60942 9.49142 8.34603 10.1545 8.34603M14.5295 5.42936C14.2532 5.42936 13.9882 5.53911 13.7929 5.73446C13.5975 5.92981 13.4878 6.19476 13.4878 6.47103C13.4878 6.7473 13.5975 7.01225 13.7929 7.2076C13.9882 7.40295 14.2532 7.5127 14.5295 7.5127C14.8057 7.5127 15.0707 7.40295 15.266 7.2076C15.4614 7.01225 15.5711 6.7473 15.5711 6.47103C15.5711 6.19476 15.4614 5.92981 15.266 5.73446C15.0707 5.53911 14.8057 5.42936 14.5295 5.42936Z" fill="black" />
                    </svg>

                  </Link>
                </div>
                <div>
                  <Link href="/" className="flex items-center justify-center bg-[#E5E1DA] hover:bg-[#fff] w-[44px] h-[44px] text-black rounded-[60px]">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.20159 13.0554L13.1699 18.3462H19.0033L12.4549 9.61452L17.9033 3.34619H15.6949L11.4308 8.25119L7.75326 3.34619H1.91992L8.17826 11.692L2.39492 18.3462H4.60326L9.20159 13.0554ZM14.0033 16.6795L5.25326 5.01286H6.91992L15.6699 16.6795H14.0033Z" fill="#000315" />
                    </svg>

                  </Link>
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

    </>
  );
};

export default Footer;
