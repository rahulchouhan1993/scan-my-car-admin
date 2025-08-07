import React from "react";
// import { Link } from "react-router-dom";
import { Link } from '@inertiajs/react';
import pricingred from '../assets/images/pricingred.png';

const plans = [
    {
        name: "STANDARD PLAN",
        price: "$199.99",
        description: "Best for used car buyers or sellers",
        features: [
            "200+ point inspection",
            "Pre-purchase/pre-sale diagnostic",
            "Accident & paintwork history",
            "OBD-II scanning & test drive analysis",
            "Full visual report with color-coded findings",
            "Certified technician visit at your location",
        ],
        isPrimary: false,
    },
    {
        name: "PREMIUM PLAN",
        price: "$499.99",
        description: "Best for used car buyers or sellers",
        features: [
            "200+ point inspection",
            "Pre-purchase/pre-sale diagnostic",
            "Accident & paintwork history",
            "OBD-II scanning & test drive analysis",
            "Full visual report with color-coded findings",
            "Certified technician visit at your location",
        ],
        isPrimary: true,
    },
    {
        name: "GOLD PLAN",
        price: "$699.99",
        description: "Best for used car buyers or sellers",
        features: [
            "200+ point inspection",
            "Pre-purchase/pre-sale diagnostic",
            "Accident & paintwork history",
            "OBD-II scanning & test drive analysis",
            "Full visual report with color-coded findings",
            "Certified technician visit at your location",
        ],
        isPrimary: false,
    },
];

const PricingSection = () => {
    return (
        <section className=" relative bg-[#0D1B2A] overflow-hidden py-16 px-4 text-white">
            <div className="flex items-center absolute top-[0] bottom-[0] left-[0] m-auto">
                <img className="w-full" src={pricingred} alt="img" />
            </div>
            <div className="container relative z-[1]">
                <div className="flex gap-[15px] w-full flex-wrap md:flex-nowrap mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Simple, Flat Pricing That Makes Sense
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                        We believe in keeping our pricing as transparent as our reports. Choose a plan that fits your need — no hidden charges, no surprises later.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-3xl p-8 flex flex-col justify-between shadow-md ${plan.isPrimary
                                    ? "bg-white text-[#0b1a2a]"
                                    : "bg-[#152638] text-white"
                                }`}
                        >
                            <div>
                                <h3 className="text-sm font-semibold tracking-wide uppercase">
                                    {plan.name}
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
                                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                                <ul className="space-y-2 text-sm">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="mr-2 text-xl">•</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8">
                                <Link to="/"
                                    className={`inline-flex items-center justify-center w-full py-3 rounded-full font-semibold transition-all ${plan.isPrimary
                                            ? "bg-red-600 text-white hover:bg-red-700"
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
