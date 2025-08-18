import React, { useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import hoverImg from "../../assets/images/carsliderimg01.jpg";
import { Link } from "@inertiajs/react";

const services = [
  {
    title: "Pre-Purchase Car Inspection",
    description:
      "Get a full report before you buy. Identify hidden damage, accident history, and overdue repairs.",
  },
  {
    title: "Pre-Sale Car Inspection",
    description:
      "Show buyers your vehicle’s true condition. Boost trust and achieve a better selling price.",
  },
  {
    title: "Home Inspection Service",
    description:
      "From roof to foundation, we check every detail so you can buy or sell with confidence.",
  },
  {
    title: "Comprehensive Vehicle Health Check",
    description:
      "An in-depth assessment of your car’s performance, safety, and overall condition.",
  },
];

const VehicleChecks = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTouch = (index) => {
    // सिर्फ mobile (<= 640px) पर ही काम करेगा
    if (window.innerWidth <= 640) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <section className="bg-[#0D1B2A] text-white py-[40px] md:py-[80px] lg:py-[100px] ">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h2 className="ppfont md:w-[50%]  text-[25px] md:text-[28px] lg:md:text-[36px] leading-[26px] md:leading-[38px] text-white">
            A Vehicle Package For Every Situation
          </h2>
          <p className="md:w-[50%] text-[#ffffff8f] text-[16px] md:text-[18px] lg:text-[20px] lg:leading-[24px] max-w-xl">
            Every car has a different story. Whether you're buying, selling, or
            maintaining — we’ve designed inspections that fit your moment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleTouch(index)} // अब सिर्फ mobile पर काम करेगा
              className="relative group bg-[#192735] rounded-2xl p-3 md:p-6 flex flex-col justify-between 
                min-h-auto md:min-h-[280px] lg:min-h-[310px] hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
            >
              {/* Hover / Touch Image */}
              <img
                src={hoverImg}
                alt="hover effect"
                className={`absolute top-0 left-0 w-full h-full object-cover transition duration-500 rounded-2xl transform
                  ${
                    activeIndex === index
                      ? "opacity-100 scale-110" // 👈 Mobile tap
                      : "opacity-0 scale-100 sm:group-hover:opacity-100 sm:group-hover:scale-110" // 👈 Desktop hover
                  }`}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 transition duration-300 z-0 rounded-2xl 
                  ${
                    activeIndex === index
                      ? "bg-[#192735]/80"
                      : "bg-[#192735]/90 sm:group-hover:bg-[#192735]/80"
                  }`}
              />

              {/* Content */}
              <div className="relative z-10 flex items-stretch h-full flex-col justify-between">
                <div className="flex items-stretch justify-between mb-6 gap-[10px]">
                  <h3 className="ppfont text-[18px] md:text-[24px] lg:text-[28px] leading-[20px] md:leading-[24px] lg:leading-[28px] text-white">
                    {service.title}
                  </h3>
                  <Link href="/book-inspection">
                    <span className="min-w-[35px] min-h-[35px] md:min-w-[55px] md:min-h-[55px] lg:min-w-[64px] lg:min-h-[64px] flex items-center justify-center bg-[#F61221] rounded-[90px]">
                      <MdOutlineArrowOutward size={20} />
                    </span>
                  </Link>
                </div>
                <p className="creatodisplayM text-[18px] text-[#ffffff91] leading-[20px]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleChecks;
