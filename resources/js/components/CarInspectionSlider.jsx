import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Image imports from src/img
import sliderdemo01 from '../assets/images/sliderdemo01.jpg';
import sliderdemo02 from '../assets/images/sliderdemo02.jpg';
import sliderdemo03 from '../assets/images/sliderdemo03.jpg';
import sliderdemo04 from '../assets/images/sliderdemo04.jpg';

import sliderdemo05 from '../assets/images/sliderdemo01.jpg';
import sliderdemo06 from '../assets/images/sliderdemo02.jpg';
import sliderdemo07 from '../assets/images/sliderdemo03.jpg';
import sliderdemo08 from '../assets/images/sliderdemo04.jpg';


const data = [
  {
    title: "Mechanical systems (engine, transmission, clutch)",
    desc: "",
    img: sliderdemo01,
  },

  {
    title: "Braking, suspension, tyres, and steering",
    desc: "",
    img: sliderdemo02,
  },

  {
    title: "Battery, lights, electronics, infotainment",
    desc: "",
    img: sliderdemo03,
  },

  {
    title: "Interior & exterior visual condition",
    desc: "",
    img: sliderdemo04,
  },


  {
    title: "Mechanical systems (engine, transmission, clutch)",
    desc: "",
    img: sliderdemo05,
  },

  {
    title: "Braking, suspension, tyres, and steering",
    desc: "",
    img: sliderdemo06,
  },

  {
    title: "Battery, lights, electronics, infotainment",
    desc: "",
    img: sliderdemo07,
  },

  {
    title: "Interior & exterior visual condition",
    desc: "",
    img: sliderdemo07,
  },
  
  
];

const CarInspectionSlider = () => {
  return (
    <div className="bg-[#0b1a2a] py-10 px-4">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          300: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={item.img}
                alt={item.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-4 text-white bg-[#0b1a2a]">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                {item.desc && <p className="text-sm mt-1">{item.desc}</p>}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarInspectionSlider;
