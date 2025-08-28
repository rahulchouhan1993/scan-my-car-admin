import React, { useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { usePage } from '@inertiajs/react';
import redarrowRg from "../../assets/images/redarrowRg.png";
import inspectionslider01 from "../../assets/images/inspectionslider01.jpg";
import inspectiondetailbg from "../../assets/images/inspectiondetailbg.jpg";
import CustomerLayout from '../../layout/CustomerLayout'
const InspectionDetails = () => {
  const { props } = usePage();
  const items = [
    { color: "bg-white border border-gray-400", label: "Original Paint" },
    { color: "bg-yellow-400", label: "Portion Repaint" },
    { color: "bg-red-600", label: "Total Repainted" },
    { color: "bg-gray-400", label: "Multi Dents" },
    { color: "bg-green-500", label: "Multi Scratches" },
    { color: "bg-blue-600", label: "Panel Replaced" },
    { color: "bg-orange-500", label: "Damaged" },
    { color: "bg-cyan-400", label: "Faded" },
    { color: "bg-sky-200", label: "Not Available" },
    { color: "bg-red-500", label: "Repainted" },
    { color: "bg-black", label: "Foiled" },
  ];
  
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);
  const accordionData = [
    {
      title: "Body Details",
      items: [
        { label: "Front bumper fit & alignment", value: props.inspectionsDetail.body_detail.front_bumper==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.front_bumper==1 ? '#ff0200' : '#00973F' },
        { label: "Rear bumper fit & alignment", value: props.inspectionsDetail.body_detail.rear_bumper==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.rear_bumper==1 ? '#ff0200' : '#00973F' },
        { label: "Bonnet fit & latch", value: props.inspectionsDetail.body_detail.bonnet==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.bonnet==1 ? '#ff0200' : '#00973F' },
        { label: "Boot lid fit & latch", value: props.inspectionsDetail.body_detail.boot_lid==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.boot_lid==1 ? '#ff0200' : '#00973F' },
        { label: "Left front wing fit", value: props.inspectionsDetail.body_detail.left_front_wing==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.left_front_wing==1 ? '#ff0200' : '#00973F' },
        { label: "Right front wing fit", value: props.inspectionsDetail.body_detail.right_front_wing==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.right_front_wing==1 ? '#ff0200' : '#00973F' },
        { label: "Left front door fit", value: props.inspectionsDetail.body_detail.left_front_door_fit==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.left_front_door_fit==1 ? '#ff0200' : '#00973F' },
        { label: "Right front door fit", value: props.inspectionsDetail.body_detail.right_front_door_fit==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.right_front_door_fit==1 ? '#ff0200' : '#00973F' },
        { label: "Left rear door fit", value: props.inspectionsDetail.body_detail.left_rear_door_fit==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.left_rear_door_fit==1 ? '#ff0200' : '#00973F' },
        { label: "Right rear door fit", value: props.inspectionsDetail.body_detail.right_rear_door_fit==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.right_rear_door_fit==1 ? '#ff0200' : '#00973F' },
        { label: "Left rear quarter panel fit", value: props.inspectionsDetail.body_detail.left_rear_quarter_panel_fit==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.left_rear_quarter_panel_fit==1 ? '#ff0200' : '#00973F' },
        { label: "Right rear quarter panel fit", value: props.inspectionsDetail.body_detail.right_rear_quarter_panel_fit==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.right_rear_quarter_panel_fit==1 ? '#ff0200' : '#00973F' },
        { label: "Roof panel alignment", value: props.inspectionsDetail.body_detail.roof_panel_alignment==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.roof_panel_alignment==1 ? '#ff0200' : '#00973F' },
        { label: "Fender mounting & condition", value: props.inspectionsDetail.body_detail.fender_mounting_condition==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.fender_mounting_condition==1 ? '#ff0200' : '#00973F' },
        { label: "Panel gap uniformity", value: props.inspectionsDetail.body_detail.panel_gap_uniformity==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.panel_gap_uniformity==1 ? '#ff0200' : '#00973F' },
        { label: "External trim condition", value: props.inspectionsDetail.body_detail.external_trim_condition==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.external_trim_condition==1 ? '#ff0200' : '#00973F' },
        { label: "Molding & clips present", value: props.inspectionsDetail.body_detail.molding_clips_present==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.molding_clips_present==1 ? '#ff0200' : '#00973F' },
        { label: "Door seals fitment", value: props.inspectionsDetail.body_detail.door_seals_fitment==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.door_seals_fitment==1 ? '#ff0200' : '#00973F' },
        { label: "Boot seal fitment", value: props.inspectionsDetail.body_detail.boot_seal_fitment==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.boot_seal_fitment==1 ? '#ff0200' : '#00973F' },
        { label: "Fuel filler door operation", value: props.inspectionsDetail.body_detail.fuel_filler_door_operation==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.fuel_filler_door_operation==1 ? '#ff0200' : '#00973F' },
        { label: "Body fasteners intact", value: props.inspectionsDetail.body_detail.body_fasteners_intact==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.body_fasteners_intact==1 ? '#ff0200' : '#00973F' },
        { label: "Tow eye/point present & secure", value: props.inspectionsDetail.body_detail.tow_eye_point_secure==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.tow_eye_point_secure==1 ? '#ff0200' : '#00973F' },
        { label: "Bumper reinforcement visible", value: props.inspectionsDetail.body_detail.bumper_reinforcement_visible==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.bumper_reinforcement_visible==1 ? '#ff0200' : '#00973F' },
        { label: "Undercarriage guards", value: props.inspectionsDetail.body_detail.undercarriage_guards==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.undercarriage_guards==1 ? '#ff0200' : '#00973F' },
        { label: "Panel repair signs", value: props.inspectionsDetail.body_detail.panel_repair_signs==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.panel_repair_signs==1 ? '#ff0200' : '#00973F' },
        { label: "Exterior accessory fitment", value: props.inspectionsDetail.body_detail.exterior_accessory_fitment==1 ? 'Need Repair' : 'Good Condition', color: props.inspectionsDetail.body_detail.exterior_accessory_fitment==1 ? '#ff0200' : '#00973F' },
      ],
    },
    {
      title: "Glass & Mirrors",
      items: [
        {  
          label: "Windshield Condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Windshield Wiper Function", 
          value: props?.inspectionsDetail?.glass_details?.windshield_wiper_function
        },
        {  
          label: "Wiper Blade Wear", 
          value: props?.inspectionsDetail?.glass_details?.wiper_blade_wear
        },
        {  
          label: "Rear Wiper Function", 
          value: props?.inspectionsDetail?.glass_details?.rear_wiper_function
        },
        {  
          label: "Side Window Operation (LF)", 
          value: props?.inspectionsDetail?.glass_details?.side_window_operation_lf
        },
        {  
          label: "Side Window Operation (RF)", 
          value: props?.inspectionsDetail?.glass_details?.side_window_operation_rf
        },
        {  
          label: "Side Window Operation (LR)", 
          value: props?.inspectionsDetail?.glass_details?.side_window_operation_lr
        },
        {  
          label: "Side Window Operation (RR)", 
          value: props?.inspectionsDetail?.glass_details?.side_window_operation_rr
        },
        {  
          label: "Rear Window Condition", 
          value: props?.inspectionsDetail?.glass_details?.rear_window_condition
        },
        {  
          label: "Sunroof Operation", 
          value: props?.inspectionsDetail?.glass_details?.sunroof_operation
        },
        {  
          label: "Sunroof Drainage Check", 
          value: props?.inspectionsDetail?.glass_details?.sunroof_drainage_check
        },
        {  
          label: "Sunroof Glass Condition", 
          value: props?.inspectionsDetail?.glass_details?.sunroof_glass_condition
        },
        {  
          label: "Left External Mirror Function", 
          value: props?.inspectionsDetail?.glass_details?.left_external_mirror_function
        },
        {  
          label: "Right External Mirror Function", 
          value: props?.inspectionsDetail?.glass_details?.right_external_mirror_function
        },
        {  
          label: "Mirror Adjustment Motors", 
          value: props?.inspectionsDetail?.glass_details?.mirror_adjustment_motors
        },
        {  
          label: "Comments", 
          value: props?.inspectionsDetail?.glass_details?.comments
        },
      ],
    },
    {
      title: "Engine Bay",
      items: [
        {  
          label: "Engine start behavior (cold)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Engine start behavior (warm)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Idle stability", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Throttle response", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Abnormal engine noises (tick/knock)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Engine oil level check", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Engine oil appearance", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Visible oil leaks around head/covers", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Oil filter housing condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Coolant level check", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Coolant color & contamination", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Coolant leaks visible (hoses/rad)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Signs of coolant in oil (milky)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Hose condition & clamps", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Drive belt tension & wear", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Timing belt/chain visible condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Turbocharger boost check", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Air intake ducting condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Air filter element", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Starter motor cranking quality", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Fuse box access", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
      ],
    },
    {
      title: "Cluster & Lamps",
      items: [
        {  
          label: "Engine light", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "ABS light", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Oil pressure light", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Battery/charging system light", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Coolant temperature warning light", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Brake system warning light", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Airbag warning light", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Seatbelt reminder light", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Traction control light", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tyre Pressure Monitoring System (TPMS)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        }
      ],
    },
    {
      title: "Transmission & Drivetrain",
      items: [
        {  
          label: "Transmission fluid level (auto)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Manual gearbox oil check (if access)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Transmission mount integrity", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Clutch bite & slippage (manual)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Automatic shift quality & hesitation", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Transfer case engagement (4x4)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Drive shaft visual inspection", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "CV joint boot integrity (all shafts)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "U-joints or coupling check", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Differential oil condition (front/rear)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Differential housing leaks", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Gearbox unusual noise under load", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        }
      ],
    },
    {
      title: "Suspension & Steering",
      items: [
        {  
          label: "Front strut mount condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Rear strut mount condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Front shock absorber function", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Rear shock absorber function", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Front spring integrity", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Rear spring integrity", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Control arm bush condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Lower ball joint play", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Upper ball joint play", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Anti-roll bar links & bushes", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Steering rack seal condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Steering rack play check", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Rack end condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tie rod end play", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Steering column noises", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Power steering fluid level & color", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Power steering pump noise", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Subframe mount condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Chassis mounts security", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Steering wheel free play", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        }
      ],
    },
    {
      title: "Brakes",
      items: [
        {  
          label: "Master cylinder seal condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Brake booster operation", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Front disc condition & runout", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Rear disc/drum condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Front pad", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Rear pad", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Handbrake adjustment & holding", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "ABS function / wheel speed check", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Brake pedal travel & firmness", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Brake fluid contamination test note", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
      ],
    },
    {
      title: "Tyres",
      items: [
        {  
          label: "Tyre brand & size (LF)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tyre brand & size (RF)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tyre brand & size (LR)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tyre brand & size (RR)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tyre manufacture date (LF)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tyre manufacture date (RF)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tyre manufacture date (LR)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tyre manufacture date (RR)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tread depth (LF)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tread depth (RF)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tread depth (LR)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tread depth (RR)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Tyre pressure (LF/RF/LR/RR)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Spare wheel presence & condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
      ],
    },
    {
      title: "Interior General",
      items: [
        {  
          label: "Dashboard fit & finish", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Instrument cluster illumination", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Odometer function", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Interior lighting (dome/map)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Glove box latching", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Carpet wear & retention", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Interior contamination/odour check", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Trunk/boot interior condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        }
      ],
    },
    {
      title: "Seats & Restraints",
      items: [
        {  
          label: "Driver seat adjust & locks", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Passenger seat adjust & locks", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Seat sliding rails lubrication & function", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Seat Type", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Seat cushion wear", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Seat upholstery integrity (front/rear)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        }
      ],
    },
    {
      title: "HVAC & Infotainment",
      items: [
        {  
          label: "Air Condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Infotainment Problems", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Radio Condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
      ],
    },
    {
      title: "Cooling & Fuel System",
      items: [
        {  
          label: "Radiator core condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Radiator fan operation (low/high speed)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Cycling observation", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Overflow/expansion tank condition", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Heater core performance (cab heat)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Fuel tank inspection (visual)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
      ],
    },
    {
      title: "Electrical Systems & Lighting",
      items: [
        {  
          label: "Starter engagement reliability", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Front indicators function", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Rear indicators function", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Reverse light function", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Fog lights front/rear", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Interior control switches backlight", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Parking sensor functionality", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
      ],
    },
    {
      title: "Road Test & Performance",
      items: [
        {  
          label: "Start Performance", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Acceleration Responsiveness", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Cruise Control Engagement Test", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Gearbox Performance", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Engine vibration at idle", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Mid-range power delivery", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Highway stability", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Steering feedback & centering", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "ABS intervention feel", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Braking performance under test", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Transmission harshness under load", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Clutch engagement smoothness (manual)", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
        {  
          label: "Noise levels at various speeds", 
          value: props?.inspectionsDetail?.glass_details?.windshield_condition
        },
      ],
    },
  ];

  const specs = [
    { label: "Brand", value: props.inspectionsDetail.vehicle_make },
    { label: "Model", value: props.inspectionsDetail.vehicle_model },
    { label: "Year", value: props.inspectionsDetail.vehicle_year },
    { label: "Fuel Type", value: props.inspectionsDetail.fuel_type },
    { label: "Transmission", value: props.inspectionsDetail.transmission },
    { label: "Mileage", value: props.inspectionsDetail.mileage },
    { label: "Engine Capacity", value: props.inspectionsDetail.vehicle_detail.engine_capacity },
    { label: "Engine Cylinders", value: props.inspectionsDetail.vehicle_detail.engine_cylinders },
    { label: "Drive Type", value: props.inspectionsDetail.vehicle_detail.drive_type },
    { label: "Body Type", value: props.inspectionsDetail.vehicle_detail.body_type },
    { label: "Exterior Color", value: props.inspectionsDetail.vehicle_detail.exterior_color },
    { label: "Interior Color", value: props.inspectionsDetail.vehicle_detail.interior_color },
    { label: "Number Of Keys", value: props.inspectionsDetail.vehicle_detail.number_keys },
    { label: "Service History", value: props.inspectionsDetail.vehicle_detail.service_history },
    { label: "Last Service", value: props.inspectionsDetail.vehicle_detail.last_service_date },
    { label: "Registration", value: props.inspectionsDetail.vehicle_detail.registration_emirate },
    { label: "Warrenty Status", value: props.inspectionsDetail.vehicle_detail.warranty_status },
    { label: "Plate Type", value: props.inspectionsDetail.vehicle_detail.plate_type },
    { label: "Registration Number", value: props.inspectionsDetail.vehicle_detail.registration_number },
  ];
  

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>

      <div className='relative overflow-hidden min-h-[335px] md:min-h-[435px] lg:min-h-[535px]'>
        <div className='flex items-center absolute right-[0] top-[20px] md:top-[90px] bottom-[inherit] md:bottom-[0] m-auto z-[1]'>
          <img src={redarrowRg} alt="img" className='block lg:hidden max-w-full max-h-[400px]' />
          <img src={redarrowRg} alt="img" className='hidden lg:block max-w-full' />
        </div>
        <img src={inspectiondetailbg} alt="Background" className=" absolute inset-0 w-full h-full  object-cover" />

        {/* Heading */}
        <div className="relative container z-[1] mb-12 !pt-[160px] md:!pt-[250px] ">
          <h2 className="ppfont text-[30px] md:text-[60px] lg:text-[70px] leading-tight  text-white">Inspection Report</h2>
          <p className="creatodisplayM text-[18px] md:text-[22px] lg:text-[24px] text-white">Follow few simple steps to book an inspection </p>
        </div>
      </div>

      <div className="py-[30px] md:py-[40px] lg:py-[55px] xl:py-[65px] ">
        <div className="container ">
        
         

          {/* Responsive Grid */}
          <div className="flex flex-wrap md:flex-nowrap gap-6">
             {/* Accordion */} 
             <div className="w-full md:w-[40%] order-1 md:order-2">
              {accordionData.map((section, index) => (
                <div
                  key={index}
                  className="bg-[#EDEEEF] rounded-[10px] md:rounded-[15px] lg:rounded-[20px] mb-3 overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center px-[10px] py-[10px] md:px-[20px] md:py-[15px] text-[#192735] ppfont text-[16px] "
                  >
                    {section.title}
                    <span>
                      {openIndex === index ? (
                        // Up Arrow
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                      ) : (
                        // Down Arrow
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  {/* Smooth Transition */}
                  <div
                    ref={(el) => (contentRefs.current[index] = el)}
                    style={{
                      maxHeight:
                        openIndex === index
                          ? `${contentRefs.current[index]?.scrollHeight}px`
                          : "0px",
                    }}
                    className="transition-all duration-300 ease-in-out overflow-hidden"
                  >
                    <div className="border-t border-[#dedede] px-[25px] py-[10px]">
                      {section.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between py-[6px]"
                        >
                          <span className="creatodisplayM text-[14px]   text-[#192735c7]">{item.label}</span>
                          <span className="creatodisplayM  text-[12px]  " style={{ color: item.color }}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Swiper Slider */}
            <div className="w-full md:w-[60%] order-2 md:order-1">
            <div className="mb-4 mb-[20px] md:mb-[30px] lg:mb-[50px]">
            <p className="creatodisplayM text-[16px] md:text-[18px] text-[#D72638]">
              #{props.inspectionsDetail.request_no} | {props.inspectionsDetail.completed_date}
            </p>
            <h1 className="ppfont text-[20px] md:text-[24px] lg:text-[28px] text-[#192735]">
              {props.inspectionsDetail.vehicle_make} {props.inspectionsDetail.vehicle_model} 
            </h1>
            {/* <p className="creatodisplayM text-[#192735c9] text-[16px] md:text-[18px] lg:text-[20px]">
              The battery needs to be replaced. The tires need to be replaced ASAP.
              2019
            </p> */}
          </div>
              <div className="w-full">
                <Swiper
                  modules={[Navigation]}
                  navigation
                  loop
                  className="rounded-xl overflow-hidden inspectionSlider"
                >
                  <SwiperSlide>
                    <img src={inspectionslider01} alt="Car 1" className="w-full h-auto object-cover" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={inspectionslider01} alt="Car 1" className="w-full h-auto object-cover" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={inspectionslider01} alt="Car 1" className="w-full h-auto object-cover" />
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* Specs / Tags */}
              <div className="flex flex-wrap gap-[10px] md:gap-2 mt-6">
                {specs.map((spec, i) => (
                  <div key={i} className="flex flex-col gap-[2px] bg-white border border-[#19273521] rounded-[5px] md:rounded-[15px] px-[5px] py-[5px] md:px-[15px] md:py-[15px]">
                    <span className="creatodisplayM md:text-[13px] lg:text-[15px] text-[16px] text-[#192735b5]">
                      {spec.label}:
                    </span>{" "}
                    <span className="ppfont text-[13px] md:text-[18px] lg:text-[22px] leading-[22px] text-[#192735]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className=" mt-[25px] md:mt-[50px]">
                <h2 className="creatodisplayM text-[16px] text-[#192735b0] uppercase ">Body inspection</h2>
                <div className="carbx flex flex-col items-center justify-center px-[15px] py-[15px] md:px-[30px] md:py-[30px] border-[1px] border-[#e5e5e5] mt-[10px] md:mt-[20px]  rounded-[15px]">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.inspectionsDetail.vehicle_detail.svg_image,
                    }}
                  />
                  <div className="flex flex-wrap gap-4 mt-[60px] border-t-[1px] border-t-[#f0f0f0] pt-[30px]">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 min-w-[150px]">
                      <span
                        className={`inline-block w-4 h-4 rounded-full ${item.color}`}
                      ></span>
                      <span className="creatodisplayM text-[#192735ba] text-[18px]">{item.label}</span>
                    </div>
                  ))}
                </div>
                 </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </>
  )
}

InspectionDetails.layout = (page) => <CustomerLayout>{page}</CustomerLayout>
export default InspectionDetails
