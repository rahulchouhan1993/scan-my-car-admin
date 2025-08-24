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
  const [activeStep, setActiveStep] = useState(1);
  const [packageId, setpackage] = useState(0);
  const steps = ["Choose Package", "Enter Details"];
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
    pin_code: props?.pin_code || '',
    city: props?.city || '',
  });

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
  }

  function setActiveStepFun(step) {
    if(packageId){
       setActiveStep(step);
    }else{
      alert('Please select a package');
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
    "Optional Carfax History Report (+AED 170 if requested)",
    "Battery health report",
    "High-quality Photos of the Car for records",
  ];

  const ultraItems = [
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
    "Optional Carfax History Report (+AED 170 if requested)",
    "Battery health report",
    "High-quality Photos of the Car for records",
    "Extended Road Test Drive (highway + city)",
    "Advanced Computer Scan",
    "Detailed Gearbox & Engine Check",
    "Suspension, Brake, Tire, Battery Health Report",
    "Flood & Theft Check (via VIN + local records)",
    "Optional Carfax History Report (+AED 120)",
    "Full deep Body, Interior & Exterior Documentation with 20+ photos",
    "Technician Final Summary + WhatsApp Report + Email",
  ];

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
            <div className="w-full relative flex justify-center flex-wrap sm:flex-nowrap bg-[#EDEEEF] p-[8px] md:p-[10px] rounded-[80px] gap-[5px] md:gap-4">
              <div className="absolute w-[90%] h-[2px] top-[26px] md:top-[41px] border-b-[2px] border-b-[#000]"></div>
              {steps.map((step, index) => {
                const isActive = activeStep === index + 1;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveStepFun(index + 1)}
                    className={`w-[48%]  sm:w-[50%] ppfont flex z-[1] items-center justify-center gap-[3px] sm:gap-[4px] md:gap-2 px-[2px] py-[10px] md:px-[15px] md:py-[15px] rounded-full border-[2px]  cursor-pointer transition-all text-[12px] sm:text-[14px] md:text-[20px] text-[#192735] ${isActive
                      ? "bg-[#192735] text-white border-black"
                      : "bg-[#EDEEEF] text-black border-[#192735]"
                      }`}
                  >
                    <span className={`relative w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] lg:w-[28px] lg:h-[28px] rounded-full border ${isActive ? " border-white" : " border-black"}`}>
                      <span className={`absolute top-[3px] left-[3px] sm:top-[3px] sm:left-[3px] w-[6px] h-[6px] sm:w-[10px] sm:h-[10px] md:w-[10px] md:h-[10px] lg:w-[20px] lg:h-[20px] rounded-full ${isActive ? "bg-[#fff]" : ""}`}/>
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
                  AED 389 <span className="text-[14px] md:text-[16px]">(exc. VAT)</span>
                </p>
                <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <div className="flex flex-col gap-[10px] creatodisplayM text-[16px] lg:text-[18px] leading-[22px]">
                  <CollapsibleList
                    items={regularItems}
                    maxVisible={6}
                    listClassName="creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[18px] text-[#192735] list-disc pl-[20px] lg:pl-[25px]"
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
                  AED 489 <span className="text-[14px] md:text-[16px]">(exc. VAT)</span>
                </p>
                <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <div className="flex flex-col gap-[10px] creatodisplayM text-[16px] lg:text-[18px] leading-[22px]">
                  <CollapsibleList
                    items={comprehensiveItems}
                    maxVisible={6}
                    listClassName="creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[18px] text-[#fff] list-disc pl-[20px] lg:pl-[25px]"
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
                  AED 599 <span className="text-[14px] md:text-[16px]">(exc. VAT)</span>
                </p>
                <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <div className="flex flex-col gap-[10px] creatodisplayM text-[16px] lg:text-[18px] leading-[22px]">
                  <CollapsibleList
                    items={ultraItems}
                    maxVisible={6}
                    listClassName="creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[18px] text-[#192735] list-disc pl-[20px] lg:pl-[25px]"
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
          {((activeStep === 2 || activeStep === 3) && packageId>0) && (
            <div
              className=" mx-auto w-[96%] bg-white border-[1px] border-[#19273533] rounded-[10px] md:rounded-[15px] lg:rounded-[25px] p-[15px] md:p-[30px] lg:p-[50px]"
              ref={detailsRef}
              id="enter-details-booking"
            >
              <h2 className="ppfont text-[#192735] text-[18px] md:text-[22px] lg:text-[24px] xl:text-[28px] pb-[15px] border-b-[1px] border-b-[#0000001a] mb-[20px] md:mb-[30px] lg:mb-[30px]">Enter your details</h2>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-[20px] inspectionForm" onSubmit={handleSubmit}>
                <input type="hidden" id="packageId" name="package_name" value={packageId} />

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.full_name}
                    onChange={(e) => setData('full_name', e.target.value)}
                  />
                  {errors.full_name && <div className="text-red-500 text-[12px]">{errors.full_name}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                  />
                  {errors.email && <div className="text-red-500 text-[12px]">{errors.email}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Phone (With Country Code)</label>
                  <input
                    type="tel"
                    placeholder="+971 987654321"
                    name="contact_no"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.contact_no}
                    onChange={(e) => setData('contact_no', e.target.value)}
                  />
                  {errors.contact_no && <div className="text-red-500 text-[12px]">{errors.contact_no}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Address Line 1</label>
                  <input
                    type="text"
                    placeholder="Address Line 1"
                    name="address_line_1"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.address_line_1}
                    onChange={(e) => setData('address_line_1', e.target.value)}
                  />
                  {errors.address_line_1 && <div className="text-red-500 text-[12px]">{errors.address_line_1}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Address Line 2</label>
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    name="address_line_2"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.address_line_2}
                    onChange={(e) => setData('address_line_2', e.target.value)}
                  />
                  {errors.address_line_2 && <div className="text-red-500 text-[12px]">{errors.address_line_2}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Pin Code</label>
                  <input
                    type="text"
                    placeholder="Pin Code"
                    name="pin_code"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.pin_code}
                    onChange={(e) => setData('pin_code', e.target.value)}
                  />
                  {errors.pin_code && <div className="text-red-500 text-[12px]">{errors.pin_code}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>City</label>
                  <select
                    required
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                    name="city"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
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

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Vehicle Make</label>
                  <select
                    required
                    value={data.vehicle_make}
                    onChange={(e) => setData("vehicle_make", e.target.value)}
                    name="vehicle_make"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  >
                    <option value="" disabled hidden>-- Select Vehicle Make --</option>
                    <option value="Acura">Acura</option>
                    <option value="Alfa Romeo">Alfa Romeo</option>
                    <option value="Aston Martin">Aston Martin</option>
                    <option value="Audi">Audi</option>
                    <option value="Bentley">Bentley</option>
                    <option value="BMW">BMW</option>
                    <option value="Bugatti">Bugatti</option>
                    <option value="Buick">Buick</option>
                    <option value="Cadillac">Cadillac</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Chrysler">Chrysler</option>
                    <option value="Citroën">Citroën</option>
                    <option value="Dacia">Dacia</option>
                    <option value="Daewoo">Daewoo</option>
                    <option value="Daihatsu">Daihatsu</option>
                    <option value="Dodge">Dodge</option>
                    <option value="Ferrari">Ferrari</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Ford">Ford</option>
                    <option value="Geely">Geely</option>
                    <option value="Genesis">Genesis</option>
                    <option value="GMC">GMC</option>
                    <option value="Honda">Honda</option>
                    <option value="Hummer">Hummer</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Infiniti">Infiniti</option>
                    <option value="Isuzu">Isuzu</option>
                    <option value="Jaguar">Jaguar</option>
                    <option value="Jeep">Jeep</option>
                    <option value="Kia">Kia</option>
                    <option value="Koenigsegg">Koenigsegg</option>
                    <option value="Lamborghini">Lamborghini</option>
                    <option value="Lancia">Lancia</option>
                    <option value="Land Rover">Land Rover</option>
                    <option value="Lexus">Lexus</option>
                    <option value="Lincoln">Lincoln</option>
                    <option value="Lotus">Lotus</option>
                    <option value="Mahindra">Mahindra</option>
                    <option value="Maruti Suzuki">Maruti Suzuki</option>
                    <option value="Maserati">Maserati</option>
                    <option value="Maybach">Maybach</option>
                    <option value="Mazda">Mazda</option>
                    <option value="McLaren">McLaren</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="MG">MG</option>
                    <option value="Mini">Mini</option>
                    <option value="Mitsubishi">Mitsubishi</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Opel">Opel</option>
                    <option value="Pagani">Pagani</option>
                    <option value="Peugeot">Peugeot</option>
                    <option value="Plymouth">Plymouth</option>
                    <option value="Pontiac">Pontiac</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Proton">Proton</option>
                    <option value="Ram">Ram</option>
                    <option value="Renault">Renault</option>
                    <option value="Rolls-Royce">Rolls-Royce</option>
                    <option value="Rover">Rover</option>
                    <option value="Saab">Saab</option>
                    <option value="Saturn">Saturn</option>
                    <option value="Scion">Scion</option>
                    <option value="SEAT">SEAT</option>
                    <option value="Škoda">Škoda</option>
                    <option value="Smart">Smart</option>
                    <option value="SsangYong">SsangYong</option>
                    <option value="Subaru">Subaru</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Tata">Tata</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Vauxhall">Vauxhall</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Volvo">Volvo</option>
                  </select>
                  {errors.vehicle_make && <div className="text-red-500 text-[12px]">{errors.vehicle_make}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Vehicle Model</label>
                  <input
                    type="text"
                    placeholder="Vehicle Model"
                    name="vehicle_model"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.vehicle_model}
                    onChange={(e) => setData('vehicle_model', e.target.value)}
                  />
                  {errors.vehicle_model && <div className="text-red-500 text-[12px]">{errors.vehicle_model}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Vehicle Year</label>
                  <input
                    type="text"
                    placeholder="Vehicle Year"
                    name="vehicle_year"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.vehicle_year}
                    onChange={(e) => setData('vehicle_year', e.target.value)}
                  />
                  {errors.vehicle_year && <div className="text-red-500 text-[12px]">{errors.vehicle_year}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Fuel Type</label>
                  <select
                    required
                    value={data.fuel_type}
                    onChange={(e) => setData("fuel_type", e.target.value)}
                    name="fuel_type"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
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
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Transmission</label>
                  <select
                    required
                    value={data.transmission}
                    onChange={(e) => setData("transmission", e.target.value)}
                    name="transmission"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  >
                    <option value="" disabled hidden>-- Select Transmission --</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                  {errors.transmission && <div className="text-red-500 text-[12px]">{errors.transmission}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Car Parked</label>
                  <select
                    required
                    value={data.car_parked}
                    onChange={(e) => setData("car_parked", e.target.value)}
                    name="car_parked"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
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
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Mileage</label>
                  <input
                    type="text"
                    name="mileage"
                    placeholder="Mileage"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.mileage}
                    onChange={(e) => setData('mileage', e.target.value)}
                  />
                  {errors.mileage && <div className="text-red-500 text-[12px]">{errors.mileage}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Inspection Date</label>
                  <input
                    required
                    type="date"
                    name="preferred_date"
                    placeholder="Preferred Date"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.preferred_date}
                    onChange={(e) => setData('preferred_date', e.target.value)}
                  />
                  {errors.preferred_date && <div className="text-red-500 text-[12px]">{errors.preferred_date}</div>}
                </div>

                <div>
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Inspection Time Slot</label>
                  <input
                    required
                    type="time"
                    name="preferred_time_slot"
                    placeholder="Preferred Time Slot"
                    className="border border-[#192735] rounded-full px-[20px] py-[12px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                    value={data.preferred_time_slot}
                    onChange={(e) => setData('preferred_time_slot', e.target.value)}
                  />
                  {errors.preferred_time_slot && <div className="text-red-500 text-[12px]">{errors.preferred_time_slot}</div>}
                </div>

                <div className="md:col-span-2">
                  <label className='flex creatodisplayM text-[16px] md:text-[18px] text-[#192735bd] ps-[20px] md:ps-[25px] pb-[5px]'>Additional Notes</label>
                  <textarea
                    onChange={(e) => setData('additional_notes', e.target.value)}
                    name="additional_notes"
                    placeholder="Additional Notes"
                    value={data.additional_notes}
                    className="h-[58px] md:h-[55px] lg:h-[67px] border border-[#192735] rounded-[60px] px-[25px] py-[15px] lg:px-[30px] lg:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none"
                  />
                  {errors.additional_notes && <div className="text-red-500 text-[12px]">{errors.additional_notes}</div>}
                </div>

                <div className="col-span-1 md:col-span-2 flex">
                  <button
                    type="submit"
                    disabled={processing}
                    className="redbtn cursor-pointer min-w-[245px] px-[10px] py-[10px] md:py-[20px] rounded-full text-white creatodisplayM text-[15px] md:text-[20px] transition disabled:opacity-60"
                  >
                    {processing ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

BookInspection.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default BookInspection
