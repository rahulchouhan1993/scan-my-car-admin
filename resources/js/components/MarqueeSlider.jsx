import React from "react";
import Marquee from "react-fast-marquee";
import storyslider01 from "../assets/images/storyslider01.jpg";
import storyslider02 from "../assets/images/storyslider02.jpg";
import storyslider03 from "../assets/images/storyslider03.jpg";
import storyslider04 from "../assets/images/storyslider04.jpg";
import storyslider05 from "../assets/images/storyslider05.jpg";
import storyslider06 from "../assets/images/storyslider06.jpg";


export default function BoxSlider() {
  return (
  <>
  
    <Marquee className="mb-[25px]"  direction="left"  speed={100}>
       <div className="px-[15px]">
            <img className="rounded-[10px] md:rounded-[20px]" src={storyslider01} alt="" />
       </div>
        <div className="px-[15px]">
            <img className="rounded-[10px] md:rounded-[20px]" src={storyslider02} alt="" />
       </div>
        <div className="px-[15px]">
            <img  className="rounded-[10px] md:rounded-[20px]" src={storyslider03} alt="" />
       </div>
        <div className="px-[15px]">
            <img className="rounded-[10px] md:rounded-[20px]" src={storyslider04} alt="" />
       </div>
        <div className="px-[15px]">
            <img className="rounded-[10px] md:rounded-[20px]" src={storyslider05} alt="" />
       </div>

       <div className="px-[15px]">
            <img className="rounded-[10px] md:rounded-[20px]" src={storyslider06} alt="" />
       </div>

    </Marquee>


     <Marquee  direction="right"  speed={100} >
     <div className="px-[15px]">
            <img className="rounded-[10px] md:rounded-[20px]" src={storyslider01} alt="" />
       </div>
        <div className="px-[15px]">
            <img className="rounded-[10px] md:rounded-[20px]" src={storyslider02} alt="" />
       </div>
        <div className="px-[15px]">
            <img  className="rounded-[10px] md:rounded-[20px]" src={storyslider03} alt="" />
       </div>
        <div className="px-[15px]">
            <img className="rounded-[10px] md:rounded-[20px]" src={storyslider04} alt="" />
       </div>
        <div className="px-[15px]">
            <img className="rounded-[10px] md:rounded-[20px]" src={storyslider05} alt="" />
       </div>

       <div className="px-[15px]">
            <img className="rounded-[10px] md:rounded-[20px]" src={storyslider06} alt="" />
       </div>

    </Marquee>
  </>
  );
}
