import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Image imports from src/img
import sliderdemo01 from "../assets/images/insepectimg01.jpg";
import sliderdemo02 from "../assets/images/insepectimg02.jpg";
import sliderdemo03 from "../assets/images/insepectimg03.jpg";
import sliderdemo04 from "../assets/images/insepectimg04.jpg";
import sliderdemo05 from "../assets/images/insepectimg01.jpg";
import sliderdemo06 from "../assets/images/insepectimg02.jpg";

const data = [
  { title: "Mechanical systems (engine, transmission, clutch)", desc: "", img: sliderdemo01 },
  { title: "Braking, suspension, tyres, and steering", desc: "", img: sliderdemo02 },
  { title: "Mechanical systems (engine, transmission, clutch)", desc: "", img: sliderdemo03 },
  { title: "Braking, suspension, tyres, and steering", desc: "", img: sliderdemo04 },
  { title: "Mechanical systems (engine, transmission, clutch)", desc: "", img: sliderdemo05 },
  { title: "Braking, suspension, tyres, and steering", desc: "", img: sliderdemo06 },
];

const CarInspectionSlider = () => {
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full">
      {/* Slider */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          300: { slidesPerView: 1 },
          575: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        className="w-full"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative rounded-[20px]">
              <img
                src={item.img}
                alt={item.title}
                className="h-[400px] w-full object-cover rounded-[20px]"
              />
              <div className="absolute left-0 bottom-0 px-[20px] py-[20px]">
                <h3 className="ppfont text-[18px] md:text-[22px] lg:text-[24px] text-white leading-[28px]">
                  {item.title}
                </h3>
                {item.desc && <p className="text-sm mt-1">{item.desc}</p>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* External Navigation */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="cursor-pointer w-[40px] h-[40px] flex items-center justify-center bg-[#F61221] text-white rounded-full hover:bg-gray-800"
        >
          <svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="cursor-pointer w-[40px] h-[40px] flex items-center justify-center bg-[#F61221] text-white rounded-full hover:bg-gray-800"
        >
          <svg className="w-[20px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default CarInspectionSlider;
