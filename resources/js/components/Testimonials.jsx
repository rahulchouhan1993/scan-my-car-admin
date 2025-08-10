import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; // Correct for Swiper v8+
import 'swiper/css';

const testimonials = [
  {
    quote: "I almost bought a used SUV that looked spotless — until Vehicheck's report flagged frame damage...",
    name: "RAGHAV MEHTA, DELHI",
  },
  {
    quote: "Bought my first car through OLX. Wouldn’t have dared without this inspection...",
    name: "RAGHAV MEHTA, DELHI",
  },
  {
    quote: "The inspection revealed a worn-out clutch that the seller conveniently forgot to mention...",
    name: "RAGHAV MEHTA, DELHI",
  },
  {
    quote: "As a single mom with zero car knowledge, I was terrified of being tricked...",
    name: "RAGHAV MEHTA, DELHI",
  },
  {
    quote: "Quick, professional, and detailed. Highly recommend.",
    name: "RAGHAV MEHTA, DELHI",
  },
];

const SliderColumn = ({ direction = 'down', delay = 0 }) => {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={3}
      loop={true}
      spaceBetween={85}
      autoplay={{
        delay: 2000 + delay, // Use `delay` prop to offset start
        reverseDirection: direction === 'up',
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="h-[420px]"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide className='' key={index}>
          <div className="bg-white rounded-[20px] px-[20px] py-[25px] ">
            <p className="creatodisplayM text-[18px] leading-[24px] text-[#000315] mb-4">“{testimonial.quote}”</p>
            <p className="creatodisplayM text-[#F61221] text-[14px] uppercase ">— {testimonial.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const TestimonialSlider = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First column - top to bottom */}
        <SliderColumn direction="down" />

        {/* Middle column - bottom to top */}
        <SliderColumn direction="up" delay={1000} />

        {/* Third column - top to bottom */}
        <SliderColumn direction="down" delay={2000} />
      </div>
    </div>
  );
};

export default TestimonialSlider;
