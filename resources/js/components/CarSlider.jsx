import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import imgoverlay from '../assets/images/imgoverlay.png';
import card1 from "../assets/images/carsliderimg01.jpg";
import card2 from "../assets/images/carsliderimg02.jpg";
import card3 from "../assets/images/carsliderimg03.jpg";

const cards = [
    {
      title: "Tech-Powered, Human-Led Inspections",
      image: card1,
    },
    {
      title: "Comprehensive Maintenance Services",
      image: card2,
    },
    {
      title: "Expert Vehicle Diagnostics",
      image: card3,
    },

    {
        title: "Tech-Powered, Human-Led Inspections",
        image: card1,
      },
      {
        title: "Comprehensive Maintenance Services",
        image: card2,
      },
      {
        title: "Expert Vehicle Diagnostics",
        image: card3,
      },
  ];


const CarSlider = () => {
  return (
    <div className="carSlider w-full px-4 md:px-10 py-10 bg-gray-100">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="min-h-[500px] bg-white  overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-[25px]">
                <div className="absolute top-[0] bottom-[0] left-[0] right-[0] w-full h-full rounded-[25px]">
                    <img className="w-full h-full rounded-[25px]" src={imgoverlay} alt="img" />
                </div>
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover rounded-[25px]"
              />
              <div className="absolute bottom-[0] left-[0] px-[15px] py-[15px]">
                <h3 className="ppfont text-white text-[24px]">{card.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarSlider;
