import React from "react";
// import { Link } from "react-router-dom";
import { Link } from '@inertiajs/react';
import pricingred from '../assets/images/pricingred.png';

const plans = [
    {
        name: "Regular Inspection (Ideal for basic condition checks before a quick purchase)",
        price: "AED 389 (exc. VAT)",
        description: "Perfect for budget-conscious buyers who want peace of mind without going deep also the people who want to sell their car.",
        features: [
            "General Mechanical & Electrical Inspection",
            "Engine & Gear Performance",
            "Test Drive (standard road)",
            "Accident History Check",
            "Interior Condition Review",
            "Exterior Condition Review",
            "Brakes System",
            "Damage/Repairs Detection",
            "Home Inspection",
            "Instant Report",
        ],
        isPrimary: false,
    },
    {
        name: "Comprehensive Inspection (Balanced package for confident purchases of higher-value used cars)",
        price: "AED 489 (exc. VAT)",
        description: "Designed for serious buyers who want a detailed, data-backed report.",
        features: [
            "General Mechanical & Electrical Inspection",
            "Engine & Gear Performance",
            "Test Drive (standard road)",
            "Accident History Check",
            "Interior Condition Review",
            "Exterior Condition Review",
            "Brakes System",
            "Damage/Repairs Detection",
            "Home Inspection",
            "Instant Report",
            "Full Computer Diagnostic Scan (OBD & sensors)",
            "Extended Test Drive",
            "Detailed Damage & Repairs Assessment",
            "Leakages",
            "Gearbox & Engine Checkup",
            "Suspension & Steering",
            "Flood & Stolen Car Checkup",
            "Optional Carfax History Report (+AED 170 if requested) ",
            "Battery health report",
            "High-quality Photos of the Car for records",
        ],
        isPrimary: true,
    },
    {
        name: "Ultra Inspection (Premium, luxury cars, high-risk imports, or official resale)",
        price: "AED 599 (exc. VAT)",
        description: "Top-tier package for luxury vehicles or export buyers needing full transparency.",
        features: [
            "General Mechanical & Electrical Inspection",
            "Engine & Gear Performance",
            "Test Drive (standard road)",
            "Accident History Check",
            "Interior Condition Review",
            "Exterior Condition Review",
            "Brakes System",
            "Damage/Repairs Detection",
            "Home Inspection",
            "Instant Report",
            "Full Computer Diagnostic Scan (OBD & sensors)",
            "Extended Test Drive",
            "Detailed Damage & Repairs Assessment",
            "Leakages",
            "Gearbox & Engine Checkup",
            "Suspension & Steering",
            "Flood & Stolen Car Checkup",
            "Optional Carfax History Report (+AED 170 if requested) ",
            "Battery health report",
            "High-quality Photos of the Car for records",
            "Extended Road Test Drive (highway + city)",
            "Advanced Computer Scan",
            "Detailed Gearbox & Engine Check",
            "Suspension, Brake, Tire, Battery Health Report",
            "Flood & Theft Check (via VIN + local records)",
            "Optional Carfax History Report (+AED 120)",
            "Full deep Body, Interior & Exterior Documentation with 20+ photos",
            "Technician Final Summary + WhatsApp Report + Email"
        ],
        isPrimary: false,
    },
];

const PricingSection = () => {
    return (
        <section className=" relative bg-[#0D1B2A] overflow-hidden py-[40px] md:py-[60px] lg:py-[90px] text-white">
            <div className="flex items-center absolute top-[0] bottom-[0] left-[0] m-auto">
                <img className="w-full" src={pricingred} alt="img" />
            </div>
            <div className="container relative z-[1]">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[20px] md:mb-[30px] lg:mb-[50px] gap-4">
                    <div className='w-full md:w-[55%]'>
                        <h2 className='ppfont text-[#fff] group-hover:text-[#fff] text-[25px] md:text-[30px] lg:text-[36px] font-[500] leading-[38px]'> Simple, Flat Pricing That Makes Sense</h2>
                    </div>

                    <div className='w-full md:w-[45%]'>
                        <p className='creatodisplayM text-[#ffffff91]  group-hover:text-[#fff] text-[20px] leading-[24px] '>
                            We believe in keeping our pricing as transparent as our reports. Choose a plan that fits your need — no hidden charges, no surprises later.
                        </p>
                    </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-[10px] pb-[90px] md:rounded-[15px] lg:rounded-[20px] xl:rounded-[30px]  flex flex-col justify-start shadow-md ${plan.isPrimary
                                ? "bg-white text-[#192735] border-b-[1px] border-b-[#ccc]"
                                : "bg-[#192735] text-white"
                                }`}
                        >
                            <div className="pt-[10px] md:pt-[15px] xl:pt-[35px] px-[15px]  md:px-[10px] lg:px-[20px] xl:px-[35px] min-h-auto md:min-h-[240px] lg:min-h-[200px] xl:min-h-[220px]">
                                <h3 className="creatodisplayM text-[14px] md:text-[16px] lg:text-[18px] leading-[20px] mb-[5px] tracking-wide uppercase">
                                    {plan.name}
                                </h3>
                                <p className="creatodisplayM text-[14px] leading-[16px] mb-4">{plan.description}</p>
                                <div className="ppfont text-[18px] md:text-[20px] lg:text-[25px] xl:text-[30px] lg:leading-[32px]  ">{plan.price}</div>

                            </div>

                            <div className={` px-[15px] md:px-[15px] lg:px-[20px] xl:px-[30px] pt-[35px] pb-[35px] mt-[25px] border-t ${ plan.isPrimary ? "border-t-[#ccc]" : "border-t-[#ffffff42]" }`} >
                                <ul className=" flex flex-col gap-[10px] creatodisplayM text-[14px] md:text-[16px] lg:text-[18px] leading-[22px]  ">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="mr-2 text-[12px] md:text-[14px]">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 absolute left-[0] right-[0] px-[25px] bottom-[35px] w-full ">
                                    <Link href="/book-inspection"
                                        className={`creatodisplayM text-[20px] text-white inline-flex items-center justify-center w-full py-3 rounded-full transition-all ${plan.isPrimary
                                            ? "bg-[#D72638] text-white hover:bg-red-700"
                                            : "border border-white hover:bg-white hover:text-[#0b1a2a]"
                                            }`}
                                    >
                                        Continue

                                    </Link>
                                </div>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
