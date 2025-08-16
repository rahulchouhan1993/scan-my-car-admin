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

const images = [
  storyslider01,
  storyslider02,
  storyslider03,
  storyslider04,
  storyslider05,
  storyslider06,
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
              className="rounded-[10px] md:rounded-[20px]"
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
        {images.map((img, index) => (
          <SwiperSlide key={index} style={{ width: "auto" }}>
            <img
              className="rounded-[10px] md:rounded-[20px]"
              src={img}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
