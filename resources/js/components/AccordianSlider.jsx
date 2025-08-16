import React, { useEffect, useState } from "react";
import formbookimg01 from '../assets/images/formbookimg01.jpg';
import formbookimg02 from '../assets/images/carsliderimg03.jpg';
import formbookimg03 from '../assets/images/carsliderimg02.jpg';
import formbookimg04 from '../assets/images/carsliderimg01.jpg';

const data = [
  { title: "Book your inspection in 30 seconds", content: `We Blend The Precision Of Technology With The Instincts Of Seasoned Professionals. Every Vehicle Is Inspected Using Certified Tools, Diagnostic Scanners, And Methodical Checklists Designed By Experts. Our Inspectors Don’t Guess — They Verify. The Result? A Smarter, Sharper, And More Reliable Inspection That You Can Trust With Your Money And Your Safety.`, image: formbookimg01 },
  { title: "We send a certified technician to your location", content: "We Blend The Precision Of Technology With The Instincts Of Seasoned Professionals...", image: formbookimg02 },
  { title: "We prepare a complete visual + diagnostic report", content: "We Blend The Precision Of Technology With The Instincts Of Seasoned Professionals...", image: formbookimg03 },
  { title: "You make smarter decisions with real data", content: "We Blend The Precision Of Technology With The Instincts Of Seasoned Professionals...", image: formbookimg04 },
];

const SLIDE_TIME = 4000; // ms

const AccordianSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0); // default first open
  const [progress, setProgress] = useState(0);

  // whenever activeIndex changes → run progress
  useEffect(() => {
    setProgress(0);
    const timer = setTimeout(() => {
      setProgress(100);
    }, 50);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(0);   // fallback to first accordion
    setProgress(0);      // reset progress
  };

  return (
    <div className="min-h-[750px] flex flex-col md:flex-row items-start gap-[20px] md:gap-[30px] lg:gap-[40px] xl:gap-[70px]">
      {/* Left Image */}
      <div className="md:w-1/2 w-full min-h-[500px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[680px]">
        <img
          src={data[activeIndex].image}
          alt="car"
          className="rounded-[10px] md:rounded-[20px] lg:rounded-[30px] w-full min-h-[500px] md:min-h-[600px] lg:min-h-[650px] xl:min-h-[680px] object-cover h-full transition-opacity duration-500"
        />
      </div>

      {/* Right Accordion */}
      <div className="md:w-1/2 w-full flex flex-col gap-4">
        {data.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              className="relative bg-[#19273512] rounded-2xl px-[10px] md:px-[15px] lg:px-[20px] py-[10px] md:py-[15px] lg:py-[20px] transition-all duration-300 shadow-sm overflow-hidden cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <h3 className="ppfont text-[20px] md:text-[22px] lg:text-[20px] xl:text-[26px] leading-[22px] md:leading-[24px] lg:leading-[22px] xl:leading-[30px] text-[#192735] mb-2">
                {item.title}
              </h3>

              {/* Content */}
              <div
                className="transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                  maxHeight: isActive ? "500px" : "0px",
                  opacity: isActive ? 1 : 0,
                }}
              >
                <p className="creatodisplayM text-[12px] md:text-[16px] text-[#192735ad] pb-3">
                  {item.content}
                </p>
              </div>

              {/* Progress Bar */}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[6px] bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full progressbar"
                    style={{
                      width: `${progress}%`,
                      transition: `width ${SLIDE_TIME}ms linear`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccordianSlider;
