import React from 'react'
import { Link } from '@inertiajs/react';
import CustomerLayout from '../../layout/CustomerLayout'
import reactimg from '../../assets/images/react.jpg'
import heroImage from "../../assets/images/homebanner.jpg";
import redangleright from "../../assets/images/redangleright.png";
import redangleleft from "../../assets/images/redangleleft.png";
import homeoverlaybg from "../../assets/images/homeoverlaybg.png";
import redangleleftSm from "../../assets/images/redangleleft-sm.png";
import overlayBg from '../../assets/images/overlaybg-2.png'
import readychoosebg from '../../assets/images/readychoosebg.jpg'
import confidentbg from '../../assets/images/confidentbg.jpg'
import VehicleChecks from '../../components/Front/VehicleChecks';
import CarInspectionSlider from '../../components/CarInspectionSlider';
import AccordianSlider from '../../components/AccordianSlider';
import PricingSection from '../../components/Plan';
import TestimonialSlider from '../../components/Testimonials';
import CarSlider from '../../components/CarSlider';

const Home = () => {
  return (
    <>
      <section className="relative  flex items-center w-full min-h-[450px] md:min-h-[650px] lg:min-h-[750px] overflow-hidden">
        {/* Image */}
        <div className="absolute inset-0 top-[0] bottom-[0] h-full">
          <img src={heroImage} alt="Vehicle Inspection" className="w-full h-full object-cover" />
        </div>
        <div className='flex items-center absolute right-[0] top-[0] bottom-[0] m-auto z-[1]'>
          <img src={redangleleft} alt="img" className='max-w-full w-full' />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 top-[0] bottom-[0] h-full">
          <img src={homeoverlaybg} alt="" className='w-full h-full object-cover' />
        </div>

        {/* Content */}
        <div className="absolute z-[2] left-[0] right-[0] inset-0 flex items-center ">
          <div className="text-white container ">
            <h1 className="ppfont  text-white pt-[50px] lg:pt-[80px] text-[25px] md:text-[55px] lg:text-[65px] xl:text-[75px] leading-[30px] md:leading-[55px] lg:leading-[65px] xl:leading-[65px] mb-[15px]">
              Certify Your Car Now,<br />
              Before It Becomes<br />
              Your Problem.
            </h1>
            <p className="max-w-[700px] creatodisplayM text-white text-[16px] md:text-[20px] lg:text-[24px] leading-[18px] md:leading-[24px] lg:leading-[26px] mb-[30px]">
              Smarter vehicle inspections for smarter buyers and owners. Expert checks. Instant reports. No guesswork.
            </p>
            <Link href="/book-inspection" className="min-w-[200px] md:min-w-[220px] btn inline-flex items-center justify-center creatodisplayB bg-white text-black text-[16px] text-center px-[30px] py-[13px]  md:px-[40px] md:py-[13px] lg:px-[30px] lg:py-[17px] rounded-full hover:bg-gray-200 transition">
              Book an Inspection
            </Link>
          </div>
        </div>
      </section>
       <PricingSection />
      <VehicleChecks />

      <div className='group relative overflow-hidden py-[30px] md:py-[40px] lg:md:py-[70px] bg-[#0D1B2A] hover:bg-[#fff] min-h-[600px] md:min-h-[750px] lg:min-h-[810px] flex items-center '>
        <div className='absolute left-[0] top-[0] bottom-[0]'>
          <img src={redangleright} alt="" />
        </div>
        <div className='container relative z-[1]'>
          <div className="flex items-start flex-wrap md:flex-nowrap gap-[10px] mb-[40px]">
            <div className='w-full md-w-[60%]'>
              <h2 className='ppfont text-[25px] md:text-[28px] lg:md:text-[36px] leading-[26px] md:leading-[38px] text-white group-hover:text-[#192735]'>We Inspect What Others Overlook</h2>
            </div>

            <div className='w-full md-w-[40%]'>
              <p className='creatodisplayM text-[16px] md:text-[18px] lg:text-[20px] lg:leading-[24px] text-[#ffffff8f] group-hover:text-[#808080]'>Your local mechanic may do a quick look — but we dive deep into 200+ data points, scan with diagnostics, and capture visual proof that lets you truly understand your car’s health.</p>
            </div>
          </div>
          <CarInspectionSlider />
          <div className=' flex items-center justify-center z-[1] mt-[10px] md:mt-[30px] lg:mt-[50px]'>
            <Link href="/book-inspection" className='bookbtn flex min-w-[200px] md:min-w-[280px] md:!py-[12px] md:!py-[20px] '>Book an Inspection</Link>
          </div>
        </div>
      </div>

      <div className='bg-[#F9F9F9] py-[40px] md:py-[50px] lg:py-[80px]'>
        <div className='container'>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[20px] md:mb-[30px] lg:mb-[50px] gap-4">
            <div className='w-full md-w-[50%]'>
              <h2 className='ppfont text-[25px] md:text-[28px] lg:md:text-[36px] leading-[26px] md:leading-[38px] text-[#192735]'>From Booking to Report — It’s Built to Be Effortless</h2>
            </div>

            <div className='w-full md-w-[50%]'>
              <p className='creatodisplayM text-[16px] md:text-[18px] lg:text-[20px] lg:leading-[24px] text-[#192735bd]'>We’ve simplified the vehicle inspection process into 4 smooth steps — all handled at your location, with zero disruption.</p>
            </div>
          </div>

          <AccordianSlider />
        </div>
      </div>


      <section className="relative overflow-hidden w-full bg-cover bg-center flex items-center justify-center min-h-[380px] md:min-h-[480px] lg:min-h-[500px] xl:min-h-[580px] ">
        <div className="flex  items-center h-full z-[1] absolute top-[0] bottom-[0] right-[0]">
          <img src={redangleleftSm} alt="img" className="" />
        </div>

        <div className="absolute  inset-0 top-[0] bottom-[0] h-full">
          <img src={readychoosebg} alt="Vehicle Inspection" className="w-full h-full object-cover" />
        </div>

        {/* <img src={readychoosebg} alt="img" className="w-full h-full cover" /> */}
        <div className="absolute z-[2]  top-[0] bottom-[0] left-[0] right-[0] w-full h-full flex items-center justify-center">
          <div className="container relative z-10 text-white text-left px-[15px] py-[15px]">

            <h1 className="ppfont text-[30px] md:text-[45px] lg:text-[60px] leading-[32px] md:leading-[50px] lg:leading-[56px] mb-4">
              Ready to Make a Confident <br className="hidden sm:block" /> Choice?
            </h1>
            <p className="creatodisplayM max-w-[800px] text-[18px] leading-[20px] md:text-[24px] md:leading-[26px] text-white  mb-[50px]">
              Schedule an inspection in minutes. Our experts deliver a detailed
              report so you can buy, sell, or own with total confidence.
            </p>
            <div>
              <Link href="/book-inspection" className="cursor-pointer btn creatodisplayB bg-white text-[16px] text-[#000315] py-[13px] px-[18px] md:py-[20px] md:px-[35px] rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300">
                Schedule Your Inspection
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className='group bg-[#F9F9F9] hover:bg-[#0D1B2A] py-[30px] md:py-[40px] lg:py-[60px] xl:py-[80px]'>
        <div className='container'>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[20px] md:mb-[30px] lg:mb-[50px] gap-4">
            <div className='w-full md-w-[50%]'>
              <h2 className='ppfont text-[#192735] group-hover:text-[#fff] text-[25px] md:text-[28px] lg:md:text-[36px] leading-[26px] md:leading-[38px] font-[500]'>Designed With Trust, Tech & Transparency At The Core</h2>
            </div>

            <div className='w-full md-w-[50%]'>
              <p className='creatodisplayM text-[#192735c2] group-hover:text-[#fff] text-[16px] md:text-[18px] lg:text-[20px] leading-[18px] md:leading-[20px] lg:leading-[24px] '>We’re not just another garage service — we’re a full-stack inspection platform built to remove doubt and restore confidence in every vehicle decision.</p>
            </div>
          </div>
          <CarSlider />
        </div>
      </section>

     
      <section className='bg-[#F9F9F9] py-[30px] md:py-[40px] lg:py-[60px] xl:py-[80px]'>
        <div className='container'>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[20px] md:mb-[30px] lg:mb-[50px] gap-4">
            <div className='w-full md-w-[50%]'>
              <h2 className='ppfont text-[#192735] group-hover:text-[#fff] text-[25px] md:text-[28px] lg:md:text-[36px] leading-[26px] md:leading-[38px] font-[500]'>Real Reports. Real Results. Real People.</h2>
            </div>

            <div className='w-full md-w-[50%]'>
              <p className='creatodisplayM text-[#192735bf]  group-hover:text-[#fff] text-[16px] md:text-[18px] lg:text-[20px] leading-[18px] md:leading-[20px] lg:leading-[24px] '>Here's what our users say after using Vehicheck — from used car buyers to car owners who avoided costly repairs, they all found value in one thing: clarity.</p>
            </div>
          </div>

          <TestimonialSlider />
        </div>

      </section>

    </>
  )
}

Home.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default Home
