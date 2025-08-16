import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Image imports from src/img
import sliderdemo01 from '../assets/images/insepectimg01.jpg';
import sliderdemo02 from '../assets/images/insepectimg02.jpg';

import sliderdemo03 from '../assets/images/insepectimg03.jpg';
import sliderdemo04 from '../assets/images/insepectimg04.jpg';

import sliderdemo05 from '../assets/images/insepectimg01.jpg';
import sliderdemo06 from '../assets/images/insepectimg02.jpg';

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
    title: "Mechanical systems (engine, transmission, clutch)",
    desc: "",
    img: sliderdemo03,
  },
  {
    title: "Braking, suspension, tyres, and steering",
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
];

const CarInspectionSlider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          300: { slidesPerView: 1 },
          575: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
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
    </div>
  );
};

export default CarInspectionSlider;
