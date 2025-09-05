import React, { useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { usePage } from '@inertiajs/react';
import redarrowRg from "../../assets/images/redarrowRg.png";
import inspectiondetailbg from "../../assets/images/inspectiondetailbg.jpg";
import insepectimg1 from "../../assets/images/insepectimg01.jpg";
import CustomerLayout from '../../layout/CustomerLayout'
const InspectionDetails = () => {
  const { props } = usePage();
  const items = [
    { color: "bg-white border border-gray-400", label: "Original Paint" },
    { color: "bg-yellow-400", label: "Portion Repaint" },
    // { color: "bg-red-600", label: "Total Repainted" },
    // { color: "bg-gray-400", label: "Multi Dents" },
    { color: "bg-green-500", label: "Multi Scratches" },
    { color: "bg-blue-600", label: "Panel Replaced" },
    // { color: "bg-orange-500", label: "Damaged" },
    { color: "bg-cyan-400", label: "Faded" },
    { color: "bg-sky-200", label: "Not Available" },
    // { color: "bg-red-500", label: "Repainted" },
    { color: "bg-black", label: "Foiled" },
  ];
  
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);
  const accordionData = [
      {
      title: "Body Details",
      items: [
        { label: "Front bumper fit & alignment", key: "front_bumper" },
        { label: "Rear bumper fit & alignment", key: "rear_bumper" },
        { label: "Bonnet fit & latch", key: "bonnet" },
        { label: "Boot lid fit & latch", key: "boot_lid" },
        { label: "Left front wing fit", key: "left_front_wing" },
        { label: "Right front wing fit", key: "right_front_wing" },
        { label: "Left front door fit", key: "left_front_door_fit" },
        { label: "Right front door fit", key: "right_front_door_fit" },
        { label: "Left rear door fit", key: "left_rear_door_fit" },
        { label: "Right rear door fit", key: "right_rear_door_fit" },
        { label: "Left rear quarter panel fit", key: "left_rear_quarter_panel_fit" },
        { label: "Right rear quarter panel fit", key: "right_rear_quarter_panel_fit" },
        { label: "Roof panel alignment", key: "roof_panel_alignment" },
        { label: "Fender mounting & condition", key: "fender_mounting_condition" },
        { label: "Panel gap uniformity", key: "panel_gap_uniformity" },
        { label: "External trim condition", key: "external_trim_condition" },
        { label: "Molding & clips present", key: "molding_clips_present" },
        { label: "Door seals fitment", key: "door_seals_fitment" },
        { label: "Boot seal fitment", key: "boot_seal_fitment" },
        { label: "Fuel filler door operation", key: "fuel_filler_door_operation" },
        { label: "Body fasteners intact", key: "body_fasteners_intact" },
        { label: "Tow eye/point present & secure", key: "tow_eye_point_secure" },
        { label: "Bumper reinforcement visible", key: "bumper_reinforcement_visible" },
        { label: "Undercarriage guards", key: "undercarriage_guards" },
        { label: "Panel repair signs", key: "panel_repair_signs" },
        { label: "Exterior accessory fitment", key: "exterior_accessory_fitment" },
      ]
        // ✅ filter only where value == 1
        .filter(item => props.inspectionsDetail.body_detail[item.key] === 1)
        // ✅ map to final structure
        .map(item => ({
          label: item.label,
          value: "Need Repair",
          color: "#000"
        }))
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
          value: props?.inspectionsDetail?.engine_details?.engine_start_behavior_cold
        },
        {  
          label: "Engine start behavior (warm)", 
          value: props?.inspectionsDetail?.engine_details?.engine_start_behavior_warm
        },
        {  
          label: "Idle stability", 
          value: props?.inspectionsDetail?.engine_details?.idle_stability
        },
        {  
          label: "Throttle response", 
          value: props?.inspectionsDetail?.engine_details?.throttle_response
        },
        {  
          label: "Abnormal engine noises (tick/knock)", 
          value: props?.inspectionsDetail?.engine_details?.abnormal_engine_noises
        },
        {  
          label: "Engine oil level check", 
          value: props?.inspectionsDetail?.engine_details?.engine_oil_level_check
        },
        {  
          label: "Engine oil appearance", 
          value: props?.inspectionsDetail?.engine_details?.engine_oil_appearance
        },
        {  
          label: "Visible oil leaks around head/covers", 
          value: props?.inspectionsDetail?.engine_details?.visible_oil_leaks
        },
        {  
          label: "Oil filter housing condition", 
          value: props?.inspectionsDetail?.engine_details?.oil_filter_housing_condition
        },
        {  
          label: "Coolant level check", 
          value: props?.inspectionsDetail?.engine_details?.coolant_level_check
        },
        {  
          label: "Coolant color & contamination", 
          value: props?.inspectionsDetail?.engine_details?.coolant_color
        },
        {  
          label: "Coolant leaks visible (hoses/rad)", 
          value: props?.inspectionsDetail?.engine_details?.coolant_leaks
        },
        {  
          label: "Signs of coolant in oil (milky)", 
          value: props?.inspectionsDetail?.engine_details?.signs_of_coolant_in_oil
        },
        {  
          label: "Hose condition & clamps", 
          value: props?.inspectionsDetail?.engine_details?.hose_condition
        },
        {  
          label: "Drive belt tension & wear", 
          value: props?.inspectionsDetail?.engine_details?.drive_belt_condition
        },
        {  
          label: "Timing belt/chain visible condition", 
          value: props?.inspectionsDetail?.engine_details?.timing_belt_condition
        },
        {  
          label: "Turbocharger boost check", 
          value: props?.inspectionsDetail?.engine_details?.turbo_boost_check
        },
        {  
          label: "Air intake ducting condition", 
          value: props?.inspectionsDetail?.engine_details?.air_intake_condition
        },
        {  
          label: "Air filter element", 
          value: props?.inspectionsDetail?.engine_details?.air_filter_element
        },
        {  
          label: "Starter motor cranking quality", 
          value: props?.inspectionsDetail?.engine_details?.starter_motor_cranking
        },
        {  
          label: "Fuse box access", 
          value: props?.inspectionsDetail?.engine_details?.fuse_box_access
        },
      ],
    },
    {
      title: "Cluster & Lamps",
      items: [
        {  
          label: "Engine light", 
          value: props?.inspectionsDetail?.cluster_details?.engine_light
        },
        {  
          label: "ABS light", 
          value: props?.inspectionsDetail?.cluster_details?.abs_light
        },
        {  
          label: "Oil pressure light", 
          value: props?.inspectionsDetail?.cluster_details?.oil_pressure_light
        },
        {  
          label: "Battery/charging system light", 
          value: props?.inspectionsDetail?.cluster_details?.battery_charging_system_light
        },
        {  
          label: "Coolant temperature warning light", 
          value: props?.inspectionsDetail?.cluster_details?.coolant_temperature_warning_light
        },
        {  
          label: "Brake system warning light", 
          value: props?.inspectionsDetail?.cluster_details?.brake_system_warning_light
        },
        {  
          label: "Airbag warning light", 
          value: props?.inspectionsDetail?.cluster_details?.airbag_warning_light
        },
        {  
          label: "Seatbelt reminder light", 
          value: props?.inspectionsDetail?.cluster_details?.seatbelt_reminder_light
        },
        {  
          label: "Traction control light", 
          value: props?.inspectionsDetail?.cluster_details?.traction_control_light
        },
        {  
          label: "Tyre Pressure Monitoring System (TPMS)", 
          value: props?.inspectionsDetail?.cluster_details?.tpms
        }
      ],
    },
    {
      title: "Transmission & Drivetrain",
      items: [
        {  
          label: "Transmission fluid level (auto)", 
          value: props?.inspectionsDetail?.transmission_details?.transmission_fluid_level_auto
        },
        {  
          label: "Manual gearbox oil check (if access)", 
          value: props?.inspectionsDetail?.transmission_details?.manual_gearbox_oil_check
        },
        {  
          label: "Transmission mount integrity", 
          value: props?.inspectionsDetail?.transmission_details?.transmission_mount_integrity
        },
        {  
          label: "Clutch bite & slippage (manual)", 
          value: props?.inspectionsDetail?.transmission_details?.clutch_bite_slippage
        },
        {  
          label: "Automatic shift quality & hesitation", 
          value: props?.inspectionsDetail?.transmission_details?.automatic_shift_quality
        },
        {  
          label: "Transfer case engagement (4x4)", 
          value: props?.inspectionsDetail?.transmission_details?.transfer_case_engagement
        },
        {  
          label: "Drive shaft visual inspection", 
          value: props?.inspectionsDetail?.transmission_details?.drive_shaft_visual_inspection
        },
        {  
          label: "CV joint boot integrity (all shafts)", 
          value: props?.inspectionsDetail?.transmission_details?.cv_joint_boot_integrity
        },
        {  
          label: "U-joints or coupling check", 
          value: props?.inspectionsDetail?.transmission_details?.u_joints_coupling_check
        },
        {  
          label: "Differential oil condition (front/rear)", 
          value: props?.inspectionsDetail?.transmission_details?.differential_oil_condition
        },
        {  
          label: "Differential housing leaks", 
          value: props?.inspectionsDetail?.transmission_details?.differential_housing_leaks
        },
        {  
          label: "Gearbox unusual noise under load", 
          value: props?.inspectionsDetail?.transmission_details?.gearbox_unusual_noise
        }
      ],
    },
    {
      title: "Suspension & Steering",
      items: [
        {  
          label: "Front strut mount condition", 
          value: props?.inspectionsDetail?.suspension_details?.front_strut_mount_condition
        },
        {  
          label: "Rear strut mount condition", 
          value: props?.inspectionsDetail?.suspension_details?.rear_strut_mount_condition
        },
        {  
          label: "Front shock absorber function", 
          value: props?.inspectionsDetail?.suspension_details?.front_shock_absorber_function
        },
        {  
          label: "Rear shock absorber function", 
          value: props?.inspectionsDetail?.suspension_details?.rear_shock_absorber_function
        },
        {  
          label: "Front spring integrity", 
          value: props?.inspectionsDetail?.suspension_details?.front_spring_integrity
        },
        {  
          label: "Rear spring integrity", 
          value: props?.inspectionsDetail?.suspension_details?.rear_spring_integrity
        },
        {  
          label: "Control arm bush condition", 
          value: props?.inspectionsDetail?.suspension_details?.control_arm_bush_condition
        },
        {  
          label: "Lower ball joint play", 
          value: props?.inspectionsDetail?.suspension_details?.lower_ball_joint_play
        },
        {  
          label: "Upper ball joint play", 
          value: props?.inspectionsDetail?.suspension_details?.upper_ball_joint_play
        },
        {  
          label: "Anti-roll bar links & bushes", 
          value: props?.inspectionsDetail?.suspension_details?.anti_roll_bar_links_bushes
        },
        {  
          label: "Steering rack seal condition", 
          value: props?.inspectionsDetail?.suspension_details?.steering_rack_seal_condition
        },
        {  
          label: "Steering rack play check", 
          value: props?.inspectionsDetail?.suspension_details?.steering_rack_play_check
        },
        {  
          label: "Rack end condition", 
          value: props?.inspectionsDetail?.suspension_details?.rack_end_condition
        },
        {  
          label: "Tie rod end play", 
          value: props?.inspectionsDetail?.suspension_details?.tie_rod_end_play
        },
        {  
          label: "Steering column noises", 
          value: props?.inspectionsDetail?.suspension_details?.steering_column_noises
        },
        {  
          label: "Power steering fluid level & color", 
          value: props?.inspectionsDetail?.suspension_details?.power_steering_fluid_level_color
        },
        {  
          label: "Power steering pump noise", 
          value: props?.inspectionsDetail?.suspension_details?.power_steering_pump_noise
        },
        {  
          label: "Subframe mount condition", 
          value: props?.inspectionsDetail?.suspension_details?.subframe_mount_condition
        },
        {  
          label: "Chassis mounts security", 
          value: props?.inspectionsDetail?.suspension_details?.chassis_mounts_security
        },
        {  
          label: "Steering wheel free play", 
          value: props?.inspectionsDetail?.suspension_details?.steering_wheel_free_play
        }
      ],
    },
    {
      title: "Brakes",
      items: [
        {  
          label: "Master cylinder seal condition", 
          value: props?.inspectionsDetail?.brakes_details?.master_cylinder_seal_condition
        },
        {  
          label: "Brake booster operation", 
          value: props?.inspectionsDetail?.brakes_details?.brake_booster_operation
        },
        {  
          label: "Front disc condition & runout", 
          value: props?.inspectionsDetail?.brakes_details?.front_disc_condition_runout
        },
        {  
          label: "Rear disc/drum condition", 
          value: props?.inspectionsDetail?.brakes_details?.rear_disc_drum_condition
        },
        {  
          label: "Front pad", 
          value: props?.inspectionsDetail?.brakes_details?.front_pad
        },
        {  
          label: "Rear pad", 
          value: props?.inspectionsDetail?.brakes_details?.rear_pad
        },
        {  
          label: "Handbrake adjustment & holding", 
          value: props?.inspectionsDetail?.brakes_details?.handbrake_adjustment_holding
        },
        {  
          label: "ABS function / wheel speed check", 
          value: props?.inspectionsDetail?.brakes_details?.abs_function_wheel_speed_check
        },
        {  
          label: "Brake pedal travel & firmness", 
          value: props?.inspectionsDetail?.brakes_details?.brake_pedal_travel_firmness
        },
        {  
          label: "Brake fluid contamination test note", 
          value: props?.inspectionsDetail?.brakes_details?.brake_fluid_contamination_test_note
        },
      ],
    },
    {
      title: "Tyres",
      items: [
        {  
          label: "Tyre brand & size (LF)", 
          value: props?.inspectionsDetail?.tyres_details?.tyre_brand_size_lf
        },
        {  
          label: "Tyre brand & size (RF)", 
          value: props?.inspectionsDetail?.tyres_details?.tyre_brand_size_rf
        },
        {  
          label: "Tyre brand & size (LR)", 
          value: props?.inspectionsDetail?.tyres_details?.tyre_brand_size_lr
        },
        {  
          label: "Tyre brand & size (RR)", 
          value: props?.inspectionsDetail?.tyres_details?.tyre_brand_size_rr
        },
        {  
          label: "Tyre manufacture date (LF)", 
          value: props?.inspectionsDetail?.tyres_details?.tyre_manufacture_date_lf
        },
        {  
          label: "Tyre manufacture date (RF)", 
          value: props?.inspectionsDetail?.tyres_details?.tyre_manufacture_date_rf
        },
        {  
          label: "Tyre manufacture date (LR)", 
          value: props?.inspectionsDetail?.tyres_details?.tyre_manufacture_date_lr
        },
        {  
          label: "Tyre manufacture date (RR)", 
          value: props?.inspectionsDetail?.tyres_details?.tyre_manufacture_date_rr
        },
        {  
          label: "Tread depth (LF)", 
          value: props?.inspectionsDetail?.tyres_details?.tread_depth_lf
        },
        {  
          label: "Tread depth (RF)", 
          value: props?.inspectionsDetail?.tyres_details?.tread_depth_rf
        },
        {  
          label: "Tread depth (LR)", 
          value: props?.inspectionsDetail?.tyres_details?.tread_depth_lr
        },
        {  
          label: "Tread depth (RR)", 
          value: props?.inspectionsDetail?.tyres_details?.tread_depth_rr
        },
        {  
          label: "Tyre pressure (LF/RF/LR/RR)", 
          value: props?.inspectionsDetail?.tyres_details?.tyre_pressure
        },
        {  
          label: "Spare wheel presence & condition", 
          value: props?.inspectionsDetail?.tyres_details?.spare_wheel_condition
        },
      ],
    },
    {
      title: "Interior General",
      items: [
        {  
          label: "Dashboard fit & finish", 
          value: props?.inspectionsDetail?.interior_details?.dashboard_fit_finish
        },
        {  
          label: "Instrument cluster illumination", 
          value: props?.inspectionsDetail?.interior_details?.instrument_cluster_illumination
        },
        {  
          label: "Odometer function", 
          value: props?.inspectionsDetail?.interior_details?.odometer_function
        },
        {  
          label: "Interior lighting (dome/map)", 
          value: props?.inspectionsDetail?.interior_details?.interior_lighting
        },
        {  
          label: "Glove box latching", 
          value: props?.inspectionsDetail?.interior_details?.glove_box_latching
        },
        {  
          label: "Carpet wear & retention", 
          value: props?.inspectionsDetail?.interior_details?.carpet_wear_retention
        },
        {  
          label: "Interior contamination/odour check", 
          value: props?.inspectionsDetail?.interior_details?.interior_contamination_odour
        },
        {  
          label: "Trunk/boot interior condition", 
          value: props?.inspectionsDetail?.interior_details?.trunk_boot_interior_condition
        }
      ],
    },
    {
      title: "Seats & Restraints",
      items: [
        {  
          label: "Driver seat adjust & locks", 
          value: props?.inspectionsDetail?.seat_details?.driver_seat_adjust_locks
        },
        {  
          label: "Passenger seat adjust & locks", 
          value: props?.inspectionsDetail?.seat_details?.passenger_seat_adjust_locks
        },
        {  
          label: "Seat sliding rails lubrication & function", 
          value: props?.inspectionsDetail?.seat_details?.seat_sliding_rails
        },
        {  
          label: "Seat Type", 
          value: props?.inspectionsDetail?.seat_details?.seat_type
        },
        {  
          label: "Seat cushion wear", 
          value: props?.inspectionsDetail?.seat_details?.seat_cushion_wear
        },
        {  
          label: "Seat upholstery integrity (front/rear)", 
          value: props?.inspectionsDetail?.seat_details?.seat_upholstery_integrity
        }
      ],
    },
    {
      title: "HVAC & Infotainment",
      items: [
        {  
          label: "Air Condition", 
          value: props?.inspectionsDetail?.hvac_details?.air_condition
        },
        {  
          label: "Infotainment Problems", 
          value: props?.inspectionsDetail?.hvac_details?.infotainment_condition
        },
        {  
          label: "Radio Condition", 
          value: props?.inspectionsDetail?.hvac_details?.radio_condition
        },
      ],
    },
    {
      title: "Cooling & Fuel System",
      items: [
        {  
          label: "Radiator core condition", 
          value: props?.inspectionsDetail?.cooling_fuel_details?.radiator_core_condition
        },
        {  
          label: "Radiator fan operation (low/high speed)", 
          value: props?.inspectionsDetail?.cooling_fuel_details?.radiator_fan_operation
        },
        {  
          label: "Cycling observation", 
          value: props?.inspectionsDetail?.cooling_fuel_details?.cycling_observation
        },
        {  
          label: "Overflow/expansion tank condition", 
          value: props?.inspectionsDetail?.cooling_fuel_details?.overflow_expansion_tank_condition
        },
        {  
          label: "Heater core performance (cab heat)", 
          value: props?.inspectionsDetail?.cooling_fuel_details?.heater_core_performance
        },
        {  
          label: "Fuel tank inspection (visual)", 
          value: props?.inspectionsDetail?.cooling_fuel_details?.fuel_tank_inspection
        },
      ],
    },
    {
      title: "Electrical Systems & Lighting",
      items: [
        {  
          label: "Starter engagement reliability", 
          value: props?.inspectionsDetail?.electrical_lighting_details?.starter_engagement_reliability
        },
        {  
          label: "Front indicators function", 
          value: props?.inspectionsDetail?.electrical_lighting_details?.front_indicators_function
        },
        {  
          label: "Rear indicators function", 
          value: props?.inspectionsDetail?.electrical_lighting_details?.rear_indicators_function
        },
        {  
          label: "Reverse light function", 
          value: props?.inspectionsDetail?.electrical_lighting_details?.reverse_light_function
        },
        {  
          label: "Fog lights front/rear", 
          value: props?.inspectionsDetail?.electrical_lighting_details?.fog_lights_front_rear
        },
        {  
          label: "Interior control switches backlight", 
          value: props?.inspectionsDetail?.electrical_lighting_details?.interior_control_switches_backlight
        },
        {  
          label: "Parking sensor functionality", 
          value: props?.inspectionsDetail?.electrical_lighting_details?.parking_sensor_functionality
        },
      ],
    },
    {
      title: "Road Test & Performance",
      items: [
        {  
          label: "Start Performance", 
          value: props?.inspectionsDetail?.performance_road_test_details?.start_performance
        },
        {  
          label: "Acceleration Responsiveness", 
          value: props?.inspectionsDetail?.performance_road_test_details?.acceleration_responsiveness
        },
        {  
          label: "Cruise Control Engagement Test", 
          value: props?.inspectionsDetail?.performance_road_test_details?.cruise_control_engagement_test
        },
        {  
          label: "Gearbox Performance", 
          value: props?.inspectionsDetail?.performance_road_test_details?.garebox_performance
        },
        {  
          label: "Engine vibration at idle", 
          value: props?.inspectionsDetail?.performance_road_test_details?.engine_vibration_idle
        },
        {  
          label: "Mid-range power delivery", 
          value: props?.inspectionsDetail?.performance_road_test_details?.mid_range_power
        },
        {  
          label: "Highway stability", 
          value: props?.inspectionsDetail?.performance_road_test_details?.highway_stability
        },
        {  
          label: "Steering feedback & centering", 
          value: props?.inspectionsDetail?.performance_road_test_details?.steering_feedback
        },
        {  
          label: "ABS intervention feel", 
          value: props?.inspectionsDetail?.performance_road_test_details?.abs_intervention
        },
        {  
          label: "Braking performance under test", 
          value: props?.inspectionsDetail?.performance_road_test_details?.braking_performance
        },
        {  
          label: "Transmission harshness under load", 
          value: props?.inspectionsDetail?.performance_road_test_details?.transmission_harshness
        },
        {  
          label: "Clutch engagement smoothness (manual)", 
          value: props?.inspectionsDetail?.performance_road_test_details?.clutch_engagement
        },
        {  
          label: "Noise levels at various speeds", 
          value: props?.inspectionsDetail?.performance_road_test_details?.noise_levels
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

  let images = props.inspectionsDetail.vehicle_detail.images;

  if (typeof images === "string") {
    try {
      images = JSON.parse(images); // convert JSON string to array
    } catch {
      images = [];
    }
  }

  const downloadAll = async () => {
    try {
      const response = await fetch(
        route("download-attachments", props.inspectionsDetail.id)
      );
      const files = await response.json();

      if (!files.length) {
        alert("No files available to download.");
        return;
      }

      files.forEach((fileUrl, i) => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", fileUrl.split("/").pop()); // force download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch (error) {
      console.error("Error downloading files:", error);
    }
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
          <p className="creatodisplayM text-[18px] md:text-[22px] lg:text-[24px] text-white">Detailed analysis to help you take the right next steps.</p>
        </div>
      </div>

      <div className="py-[30px] md:py-[40px] lg:py-[55px] xl:py-[65px] ">
        <div className="container ">
        
         

          {/* Responsive Grid */}
          <div className="flex flex-wrap md:flex-nowrap gap-6">
             {/* Accordion */} 
            <div className="w-full md:w-[40%] order-1 md:order-2">
              {accordionData.map((section, index) => {
                // Skip this section
                if (
                  section.title === "Suspension & Steering" &&
                  (props.inspectionsDetail.package_id !== 2 &&
                    props.inspectionsDetail.package_id !== 3)
                ) {
                  return null;
                }

                return (
                  <div
                    key={index}
                    className="bg-[#EDEEEF] rounded-[10px] md:rounded-[15px] lg:rounded-[20px] mb-3 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex justify-between items-center px-[10px] py-[10px] md:px-[20px] md:py-[15px] text-[#192735] ppfont text-[16px]"
                    >
                      {section.title}
                      <span>
                        {openIndex === index ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </span>
                    </button>

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
                      <div className="border-t border-[#dedede] px-[15px] md:px-[25px] py-[10px]">
                        {section.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between gap-[15px] py-[6px]">
                            <span className="max-w-[70%] flex items-start flex-wrap creatodisplayM text-[14px] text-[#192735c7] font-bold">
                              {item.label}
                            </span>
                            <span className="creatodisplayM w-[30%] flex items-start justify-end text-[12px] text-end" style={{ color: "black" }}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>


            {/* Swiper Slider */}
            <div className="w-full md:w-[60%] order-2 md:order-1">
            <div className="mb-4 mb-[20px] md:mb-[30px] lg:mb-[50px]">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-[8px]">
                <div className="flex flex-col gap-[10px]">
                  <p className="creatodisplayM text-[16px] md:text-[18px] text-[#D72638]">
                    #{props.inspectionsDetail.request_no} | {props.inspectionsDetail.completed_date}
                  </p>
                  <h1 className="ppfont text-[20px] md:text-[24px] lg:text-[28px] text-[#192735]">
                    {props.inspectionsDetail.vehicle_make} {props.inspectionsDetail.vehicle_model} 
                  </h1>     
                </div>

                <a href="#" onClick={downloadAll} className="download-all-attachment creatodisplayM inline-flex justify-center cursor-pointer creatodisplayM  px-[25px] gap-[10px] py-[9px]  bg-[#D72638] rounded-full text-white text-[15px]  font-[500] hover:bg-[#D72638] transition">
              Download All Reports <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="20px" height="20px" viewBox="0 -4 32 32" version="1.1">
    
                      <title>cloud-download</title>
                      <desc>Created with Sketch Beta.</desc>
                      <defs>

                  </defs>
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                          <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-412.000000, -1139.000000)" fill="currentColor">
                              <path d="M437,1161 L420,1161 C420,1161 413.962,1160.38 414,1155 C414.021,1151.96 416.688,1149.18 420,1149 C420,1144.86 422.65,1141 427,1141 C430.433,1141 432.723,1143.1 433.538,1146.01 C438.493,1145.8 441.844,1149.72 442,1153 C442.135,1155.83 439.68,1159.48 437,1161 L437,1161 Z M435.067,1144.03 C433.599,1141.05 430.543,1139 427,1139 C422.251,1139 418.37,1142.68 418.033,1147.34 C414.542,1148.34 412,1151.39 412,1155 C412,1159.26 415.54,1162.73 420,1162.98 L437,1163 C440.437,1161.51 444,1157.35 444,1153.5 C444,1148.44 440.049,1144.32 435.067,1144.03 L435.067,1144.03 Z M433.295,1151.39 L429,1155.66 L429,1146.01 C429,1145.46 428.553,1145.01 428,1145.01 C427.448,1145.01 427,1145.46 427,1146.01 L427,1155.63 L422.736,1151.39 C422.344,1151 421.707,1151 421.313,1151.39 C420.921,1151.78 420.921,1152.41 421.313,1152.81 L427.254,1158.72 C427.464,1158.93 427.741,1159.02 428.016,1159 C428.29,1159.02 428.568,1158.93 428.777,1158.72 L434.718,1152.81 C435.11,1152.41 435.11,1151.78 434.718,1151.39 C434.325,1151 433.688,1151 433.295,1151.39 L433.295,1151.39 Z" id="cloud-download" sketch:type="MSShapeGroup">

                  </path>
                          </g>
                      </g>
                  </svg>
            </a>

              </div>
           
            
            



            <p className="creatodisplayM text-[#192735c9] text-[16px] ">
              {props.inspectionsDetail.over_comments}
            </p>
          </div>
              <div className="w-full">
                <Swiper
                  modules={[Navigation]}
                  navigation
                  loop
                  className="rounded-xl overflow-hidden inspectionSlider"
                >
                  {images.map((file, index) => {
                    let imageUrl =
                      typeof file === "string"
                        ? file.replace(/\\\//g, "/")
                        : URL.createObjectURL(file);

                    return (
                      <SwiperSlide key={index}>
                        <img
                          src={insepectimg1}
                          alt={`Car ${index + 1}`}
                          className="w-full h-[250px] max-h-[250px] md:h-[400px] md:max-h-[400px]  object-cover"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>

              {/* Specs / Tags */}
              <div className="flex flex-wrap gap-[10px] md:gap-2 mt-6">
                {specs.map((spec, i) => (
                  <div key={i} className="flex flex-col gap-[2px] bg-white border border-[#19273521] rounded-[5px] md:rounded-[15px] px-[5px] py-[5px] md:px-[15px] md:py-[15px]">
                    <span className="creatodisplayM md:text-[13px] lg:text-[15px] text-[16px] text-[#192735b5]">
                      {spec.label}:
                    </span>{" "}
                    <span className="ppfont text-[13px] md:text-[18px]  text-[#192735]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className=" mt-[25px] md:mt-[50px]">
                <h2 className="creatodisplayM text-[16px] text-[#192735b0] uppercase ">Body inspection</h2>
                <div className="carbx flex flex-col items-center justify-center px-[15px] py-[15px] md:px-[30px] md:py-[30px] border-[1px] border-[#e5e5e5] mt-[10px] md:mt-[20px]  rounded-[15px]">
                  <div className="flex items-center justify-center"
                    dangerouslySetInnerHTML={{
                      __html: props.inspectionsDetail.vehicle_detail.svg_image,
                    }}
                  />
                  <div className="flex flex-wrap gap-4 mt-[20px] border-t-[1px] border-t-[#f0f0f0] pt-[30px]">
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
