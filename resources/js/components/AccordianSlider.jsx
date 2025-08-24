import React, { useState } from "react";
import formbookimg01 from '../assets/images/formbookimg01.jpg';
import formbookimg02 from '../assets/images/carsliderimg03.jpg';
import formbookimg03 from '../assets/images/carsliderimg02.jpg';
import formbookimg04 from '../assets/images/carsliderimg01.jpg';

const data = [
  { title: "Book your inspection in 30 seconds", content: `Save time with our quick and easy booking process. In just a few clicks, you can schedule your car inspection at your convenience.`, image: formbookimg01 },
  { title: "We send a certified technician to your location", content: "No need to travel or wait at workshops—our qualified, certified technician will come directly to your home, office, or any location you choose.", image: formbookimg02 },
  { title: "We prepare a complete visual + diagnostic report", content: "Receive a thorough, professional inspection that covers both visual checks and advanced diagnostic testing, giving you a full picture of your car’s condition.", image: formbookimg03 },
  { title: "You make smarter decisions with real data", content: "With accurate, transparent insights at your fingertips, you can make confident decisions about repairs, purchases, or maintenance—backed by real data.", image: formbookimg04 },
];

const AccordianSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="min-h-[750px] flex flex-col flex-col-reverse md:flex-row items-start gap-[20px] md:gap-[30px] lg:gap-[40px] xl:gap-[70px]">
      
      {/* Left Image */}
      <div className="md:w-1/2 w-full min-h-[300px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[680px]">
        <img
          src={data[activeIndex].image}
          alt="car"
          className="rounded-[10px] md:rounded-[20px] lg:rounded-[30px] w-full min-h-[300px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[680px] object-cover h-full transition-opacity duration-500"
        />
      </div>

      {/* Right Accordion - Always Open */}
      <div className="md:w-1/2 w-full flex flex-col gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative bg-[#19273512] rounded-2xl px-[10px] md:px-[15px] lg:px-[20px] py-[10px] md:py-[15px] lg:py-[20px] shadow-sm overflow-hidden cursor-pointer"
            onMouseEnter={() => setActiveIndex(index)}
          >
            <h3 className="ppfont text-[20px] md:text-[22px] lg:text-[20px] xl:text-[26px] leading-[22px] md:leading-[24px] lg:leading-[22px] xl:leading-[30px] text-[#192735] mb-2">
              {item.title}
            </h3>

            {/* Always Visible Content */}
            <div>
              <p className="creatodisplayM text-[12px] md:text-[16px] text-[#192735ad] pb-3">
                {item.content}
              </p>
            </div>

            {/* Always Full Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[6px] bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full progressbar"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccordianSlider;
