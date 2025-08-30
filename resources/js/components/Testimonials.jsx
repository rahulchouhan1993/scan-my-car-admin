import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TestimonialSlider() {
  const swiperRef = useRef(null);

  const testimonials = [
    {
      quote:
        "I almost bought a used SUV that looked spotless — until Vehicheck’s report flagged frame damage and a leaking gearbox. That AED 999 inspection saved me from a AED 60,000 mistake.",
      name: "— Ethan Carter, Dubai",
    },
    {
      quote:
        "The inspection revealed a worn-out clutch that the seller conveniently forgot to mention. I used the report to negotiate AED 15k off. Absolutely worth it.",
      name: "— Zain Al-Mansoori, Sharjah",
    },
    {
      quote:
        "As a single mom with zero car knowledge, I was terrified of being tricked into buying a bad car. Vehicheck was like having a mechanic in my pocket.",
      name: "— Sophia Mitchell, Dubai",
    },
    {
      quote:
        "I almost bought a used SUV that looked spotless — until Vehicheck’s report flagged frame damage and a leaking gearbox. That AED 999 inspection saved me from a AED 60,000 mistake.",
      name: "— Omar Al-Khalil, Dubai",
    },
    {
      quote:
        "The inspection revealed a worn-out clutch that the seller conveniently forgot to mention. I used the report to negotiate AED 15k off. Absolutely worth it.",
      name: "— Hana Al-Mutairi, Dubai",
    },
    {
      quote:
        "As a single mom with zero car knowledge, I was terrified of being tricked into buying a bad car. Vehicheck was like having a mechanic in my pocket.",
      name: "— Henry Cooper, Sharjah",
    },
  ];

  return (
    <section className="testimonialSlider relative">
      {/* Slider */}
      <Swiper
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, A11y, Keyboard]}
        a11y={{ enabled: true }}
        keyboard={{ enabled: true }}
        spaceBetween={24}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-2"
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx} className="h-auto">
            <article className="flex h-full min-h-[230px] flex-col justify-start rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
              <p className="mb-4 line-clamp-5 creatodisplayM text-[#000]">
                “{t.quote}”
              </p>
              <div className="flex items-center gap-4">
                <h3 className="creatodisplayM text-[14px] text-[#F61221] uppercase">
                  {t.name}
                </h3>
              </div>
            </article>
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
    </section>
  );
}
