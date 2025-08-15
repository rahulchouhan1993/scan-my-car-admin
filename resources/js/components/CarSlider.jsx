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
import { Link } from "@inertiajs/react";
const cards = [
  {
    title: "Tech-Powered, Human-Led Inspections",
    description:
      "Our inspections go beyond surface checks. We use professional-grade diagnostic tools to scan for hidden engine, electrical, and mechanical issues — each result is verified by trained automotive experts.",
    button: "Book for inspection",
    image: card1
  },
  {
    title: "Comprehensive Maintenance Services",
    description:
      "Keep your vehicle running smoothly with our full-service maintenance programs designed to catch issues before they become costly problems.",
    button: "Schedule your maintenance",
    image: card2
  },
  {
    title: "Expert Vehicle Diagnostics",
    description:
      "Our advanced diagnostics identify even the smallest issues quickly, saving you time, money, and stress.",
    button: "Get you vehicle Diagnostics",
    image: card3
  },

  {
    title: "Tech-Powered, Human-Led Inspections",
    description:
      "Our inspections go beyond surface checks. We use professional-grade diagnostic tools to scan for hidden engine, electrical, and mechanical issues — each result is verified by trained automotive experts.",
    button: "Book for inspection",
    image: card1
  },
  {
    title: "Comprehensive Maintenance Services",
    description:
      "Keep your vehicle running smoothly with our full-service maintenance programs designed to catch issues before they become costly problems.",
    button: "Schedule your maintenance",
    image: card2
  },
  {
    title: "Expert Vehicle Diagnostics",
    description:
      "Our advanced diagnostics identify even the smallest issues quickly, saving you time, money, and stress.",
    button: "Get you vehicle Diagnostics",
    image: card3
  },
];


const CarSlider = () => {
  return (
    <div className="carSlider w-full ">
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
            <div className="group/card min-h-[350px] md:min-h-[500px] overflow-hidden  transition-shadow duration-300 ">
              <div className="absolute top-[0] bottom-[0] left-[0] right-[0] w-full h-full rounded-[25px] z-[1]">
                <img className="w-full h-full rounded-[25px]" src={imgoverlay} alt="img" />
              </div>
              <div className="absolute top-[0] bottom-[0] left-[0] right-[0] w-full h-full rounded-[25px]">
              <img src={card.image} alt={card.title} className="w-full h-full object-cover rounded-[25px]" />
              </div>
              <div className="z-[2] absolute bottom-[0] left-[0] px-[15px] py-[15px] md:px-[20px] md:py-[20px] lg:px-[30px] lg:py-[30px]">
                <h3 className="ppfont text-white text-[18px] leading-[20px] md:text-[22px] md:leading-[24px] lg:text-[24px] lg:leading-[26px]">{card.title}</h3>
              </div>



              {/* Slide-up content on hover */}
              <div className="flex items-start flex-col justify-end bg-[#12263f] w-full h-full absolute  bottom-[-100%] left-0 right-0 px-[15px] py-[15px] md:px-[30px] md:py-[30px] text-white z-20  group-hover/card:bottom-0 transition-all duration-500 ease-in-out rounded-[26px]">
                <h2 className="ppfont text-white text-[18px] leading-[20px] md:text-[22px] md:leading-[24px] lg:text-[24px] lg:leading-[26px] mb-3">{card.title}</h2>
                <p className="creatodisplayM text-[#192735ab]  group-hover:text-[#fff] text-[20px] mb-5">{card.description}</p>
                <Link href="/book-inspection" className="cursor-pointer w-full border border-white text-white px-[10px] py-[14px] rounded-full hover:bg-white hover:text-black transition creatodisplayM text-[18px] text-center">
                  {card.button}
                </Link>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarSlider;
