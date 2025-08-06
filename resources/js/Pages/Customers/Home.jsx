import React from 'react'
import CustomerLayout from '../../layout/CustomerLayout'
import reactimg from '../../assets/images/react.jpg'
import heroImage from "../../assets/images/homebanner.jpg";
import homeoverlaybg from "../../assets/images/homeoverlaybg.png";
import redangleleft from "../../assets/images/redangleleft.png";
import VehicleChecks from '../../components/Front/VehicleChecks';

const Home = () => {
  return (
    <>
      <section className="relative w-full h-screen overflow-hidden">
        {/* Image */}
        <img
          src={heroImage}
          alt="Vehicle Inspection"
          className="w-full h-full object-cover"
        />
        <div className='absolute right-[0] top-[0] bottom-[0]'>
          <img src={redangleleft} alt="img" className='max-w-full' />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 ">
          <img src={homeoverlaybg} alt="" className='w-full' />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-20">
          <div className="text-white max-w-[800px]">
            <h1 className="ppfont  text-white text-[35px] md:text-[55px] lg:text-[65px] xl:text-[75px] leading-[35px] md:leading-[55px] lg:leading-[65px] xl:leading-[75px] mb-[15px]">
              Know the Vehicle.<br />
              Before It Becomes<br />
              Your Problem.
            </h1>
            <p className="creatodisplayM text-white text-[18px] md:text-[20px] lg:text-[24px] leading-[20px] md:leading-[24px] lg:leading-[28px] mb-[30px]">
              Smarter vehicle inspections for smarter buyers and owners. Expert checks. Instant reports. No guesswork.
            </p>
            <button className="creatodisplayB bg-white text-black text-[16px] text-center px-[30px] py-[13px]  md:px-[30px] md:py-[13px] lg:px-[30px] lg:py-[13px] rounded-full hover:bg-gray-200 transition">
              Book an Inspection
            </button>
          </div>
        </div>
      </section>
      <VehicleChecks />
    </>
  )
}

Home.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default Home
