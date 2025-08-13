import React, { useState } from "react";
import { Link } from '@inertiajs/react';
import CustomerLayout from '../../layout/CustomerLayout'
import redarrowRg from "../../assets/images/redarrowRg.png";
import bookinspectionbg from "../../assets/images/bookinspectionbg.jpg";
const BookInspection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const steps = ["Choose Package", "Enter Details"];

  return (
    <>
      <div className='relative overflow-hidden min-h-[335px] md:min-h-[435px] lg:min-h-[535px]'>
        <div className='flex items-center absolute right-[0] top-[20px] md:top-[90px] bottom-[inherit] md:bottom-[0] m-auto z-[1]'>
          <img src={redarrowRg} alt="img" className='block lg:hidden max-w-full max-h-[400px]' />
          <img src={redarrowRg} alt="img" className='hidden lg:block max-w-full' />
        </div>
        <img src={bookinspectionbg} alt="Background" className=" absolute inset-0 w-full h-full  object-cover" />

        {/* Heading */}
        <div className="relative container z-[1] mb-12 !pt-[160px] md:!pt-[250px] ">
          <h2 className="ppfont text-[30px] md:text-[60px] lg:text-[70px] leading-tight  text-white">Inspection Report</h2>
          <p className="creatodisplayM text-[18px] md:text-[22px] lg:text-[24px] text-white">Follow few simple steps to book an inspection </p>
        </div>
      </div>

      <div className=" pt-[40px] pb-[40px] md:pt-[40px] md:pb-[60px] lg:pt-[60px] lg:pb-[100px] ">
      <div className=" container  ">
        {/* Steps Navigation */}
        <div className="w-full md:max-w-[960px] m-auto flex justify-center mb-8">
          <div className="w-full relative flex flex-wrap md:flex-nowrap bg-[#EDEEEF] p-[2px] md:p-[10px] rounded-[80px] gap-[5px] md:gap-4">
            <div className="absolute w-[90%] h-[2px] top-[26px] md:top-[41px] border-b-[2px] border-b-[#000]"></div>
            {steps.map((step, index) => {
              const isActive = activeStep === index + 1;
              return (
                <div
                  key={index}
                  onClick={() => setActiveStep(index + 1)}
                  className={`w-full md:w-[50%] ppfont flex z-[1] items-center justify-center gap-[5px] md:gap-2 px-[10px] py-[10px] md:px-[15px] md:py-[15px] rounded-full border-[2px]  cursor-pointer transition-all  md:text-[20px] text-[#192735] ${isActive
                      ? "bg-[#192735] text-white border-black"
                      : "bg-[#EDEEEF] text-black border-[#192735]"
                    }`}
                >
                  {/* Dot */}
                  <span
                    className={`relative w-[18px] h-[18px] lg:w-[28px] lg:h-[28px] rounded-full border ${isActive ? " border-white" : " border-black"
                      }`}
                  >

                    <span
                      className={`absolute top-[3px] left-[3px] w-[10px] h-[10px] md:w-[10px] md:h-[10px] lg:w-[20px] lg:h-[20px] rounded-full ${isActive ? "bg-[#fff] " : ""
                        }`}>

                    </span>


                  </span>
                  {step}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Packages */}
        {activeStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto container">
            {/* Standard Plan */}
            <div className="bg-[#EDEEEF] rounded-[10px] lg:rounded-[25px] flex flex-col gap-[0 0] justify-start">
              <div className="p-[10px] md:p-[15px] lg:p-[35px] !pb-[5px] ">
                <h3 className="creatodisplayM text-[16px] md:text-[18px] text-[#192735] uppercase">
                  STANDARD PLAN
                </h3>
                <p className="creatodisplayM text-[12px] lg:text-[14px]  text-[#192735]">
                  Best for used car buyers or sellers
                </p>
                </div>
                <p className="ppfont border-b-[1px] border-b-[#ccc] text-[15px] md:text-[20px] lg:text-[30px] xl:text-[40px] text-[#192735] px-[15px] md:px-[15px] lg:px-[35px] pb-[15px] ">
                  $199.99
                </p>
              <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <ul className="creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[18px] text-[#192735] list-disc pl-[20px]  lg:pl-[25px]">
                  <li>200+ point inspection</li>
                  <li>Pre-purchase/pre-sale diagnostic</li>
                  <li>Accident & paintwork history</li>
                  <li>OBD-II scanning & test drive analysis</li>
                  <li>Full visual report with color-coded findings</li>
                  <li>Certified technician visit at your location</li>
                </ul>
                <button className="w-full cursor-pointer creatodisplayM mt-6 border border-[#192735] rounded-full px-[10px] py-[10px] md:px-[15px] md:py-[14px] text-[15px] md:text-[20px] text-[#192735] hover:bg-black hover:text-white transition">
                Continue
              </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#EDEEEF] rounded-[10px] lg:rounded-[25px] flex flex-col gap-[0 0] justify-start">
              <div className="p-[10px] md:p-[15px] lg:p-[35px] !pb-[5px] ">
                <h3 className="creatodisplayM text-[16px] md:text-[18px] text-[#192735] uppercase">
                PREMIUM Plan
                </h3>
                <p className="creatodisplayM text-[12px] lg:text-[14px]  text-[#192735]">
                  Best for used car buyers or sellers
                </p>
                </div>
                <p className="ppfont border-b-[1px] border-b-[#ccc] text-[15px] md:text-[20px] lg:text-[30px] xl:text-[40px] text-[#192735] px-[15px] md:px-[15px] lg:px-[35px] pb-[15px] ">
                  $199.99
                </p>
              <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <ul className="creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[18px] text-[#192735] list-disc pl-[20px]  lg:pl-[25px]">
                  <li>200+ point inspection</li>
                  <li>Pre-purchase/pre-sale diagnostic</li>
                  <li>Accident & paintwork history</li>
                  <li>OBD-II scanning & test drive analysis</li>
                  <li>Full visual report with color-coded findings</li>
                  <li>Certified technician visit at your location</li>
                </ul>
                <button className="w-full cursor-pointer creatodisplayM mt-6 border border-[#192735] rounded-full px-[10px] py-[10px] md:px-[15px] md:py-[14px] text-[15px] md:text-[20px] text-[#192735] hover:bg-black hover:text-white transition">
                Continue
              </button>
              </div>
            </div>

            {/* Gold Plan */}
            <div className="bg-[#EDEEEF] rounded-[10px] lg:rounded-[25px] flex flex-col gap-[0 0] justify-start">
              <div className="p-[10px] md:p-[15px] lg:p-[35px] !pb-[5px] ">
                <h3 className="creatodisplayM text-[16px] md:text-[18px] text-[#192735] uppercase">
                GOLD Plan
                </h3>
                <p className="creatodisplayM text-[12px] lg:text-[14px]  text-[#192735]">
                  Best for used car buyers or sellers
                </p>
                </div>
                <p className="ppfont border-b-[1px] border-b-[#ccc] text-[15px] md:text-[20px] lg:text-[30px] xl:text-[40px] text-[#192735] px-[15px] md:px-[15px] lg:px-[35px] pb-[15px] ">
                  $199.99
                </p>
              <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <ul className="creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[18px] text-[#192735] list-disc pl-[20px]  lg:pl-[25px]">
                  <li>200+ point inspection</li>
                  <li>Pre-purchase/pre-sale diagnostic</li>
                  <li>Accident & paintwork history</li>
                  <li>OBD-II scanning & test drive analysis</li>
                  <li>Full visual report with color-coded findings</li>
                  <li>Certified technician visit at your location</li>
                </ul>
                <button className="w-full cursor-pointer creatodisplayM mt-6 border border-[#192735] rounded-full px-[10px] py-[10px] md:px-[15px] md:py-[14px] text-[15px] md:text-[20px] text-[#192735] hover:bg-black hover:text-white transition">
                Continue
              </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 & 3: Contact Form */}
        {(activeStep === 2 || activeStep === 3) && (
          <div className=" mx-auto w-[96%] bg-white border-[1px] border-[#19273533] rounded-[10px] md:rounded-[15px] lg:rounded-[25px] p-[15px] md:p-[30px] lg:p-[50px]">
            {/* Title */}
            <h2 className="ppfont text-[#192735] text-[18px] md:text-[22px] lg:text-[24px] xl:text-[28px] pb-[15px] border-b-[1px] border-b-[#0000001a] mb-[20px] md:mb-[30px] lg:mb-[30px]">Enter your details</h2>


            <form className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              {/* First Name */}
              <input
                type="text"
                placeholder="First Name"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
              />

              {/* Last Name */}
              <input
                type="text"
                placeholder="Last Name"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Email"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Phone"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
              />

              {/* Car Model */}
              <select className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full bg-white focus:outline-none noneocusnone-red-200">
                <option>--Select Car Model--</option>
                <option>Model A</option>
                <option>Model B</option>
                <option>Model C</option>
              </select>

              {/* Year */}
              <select className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full bg-white focus:outline-none noneocusnone-red-200">
                <option>--Select year--</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </select>

              {/* Seller Name */}
              <input
                type="text"
                placeholder="Seller's Name"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
              />

              {/* Seller Phone */}
              <input
                type="tel"
                placeholder="Seller's Phone"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
              />

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex">
                <button
                  type="submit"
                  className="redbtn cursor-pointer min-w-[245px] px-[10px] py-[20px] rounded-full text-white   creatodisplayM text-[#192735] text-[15px] md:text-[20px] transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}



      </div>
      </div>
    </>
  )
}

BookInspection.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default BookInspection
