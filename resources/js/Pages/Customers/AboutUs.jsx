import React from 'react'
import { Link } from '@inertiajs/react';
import VehicleChecks from '../../components/Front/VehicleChecks';
import MarqueeSlider from '../../components/MarqueeSlider';
import CustomerLayout from '../../layout/CustomerLayout'
import redangleright from "../../assets/images/redangleright.png";
import CarSlider from '../../components/CarSlider';
import aboutbanner from "../../assets/images/aboutbanner.jpg";
import redangleleft from "../../assets/images/redangleleft.png";
import homeoverlaybg from "../../assets/images/homeoverlaybg.png";
import teamorverlay from "../../assets/images/teamorverlay.png";

import img1 from "../../assets/images/peopel01.jpg";
import img2 from "../../assets/images/peopel02.jpg";
import img3 from "../../assets/images/peopel03.jpg";
import img4 from "../../assets/images/peopel04.jpg";
import img5 from "../../assets/images/peopel05.jpg";
import img6 from "../../assets/images/peopel06.jpg";

const teamMembers = [
  { name: "Ankit Verma", role: "Lead Inspector", image: img1 },
  { name: "Mike Johnson", role: "Quality Assurance Manager", image: img2 },
  { name: "Luis Martinez", role: "Project Coordinator", image: img3 },
  { name: "Sofia Patel", role: "Senior Analyst", image: img4 },
  { name: "Liam Johnson", role: "Project Coordinator", image: img5 },
  { name: "Emma Chen", role: "Quality Assurance Manager", image: img6 },
];

const AboutUs = () => {
  return (
    <>
      <section className="relative  flex items-center w-full min-h-[600px] md:min-h-[740px] lg:min-h-[840px] overflow-hidden">
        {/* Image */}
        <div className="absolute inset-0 top-[0] bottom-[0] h-full">
          <img src={aboutbanner} alt="Vehicle Inspection" className="w-full h-full object-cover" />
        </div>
        <div className='flex items-center absolute right-[0] top-[0] bottom-[0] m-auto z-[1]'>
          <img src={redangleleft} alt="img" className='max-w-full w-full' />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 top-[0] bottom-[0] h-full">
          <img src={homeoverlaybg} alt="" className='w-full h-full object-cover' />
        </div>

        {/* Content */}
        <div className="absolute z-[2] inset-0 flex items-center px-[0px] md:px-12 lg:px-20">
          <div className="text-white container">
            <h1 className="ppfont  text-white text-[35px] md:text-[55px] lg:text-[65px] xl:text-[75px] leading-[35px] md:leading-[55px] lg:leading-[65px] xl:leading-[75px] mb-[15px]">
              Inspections That <br /> Speak the Truth.
            </h1>
            <p className="max-w-[700px] creatodisplayM text-white text-[18px] md:text-[20px] lg:text-[24px] leading-[20px] md:leading-[24px] lg:leading-[34px] mb-[30px]">
              In a world where second-hand vehicles can hide first-class problems, we set out to create a service that puts truth back on the table. Founded by a team of auto experts, tech lovers, and everyday car buyers like you, our mission is simple: make vehicle inspections clear, convenient, and trustworthy.
            </p>
            <Link to="/" className="min-w-[220px] btn inline-flex items-center justify-center creatodisplayB bg-white text-black text-[16px] text-center px-[30px] py-[15px]  md:px-[40px] md:py-[13px] lg:px-[30px] lg:py-[17px] rounded-full hover:bg-gray-200 transition">
              Book an Inspection
            </Link>
          </div>
        </div>
      </section>


      <section className="bg-[#0D1B2A] py-[40px] md:py-[60px] lg:py-[80px]">
        <div className="container grid gap-6 md:grid-cols-2">

          {/* Box 1 */}
          <div className="bg-[#192735] min-h-auto md:min-h-[275px] rounded-[10px] md:rounded-[20px] lg:rounded-[30px] p-6 md:p-8">
            <h2 className="ppfont text-white  text-[28px] md:text-[26px] text-[28px] mb-[5px] md:mb-[10px] ">
              What Defines Us
            </h2>
            <p className="creatodisplayM text-[#ffffffbf] text-[16px] md:text-[16px] lg:text-[18px] leading-[22px]">
              We believe in thorough inspections that leave no stone unturned — and in reports that are simple enough for anyone to understand. Our identity is shaped by two forces: precision and transparency. We inspect every car like it’s our own, and we only succeed when you feel fully informed, not overwhelmed.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-[#192735] rounded-[10px] md:rounded-[20px] lg:rounded-[30px] p-6 md:p-8">
            <h2 className="ppfont text-white  text-[28px] md:text-[26px] text-[28px] mb-[5px] md:mb-[10px] ">
              What Inspires Us
            </h2>
            <p className="creatodisplayM text-[#ffffffbf] text-[16px] md:text-[16px] lg:text-[18px] leading-[22px]">
              We’ve met buyers who were one bad decision away from a nightmare... and sellers who just wanted to prove their vehicle’s real value. Those moments — where knowledge changed the outcome — are why we do this. We’re inspired by the idea that confidence is contagious. And when people feel sure about their vehicle, everything that follows becomes smoother.
            </p>
          </div>

        </div>
      </section>

      <section className="bg-[#F9F9F9] py-[40px] md:py-[60px] lg:py-[80px]">
        <div className='container'>
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-[20px] md:mb-[30px] lg:mb-[50px] gap-4">
            <div class="w-full md-w-[50%]">
              <h2 class="ppfont text-[25px] md:text-[28px] lg:md:text-[36px] leading-[26px] md:leading-[38px] text-[#192735]">Every Inspection Tells a Story and We Make Sure It’s the Real One</h2>
            </div>

            <div class="w-full md-w-[50%]">
              <p class="creatodisplayM text-[16px] md:text-[18px] lg:text-[20px] text-[#192735ad]">We don’t just assess vehicles — we reveal their journeys, their condition, and their truth. With every inspection we do, there’s one common outcome: clients walking away smarter, more confident, and in control of their next move.</p>
            </div>
          </div>
        </div>
        <MarqueeSlider />
      </section>

      <div className='group relative overflow-hidden  bg-[#0D1B2A] flex items-center '>
        <div class="container">
          <div className='absolute left-[0] top-[0] bottom-[0]'>
            <img src={redangleright} alt="" />
          </div>
          <VehicleChecks />
        </div>
      </div>


      <section className='group bg-[#F9F9F9] hover:bg-[#0D1B2A] py-[80px]'>
        <div className='container'>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[20px] md:mb-[30px] lg:mb-[50px] gap-4">
            <div className='w-full md-w-[50%]'>
              <h2 className='ppfont text-[#192735] group-hover:text-[#fff] text-[25px] md:text-[30px] lg:text-[36px] font-[500] leading-[38px]'>Designed With Trust, Tech & Transparency At The Core</h2>
            </div>

            <div className='w-full md-w-[50%]'>
              <p className='creatodisplayM text-[#192735ab]  group-hover:text-[#fff] text-[20px] '>We’re not just another garage service — we’re a full-stack inspection platform built to remove doubt and restore confidence in every vehicle decision.</p>
            </div>
          </div>
          <CarSlider />
        </div>
      </section>


      <section className="bg-[#F9F9F9] py-[20px] md:py-[60px] lg:py-[80px]">
        <div className='container'>
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-[20px] md:mb-[30px] lg:mb-[50px] gap-4">
            <div class="w-full md-w-[50%]">
              <h2 class="ppfont text-[25px] md:text-[28px] lg:md:text-[36px] leading-[26px] md:leading-[38px] text-[#192735]">A blend of gearheads, tech minds, and real people who care.</h2>
            </div>

            <div class="w-full md-w-[50%]">
              <p class="creatodisplayM text-[16px] md:text-[18px] lg:text-[20px] text-[#192735ad]">We're not a faceless startup. We're a close-knit team built on passion, expertise, and a shared obsession with doing things right.</p>
            </div>
          </div>
        

        <div className=" grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative min-h-[250px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[525px] rounded-[10px] md:rounded-[20px] lg:rounded-[30px] overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-[0] bottom-0 left-0 righte-[0] w-full h-full">
                <img className='w-full h-full' src={teamorverlay} alt="" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-[15px] md:p-[20px] lg:p-[30px] ">
                <h3 className="ppfont text-white text-[20px] md:text-[22px] lg:text-[24px]">
                  {member.name}
                </h3>
                <p className="creatodisplayB text-[#D72638] text-[14px] md:text-[16px] lg:text-[18px]  uppercase tracking-wide">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>


    </>
  )
}

AboutUs.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default AboutUs
