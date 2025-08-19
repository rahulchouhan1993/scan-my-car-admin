import React, { useState } from "react";

const PackageCard = ({ title, desc, price, color, textColor, items, packageId }) => {
  const [expanded, setExpanded] = useState(false);
  const maxVisible = 8; // Show only first 8 items initially

  return (
    <div className={`relative pb-[90px] ${color} rounded-[10px] lg:rounded-[25px] flex flex-col justify-start`}>
      <div className="p-[10px] md:p-[15px] lg:p-[35px] !pb-[5px]">
        <h3 className={`creatodisplayM text-[16px] md:text-[18px] uppercase ${textColor}`}>
          {title}
        </h3>
        <p className={`creatodisplayM text-[12px] lg:text-[14px] ${textColor}`}>
          {desc}
        </p>
      </div>
      <p className={`ppfont border-b-[1px] border-b-[#ccc] text-[18px] md:text-[20px] lg:text-[25px] xl:text-[30px] lg:leading-[32px] ${textColor} px-[15px] lg:px-[35px] pb-[15px]`}>
        {price} <span className="text-[14px] md:text-[16px]">(exc. VAT)</span>
      </p>

      <div className="p-[15px] lg:p-[20px] xl:p-[30px]">
        <ul className={`creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[18px] list-disc pl-[20px] lg:pl-[25px] ${textColor}`}>
          {items.slice(0, expanded ? items.length : maxVisible).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        {/* Show More / Show Less */}
        {items.length > maxVisible && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm text-blue-600 underline"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}

        <div className="mt-8 absolute left-[0] right-[0] px-[25px] bottom-[35px] w-full">
          <button
            onClick={() => handleContinue(packageId)}
            className={`w-full cursor-pointer creatodisplayM mt-6 border border-[#192735] rounded-full px-[10px] py-[10px] md:px-[15px] md:py-[14px] text-[12px] md:text-[20px] ${textColor} hover:bg-black hover:text-white transition`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Packages() {
  const regular = [
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
  ];

  const comprehensive = [
    ...regular,
    "Full Computer Diagnostic Scan (OBD & sensors)",
    "Extended Test Drive",
    "Detailed Damage & Repairs Assessment",
    "Leakages",
    "Gearbox & Engine Checkup",
    "Suspension & Steering",
    "Flood & Stolen Car Checkup",
    "Optional Carfax History Report (+AED 170)",
    "Battery health report",
    "High-quality Photos of the Car",
  ];

  const ultra = [
    ...comprehensive,
    "Extended Road Test Drive (highway + city)",
    "Advanced Computer Scan",
    "Detailed Gearbox & Engine Check",
    "Suspension, Brake, Tire, Battery Health Report",
    "Flood & Theft Check (via VIN + local records)",
    "Optional Carfax History Report (+AED 120)",
    "Full deep Body, Interior & Exterior Documentation",
    "Technician Final Summary + WhatsApp Report + Email",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto container">
      <PackageCard
        title="Regular Inspection"
        desc="Ideal for basic condition checks before a quick purchase"
        price="AED 389"
        color="bg-[#EDEEEF]"
        textColor="text-[#192735]"
        items={regular}
        packageId="1"
      />
      <PackageCard
        title="Comprehensive Inspection"
        desc="Balanced package for confident purchases of higher-value used cars"
        price="AED 489"
        color="bg-[#192735]"
        textColor="text-[#fff]"
        items={comprehensive}
        packageId="2"
      />
      <PackageCard
        title="Ultra Inspection"
        desc="Premium, luxury cars, high-risk imports, or official resale"
        price="AED 599"
        color="bg-[#EDEEEF]"
        textColor="text-[#192735]"
        items={ultra}
        packageId="3"
      />
    </div>
  );
}

// Your existing function
function handleContinue(packageId) {
  console.log("Selected package:", packageId);
}
