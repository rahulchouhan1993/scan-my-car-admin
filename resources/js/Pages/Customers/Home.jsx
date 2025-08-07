import React from 'react'
import CustomerLayout from '../../layout/CustomerLayout'
import reactimg from '../../assets/images/react.jpg'
import heroImage from "../../assets/images/homebanner.jpg";
import redangleright from "../../assets/images/redangleright.png";
import homeoverlaybg from "../../assets/images/homeoverlaybg.png";
import redangleleft from "../../assets/images/redangleleft.png";
import redangleleftSm from "../../assets/images/redangleleft-sm.png";
import overlayBg from '../../assets/images/overlaybg-2.png'
import readychoosebg from '../../assets/images/readychoosebg.jpg'
import confidentbg from '../../assets/images/confidentbg.jpg'
import VehicleChecks from '../../components/Front/VehicleChecks';
import CarInspectionSlider from '../../components/CarInspectionSlider';
import { Link } from '@inertiajs/react';
import AccordianSlider from '../../components/AccordianSlider';
import PricingSection from '../../components/Plan';
import TestimonialSlider from '../../components/Testimonials';
import CarSlider from '../../components/CarSlider';

const Home = () => {
  return (
    <>
      <section className="relative flex items-center w-full min-h-[600px] md:min-h-[740px] lg:min-h-[840px] overflow-hidden">
        {/* Image */}
        <img src={heroImage} alt="Vehicle Inspection" className="w-full max-w-full object-cover" />
        <div className='flex items-center absolute right-[0] top-[0] bottom-[0] m-auto z-[1]'>
          <img src={redangleleft} alt="img" className='max-w-full' />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 top-[0] bottom-[0]">
          <img src={homeoverlaybg} alt="" className='w-full' />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-20">
          <div className="text-white container">
            <h1 className="ppfont  text-white text-[35px] md:text-[55px] lg:text-[65px] xl:text-[75px] leading-[35px] md:leading-[55px] lg:leading-[65px] xl:leading-[75px] mb-[15px]">
              Know the Vehicle.<br />
              Before It Becomes<br />
              Your Problem.
            </h1>
            <p className="max-w-[700px] creatodisplayM text-white text-[18px] md:text-[20px] lg:text-[24px] leading-[20px] md:leading-[24px] lg:leading-[34px] mb-[30px]">
              Smarter vehicle inspections for smarter buyers and owners. Expert checks. Instant reports. No guesswork.
            </p>
            <Link to="/" className="inline-flex items-center justify-center creatodisplayB bg-white text-black text-[16px] text-center px-[30px] py-[15px]  md:px-[40px] md:py-[13px] lg:px-[30px] lg:py-[17px] rounded-full hover:bg-gray-200 transition">
              Book an Inspection
            </Link>
          </div>
        </div>
      </section>
      <VehicleChecks />

      <div className=' relative overflow-hidden bg-[#0D1B2A] min-h-[600px] md:min-h-[750px] lg:min-h-[810px] flex items-center '>
        <div className='absolute left-[0] top-[0] bottom-[0]'>
          <img src={redangleright} alt="" />
        </div>
        <div className='container'>
          <div className="flex items-center flex-wrap md:flex-nowrap gap-[10px]">
            <div className='w-full md-w-[50%]'>
              <h2 className='ppfont text-[25] md:text-[36px] text-white'>We Inspect What Others Overlook</h2>
            </div>

            <div className='w-full md-w-[50%]'>
              <p className='ppfont text-[20] md:text-[20px] text-[#fff]'>Your local mechanic may do a quick look — but we dive deep into 200+ data points, scan with diagnostics, and capture visual proof that lets you truly understand your car’s health.</p>
            </div>
          </div>
          <CarInspectionSlider />
          <div className=' flex items-center justify-center z-[1]'>
            <Link to="/" className='bookbtn min-w-[280px] py-[151px]'>Book an Inspection</Link>
          </div>
        </div>
      </div>

      <div className='bg-[#F9F9F9] py-[80px]'>
        <div className='container'>
          <div className="flex items-center flex-wrap md:flex-nowrap gap-[10px]">
            <div className='w-full md-w-[50%]'>
              <h2 className='ppfont text-[25] md:text-[36px] text-[#192735]'>From Booking to Report — It’s Built to Be Effortless</h2>
            </div>

            <div className='w-full md-w-[50%]'>
              <p className='ppfont text-[20] md:text-[20px] text-[#192735]'>We’ve simplified the vehicle inspection process into 4 smooth steps — all handled at your location, with zero disruption.</p>
            </div>
          </div>

          <AccordianSlider />
        </div>
      </div>


      <section className="relative w-full bg-cover bg-center flex items-center justify-center min-h-[300px] ">
      <div className="flex items-center h-full absolute top-[0] bottom-[0] right-[0]">
        <img src={redangleleftSm} alt="img" className="" />
      </div>
      <img src={readychoosebg} alt="img"  className="w-full max-w-full h-100% cover"/>
      <div className="absolute  top-[0] bottom-[0] left-[0] right-[0] w-full h-full flex items-center justify-center">
        <div className="container relative z-10 max-w-2xl text-white text-left px-[15px] py-[15px]">
            <h1 className="ppfont text-[30px] md:text-[45px] lg:text-[60px] leading-tight mb-4">
            Ready to Make a <br className="hidden sm:block" /> Confident Choice?
            </h1>
            <p className="max-w-[600px] text-lg sm:text-xl mb-[40px]">
            Schedule an inspection in minutes. Our experts deliver a detailed
            report so you can buy, sell, or own with total confidence.
            </p>
            <div>
              <Link to="/" className="bg-white text-black font-semibold py-[15px] px-[25px] rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300">
              Schedule Your Inspection
              </Link>
            </div>
           
        </div>
      </div>
    </section>

    <section className='bg-[#F9F9F9] py-[80px]'>
      <div className='container'>
        <div className='flex items-center gap-[40px] mb-[50px]'>
          <h2 className='ppfont text-[#192735] text-[25px] md:text-[30px] lg:text-[36px] font-[500] leading-[38px]'>Designed With Trust, Tech & Transparency At The Core</h2>
          <p className='creatodisplayM text-[#192735ab] text-[20px] '>We’re not just another garage service — we’re a full-stack inspection platform built to remove doubt and restore confidence in every vehicle decision.</p>
        </div>
        <CarSlider />
        <TestimonialSlider />
      </div>

    </section>


    <PricingSection />
    <section className='bg-[#F9F9F9] py-[80px]'>
      <div className='container'>
        <div className='flex items-center gap-[40px] mb-[50px]'>
          <h2 className='ppfont text-[#192735] text-[25px] md:text-[30px] lg:text-[36px] font-[500] leading-[38px]'>Real Reports. Real Results. Real People.</h2>
          <p className='creatodisplayM text-[#192735ab] text-[20px] '>Here’s what our users say after using Vehicheck — from used car buyers to car owners who avoided costly repairs, they all found value in one thing: clarity.</p>
        </div>
        <TestimonialSlider />
      </div>

    </section>

    </>
  )
}

Home.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default Home
