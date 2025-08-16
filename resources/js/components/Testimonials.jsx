import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function TestimonialSlider() {
  const swiperRef = useRef(null);

  const testimonials = [
    {
      quote:
        "I almost bought a used SUV that looked spotless — until Vehicheck’s report flagged frame damage and a leaking gearbox. That ₹999 inspection saved me from a ₹60,000 mistake.",
      name: "— Raghav Mehta, Delhi",
    },
    {
      quote:
        "The inspection revealed a worn-out clutch that the seller conveniently forgot to mention. I used the report to negotiate ₹15k off. Absolutely worth it.",
      name: "— Raghav Mehta, Delhi",
    },
    {
      quote:
        "As a single mom with zero car knowledge, I was terrified of being tricked into buying a bad car. Vehicheck was like having a mechanic in my pocket.",
      name: "— Raghav Mehta, Delhi",
    },

    {
      quote:
        "I almost bought a used SUV that looked spotless — until Vehicheck’s report flagged frame damage and a leaking gearbox. That ₹999 inspection saved me from a ₹60,000 mistake.",
      name: "— Raghav Mehta, Delhi",
    },
    {
      quote:
        "The inspection revealed a worn-out clutch that the seller conveniently forgot to mention. I used the report to negotiate ₹15k off. Absolutely worth it.",
      name: "— Raghav Mehta, Delhi",
    },
    {
      quote:
        "As a single mom with zero car knowledge, I was terrified of being tricked into buying a bad car. Vehicheck was like having a mechanic in my pocket.",
      name: "— Raghav Mehta, Delhi",
    },
  ];

  return (
    <section className="testimonialSlider">
      <div
        onMouseEnter={() => swiperRef.current?.swiper?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.swiper?.autoplay?.start()}
      >
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Navigation, A11y, Keyboard]}
          a11y={{ enabled: true }}
          keyboard={{ enabled: true }}
          spaceBetween={24}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          navigation={true} // ✅ Next / Prev buttons enabled
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-10"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx} className="h-auto">
              <article className=" flex h-full min-h-[230px] flex-col justify-start rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
               
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
      </div>
    </section>
  );
}
