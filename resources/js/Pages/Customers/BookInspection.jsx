import React, { useState } from "react";
import { Link } from '@inertiajs/react';
import CustomerLayout from '../../layout/CustomerLayout'
import redarrowRg from "../../assets/images/redarrowRg.png";
import bookinspectionbg from "../../assets/images/bookinspectionbg.jpg";
import { route } from 'ziggy-js'
import { useForm, usePage } from '@inertiajs/react'

const BookInspection = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [packageId, setpackage] = useState(1);
    const steps = ["Choose Package", "Enter Details"];
    
    const { props } = usePage()
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: props?.full_name || '',
        vehicle_make: props?.vehicle_make || '',
        vehicle_model: props?.vehicle_model || '',
        vehicle_year: props?.vehicle_year || '',
        registration_number: props?.registration_number || '',
        vin: props?.vin || '',
        fuel_type: props?.fuel_type || '',
        transmission: props?.transmission || '',
        color: props?.color || '',
        mileage: props?.mileage || '',
        preferred_date: props?.preferred_date || '',
        preferred_time_slot: props?.preferred_time_slot || '',
        additional_notes: props?.additional_notes || '',
        contact_no: props?.contact_no || '',
        email: props?.email || '',
        address_line_1: props?.address_line_1 || '',
        address_line_2: props?.address_line_2 || '',
        car_parked: props?.car_parked || ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('request-inspection'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
            }
        })
    }


    function handleContinue(packageid) {
        setpackage(packageid);
        setActiveStep(2)
    }

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
          <div className="w-full relative flex flex-wrap md:flex-nowrap bg-[#EDEEEF] p-[2px] md:p-[10px] rounded-[80px] gap-[5px] md:gap-4">
            <div className="absolute w-[90%] h-[2px] top-[26px] md:top-[41px] border-b-[2px] border-b-[#000]"></div>
            {steps.map((step, index) => {
              const isActive = activeStep === index + 1;
              return (
                <div
                  key={index}
                  onClick={() => setActiveStep(index + 1)}
                  className={`w-full md:w-[50%] ppfont flex z-[1] items-center justify-center gap-[5px] md:gap-2 px-[10px] py-[10px] md:px-[15px] md:py-[15px] rounded-full border-[2px]  cursor-pointer transition-all  md:text-[20px] text-[#192735] ${isActive
                      ? "bg-[#192735] text-white border-black"
                      : "bg-[#EDEEEF] text-black border-[#192735]"
                    }`}
                >
                  {/* Dot */}
                  <span
                    className={`relative w-[18px] h-[18px] lg:w-[28px] lg:h-[28px] rounded-full border ${isActive ? " border-white" : " border-black"
                      }`}
                  >

                    <span
                      className={`absolute top-[3px] left-[3px] w-[10px] h-[10px] md:w-[10px] md:h-[10px] lg:w-[20px] lg:h-[20px] rounded-full ${isActive ? "bg-[#fff] " : ""
                        }`}>

                    </span>


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
            {/* Standard Plan */}
            <div className="bg-[#EDEEEF] rounded-[10px] lg:rounded-[25px] flex flex-col gap-[0 0] justify-start">
              <div className="p-[10px] md:p-[15px] lg:p-[35px] !pb-[5px] ">
                <h3 className="creatodisplayM text-[16px] md:text-[18px] text-[#192735] uppercase">
                  STANDARD PLAN
                </h3>
                <p className="creatodisplayM text-[12px] lg:text-[14px]  text-[#192735]">
                  Best for used car buyers or sellers
                </p>
                </div>
                <p className="ppfont border-b-[1px] border-b-[#ccc] text-[15px] md:text-[20px] lg:text-[30px] xl:text-[40px] text-[#192735] px-[15px] md:px-[15px] lg:px-[35px] pb-[15px] ">
                  $199.99
                </p>
              <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <ul className="creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[18px] text-[#192735] list-disc pl-[20px]  lg:pl-[25px]">
                  <li>200+ point inspection</li>
                  <li>Pre-purchase/pre-sale diagnostic</li>
                  <li>Accident & paintwork history</li>
                  <li>OBD-II scanning & test drive analysis</li>
                  <li>Full visual report with color-coded findings</li>
                  <li>Certified technician visit at your location</li>
                </ul>
                <button  onClick={() => handleContinue("1")}  className="w-full cursor-pointer creatodisplayM mt-6 border border-[#192735] rounded-full px-[10px] py-[10px] md:px-[15px] md:py-[14px] text-[15px] md:text-[20px] text-[#192735] hover:bg-black hover:text-white transition">
                Continue
              </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-[#EDEEEF] rounded-[10px] lg:rounded-[25px] flex flex-col gap-[0 0] justify-start">
              <div className="p-[10px] md:p-[15px] lg:p-[35px] !pb-[5px] ">
                <h3 className="creatodisplayM text-[16px] md:text-[18px] text-[#192735] uppercase">
                PREMIUM Plan
                </h3>
                <p className="creatodisplayM text-[12px] lg:text-[14px]  text-[#192735]">
                  Best for used car buyers or sellers
                </p>
                </div>
                <p className="ppfont border-b-[1px] border-b-[#ccc] text-[15px] md:text-[20px] lg:text-[30px] xl:text-[40px] text-[#192735] px-[15px] md:px-[15px] lg:px-[35px] pb-[15px] ">
                  $199.99
                </p>
              <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <ul className="creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[18px] text-[#192735] list-disc pl-[20px]  lg:pl-[25px]">
                  <li>200+ point inspection</li>
                  <li>Pre-purchase/pre-sale diagnostic</li>
                  <li>Accident & paintwork history</li>
                  <li>OBD-II scanning & test drive analysis</li>
                  <li>Full visual report with color-coded findings</li>
                  <li>Certified technician visit at your location</li>
                </ul>
                <button onClick={() => handleContinue("2")} className="w-full cursor-pointer creatodisplayM mt-6 border border-[#192735] rounded-full px-[10px] py-[10px] md:px-[15px] md:py-[14px] text-[15px] md:text-[20px] text-[#192735] hover:bg-black hover:text-white transition">
                Continue
              </button>
              </div>
            </div>

            {/* Gold Plan */}
            <div className="bg-[#EDEEEF] rounded-[10px] lg:rounded-[25px] flex flex-col gap-[0 0] justify-start">
              <div className="p-[10px] md:p-[15px] lg:p-[35px] !pb-[5px] ">
                <h3 className="creatodisplayM text-[16px] md:text-[18px] text-[#192735] uppercase">
                GOLD Plan
                </h3>
                <p className="creatodisplayM text-[12px] lg:text-[14px]  text-[#192735]">
                  Best for used car buyers or sellers
                </p>
                </div>
                <p className="ppfont border-b-[1px] border-b-[#ccc] text-[15px] md:text-[20px] lg:text-[30px] xl:text-[40px] text-[#192735] px-[15px] md:px-[15px] lg:px-[35px] pb-[15px] ">
                  $199.99
                </p>
              <div className="p-[15px]  lg:p-[20px] xl:p-[30px]">
                <ul className="creatodisplayM flex flex-col gap-[10px] text-[14px] md:text-[16px] lg:text-[18px] text-[#192735] list-disc pl-[20px]  lg:pl-[25px]">
                  <li>200+ point inspection</li>
                  <li>Pre-purchase/pre-sale diagnostic</li>
                  <li>Accident & paintwork history</li>
                  <li>OBD-II scanning & test drive analysis</li>
                  <li>Full visual report with color-coded findings</li>
                  <li>Certified technician visit at your location</li>
                </ul>
                <button  onClick={() => handleContinue("3")}  className="w-full cursor-pointer creatodisplayM mt-6 border border-[#192735] rounded-full px-[10px] py-[10px] md:px-[15px] md:py-[14px] text-[15px] md:text-[20px] text-[#192735] hover:bg-black hover:text-white transition">
                Continue
              </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 & 3: Contact Form */}
        {(activeStep === 2 || activeStep === 3) && (
          <div className=" mx-auto w-[96%] bg-white border-[1px] border-[#19273533] rounded-[10px] md:rounded-[15px] lg:rounded-[25px] p-[15px] md:p-[30px] lg:p-[50px]">
            {/* Title */}
            <h2 className="ppfont text-[#192735] text-[18px] md:text-[22px] lg:text-[24px] xl:text-[28px] pb-[15px] border-b-[1px] border-b-[#0000001a] mb-[20px] md:mb-[30px] lg:mb-[30px]">Enter your details</h2>


            <form className="grid grid-cols-1 md:grid-cols-2 gap-[20px]" onSubmit={handleSubmit}>
            <input type="hidden" id="packageId" name="package_name" value={packageId} />
              {/* First Name */}
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.full_name}
                onChange={(e) => setData('full_name', e.target.value)}
              />
                {errors.full_name && <div className="text-red-500 text-sm">{errors.full_name}</div>}
              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              {/* Phone */}
              <input
                type="tel"
                placeholder="Phone"
                name="contact_no"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.contact_no}
                onChange={(e) => setData('contact_no', e.target.value)}
              />
                {errors.contact_no && <div className="text-red-500 text-sm">{errors.contact_no}</div>}
              <input
                type="text"
                placeholder="Address Line 1"
                name="address_line_1"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.address_line_1}
                onChange={(e) => setData('address_line_1', e.target.value)}
              />
                {errors.address_line_1 && <div className="text-red-500 text-sm">{errors.address_line_1}</div>}
              <input
                type="text"
                placeholder="Address Line 2"
                name="address_line_2"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.address_line_2}
                onChange={(e) => setData('address_line_2', e.target.value)}
              />
                {errors.address_line_2 && <div className="text-red-500 text-sm">{errors.address_line_2}</div>}
              {/* Car Model */}
              <select value={data.vehicle_make} onChange={(e) => setData("vehicle_make", e.target.value)} name="vehicle_make" className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full bg-white focus:outline-none noneocusnone-red-200">
                <option value="">-- Select Vehicle Make --</option>
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
                {errors.vehicle_make && <div className="text-red-500 text-sm">{errors.vehicle_make}</div>}
              <input
                type="text"
                placeholder="Vehicle Model"
                name="vehicle_model"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.vehicle_model}
                onChange={(e) => setData('vehicle_model', e.target.value)}
              />
                {errors.vehicle_model && <div className="text-red-500 text-sm">{errors.vehicle_model}</div>}
              {/* Year */}
             <input
                type="text"
                placeholder="Vehicle Year"
                name="vehicle_year"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.vehicle_year}
                onChange={(e) => setData('vehicle_year', e.target.value)}
              />
                {errors.vehicle_year && <div className="text-red-500 text-sm">{errors.vehicle_year}</div>}
               <input
                type="text"
                placeholder="Registration Number"
                name="registration_number"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.registration_number}
                onChange={(e) => setData('registration_number', e.target.value)}
              />
                {errors.registration_number && <div className="text-red-500 text-sm">{errors.registration_number}</div>}
               <input
                type="text"
                placeholder="VIN"
                name="vin"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.vin}
                onChange={(e) => setData('vin', e.target.value)}
              />
                {errors.vin && <div className="text-red-500 text-sm">{errors.vin}</div>}
                <select value={data.fuel_type} onChange={(e) => setData("fuel_type", e.target.value)}  name="fuel_type" className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full bg-white focus:outline-none noneocusnone-red-200">
                <option value="">-- Select Fuel Type --</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
                 {errors.fuel_type && <div className="text-red-500 text-sm">{errors.fuel_type}</div>}
               <select value={data.transmission} onChange={(e) => setData("transmission", e.target.value)} name="transmission" className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full bg-white focus:outline-none noneocusnone-red-200">
                <option value="">-- Select Transmission --</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
             {errors.transmission && <div className="text-red-500 text-sm">{errors.transmission}</div>}
              <input
                type="text"
                name="color"
                placeholder="Vehicle Color"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.color}
                onChange={(e) => setData('color', e.target.value)}
              />
                {errors.color && <div className="text-red-500 text-sm">{errors.color}</div>}
                <select value={data.car_parked} onChange={(e) => setData("car_parked", e.target.value)}  name="car_parked" className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full bg-white focus:outline-none noneocusnone-red-200">
                <option value="">-- Where is the car parked? --</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Showroom">Showroom</option>
                <option value="Home">Home</option>
                <option value="Parking basement">Parking basement</option>
              </select>
                 {errors.car_parked && <div className="text-red-500 text-sm">{errors.car_parked}</div>}
              <input
                type="text"
                name="mileage"
                placeholder="Mileage"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                 value={data.mileage}
                onChange={(e) => setData('mileage', e.target.value)}
              />
                {errors.mileage && <div className="text-red-500 text-sm">{errors.mileage}</div>}

            <input
                type="date"
                name="preferred_date"
                placeholder="Preferred Date"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                 value={data.preferred_date}
                onChange={(e) => setData('preferred_date', e.target.value)}
              />
                {errors.preferred_date && <div className="text-red-500 text-sm">{errors.preferred_date}</div>}
              <input
                type="time"
                name="preferred_time_slot"
                placeholder="Preferred Time Slot"
                className="border border-[#192735] rounded-full px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"
                value={data.preferred_time_slot}
                onChange={(e) => setData('preferred_time_slot', e.target.value)}
              />
                {errors.preferred_time_slot && <div className="text-red-500 text-sm">{errors.preferred_time_slot}</div>}

              <textarea name="additional_notes" placeholder="Additional Notes" className="border border-[#192735] rounded-[10px] px-[25px] py-[15px] md:px-[30px] md:py-[18px] creatodisplayM text-[#192735] text-[15px] md:text-[20px] w-full focus:outline-none focus:none focus:none"></textarea>

              {errors.additional_notes && <div className="text-red-500 text-sm">{errors.additional_notes}</div>}
              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex">
                <button
                  type="submit"
                  className="redbtn cursor-pointer min-w-[245px] px-[10px] py-[20px] rounded-full text-white   creatodisplayM text-[#192735] text-[15px] md:text-[20px] transition"
                >
                  Submit
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
