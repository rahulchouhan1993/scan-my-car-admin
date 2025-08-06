import React, { useEffect, useState } from "react";
import sliderdemo01 from '../assets/images/sliderdemo01.jpg';
import formbookimg01 from '../assets/images/formbookimg01.jpg';
import image2 from '../assets/images/homebanner.jpg';
import image3 from '../assets/images/servicehover.jpg';

const data = [
  {
    title: "Book your inspection in 30 seconds",
    content: `We Blend The Precision Of Technology With The Instincts Of Seasoned Professionals. Every Vehicle Is Inspected Using Certified Tools, Diagnostic Scanners, And Methodical Checklists Designed By Experts. Our Inspectors Don’t Guess — They Verify. The Result? A Smarter, Sharper, And More Reliable Inspection That You Can Trust With Your Money And Your Safety.`,
    image: formbookimg01,
  },
  {
    title: "We send a certified technician to your location",
    content: "",
    image: formbookimg01,
  },
  {
    title: "We prepare a complete visual + diagnostic report",
    content: "",
    image: formbookimg01,
  },
  {
    title: "You make smarter decisions with real data",
    content: "",
    image: formbookimg01,
  },
];

const AccordianSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeImage, setFadeImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeImage(false);
          setTimeout(() => {
            const nextIndex = (activeIndex + 1) % data.length;
            setActiveIndex(nextIndex);
            setFadeImage(true);
          }, 200);
          return 0;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className="container mt-10 px-4 flex flex-col md:flex-row items-center gap-6">
      {/* Left Image */}
      <div className="md:w-1/2 w-full">
        <img
          key={activeIndex}
          src={data[activeIndex].image}
          alt="car"
          className={`rounded-[30px] w-full object-cover h-full max-h-[500px] transition-opacity duration-500 ${
            fadeImage ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Right Accordion */}
      <div className="md:w-1/2 w-full flex flex-col gap-4">
        {data.map((item, index) => {
          const isActive = index === activeIndex;
          const isNextToOpen = index === (activeIndex + 1) % data.length;

          return (
            <div
              key={index}
              className={`bg-gray-100 rounded-2xl p-5 transition-all duration-300 shadow-sm`}
            >
              <h3 className="text-lg font-semibold text-[#0b1a2a] mb-2">{item.title}</h3>

              {isActive && item.content && (
                <p className="text-sm text-gray-600">{item.content}</p>
              )}

              {/* Active red underline */}
              {isActive && (
                <div className="mt-3 w-0 h-1 rounded-full bg-red-600"></div>
              )}

              {/* Progress bar for next */}
              {!isActive && isNextToOpen && (
                <div className="w-full h-1 bg-gray-300 mt-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all duration-100"
                    style={{ width: `${progress}%` }}
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
