import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import storyslider01 from "../assets/images/storyslider01.jpg";
import storyslider02 from "../assets/images/storyslider02.jpg";
import storyslider03 from "../assets/images/storyslider03.jpg";
import storyslider04 from "../assets/images/storyslider04.jpg";
import storyslider05 from "../assets/images/storyslider05.jpg";
import storyslider06 from "../assets/images/storyslider06.jpg";
import storyslider07 from "../assets/images/storyslider07.jpg";
import storyslider08 from "../assets/images/storyslider08.jpg";
import storyslider09 from "../assets/images/storyslider09.jpg";
import storyslider10 from "../assets/images/storyslider10.jpg";
import storyslider11 from "../assets/images/storyslider11.jpg";
import storyslider12 from "../assets/images/storyslider12.jpg";

const images = [
  storyslider01,
  storyslider02,
  storyslider03,
  storyslider04,
  storyslider05,
  storyslider06,
];

const images1 = [
  storyslider07,
  storyslider08,
  storyslider09,
  storyslider10,
  storyslider11,
  storyslider12,
];

export default function BoxSlider() {
  return (
    <div className="container">
      {/* Left direction slider */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={30}
        speed={5000}
        loop={true}
        allowTouchMove={false}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        className="mb-[25px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <img
              className="rounded-[10px] md:rounded-[20px] max-h-[210px] min-h-[210px] md:max-h-[310px] md:min-h-[310px] object-cover"
              src={img}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right direction slider */}
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={30}
        speed={5000}
        loop={true}
        allowTouchMove={false}
        autoplay={{
          delay: 0,
          reverseDirection: true,
          disableOnInteraction: false,
        }}
      >
        {images1.map((img, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <img
              className="rounded-[10px] md:rounded-[20px] max-h-[210px] min-h-[210px] md:max-h-[310px] md:min-h-[310px] object-cover"
              src={img}
              alt=""
            />
          </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
}
