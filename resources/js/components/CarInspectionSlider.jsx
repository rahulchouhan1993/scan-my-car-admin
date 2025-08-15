import React from 'react';
import Marquee from "react-fast-marquee";

import sliderdemo01 from '../assets/images/insepectimg01.jpg';
import sliderdemo02 from '../assets/images/insepectimg02.jpg';
import sliderdemo03 from '../assets/images/insepectimg03.jpg';
import sliderdemo04 from '../assets/images/insepectimg04.jpg';

import sliderdemo05 from '../assets/images/insepectimg01.jpg';
import sliderdemo06 from '../assets/images/insepectimg02.jpg';
import sliderdemo07 from '../assets/images/insepectimg03.jpg';
import sliderdemo08 from '../assets/images/insepectimg04.jpg';

const data = [
  { title: "Mechanical systems (engine, transmission, clutch)", img: sliderdemo01 },
  { title: "Braking, suspension, tyres, and steering", img: sliderdemo02 },
  { title: "Battery, lights, electronics, infotainment", img: sliderdemo03 },
  { title: "Interior & exterior visual condition", img: sliderdemo04 },
  { title: "Mechanical systems (engine, transmission, clutch)", img: sliderdemo05 },
  { title: "Braking, suspension, tyres, and steering", img: sliderdemo06 },
  { title: "Battery, lights, electronics, infotainment", img: sliderdemo07 },
  { title: "Interior & exterior visual condition", img: sliderdemo08 },
];

const CarInspectionSlider = () => {
  return (
    <div className="">
      <Marquee direction="left" speed={100} pauseOnHover={true} gradient={false}>
        {data.map((item, index) => (
          <div 
            key={index} 
            className="relative rounded-[10px] md:rounded-[15px] lg:rounded-[20px] overflow-hidden mx-[10px]"
          >
            <img
              src={item.img}
              alt={item.title}
              className="h-[260px] md:h-[350px] lg:h-[400px] w-[300px] object-cover rounded-[10px] md:rounded-[15px] lg:rounded-[20px]"
            />
            <div className="absolute left-0 bottom-0 px-[10px] py-[10px] md:px-[15px] md:py-[15px] lg:px-[20px] lg:py-[20px] ">
              <h3 className="ppfont text-[18px] md:text-[22px] lg:text-[24px] leading-[26px] text-white ">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CarInspectionSlider;
