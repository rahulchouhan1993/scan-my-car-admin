import React from "react";
// import { Link } from "react-router-dom";
import { Link } from '@inertiajs/react';
import pricingred from '../assets/images/pricingred.png';

const plans = [
    {
        name: "Regular Inspection (Ideal for basic condition checks before a quick purchase)",
        price: "AED 389",
        description: "Perfect for budget-conscious buyers who want peace of mind without going deep also the people who want to sell their car.",
        features: [
            "* General Mechanical & Electrical Inspection Engine and gear performance",
            "Test Drive (standard road performance feedback)",
            "Accident History Check (via RTA/Police)",
            "Interior Condition Review",
            "Exterior Condition Review",
            "Damage/Repairs Detection",
            "Home Inspection",
        ],
        isPrimary: false,
    },
    {
        name: "Comprehensive Inspection (Balanced package for confident purchases of higher-value used cars)",
        price: "AED 489",
        description: "Designed for serious buyers who want a detailed, data-backed report.",
        features: [
            "Full Computer Diagnostic Scan (OBD & sensors)",
            "Extended Test Drive",
            "Detailed Damage & Repairs Assessment",
            "Gearbox & Engine Checkup",
            "Flood & Stolen Car Checkup",
            "Optional Carfax History Report (+AED 170 if requested) (click button)",
            "Home Inspection    ",
        ],
        isPrimary: true,
    },
    {
        name: "Ultra Inspection (Advance Premium) (For luxury cars, high-risk imports, or official resale)",
        price: "AED 799",
        description: " Top-tier package for luxury vehicles or export buyers needing full transparency.",
        features: [
            "RTA registration Test Arrangement & Support (optional add-on)",
            "Extended Road Test Drive (highway + city)",
            "Advanced Computer Scan",
            "Detailed Gearbox & Engine Check",
            "Suspension, Brake, Tire, Battery Health Report",
            " Flood & Theft Check (via VIN + local records)",
            "Optional Carfax History Report (+AED 120)",
            "Home Inspection",
            "Full deep Body, Interior & Exterior Documentation with 20+ photos",
            "Technician Final Summary + WhatsApp Report",
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
                <div className='w-full md-w-[50%]'>
                    <h2 className='ppfont text-[#fff] group-hover:text-[#fff] text-[25px] md:text-[30px] lg:text-[36px] font-[500] leading-[38px]'> Simple, Flat Pricing That Makes Sense</h2>
                </div>

                <div className='w-full md-w-[50%]'>
                    <p className='creatodisplayM text-[#ffffffc2]  group-hover:text-[#fff] text-[20px] '>
                    We believe in keeping our pricing as transparent as our reports. Choose a plan that fits your need — no hidden charges, no surprises later.
                    </p>
                </div>
            </div>



                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-[10px] md:rounded-[15px] lg:rounded-[20px] xl:rounded-[30px] p-4 md:p-6 xl:p-8 flex flex-col justify-between shadow-md ${plan.isPrimary
                                    ? "bg-white text-[#192735]"
                                    : "bg-[#192735] text-white"
                                }`}
                        >
                            <div>
                                <h3 className="creatodisplayM text-[14px] md:text-[16px] lg:text-[18px] tracking-wide uppercase">
                                    {plan.name}
                                </h3>
                                <p className="creatodisplayM text-[14px] mb-4">{plan.description}</p>
                                <div className="ppfont text-[20px] md:text-[30px] lg:text-[40px]  mb-6 border-b border-b-[#ffffff42] pb-[25px] mb-[25px]">{plan.price}</div>
                                <ul className="space-y-2 creatodisplayM text-[14px] ">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="mr-2 text-xl">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8">
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
