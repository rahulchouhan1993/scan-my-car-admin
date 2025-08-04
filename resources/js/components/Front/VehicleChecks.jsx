import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import hoverImg from "../../assets/images/servicehover.jpg"; 

const services = [
  {
    title: "Pre-Purchase Car Inspection",
    description: "Know what the seller won't tell you. Avoid hidden damage or overdue repairs.",
  },
  {
    title: "Pre-Purchase Car Inspection",
    description: "Know what the seller won't tell you. Avoid hidden damage or overdue repairs.",
  },
  {
    title: "Pre-Purchase Car Inspection",
    description: "Know what the seller won't tell you. Avoid hidden damage or overdue repairs.",
  },
];

const VehicleChecks = () => {
  return (
    <section className="bg-[#0F1B27] text-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1320px] m-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          A Vehicle Check For Every Situation
        </h2>
        <p className="text-gray-300 max-w-xl">
          Every car has a different story. Whether you're buying, selling, or maintaining — we’ve designed inspections that fit your moment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group bg-[#182735] rounded-2xl p-6 flex flex-col justify-between min-h-[310px] hover:shadow-lg transition duration-300 overflow-hidden"
          >
            {/* Hover Image */}
            <img
              src={hoverImg}
              alt="hover effect"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            />

            {/* Overlay for dimming background image */}
            <div className="absolute inset-0 bg-[#182735]/90 group-hover:bg-[#182735]/80 transition duration-300 z-0 rounded-2xl" />

            {/* Content */}
            <div className="relative z-10 ">
              <div className="flex items-start justify-between mb-6">
                <h3 className="ppfont text-[22px] md:text-[24px] lg:text-[28px] lg:leading-[32px] text-white">{service.title}</h3>
                <span className="w-[64px] h-[64px] flex items-center justify-center bg-red-600 rounded-[90px]">
                  {/* <ArrowUpRight size={20} /> */}
                  <MdOutlineArrowOutward size={20}/>



                </span>
              </div>
              <p className="text-sm text-gray-300">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default VehicleChecks;
