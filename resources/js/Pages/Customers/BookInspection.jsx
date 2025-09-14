import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import CustomerLayout from '../../layout/CustomerLayout'
import redarrowRg from "../../assets/images/redarrowRg.png";
import bookinspectionbg from "../../assets/images/bookinspectionbg.jpg";
import { route } from 'ziggy-js'
import { useForm, usePage } from '@inertiajs/react'

/** Collapsible “Show more” list with smooth height animation (no dependencies) */
const CollapsibleList = ({ items, maxVisible = 6, listClassName = "", toggleClassName = "" }) => {
  const [expanded, setExpanded] = useState(false); 
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    if (expanded && innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [expanded, items]);

  useEffect(() => {
    const onResize = () => {
      if (expanded && innerRef.current) {
        setHeight(innerRef.current.scrollHeight);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [expanded]);

  const visible = items.slice(0, maxVisible);
  const hidden = items.slice(maxVisible);

  return (
    <>
      <ul className={listClassName}>
        {visible.map((item, i) => <li key={i}>{item}</li>)}
      </ul>

      {/* Sliding container for the hidden items */}
      {hidden.length > 0 && (
        <div
          style={{ height, overflow: "hidden", transition: "height 300ms ease" }}
          aria-hidden={!expanded}
        >
          <ul ref={innerRef} className={listClassName}>
            {hidden.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}

      {hidden.length > 0 && (
       <button
       type="button"
       onClick={() => setExpanded((v) => !v)}
       className={`${toggleClassName} buttonLink w-auto max-w-[120px] cursor-pointer creatodisplayM mt-[10px] border border-[#192735] rounded-full px-[13px] py-[5px] text-[13px] text-[#192735] hover:bg-black hover:text-white transition no-underline`}
       aria-expanded={expanded}
     >
       {expanded ? "Show Less" : "Show More"}
     </button>
     
      )}
    </>
  );
};

const BookInspection = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("type")) {
      handleContinue(params.get("type"));
    }
  }, []);

  const [activeStep, setActiveStep] = useState(1);
  const [packageId, setpackage] = useState(0);
  const steps = ["Choose Package", "Contact Information", "Vehicle Details", "Schedule"];
  const detailsRef = useRef(null);
  const { props } = usePage();

  const { data, setData, post, processing, errors, reset } = useForm({
    full_name: props?.full_name || '',
    vehicle_make: props?.vehicle_make || '',
    vehicle_model: props?.vehicle_model || '',
    vehicle_year: props?.vehicle_year || '',
    fuel_type: props?.fuel_type || '',
    transmission: props?.transmission || '',
    mileage: props?.mileage || '',
    preferred_date: props?.preferred_date || '',
    preferred_time_slot: props?.preferred_time_slot || '',
    additional_notes: props?.additional_notes || '',
    contact_no: props?.contact_no || '',
    email: props?.email || '',
    address_line_1: props?.address_line_1 || '',
    address_line_2: props?.address_line_2 || '',
    car_parked: props?.car_parked || '',
    other_vehicle_make: props?.other_vehicle_make || '',
    // pin_code: props?.pin_code || '',
    city: props?.city || '',
    package_name: packageId,
  });

  const isFormValid1 =
  data.full_name &&
  data.email &&
  data.contact_no &&
  data.address_line_1 &&
  data.address_line_2 &&
  data.city;

  const isFormValid2 =
  data.vehicle_make &&
  data.vehicle_model &&
  data.vehicle_year &&
  data.fuel_type &&
  data.transmission &&
  data.mileage;

 

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('request-inspection'), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  function handleContinue(packageid) {
    setpackage(packageid);
    setActiveStep(2);
    setData("package_name", packageid);
  }

  function setActiveStepFun(step) {
    if(packageId){
       setActiveStep(step);
       setData("package_name", step);
    }else{
      alert('Please choose the package');
    }
   
  }

  useLayoutEffect(() => {
    if (activeStep === 2 || activeStep === 3) {
      requestAnimationFrame(() => {
        const el = detailsRef.current;
        if (!el) return;
        const headerOffset = 0;
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    }
  }, [activeStep]);

  // Package items
  const regularItems = [
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

  const comprehensiveItems = [
    // "General Mechanical & Electrical Inspection",
    // "Engine & Gear Performance",
    // "Test Drive (standard road)",
    // "Accident History Check",
    // "Interior Condition Review",
    // "Exterior Condition Review",
    // "Brakes System",
    // "Damage/Repairs Detection",
    // "Home Inspection",
    // "Instant Report",
    "Full Computer Diagnostic Scan (OBD & sensors)",
    "Extended Test Drive",
    "Detailed Damage & Repairs Assessment",
    "Leakages",
    "Gearbox & Engine Checkup",
    "Suspension & Steering",
    "Flood & Stolen Car Checkup",
    "Optional Carfax History Report (+AED 170 if requested)",
    "Home Inspection",
    "Battery health report",
    "High-quality Photos of the Car for records",
  ];

  const ultraItems = [
    // "General Mechanical & Electrical Inspection",
    // "Engine & Gear Performance",
    // "Test Drive (standard road)",
    // "Accident History Check",
    // "Interior Condition Review",
    // "Exterior Condition Review",
    // "Brakes System",
    // "Damage/Repairs Detection",
    // "Home Inspection",
    // "Instant Report",
    // "Full Computer Diagnostic Scan (OBD & sensors)",
    // "Extended Test Drive",
    // "Detailed Damage & Repairs Assessment",
    // "Leakages",
    // "Gearbox & Engine Checkup",
    // "Suspension & Steering",
    // "Flood & Stolen Car Checkup",
    // "Optional Carfax History Report (+AED 170 if requested)",
    // "Battery health report",
    // "High-quality Photos of the Car for records",
    "Extended Road Test Drive (highway + city)",
    "Advanced Computer Scan",
    "Detailed Gearbox & Engine Check",
    "Suspension, Brake, Tire, Battery Health Report",
    "Flood & Theft Check (via VIN + local records)",
    "Optional Carfax History Report (+AED 120)",
    "Home Inspection",
    "Full deep Body, Interior & Exterior Documentation with 20+ photos",
    "Technician Final Summary + WhatsApp Report + Email",
  ];

  const [isOther, setIsOther] = useState(data.vehicle_make === "Other");
  const handleChange = (e) => {
    const value = e.target.value;
    setData("vehicle_make", value);
    setIsOther(value === "Other");
    if (value !== "Other") {
      setData("other_vehicle_make", ""); // reset when not "Other"
    }
  };

  return (
    <>
      <div className='relative overflow-hidden min-h-[335px] md:min-h-[435px] lg:min-h-[535px]'>
        <div className='flex items-center absolute right-[0] top-[20px] md:top-[90px] bottom-[inherit] md:bottom-[0] m-auto z-[1]'>
          <img src={redarrowRg} alt="img" className='block lg:hidden max-w-full max-h-[400px]' />
          <img src={redarrowRg} alt="img" className='hidden lg:block max-w-full' />
        </div>
        <img src={bookinspectionbg} alt="Background" className=" absolute inset-0 w-full h-full  object-cover" />

        {/* Heading */}
        <div className="relative container z-[1] mb-12 !pt-[160px] md:!pt-[250px] ">
          <h2 className="ppfont text-[30px] md:text-[60px] lg:text-[70px] leading-tight  text-white">Book An Inspection</h2>
          <p className="creatodisplayM text-[18px] md:text-[22px] lg:text-[24px] text-white">Follow few simple steps to book an inspection </p>
        </div>
      </div>

      <div className=" pt-[40px] pb-[40px] md:pt-[40px] md:pb-[60px] lg:pt-[60px] lg:pb-[100px] ">
        <div className=" container  ">
          {/* Steps Navigation */}
          <div className="w-full md:max-w-[960px] m-auto flex justify-center mb-8">
            <div className="w-full relative flex justify-center flex-wrap sm:flex-nowrap bg-[#EDEEEF] p-[4px] md:p-[10px] rounded-[10px] sm:rounded-[80px] gap-[5px] md:gap-4">
              <div className="absolute w-[90%] h-[2px] top-[26px] md:top-[41px] border-b-[2px] border-b-[#000]"></div>
              {steps.map((step, index) => {
                const isActive = activeStep === index + 1;
                return (
                  <div
                    key={index}
                    //onClick={() => setActiveStepFun(index + 1)}
                    className={`w-[48%]  sm:w-[50%] ppfont flex z-[1] items-center justify-center gap-[3px] sm:gap-[4px] md:gap-2 px-[2px] py-[10px] md:px-[5px] md:py-[15px] rounded-full border-[1px] md:border-[1px]  cursor-pointer transition-all text-[10px] sm:text-[12px] md:text-[12px] lg:text-[13px] xl:text-[14px] text-[#192735] ${isActive
                      ? "bg-[#192735] text-white border-black"
                      : "bg-[#EDEEEF] text-black border-[#192735]"
                      }`}
                  >
                    <span className={`relative w-[14px] h-[14px] rounded-full border ${isActive ? " border-white" : " border-black"}`}>
                      <span className={`absolute top-[3px] left-[3px] w-[6px] h-[6px] rounded-full ${isActive ? "bg-[#fff]" : ""}`}/>
                    </span>
                    {step}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tab 1: Packages */}
          {activeStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto container">
              {/* Regular Plan */}
              <div className="relative pb-[90px] bg-[#EDEEEF] rounded-[10px] lg:rounded-[25px] flex flex-col justify-start">
                <div className="p-[10px] md:p-[15px] lg:p-[35px] !pb-[5px] ">
                  <h3 className="creatodisplayM text-[15px] md:text-[16px] lg:text-[20px] font-[600] leading-[26px] text-[#192735] capitalize italic">
                    Regular Inspection
                  </h3>
                  <p className="creatodisplayM text-[15px] leading-[16px]  text-[#192735]">
                    Provides clarity and confidence for buyers before a purchase.
                  </p>
                </div>
                <p className="ppfont border-b-[1px] border-b-[#ccc] text-[19px] md:text-[20px] lg:text-[25px] xl:text-[25px] lg:leading-[30px] text-[#192735] px-[15px] md:px-[15px] lg:px-[35px] pb-[15px] ">
                  AED 349 <span className="text-[14px] md:text-[16px]">(exc. VAT)</span>
                </p>
                <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <div className="flex flex-col gap-[10px] creatodisplayM text-[16px] lg:text-[18px] leading-[22px]">
                  <CollapsibleList
                    items={regularItems}
                    maxVisible={6}
                    listClassName="check-list creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[17px] text-[#192735] list-disc pl-[20px] lg:pl-[25px]"
                    toggleClassName="mt-3 text-[14px] underline text-[#192735]"
                  />
                  </div>
                  <div className="mt-8 absolute left-[0] right-[0] px-[10px] bottom-[20px] xl:px-[25px] xl:bottom-[35px] w-full ">
                    <button onClick={() => handleContinue("1")} className="w-full cursor-pointer creatodisplayM mt-6 border border-[#192735] rounded-full px-[10px] py-[10px] md:px-[15px] md:py-[10px] xl:py-[14px] text-[12px] md:text-[15px] xl:text-[20px] text-[#192735] hover:bg-black hover:text-white transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Comprehensive Plan */}
              <div className="relative pb-[90px] bg-[#192735] rounded-[10px] lg:rounded-[25px] flex flex-col justify-start">
                <div className="p-[10px] md:p-[15px] lg:p-[35px] !pb-[5px] ">
                  <h3 className="creatodisplayM text-[15px] md:text-[16px] lg:text-[20px] font-[600] leading-[26px] text-[#fff] capitalize italic">
                    Comprehensive Inspection
                  </h3>
                  <p className="creatodisplayM text-[15px] leading-[16px]  text-[#fff]">
                    In-depth review for safer, solid used car purchases.
                  </p>
                </div>
                <p className="ppfont border-b-[1px] border-b-[#ccc] text-[19px] md:text-[20px] lg:text-[25px] xl:text-[25px] lg:leading-[30px] text-[#fff] px-[15px] md:px-[15px] lg:px-[35px] pb-[15px] ">
                  AED 389 <span className="text-[14px] md:text-[16px]">(exc. VAT)</span>
                </p>
                <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <div className="flex flex-col gap-[10px] creatodisplayM text-[16px] lg:text-[18px] leading-[22px]">
                  <CollapsibleList
                    items={comprehensiveItems}
                    maxVisible={6}
                    listClassName="check-list check-list-wh creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[17px] text-[#fff] list-disc pl-[20px] lg:pl-[25px]"
                    toggleClassName="mt-3 text-[14px]  text-white border-[#fff]"
                  />
                  </div>
                  <div className="mt-8 absolute left-[0] right-[0] px-[10px] bottom-[20px] xl:px-[25px] xl:bottom-[35px] w-full ">
                    <button onClick={() => handleContinue("2")} className="w-full cursor-pointer creatodisplayM mt-6 border border-[#192735] rounded-full px-[10px] py-[10px] md:px-[15px] md:py-[10px] xl:py-[14px] text-[12px] md:text-[15px] xl:text-[20px] text-[#fff] bg-[#D72638] hover:bg-white hover:text-black transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Ultra Plan */}
              <div className="relative pb-[90px] bg-[#EDEEEF] rounded-[10px] lg:rounded-[25px] flex flex-col justify-start">
                <div className="p-[10px] md:p-[15px] lg:p-[35px] !pb-[5px] ">
                  <h3 className="creatodisplayM text-[15px] md:text-[16px] lg:text-[20px] font-[600] leading-[26px] text-[#192735] capitalize italic">
                    Ultra Inspection
                  </h3>
                  <p className="creatodisplayM text-[15px] leading-[16px]  text-[#192735]">
                    Premium inspection for luxury or resale-ready vehicles.
                  </p>
                </div>
                <p className="ppfont border-b-[1px] border-b-[#ccc] text-[19px] md:text-[20px] lg:text-[25px] xl:text-[25px] lg:leading-[30px] text-[#192735] px-[15px] md:px-[15px] lg:px-[35px] pb-[15px] ">
                  AED 499 <span className="text-[14px] md:text-[16px]">(exc. VAT)</span>
                </p>
                <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <div className="flex flex-col gap-[10px] creatodisplayM text-[16px] lg:text-[18px] leading-[22px]">
                  <CollapsibleList
                    items={ultraItems}
                    maxVisible={6}
                    listClassName="check-list creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[17px] text-[#192735] list-disc pl-[20px] lg:pl-[25px]"
                    toggleClassName="mt-3 text-[14px] underline text-[#192735]"
                  />
                  </div>
                  <div className="mt-8 absolute left-[0] right-[0] px-[10px] bottom-[20px] xl:px-[25px] xl:bottom-[35px] w-full">
                    <button onClick={() => handleContinue("3")} className="w-full cursor-pointer creatodisplayM mt-6 border border-[#192735] rounded-full px-[10px] py-[10px] md:px-[15px] md:py-[10px] xl:py-[14px] text-[12px] md:text-[15px] xl:text-[20px] text-[#192735] hover:bg-black hover:text-white transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2 & 3: Contact Form */}
          <form className=" inspectionForm" onSubmit={handleSubmit}>
          {(activeStep === 2 && packageId>0) && (
           
              <div className="bg-white border-[1px] border-[#19273533] rounded-[10px] md:rounded-[15px] lg:rounded-[25px] p-[15px] md:p-[30px] lg:p-[50px]">
              <h2 className="ppfont text-[#192735] text-[18px] md:text-[22px] lg:text-[24px] xl:text-[28px] pb-[15px] border-b-[1px] border-b-[#0000001a] mb-[20px] md:mb-[30px] lg:mb-[30px]">Complete Your Personal Profile to Continue</h2>
              <div
              className="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[20px] mx-auto w-full "
              ref={detailsRef}
              id="enter-details-booking"
            >
              
            
                <input type="hidden" id="packageId" name="package_name" value={data.package_name} />

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Full Name</label> */}
                  <input
                    required
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] min-h-[35px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.full_name}
                    onChange={(e) => setData('full_name', e.target.value)}
                  />
                  {errors.full_name && <div className="text-red-500 text-[12px]">{errors.full_name}</div>}
                </div>

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Email</label> */}
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                  />
                  {errors.email && <div className="text-red-500 text-[12px]">{errors.email}</div>}
                </div>

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Phone (With Country Code)</label> */}
                  <input
                    required
                    type="tel"
                    placeholder="+971 501231234"
                    name="contact_no"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.contact_no}
                    onChange={(e) => setData('contact_no', e.target.value)}
                  />
                  {errors.contact_no && <div className="text-red-500 text-[12px]">{errors.contact_no}</div>}
                </div>

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Address Line 1</label> */}
                  <input
                    required
                    type="text"
                    placeholder="Address Line 1"
                    name="address_line_1"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.address_line_1}
                    onChange={(e) => setData('address_line_1', e.target.value)}
                  />
                  {errors.address_line_1 && <div className="text-red-500 text-[12px]">{errors.address_line_1}</div>}
                </div>

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Address Line 2</label> */}
                  <input
                    required
                    type="text"
                    placeholder="Address Line 2"
                    name="address_line_2"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.address_line_2}
                    onChange={(e) => setData('address_line_2', e.target.value)}
                  />
                  {errors.address_line_2 && <div className="text-red-500 text-[12px]">{errors.address_line_2}</div>}
                </div>

                {/* <div>
                  <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Pin Code</label>
                  <input
                    type="text"
                    placeholder="Pin Code"
                    name="pin_code"
                    className="border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.pin_code}
                    onChange={(e) => setData('pin_code', e.target.value)}
                  />
                  {errors.pin_code && <div className="text-red-500 text-[12px]">{errors.pin_code}</div>}
                </div> */}

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>City</label> */}
                  <select
                    required
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    name="city"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  >
                    <option value="" disabled hidden>-- Select City --</option>
                    <option value="Abudhabi" disabled>Abudhabi (Not Servicable)</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Fujeirah" disabled>Fujeirah (Not Servicable)</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Ajman" disabled>Ajman (Not Servicable)</option>
                    <option value="Ras Al Khaimah" disabled>Ras Al Khaimah (Not Servicable)</option>
                    <option value="Umm Al Quwain" disabled>Umm Al Quwain (Not Servicable)</option>
                  </select>
                  {errors.city && <div className="text-red-500 text-[12px]">{errors.city}</div>}
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-center gap-[15px]">
                 <button
                  onClick={() => setActiveStep(1)}
                  type="button"
                  className="prevousbtn cursor-pointer w-[170px] px-[10px] py-[10px] rounded-full text-white creatodisplayM text-[15px] md:text-[18px] transition disabled:opacity-60"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  type="button"
                  disabled={!isFormValid1} 
                  className="redbtn cursor-pointer w-[170px] px-[10px] py-[10px] rounded-full text-white creatodisplayM text-[15px] md:text-[20px] transition disabled:opacity-60"
                >
                  Next
                </button>
                </div>
            </div></div>
          )}

          {(activeStep === 3 && packageId>0) && (
            <div
              className=" mx-auto w-[96%] bg-white border-[1px] border-[#19273533] rounded-[10px] md:rounded-[15px] lg:rounded-[25px] p-[15px] md:p-[30px] lg:p-[50px]"
              ref={detailsRef}
              id="enter-details-booking"
            >
              <h2 className="ppfont text-[#192735] text-[18px] md:text-[22px] lg:text-[24px] xl:text-[28px] pb-[15px] border-b-[1px] border-b-[#0000001a] mb-[20px] md:mb-[30px] lg:mb-[30px]">Tell Us About Your Vehicle to Get Started</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[20px] mx-auto w-full" >
                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Vehicle Make</label> */}
                  <select
                    required
                    value={data.vehicle_make}
                    onChange={handleChange}
                    name="vehicle_make"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  >
                    <option value="" disabled hidden>-- Select Vehicle Make --</option>
                    <option value="Abarth">Abarth</option>
                    <option value="Acura">Acura</option>
                    <option value="Aiways">Aiways</option>
                    <option value="Alfa Romeo">Alfa Romeo</option>
                    <option value="Alpina">Alpina</option>
                    <option value="Alpine">Alpine</option>
                    <option value="Aston Martin">Aston Martin</option>
                    <option value="Audi">Audi</option>
                    <option value="BAIC">BAIC</option>
                    <option value="Bentley">Bentley</option>
                    <option value="BMW">BMW</option>
                    <option value="Bordrin">Bordrin</option>
                    <option value="Borgward">Borgward</option>
                    <option value="Bugatti">Bugatti</option>
                    <option value="Buick">Buick</option>
                    <option value="BYD">BYD</option>
                    <option value="Cadillac">Cadillac</option>
                    <option value="Caterham">Caterham</option>
                    <option value="Chery">Chery</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Chrysler">Chrysler</option>
                    <option value="Citroën">Citroën</option>
                    <option value="Daihatsu">Daihatsu</option>
                    <option value="Denza">Denza</option>
                    <option value="De Tomaso">De Tomaso</option>
                    <option value="Dodge">Dodge</option>
                    <option value="Dongfeng">Dongfeng</option>
                    <option value="FAW">FAW</option>
                    <option value="Ferrari">Ferrari</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Fisker">Fisker</option>
                    <option value="Ford">Ford</option>
                    <option value="GMC">GMC</option>
                    <option value="Geely">Geely</option>
                    <option value="Genesis">Genesis</option>
                    <option value="Great Wall Motors (GWM)">Great Wall Motors (GWM)</option>
                    <option value="Haval">Haval</option>
                    <option value="Honda">Honda</option>
                    <option value="Hongqi">Hongqi</option>
                    <option value="Human Horizons (HiPhi)">Human Horizons (HiPhi)</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Infiniti">Infiniti</option>
                    <option value="Italdesign">Italdesign</option>
                    <option value="JAC Motors">JAC Motors</option>
                    <option value="Jaguar">Jaguar</option>
                    <option value="Jeep">Jeep</option>
                    <option value="Jetour">Jetour</option>
                    <option value="Kia">Kia</option>
                    <option value="Koenigsegg">Koenigsegg</option>
                    <option value="Lamborghini">Lamborghini</option>
                    <option value="Lancia">Lancia</option>
                    <option value="Land Rover">Land Rover</option>
                    <option value="Leapmotor">Leapmotor</option>
                    <option value="Lexus">Lexus</option>
                    <option value="Li Auto">Li Auto</option>
                    <option value="Lincoln">Lincoln</option>
                    <option value="Lotus">Lotus</option>
                    <option value="Lucid Motors">Lucid Motors</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="Maserati">Maserati</option>
                    <option value="Maybach">Maybach</option>
                    <option value="Mazda">Mazda</option>
                    <option value="McLaren">McLaren</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="MG">MG</option>
                    <option value="Mini">Mini</option>
                    <option value="Mitsubishi">Mitsubishi</option>
                    <option value="Mitsuoka">Mitsuoka</option>
                    <option value="Morgan">Morgan</option>
                    <option value="NIO">NIO</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Opel">Opel</option>
                    <option value="Ora">Ora</option>
                    <option value="Pagani">Pagani</option>
                    <option value="Peugeot">Peugeot</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Ram">Ram</option>
                    <option value="Renault">Renault</option>
                    <option value="Rimac">Rimac</option>
                    <option value="Rivian">Rivian</option>
                    <option value="Rolls-Royce">Rolls-Royce</option>
                    <option value="Saab">Saab</option>
                    <option value="Seres">Seres</option>
                    <option value="Smart">Smart</option>
                    <option value="Subaru">Subaru</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Tata">Tata</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Toyota">Toyota</option>
                    <option value="TVR">TVR</option>
                    <option value="Venturi">Venturi</option>
                    <option value="Volkswagen (VW)">Volkswagen (VW)</option>
                    <option value="Volvo">Volvo</option>
                    <option value="Voyah">Voyah</option>
                    <option value="Weltmeister (WM Motor)">Weltmeister (WM Motor)</option>
                    <option value="Wiesmann">Wiesmann</option>
                    <option value="XPeng">XPeng</option>

                    <option value="Other">Other Make</option>
                  </select>
                  {errors.vehicle_make && <div className="text-red-500 text-[12px]">{errors.vehicle_make}</div>}
                </div>

                {isOther && (
                    <div>
                      {/* <label className="flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]">
                        Please specify
                      </label> */}
                      <input
                        type="text"
                        name="other_vehicle_make"
                        value={data.other_vehicle_make || ""}
                        onChange={(e) => setData("other_vehicle_make", e.target.value)}
                        required={isOther}
                        placeholder="Enter vehicle make"
                        className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                      />
                      {errors.other_vehicle_make && (
                        <div className="text-red-500 text-[12px]">
                          {errors.other_vehicle_make}
                        </div>
                      )}
                    </div>
                  )}

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Vehicle Model</label> */}
                  <input
                    required
                    type="text"
                    placeholder="Vehicle Model"
                    name="vehicle_model"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.vehicle_model}
                    onChange={(e) => setData('vehicle_model', e.target.value)}
                  />
                  {errors.vehicle_model && <div className="text-red-500 text-[12px]">{errors.vehicle_model}</div>}
                </div>

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Vehicle Year</label> */}
        
                  <select
                    required
                    value={data.vehicle_year}
                    onChange={(e) => setData("vehicle_year", e.target.value)}
                    name="vehicle_year"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  >
                    <option value="" disabled hidden>-- Select Vehicle Year --</option>
                    {Array.from({ length: 41 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                  {errors.vehicle_year && <div className="text-red-500 text-[12px]">{errors.vehicle_year}</div>}
                </div>

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Fuel Type</label> */}
                  <select
                    required
                    value={data.fuel_type}
                    onChange={(e) => setData("fuel_type", e.target.value)}
                    name="fuel_type"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  >
                    <option value="" disabled hidden>-- Select Fuel Type --</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                  {errors.fuel_type && <div className="text-red-500 text-[12px]">{errors.fuel_type}</div>}
                </div>

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Transmission</label> */}
                  <select
                    required
                    value={data.transmission}
                    onChange={(e) => setData("transmission", e.target.value)}
                    name="transmission"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  >
                    <option value="" disabled hidden>-- Select Transmission --</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                  {errors.transmission && <div className="text-red-500 text-[12px]">{errors.transmission}</div>}
                </div>

                 <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Mileage</label> */}
                  <select
                    required
                    value={data.mileage}
                    onChange={(e) => setData("mileage", e.target.value)}
                    name="mileage"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  >
                    <option value="" disabled hidden>-- Select Mileage --</option>
                    <option value="New – 10,000 kms">New – 10,000 kms</option>
                    <option value="10,000 – 20,000 kms">10,000 – 20,000 kms</option>
                    <option value="20,000 – 30,000 kms">20,000 – 30,000 kms</option>
                    <option value="30,000 – 40,000 kms">30,000 – 40,000 kms</option>
                    <option value="40,000 – 60,000 kms">40,000 – 60,000 kms</option>
                    <option value="60,000 – 80,000 kms">60,000 – 80,000 kms</option>
                    <option value="80,000 – 100,000 kms">80,000 – 100,000 kms</option>
                    <option value="100,000 – 120,000 kms">100,000 – 120,000 kms</option>
                    <option value="120,000 – 140,000 kms">120,000 – 140,000 kms</option>
                    <option value="140,000 – 160,000 kms">140,000 – 160,000 kms</option>
                    <option value="160,000 – 180,000 kms">160,000 – 180,000 kms</option>
                    <option value="180,000 – 200,000 kms">180,000 – 200,000 kms</option>
                    <option value="200,000 – 250,000 kms">200,000 – 250,000 kms</option>
                    <option value="250,000 – 300,000 kms">250,000 – 300,000 kms</option>
                    <option value="300,000 - Above kms">300,000 - Above kms</option>
                  </select>
                  {errors.mileage && <div className="text-red-500 text-[12px]">{errors.mileage}</div>}
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-center gap-[15px]">
                 <button
                  onClick={() => setActiveStep(2)}
                  type="button"
                  className="prevousbtn cursor-pointer w-[170px] px-[10px] py-[10px]  rounded-full text-white creatodisplayM text-[15px] md:text-[20px] transition disabled:opacity-60"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStep(4)}
                  type="button"
                  disabled={!isFormValid2} 
                  className="redbtn cursor-pointer w-[170px] px-[10px] py-[10px]  rounded-full text-white creatodisplayM text-[15px] md:text-[20px] transition disabled:opacity-60"
                >
                  Next
                </button>
                </div></div>

                
            </div>
          )}

          {(activeStep === 4 && packageId>0) && (
            <div
              className=" mx-auto w-[96%] bg-white border-[1px] border-[#19273533] rounded-[10px] md:rounded-[15px] lg:rounded-[25px] p-[15px] md:p-[30px] lg:p-[50px]"
              ref={detailsRef}
              id="enter-details-booking"
            >
              <h2 className="ppfont text-[#192735] text-[18px] md:text-[22px] lg:text-[24px] xl:text-[28px] pb-[15px] border-b-[1px] border-b-[#0000001a] mb-[20px] md:mb-[30px] lg:mb-[30px]">When Would You Like Us to Inspect Your Vehicle?</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-[20px] mx-auto w-full">
                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Car Parked</label> */}
                  <select
                    required
                    value={data.car_parked}
                    onChange={(e) => setData("car_parked", e.target.value)}
                    name="car_parked"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  >
                    <option value="" disabled hidden>-- Where is the car parked? --</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Showroom">Showroom</option>
                    <option value="Home">Home</option>
                    <option value="Parking basement">Parking basement</option>
                  </select>
                  {errors.car_parked && <div className="text-red-500 text-[12px]">{errors.car_parked}</div>}
                </div>

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Inspection Date</label> */}
                  <input
                  required
                  type="text"
                  name="preferred_date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                  placeholder="Preferred Date"
                  className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  value={data.preferred_date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setData("preferred_date", e.target.value)}
                />

                  {errors.preferred_date && <div className="text-red-500 text-[12px]">{errors.preferred_date}</div>}
                </div>

                <div>
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Inspection Time Slot</label> */}

                  <select
                    required
                    value={data.preferred_time_slot}
                    onChange={(e) => setData("preferred_time_slot", e.target.value)}
                    name="preferred_time_slot"
                    className="min-h-[35px] border border-[#192735] rounded-full text-[14px] md:text-[16px] lg:text-[18px] px-[18px] py-[10px] md:px-[22px] md:py-[13px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  >
                    <option value="" hidden>-- Select Time Slot --</option>
                    <option value="9:00 AM – 12:00 PM">9:00 AM – 12:00 PM</option>
                    <option value="10:00 AM – 1:00 PM">10:00 AM – 1:00 PM</option>
                    <option value="11:00 AM – 2:00 PM">11:00 AM – 2:00 PM</option>
                    <option value="12:00 PM – 3:00 PM">12:00 PM – 3:00 PM</option>
                    <option value="1:00 PM – 4:00 PM">1:00 PM – 4:00 PM</option>
                    <option value="2:00 PM – 5:00 PM">2:00 PM – 5:00 PM</option>
                    <option value="3:00 PM – 6:00 PM">3:00 PM – 6:00 PM</option>
                    <option value="4:00 PM – 7:00 PM">4:00 PM – 7:00 PM</option>
                    <option value="5:00 PM – 8:00 PM">5:00 PM – 8:00 PM</option>
                  </select>
                  {errors.preferred_time_slot && <div className="text-red-500 text-[12px]">{errors.preferred_time_slot}</div>}
                </div>

                <div className="md:col-span-2">
                  {/* <label className='flex creatodisplayM text-[14px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Additional Notes</label> */}
                  <textarea
                    
                    onChange={(e) => setData('additional_notes', e.target.value)}
                    name="additional_notes"
                    placeholder="Additional Notes"
                    value={data.additional_notes}
                    className="h-[58px] md:h-[55px] lg:h-[67px] border border-[#192735] rounded-[10px] px-[14px] py-[14px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  />
                  {errors.additional_notes && <div className="text-red-500 text-[12px]">{errors.additional_notes}</div>}
                </div>

                <div className="col-span-1 md:col-span-2 justify-center flex gap-[15px]">
                  <button
                    onClick={() => setActiveStep(3)}
                    type="button"
                    className="prevousbtn cursor-pointer w-[170px] px-[10px] py-[10px]  rounded-full text-white creatodisplayM text-[15px] md:text-[20px] transition disabled:opacity-60"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="redbtn cursor-pointer w-[170px] px-[10px] py-[10px]  rounded-full text-white creatodisplayM text-[15px] md:text-[20px] transition disabled:opacity-60"
                  >
                    {processing ? "Submitting..." : "Submit"}
                  </button>
                </div>
                </div>

            </div>
          )}
          </form>
        </div>
      </div>
    </>
  )
}

BookInspection.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default BookInspection
