<?php

namespace App\Http\Controllers\Inspector;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use App\Models\InspectionLog;
use App\Models\InspectionRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Mail\ForgotPasswordMail;
use App\Models\InspectionVehicleDetail;
use App\Models\InspectionBodyDetail;
use App\Models\InspectionBreaksDetail;
use App\Models\InspectionClusterDetail;
use App\Models\InspectionCoolingDetail;
use App\Models\InspectionElectricalDetail;
use App\Models\InspectionEngineDetail;
use App\Models\InspectionGlassDetail;
use App\Models\InspectionHvacDetail;
use App\Models\InspectionInteriorDetail;
use App\Models\InspectionRoadTestDetail;
use App\Models\InspectionSeatDetail;
use App\Models\InspectionSuspensionDetail;
use App\Models\InspectionTransmissionDetail;
use App\Models\InspectionTyreDetail;
use Illuminate\Support\Facades\Mail;

class InspectorController extends Controller
{
    public function dashboard(){
        $pageTitle = 'Inspector | Dashboard';
        return inertia('Inspector/Dashbaord/Index', compact('pageTitle'));
    }

     public function profile(Request $request){
        $userDetails = User::find(auth()->user()->id);
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'name'      => ['required', 'string', 'max:50'],
                'address'   => ['required', 'string', 'max:200'],
                'address2'  => ['required', 'string', 'max:200'],
                'city'      => ['required', 'string', 'max:50'],
                'state'     => ['required', 'string', 'max:50'],
                'zip'       => ['required', 'max:8', 'max:6'],
            ]);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput($request->all());
            }
            $userDetails->name = $request->name;
            $userDetails->address = $request->address;
            $userDetails->address2 = $request->address2;
            $userDetails->city = $request->city;
            $userDetails->state = $request->state;
            $userDetails->zip = $request->zip;
            if(!empty($request->password) && !empty($request->confirmPassword)){
                if($request->password==$request->confirmPassword){
                    $userDetails->password = Hash::make($request->password);
                }else{
                    return redirect()->back()->with('error','Password and confirm password does not match');
                }
            }
            $userDetails->save();
            return redirect()->back()->with('success','Profile Updated');
        }
        return inertia('Inspector/Users/Profile',compact('userDetails'));
    }

    public function forgotPassword(Request $request){
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'email' => ['required', 'string', 'email']
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $checkuser = User::where('email',$request->email)->where('role','inspector')->first();
            if(empty($checkuser)){
                return back()->with('error', 'The provided email is not registered with us.');
            }else{
                $newPassword = rand();
                $checkuser->password = $newPassword;
                $checkuser->save();
                $checkuser->new_password = $newPassword;
                Mail::to($checkuser->email)->send(new ForgotPasswordMail($checkuser));
                return back()->with('success', 'A new password has been sent to your provided email.');
            }
        }
        return inertia('Inspector/Users/ForgotPassword');
    }

    public function serviceRequest(){
        $allInspections = InspectionRequest::where('inspector_id',Auth()->user()->id)->orderBy('id','DESC')->paginate(10);
        $pageTitle = 'Inspector | Service Request';
        return inertia('Inspector/Users/ServiceRequest',compact('pageTitle','allInspections'));
    }

    public function editRequest($id, Request $request){
        $inspectionsDetail = InspectionRequest::find($id);
        $alInspectors = User::where('role','inspector')->where('status',1)->get();
        if($request->isMethod('post')){
            $inspectionsDetail->status = $request->status ?? 0;
            $inspectionsDetail->save();

            if($request->change_identifier=='status_and_inspector_changed' || $request->change_identifier=='status_changed' || $request->change_identifier=='inspector_changed'){
                if($inspectionsDetail->status == 0){
                    $inspectionLogBtn = 'Unassigned';
                }
                if($inspectionsDetail->status == 1){
                    $inspectionLogBtn = 'Assigned';
                }
                if($inspectionsDetail->status == 2){
                    $inspectionLogBtn = 'In Process';
                }
                if($inspectionsDetail->status == 3){
                    $inspectionLogBtn = 'Cancelled';
                }
                if($inspectionsDetail->status == 4){
                    $inspectionLogBtn = 'Completed';
                }
                if($request->change_identifier=='status_and_inspector_changed' || $request->change_identifier=='status_changed'){
                    InspectionLog::create([
                        'inspection_request_id' => $inspectionsDetail->id,
                        'inspector_id'          => Auth()->user()->id,
                        'log_details'           => 'Inspection Status Changed By Inspector: '.$inspectionLogBtn,
                    ]);
                }
                if($request->change_identifier=='status_and_inspector_changed' || $request->change_identifier=='inspector_changed'){
                    InspectionLog::create([
                        'inspection_request_id' => $inspectionsDetail->id,
                        'inspector_id'          => Auth()->user()->id,
                        'log_details'           => 'Inspection Request Assigned To Inspector',
                    ]);
                }
            }

            return redirect()->back()->with('success', 'Inspection details updated successfully.');
        }
        $pageTitle = 'Inspector | Service Request';
        return inertia('Inspector/Users/EditRequest',compact('pageTitle','inspectionsDetail','alInspectors'));
    }

    public function report($id, Request $request){
        $inspectionsDetail = InspectionRequest::find($id);
        $pageTitle = 'Inspector | Report';
        return inertia('Inspector/Users/Report',compact('pageTitle','inspectionsDetail'));
    }

    public function logs($id,){
        $inspectinLogs = InspectionLog::where('inspection_request_id', $id)->orderBy('id','DESC')->paginate(10);
        $pageTitle = 'Inspector | Logs';
        return inertia('Inspector/Users/Logs',compact('pageTitle','inspectinLogs'));
    }

    public function startInspection($id){
        $inspectionsDetail = InspectionRequest::with([
            'bodyDetail',
            'vehicleDetail',
            'interiorDetails',
            'glassDetails',
            'engineDetails',
            'clusterDetails',
            'transmissionDetails',
            'suspensionDetails',
            'brakesDetails',
            'tyresDetails',
            'seatDetails',
            'hvacDetails',
            'coolingFuelDetails',
            'electricalLightingDetails',
            'performanceRoadTestDetails',
        ])->find($id);
        
        $pageTitle = 'Inspector | Add Inspection';
        return inertia('Inspector/Users/AddInspection',compact('pageTitle','inspectionsDetail'));
    }

    public function submitTest($id, Request $request){
        $inspectionsDetail = InspectionRequest::find($id);
        $vehicleDetail = InspectionVehicleDetail::where('request_id', $id)->first();
        $bodyDetail = InspectionBodyDetail::where('request_id', $id)->first();
        $seatDetail = InspectionSeatDetail::where('request_id', $id)->first();
        $suspensionDetail = InspectionSuspensionDetail::where('request_id', $id)->first();
        $transmissionDetail = InspectionTransmissionDetail::where('request_id', $id)->first();
        $tyreDetail = InspectionTyreDetail::where('request_id', $id)->first();
        $brakeDetail = InspectionBreaksDetail::where('request_id', $id)->first();
        $clusterDetail = InspectionClusterDetail::where('request_id', $id)->first();
        $coolingDetail = InspectionCoolingDetail::where('request_id', $id)->first();
        $electricalDetail = InspectionElectricalDetail::where('request_id', $id)->first();
        $engineDetail = InspectionEngineDetail::where('request_id', $id)->first();
        $glassDetail = InspectionGlassDetail::where('request_id', $id)->first();
        $hvacDetail = InspectionHvacDetail::where('request_id', $id)->first();
        $interiorDetail = InspectionInteriorDetail::where('request_id', $id)->first();
        $roadTestDetail = InspectionRoadTestDetail::where('request_id', $id)->first();

        if($request->isMethod('post')){
            
            if(empty($vehicleDetail)){
                $vehicleDetail = new InspectionVehicleDetail();
                $inspectionsDetail->vehicleDetail()->create([
                    'inspection_request_id' => $inspectionsDetail->id,
                    'engine_capacity' => $request->input('vehicle.engine_capacity'),
                    'engine_cylinders' => $request->input('vehicle.engine_cylinders'),
                    'drive_type' => $request->input('vehicle.drive_type'),
                    'body_type' => $request->input('vehicle.body_type'),
                    'exterior_color' => $request->input('vehicle.exterior_color'),
                    'interior_color' => $request->input('vehicle.interior_color'),
                    'number_keys' => $request->input('vehicle.number_keys'),
                    'service_history' => $request->input('vehicle.service_history'),
                    'last_service_date' => $request->input('vehicle.last_service_date'),
                    'registration_emirate' => $request->input('vehicle.registration_emirate'),
                    'warranty_status' => $request->input('vehicle.warranty_status'),
                    'plate_type' => $request->input('vehicle.plate_type'),
                    'registration_number' => $request->input('vehicle.registration_number'),
                    'chasis_no' => $request->input('vehicle.chasis_no'),
                ]);
            }else{
                $vehicleDetail->update([
                    'engine_capacity' => $request->input('vehicle_detail.engine_capacity'),
                    'engine_cylinders' => $request->input('vehicle_detail.engine_cylinders'),
                    'drive_type' => $request->input('vehicle_detail.drive_type'),
                    'body_type' => $request->input('vehicle_detail.body_type'),
                    'exterior_color' => $request->input('vehicle_detail.exterior_color'),
                    'interior_color' => $request->input('vehicle_detail.interior_color'),
                    'number_keys' => $request->input('vehicle_detail.number_keys'),
                    'service_history' => $request->input('vehicle_detail.service_history'),
                    'last_service_date' => $request->input('vehicle_detail.last_service_date'),
                    'registration_emirate' => $request->input('vehicle_detail.registration_emirate'),
                    'warranty_status' => $request->input('vehicle_detail.warranty_status'),
                    'plate_type' => $request->input('vehicle_detail.plate_type'),
                    'registration_number' => $request->input('vehicle_detail.registration_number'),
                    'chasis_no' => $request->input('vehicle_detail.chasis_no'),
                ]);
            }

            echo "<pre>"; print_R($request->all());die;
            if(empty($bodyDetail)){
                $bodyDetail = new InspectionBodyDetail();
                $bodyDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'front_bumper' => $request->input('body.front_bumper'),
                    'rear_bumper' => $request->input('body.rear_bumper'),
                    'bonnet' => $request->input('body.bonnet'),
                    'boot_lid' => $request->input('body.boot_lid'),
                    'left_front_wing' => $request->input('body.left_front_wing'),
                    'right_front_wing' => $request->input('body.right_front_wing'),
                    'left_front_door_fit' => $request->input('body.left_front_door_fit'),
                    'right_front_wing_fit' => $request->input('body.right_front_wing_fit'),
                    'right_front_door_fit' => $request->input('body.right_front_door_fit'),
                    'left_rear_door_fit' => $request->input('body.left_rear_door_fit'),
                    'right_rear_door_fit' => $request->input('body.right_rear_door_fit'),
                    'left_rear_quarter_panel_fit' => $request->input('body.left_rear_quarter_panel_fit'),
                    'right_rear_quarter_panel_fit' => $request->input('body.right_rear_quarter_panel_fit'),
                    'roof_panel_alignment' => $request->input('body.roof_panel_alignment'),
                    'fender_mounting_condition' => $request->input('body.fender_mounting_condition'),
                    'panel_gap_uniformity' => $request->input('body.panel_gap_uniformity'),
                    'external_trim_condition' => $request->input('body.external_trim_condition'),
                    'molding_clips_present' => $request->input('body.molding_clips_present'),
                    'door_seals_fitment' => $request->input('body.door_seals_fitment'),
                    'boot_seal_fitment' => $request->input('body.boot_seal_fitment'),
                    'fuel_filler_door_operation' => $request->input('body.fuel_filler_door_operation'),
                    'body_fasteners_intact' => $request->input('body.body_fasteners_intact'),
                    'tow_eye_point_secure' => $request->input('body.tow_eye_point_secure'),
                    'bumper_reinforcement_visible' => $request->input('body.bumper_reinforcement_visible'),
                    'undercarriage_guards' => $request->input('body.undercarriage_guards'),
                    'panel_repair_signs' => $request->input('body.panel_repair_signs'),
                    'exterior_accessory_fitment' => $request->input('body.exterior_accessory_fitment'),
                ]);
            }else{
                $bodyDetail->update([
                    'front_bumper' => $request->input('body.front_bumper'),
                    'rear_bumper'  => $request->input('body.rear_bumper'),
                    'bonnet' => $request->input('body.bonnet'),
                    'boot_lid' => $request->input('body.boot_lid'),
                    'left_front_wing' => $request->input('body.left_front_wing'),
                    'right_front_wing' => $request->input('body.right_front_wing'),
                    'left_front_door_fit' => $request->input('body.left_front_door_fit'),
                    'right_front_wing_fit' => $request->input('body.right_front_wing_fit'),
                    'right_front_door_fit' => $request->input('body.right_front_door_fit'),
                    'left_rear_door_fit' => $request->input('body.left_rear_door_fit'),
                    'right_rear_door_fit' => $request->input('body.right_rear_door_fit'),
                    'left_rear_quarter_panel_fit' => $request->input('body.left_rear_quarter_panel_fit'),
                    'right_rear_quarter_panel_fit' => $request->input('body.right_rear_quarter_panel_fit'),
                    'roof_panel_alignment' => $request->input('body.roof_panel_alignment'),
                    'fender_mounting_condition' => $request->input('body.fender_mounting_condition'),
                    'panel_gap_uniformity' => $request->input('body.panel_gap_uniformity'),
                    'external_trim_condition' => $request->input('body.external_trim_condition'),
                    'molding_clips_present' => $request->input('body.molding_clips_present'),
                    'door_seals_fitment' => $request->input('body.door_seals_fitment'),
                    'boot_seal_fitment' => $request->input('body.boot_seal_fitment'),
                    'fuel_filler_door_operation' => $request->input('body.fuel_filler_door_operation'),
                    'body_fasteners_intact' => $request->input('body.body_fasteners_intact'),
                    'tow_eye_point_secure' => $request->input('body.tow_eye_point_secure'),
                    'bumper_reinforcement_visible' => $request->input('body.bumper_reinforcement_visible'),
                    'undercarriage_guards' => $request->input('body.undercarriage_guards'),
                    'panel_repair_signs' => $request->input('body.panel_repair_signs'),
                    'exterior_accessory_fitment' => $request->input('body.exterior_accessory_fitment'),
                ]);
            }

            if(empty($brakeDetail)){
                $brakeDetail = new InspectionBreaksDetail();
                $brakeDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'master_cylinder_seal_condition' => $request->input('brake.master_cylinder_seal_condition'),
                    'brake_booster_operation' => $request->input('brake.brake_booster_operation'),
                    'front_disc_condition_runout' => $request->input('brake.front_disc_condition_runout'),
                    'rear_disc_drum_condition' => $request->input('brake.rear_disc_drum_condition'),
                    'front_pad' => $request->input('brake.front_pad'),
                    'rear_pad' => $request->input('brake.rear_pad'),
                    'handbrake_adjustment_holding' => $request->input('brake.handbrake_adjustment_holding'),
                    'abs_function_wheel_speed_check' => $request->input('brake.abs_function_wheel_speed_check'),
                    'brake_pedal_travel_firmness' => $request->input('brake.brake_pedal_travel_firmness'),
                    'brake_fluid_contamination_test_note' => $request->input('brake.brake_fluid_contamination_test_note'),
                    'comments_brakes' => $request->input('brake.comments_brakes'),
                ]);
            }else{
                $brakeDetail->update([
                    'master_cylinder_seal_condition' => $request->input('brake.master_cylinder_seal_condition'),
                    'brake_booster_operation' => $request->input('brake.brake_booster_operation'),
                    'front_disc_condition_runout' => $request->input('brake.front_disc_condition_runout'),
                    'rear_disc_drum_condition' => $request->input('brake.rear_disc_drum_condition'),
                    'front_pad' => $request->input('brake.front_pad'),
                    'rear_pad' => $request->input('brake.rear_pad'),
                    'handbrake_adjustment_holding' => $request->input('brake.handbrake_adjustment_holding'),
                    'abs_function_wheel_speed_check' => $request->input('brake.abs_function_wheel_speed_check'),
                    'brake_pedal_travel_firmness' => $request->input('brake.brake_pedal_travel_firmness'),
                    'brake_fluid_contamination_test_note' => $request->input('brake.brake_fluid_contamination_test_note'),
                    'comments_brakes' => $request->input('brake.comments_brakes'),
                ]);
            }

            if(empty($clusterDetail)){
                $clusterDetail = new InspectionClusterDetail();
                $clusterDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'engine_light' => $request->input('cluster.engine_light'),
                    'abs_light' => $request->input('cluster.abs_light'),
                    'oil_pressure_light' => $request->input('cluster.oil_pressure_light'),
                    'battery_charging_system_light' => $request->input('cluster.battery_charging_system_light'),
                    'coolant_temperature_warning_light' => $request->input('cluster.coolant_temperature_warning_light'),
                    'brake_system_warning_light' => $request->input('cluster.brake_system_warning_light'),
                    'airbag_warning_light' => $request->input('cluster.airbag_warning_light'),
                    'seatbelt_reminder_light' => $request->input('cluster.seatbelt_reminder_light'),
                    'traction_control_light' => $request->input('cluster.traction_control_light'),
                    'tpms' => $request->input('cluster.tpms'),
                ]);
            }else{
                $clusterDetail->update([
                    'engine_light' => $request->input('cluster.engine_light'),
                    'abs_light' => $request->input('cluster.abs_light'),
                    'oil_pressure_light' => $request->input('cluster.oil_pressure_light'),
                    'battery_charging_system_light' => $request->input('cluster.battery_charging_system_light'),
                    'coolant_temperature_warning_light' => $request->input('cluster.coolant_temperature_warning_light'),
                    'brake_system_warning_light' => $request->input('cluster.brake_system_warning_light'),
                    'airbag_warning_light' => $request->input('cluster.airbag_warning_light'),
                    'seatbelt_reminder_light' => $request->input('cluster.seatbelt_reminder_light'),
                    'traction_control_light' => $request->input('cluster.traction_control_light'),
                    'tpms' => $request->input('cluster.tpms'),
                ]);
            }

            if(empty($coolingDetail)){
                $coolingDetail = new InspectionCoolingDetail();
                $coolingDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'radiator_core_condition' => $request->input('cooling.radiator_core_condition'),
                    'radiator_fan_operation' => $request->input('cooling.radiator_fan_operation'),
                    'cycling_observation' => $request->input('cooling.cycling_observation'),
                    'overflow_expansion_tank_condition' => $request->input('cooling.overflow_expansion_tank_condition'),
                    'heater_core_performance' => $request->input('cooling.heater_core_performance'),
                    'fuel_tank_inspection' => $request->input('cooling.fuel_tank_inspection'),
                ]);
            }else{
                $coolingDetail->update([
                    'radiator_core_condition' => $request->input('cooling.radiator_core_condition'),
                    'radiator_fan_operation' => $request->input('cooling.radiator_fan_operation'),
                    'cycling_observation' => $request->input('cooling.cycling_observation'),
                    'overflow_expansion_tank_condition' => $request->input('cooling.overflow_expansion_tank_condition'),
                    'heater_core_performance' => $request->input('cooling.heater_core_performance'),
                    'fuel_tank_inspection' => $request->input('cooling.fuel_tank_inspection'),
                ]); 
            }

            if(empty($electricalDetail)){
                $electricalDetail = new InspectionElectricalDetail();
                $electricalDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'starter_engagement_reliability' => $request->input('electrical.starter_engagement_reliability'),
                    'front_indicators_function' => $request->input('electrical.front_indicators_function'),
                    'rear_indicators_function' => $request->input('electrical.rear_indicators_function'),
                    'reverse_light_function' => $request->input('electrical.reverse_light_function'),
                    'fog_lights_front_rear' => $request->input('electrical.fog_lights_front_rear'),
                    'interior_control_switches_backlight' => $request->input('electrical.interior_control_switches_backlight'),
                    'parking_sensor_functionality' => $request->input('electrical.parking_sensor_functionality'),
                ]);
            }else{
                $electricalDetail->update([
                    'starter_engagement_reliability' => $request->input('electrical.starter_engagement_reliability'),
                    'front_indicators_function' => $request->input('electrical.front_indicators_function'),
                    'rear_indicators_function' => $request->input('electrical.rear_indicators_function'),
                    'reverse_light_function' => $request->input('electrical.reverse_light_function'),
                    'fog_lights_front_rear' => $request->input('electrical.fog_lights_front_rear'),
                    'interior_control_switches_backlight' => $request->input('electrical.interior_control_switches_backlight'),
                    'parking_sensor_functionality' => $request->input('electrical.parking_sensor_functionality'),
                ]);
            }

            if(empty($engineDetail)){
                $engineDetail = new InspectionEngineDetail();
                $engineDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'engine_start_behavior_cold' => $request->input('engine.engine_start_behavior_cold'),
                    'engine_start_behavior_warm' => $request->input('engine.engine_start_behavior_warm'),
                    'idle_stability' => $request->input('engine.idle_stability'),
                    'throttle_response' => $request->input('engine.throttle_response'),
                    'abnormal_engine_noises' => $request->input('engine.abnormal_engine_noises'),
                    'engine_oil_level_check' => $request->input('engine.engine_oil_level_check'),
                    'engine_oil_appearance' => $request->input('engine.engine_oil_appearance'),
                    'visible_oil_leaks' => $request->input('engine.visible_oil_leaks'),
                    'oil_filter_housing_condition' => $request->input('engine.oil_filter_housing_condition'),
                    'coolant_level_check' => $request->input('engine.coolant_level_check'),
                    'coolant_color' => $request->input('engine.coolant_color'),
                    'coolant_leaks' => $request->input('engine.coolant_leaks'),
                    'signs_of_coolant_in_oil' => $request->input('engine.signs_of_coolant_in_oil'),
                    'hose_condition' => $request->input('engine.hose_condition'),
                    'drive_belt_condition' => $request->input('engine.drive_belt_condition'),
                    'timing_belt_condition' => $request->input('engine.timing_belt_condition'),
                    'turbo_boost_check' => $request->input('engine.turbo_boost_check'),
                    'air_intake_condition' => $request->input('engine.air_intake_condition'),
                    'air_filter_element' => $request->input('engine.air_filter_element'),
                    'starter_motor_cranking' => $request->input('engine.starter_motor_cranking'),
                    'fuse_box_access' => $request->input('engine.fuse_box_access'),
                    // Free text fields
                    'any_noice' => $request->input('engine.any_noice'),
                    'comments_engine' => $request->input('engine.comments_engine')
                ]);
            }else{
                $engineDetail->update([
                    'engine_start_behavior_cold' => $request->input('engine.engine_start_behavior_cold'),
                    'engine_start_behavior_warm' => $request->input('engine.engine_start_behavior_warm'),
                    'idle_stability' => $request->input('engine.idle_stability'),
                    'throttle_response' => $request->input('engine.throttle_response'),
                    'abnormal_engine_noises' => $request->input('engine.abnormal_engine_noises'),
                    'engine_oil_level_check' => $request->input('engine.engine_oil_level_check'),
                    'engine_oil_appearance' => $request->input('engine.engine_oil_appearance'),
                    'visible_oil_leaks' => $request->input('engine.visible_oil_leaks'),
                    'oil_filter_housing_condition' => $request->input('engine.oil_filter_housing_condition'),
                    'coolant_level_check' => $request->input('engine.coolant_level_check'),
                    'coolant_color' => $request->input('engine.coolant_color'),
                    'coolant_leaks' => $request->input('engine.coolant_leaks'),
                    'signs_of_coolant_in_oil' => $request->input('engine.signs_of_coolant_in_oil'),
                    'hose_condition' => $request->input('engine.hose_condition'),
                    'drive_belt_condition' => $request->input('engine.drive_belt_condition'),
                    'timing_belt_condition' => $request->input('engine.timing_belt_condition'),
                    'turbo_boost_check' => $request->input('engine.turbo_boost_check'),
                    'air_intake_condition' => $request->input('engine.air_intake_condition'),
                    'air_filter_element' => $request->input('engine.air_filter_element'),
                    'starter_motor_cranking' => $request->input('engine.starter_motor_cranking'),
                    'fuse_box_access' => $request->input('engine.fuse_box_access'),
                    // Free text fields
                    'any_noice' => $request->input('engine.any_noice'),
                    'comments_engine' => $request->input('engine.comments_engine')
                ]);
            }

            if(empty($glassDetail)){
                $glassDetail = new InspectionGlassDetail();
                $glassDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'windshield_condition' => $request->input('glass.windshield_condition'),
                    'windshield_wiper_function' => $request->input('glass.windshield_wiper_function'),
                    'wiper_blade_wear' => $request->input('glass.wiper_blade_wear'),
                    'rear_wiper_function' => $request->input('glass.rear_wiper_function'),
                    'side_window_operation_lf' => $request->input('glass.side_window_operation_lf'),
                    'side_window_operation_rf' => $request->input('glass.side_window_operation_rf'),
                    'side_window_operation_lr' => $request->input('glass.side_window_operation_lr'),
                    'side_window_operation_rr' => $request->input('glass.side_window_operation_rr'),
                    'rear_window_condition' => $request->input('glass.rear_window_condition'),
                    'sunroof_operation' => $request->input('glass.sunroof_operation'),
                    'sunroof_drainage_check' => $request->input('glass.sunroof_drainage_check'),
                    'sunroof_glass_condition' => $request->input('glass.sunroof_glass_condition'),
                    'left_external_mirror_function' => $request->input('glass.left_external_mirror_function'),
                    'right_external_mirror_function' => $request->input('glass.right_external_mirror_function'),
                    'mirror_adjustment_motors' => $request->input('glass.mirror_adjustment_motors')
                ]);
            }else{
                $glassDetail->update([
                    'windshield_condition' => $request->input('glass.windshield_condition'),
                    'windshield_wiper_function' => $request->input('glass.windshield_wiper_function'),
                    'wiper_blade_wear' => $request->input('glass.wiper_blade_wear'),
                    'rear_wiper_function' => $request->input('glass.rear_wiper_function'),
                    'side_window_operation_lf' => $request->input('glass.side_window_operation_lf'),
                    'side_window_operation_rf' => $request->input('glass.side_window_operation_rf'),
                    'side_window_operation_lr' => $request->input('glass.side_window_operation_lr'),
                    'side_window_operation_rr' => $request->input('glass.side_window_operation_rr'),
                    'rear_window_condition' => $request->input('glass.rear_window_condition'),
                    'sunroof_operation' => $request->input('glass.sunroof_operation'),
                    'sunroof_drainage_check' => $request->input('glass.sunroof_drainage_check'),
                    'sunroof_glass_condition' => $request->input('glass.sunroof_glass_condition'),
                    'left_external_mirror_function' => $request->input('glass.left_external_mirror_function'),
                    'right_external_mirror_function' => $request->input('glass.right_external_mirror_function'),
                    'mirror_adjustment_motors' => $request->input('glass.mirror_adjustment_motors')
                ]);
            }

            if(empty($hvacDetail)){
                $hvacDetail = new InspectionHvacDetail();
                $hvacDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'air_condition' => $request->input('hvac.air_condition'),
                    'radio_condition' => $request->input('hvac.radio_condition'),
                    'heating_cooling_system' => $request->input('hvac.heating_cooling_system')
                ]);
            }else{
                $hvacDetail->update([
                    'request_id' => $inspectionsDetail->id,
                    'air_condition' => $request->input('hvac.air_condition'),
                    'radio_condition' => $request->input('hvac.radio_condition'),
                    'heating_cooling_system' => $request->input('hvac.heating_cooling_system')
                ]);
            }

            if(empty($interiorDetail)){
                $interiorDetail = new InspectionInteriorDetail();
                $interiorDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'dashboard_fit_finish' => $request->input('interior.dashboard_fit_finish'),
                    'instrument_cluster_illumination' => $request->input('interior.instrument_cluster_illumination'),
                    'warning_lights_active_start' => $request->input('interior.warning_lights_active_start'),
                    'odometer_function' => $request->input('interior.odometer_function'),
                    'interior_lighting' => $request->input('interior.interior_lighting'),
                    'glove_box_latching' => $request->input('interior.glove_box_latching'),
                    'carpet_wear_retention' => $request->input('interior.carpet_wear_retention'),
                    'interior_contamination_odour' => $request->input('interior.interior_contamination_odour'),
                    'trunk_boot_interior_condition' => $request->input('interior.trunk_boot_interior_condition')
                ]);
            }else{
                $interiorDetail->update([
                    'request_id' => $inspectionsDetail->id,
                    'dashboard_fit_finish' => $request->input('interior.dashboard_fit_finish'),
                    'instrument_cluster_illumination' => $request->input('interior.instrument_cluster_illumination'),
                    'warning_lights_active_start' => $request->input('interior.warning_lights_active_start'),
                    'odometer_function' => $request->input('interior.odometer_function'),
                    'interior_lighting' => $request->input('interior.interior_lighting'),
                    'glove_box_latching' => $request->input('interior.glove_box_latching'),
                    'carpet_wear_retention' => $request->input('interior.carpet_wear_retention'),
                    'interior_contamination_odour' => $request->input('interior.interior_contamination_odour'),
                    'trunk_boot_interior_condition' => $request->input('interior.trunk_boot_interior_condition')
                ]);
            }

            if(empty($seatDetail)){
                $seatDetail = new InspectionSeatDetail();
                $seatDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'driver_seat_adjust_locks' => $request->input('seat.driver_seat_adjust_locks'),
                    'passenger_seat_adjust_locks' => $request->input('seat.passenger_seat_adjust_locks'),
                    'seat_sliding_rails' => $request->input('seat.seat_sliding_rails'),
                    'seat_cushion_wear' => $request->input('seat.seat_cushion_wear'),
                    'seat_upholstery_integrity' => $request->input('seat.seat_upholstery_integrity')
                ]);
            }else{
                $seatDetail->update([
                    'request_id' => $inspectionsDetail->id,
                    'driver_seat_adjust_locks' => $request->input('seat.driver_seat_adjust_locks'),
                    'passenger_seat_adjust_locks' => $request->input('seat.passenger_seat_adjust_locks'),
                    'seat_sliding_rails' => $request->input('seat.seat_sliding_rails'),
                    'seat_cushion_wear' => $request->input('seat.seat_cushion_wear'),
                    'seat_upholstery_integrity' => $request->input('seat.seat_upholstery_integrity')
                ]);
            }

            if(empty($suspensionDetail)){
                $suspensionDetail = new InspectionSuspensionDetail();
                $suspensionDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'front_strut_mount_condition' => $request->input('suspension.front_strut_mount_condition'),
                    'rear_strut_mount_condition' => $request->input('suspension.rear_strut_mount_condition'),
                    'front_shock_absorber_function' => $request->input('suspension.front_shock_absorber_function'),
                    'rear_shock_absorber_function' => $request->input('suspension.rear_shock_absorber_function'),
                    'front_spring_integrity' => $request->input('suspension.front_spring_integrity'),
                    'rear_spring_integrity' => $request->input('suspension.rear_spring_integrity'),
                    'control_arm_bush_condition' => $request->input('suspension.control_arm_bush_condition'),
                    'lower_ball_joint_play' => $request->input('suspension.lower_ball_joint_play'),
                    'upper_ball_joint_play' => $request->input('suspension.upper_ball_joint_play'),
                    'anti_roll_bar_links_bushes' => $request->input('suspension.anti_roll_bar_links_bushes'),
                    'steering_rack_seal_condition' => $request->input('suspension.steering_rack_seal_condition'),
                    'steering_rack_play_check' => $request->input('suspension.steering_rack_play_check'),
                    'rack_end_condition' => $request->input('suspension.rack_end_condition'),
                    'tie_rod_end_play' => $request->input('suspension.tie_rod_end_play'),
                    'steering_column_noises' => $request->input('suspension.steering_column_noises'),
                    'power_steering_fluid_level_color' => $request->input('suspension.power_steering_fluid_level_color'),
                    'power_steering_pump_noise' => $request->input('suspension.power_steering_pump_noise'),
                    'subframe_mount_condition' => $request->input('suspension.subframe_mount_condition'),
                    'chassis_mounts_security' => $request->input('suspension.chassis_mounts_security'),
                    'steering_wheel_free_play' => $request->input('suspension.steering_wheel_free_play'),
                    'comments_suspension' => $request->input('suspension.comments_suspension')
                ]);
            }else{
                $suspensionDetail->update([
                    'front_strut_mount_condition' => $request->input('suspension.front_strut_mount_condition'),
                    'rear_strut_mount_condition' => $request->input('suspension.rear_strut_mount_condition'),
                    'front_shock_absorber_function' => $request->input('suspension.front_shock_absorber_function'),
                    'rear_shock_absorber_function' => $request->input('suspension.rear_shock_absorber_function'),
                    'front_spring_integrity' => $request->input('suspension.front_spring_integrity'),
                    'rear_spring_integrity' => $request->input('suspension.rear_spring_integrity'),
                    'control_arm_bush_condition' => $request->input('suspension.control_arm_bush_condition'),
                    'lower_ball_joint_play' => $request->input('suspension.lower_ball_joint_play'),
                    'upper_ball_joint_play' => $request->input('suspension.upper_ball_joint_play'),
                    'anti_roll_bar_links_bushes' => $request->input('suspension.anti_roll_bar_links_bushes'),
                    'steering_rack_seal_condition' => $request->input('suspension.steering_rack_seal_condition'),
                    'steering_rack_play_check' => $request->input('suspension.steering_rack_play_check'),
                    'rack_end_condition' => $request->input('suspension.rack_end_condition'),
                    'tie_rod_end_play' => $request->input('suspension.tie_rod_end_play'),
                    'steering_column_noises' => $request->input('suspension.steering_column_noises'),
                    'power_steering_fluid_level_color' => $request->input('suspension.power_steering_fluid_level_color'),
                    'power_steering_pump_noise' => $request->input('suspension.power_steering_pump_noise'),
                    'subframe_mount_condition' => $request->input('suspension.subframe_mount_condition'),
                    'chassis_mounts_security' => $request->input('suspension.chassis_mounts_security'),
                    'steering_wheel_free_play' => $request->input('suspension.steering_wheel_free_play'),
                    'comments_suspension' => $request->input('suspension.comments_suspension')
                ]);
            }

            if(empty($transmissionDetail)){
                $transmissionDetail = new InspectionTransmissionDetail();
                $transmissionDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'transmission_fluid_level_auto' => $request->input('transmission.transmission_fluid_level_auto'),
                    'transmission_fluid_condition_auto' => $request->input('transmission.transmission_fluid_condition_auto'),
                    'manual_gearbox_oil_check' => $request->input('transmission.manual_gearbox_oil_check'),
                    'transmission_mount_integrity' => $request->input('transmission.transmission_mount_integrity'),
                    'gear_selection_smoothness' => $request->input('transmission.gear_selection_smoothness'),
                    'clutch_bite_slippage' => $request->input('transmission.clutch_bite_slippage'),
                    'automatic_shift_quality' => $request->input('transmission.automatic_shift_quality'),
                    'transfer_case_engagement' => $request->input('transmission.transfer_case_engagement'),
                    'drive_shaft_visual_inspection' => $request->input('transmission.drive_shaft_visual_inspection'),
                    'cv_joint_boot_integrity' => $request->input('transmission.cv_joint_boot_integrity'),
                    'u_joints_coupling_check' => $request->input('transmission.u_joints_coupling_check'),
                    'differential_oil_condition' => $request->input('transmission.differential_oil_condition'),
                    'differential_housing_leaks' => $request->input('transmission.differential_housing_leaks'),
                    'gearbox_unusual_noise' => $request->input('transmission.gearbox_unusual_noise'),
                    'comments_transmission' => $request->input('transmission.comments_transmission')
                ]);
            }else{
                $transmissionDetail->update([
                    'transmission_fluid_level_auto' => $request->input('transmission.transmission_fluid_level_auto'),
                    'transmission_fluid_condition_auto' => $request->input('transmission.transmission_fluid_condition_auto'),
                    'manual_gearbox_oil_check' => $request->input('transmission.manual_gearbox_oil_check'),
                    'transmission_mount_integrity' => $request->input('transmission.transmission_mount_integrity'),
                    'gear_selection_smoothness' => $request->input('transmission.gear_selection_smoothness'),
                    'clutch_bite_slippage' => $request->input('transmission.clutch_bite_slippage'),
                    'automatic_shift_quality' => $request->input('transmission.automatic_shift_quality'),
                    'transfer_case_engagement' => $request->input('transmission.transfer_case_engagement'),
                    'drive_shaft_visual_inspection' => $request->input('transmission.drive_shaft_visual_inspection'),
                    'cv_joint_boot_integrity' => $request->input('transmission.cv_joint_boot_integrity'),
                    'u_joints_coupling_check' => $request->input('transmission.u_joints_coupling_check'),
                    'differential_oil_condition' => $request->input('transmission.differential_oil_condition'),
                    'differential_housing_leaks' => $request->input('transmission.differential_housing_leaks'),
                    'gearbox_unusual_noise' => $request->input('transmission.gearbox_unusual_noise'),
                    'comments_transmission' => $request->input('transmission.comments_transmission')
                ]);
            }

            if(empty($tyreDetail)){
                $tyreDetail = new InspectionTyreDetail();
                $tyreDetail->create([
                    'request_id' => $request->input('request_id'),
                    'tyre_brand_size_lf' => $request->input('tyre.tyre_brand_size_lf'),
                    'tyre_brand_size_rf' => $request->input('tyre.tyre_brand_size_rf'),
                    'tyre_brand_size_lr' => $request->input('tyre.tyre_brand_size_lr'),
                    'tyre_brand_size_rr' => $request->input('tyre.tyre_brand_size_rr'),
                    'tyre_manufacture_date_lf' => $request->input('tyre.tyre_manufacture_date_lf'),
                    'tyre_manufacture_date_rf' => $request->input('tyre.tyre_manufacture_date_rf'),
                    'tyre_manufacture_date_lr' => $request->input('tyre.tyre_manufacture_date_lr'),
                    'tyre_manufacture_date_rr' => $request->input('tyre.tyre_manufacture_date_rr'),
                    'tread_depth_lf' => $request->input('tyre.tread_depth_lf'),
                    'tread_depth_rf' => $request->input('tyre.tread_depth_rf'),
                    'tread_depth_lr' => $request->input('tyre.tread_depth_lr'),
                    'tread_depth_rr' => $request->input('tyre.tread_depth_rr'),
                    'tyre_pressure' => $request->input('tyre.tyre_pressure'),
                    'spare_wheel_condition' => $request->input('tyre.spare_wheel_condition'),
                    'tyre_comment' => $request->input('tyre.tyre_comment')
                ]);
            }else{
                $tyreDetail->update([
                    'tyre_brand_size_lf' => $request->input('tyre.tyre_brand_size_lf'),
                    'tyre_brand_size_rf' => $request->input('tyre.tyre_brand_size_rf'),
                    'tyre_brand_size_lr' => $request->input('tyre.tyre_brand_size_lr'),
                    'tyre_brand_size_rr' => $request->input('tyre.tyre_brand_size_rr'),
                    'tyre_manufacture_date_lf' => $request->input('tyre.tyre_manufacture_date_lf'),
                    'tyre_manufacture_date_rf' => $request->input('tyre.tyre_manufacture_date_rf'),
                    'tyre_manufacture_date_lr' => $request->input('tyre.tyre_manufacture_date_lr'),
                    'tyre_manufacture_date_rr' => $request->input('tyre.tyre_manufacture_date_rr'),
                    'tread_depth_lf' => $request->input('tyre.tread_depth_lf'),
                    'tread_depth_rf' => $request->input('tyre.tread_depth_rf'),
                    'tread_depth_lr' => $request->input('tyre.tread_depth_lr'),
                    'tread_depth_rr' => $request->input('tyre.tread_depth_rr'),
                    'tyre_pressure' => $request->input('tyre.tyre_pressure'),
                    'spare_wheel_condition' => $request->input('tyre.spare_wheel_condition'),
                    'tyre_comment' => $request->input('tyre.tyre_comment')
                ]);
            }

            if(empty($roadTestDetail)){
                $roadTestDetail = new InspectionRoadTestDetail();
                $roadTestDetail->create([
                    'request_id' => $request->input('request_id'),
                    'start_performance' => $request->input('road_test.start_performance'),
                    'acceleration_responsiveness' => $request->input('road_test.acceleration_responsiveness'),
                    'cruise_control_engagement_test' => $request->input('road_test.cruise_control_engagement_test'),
                    'garebox_performance' => $request->input('road_test.garebox_performance'),
                    'engine_vibration_idle' => $request->input('road_test.engine_vibration_idle'),
                    'mid_range_power' => $request->input('road_test.mid_range_power'),
                    'highway_stability' => $request->input('road_test.highway_stability'),
                    'steering_feedback' => $request->input('road_test.steering_feedback'),
                    'abs_intervention' => $request->input('road_test.abs_intervention'),
                    'braking_performance' => $request->input('road_test.braking_performance'),
                    'transmission_harshness' => $request->input('road_test.transmission_harshness'),
                    'clutch_engagement' => $request->input('road_test.clutch_engagement'),
                    'noise_levels' => $request->input('road_test.noise_levels')
                ]);
            }else{
                $roadTestDetail->update([
                    'start_performance' => $request->input('road_test.start_performance'),
                    'acceleration_responsiveness' => $request->input('road_test.acceleration_responsiveness'),
                    'cruise_control_engagement_test' => $request->input('road_test.cruise_control_engagement_test'),
                    'garebox_performance' => $request->input('road_test.garebox_performance'),
                    'engine_vibration_idle' => $request->input('road_test.engine_vibration_idle'),
                    'mid_range_power' => $request->input('road_test.mid_range_power'),
                    'highway_stability' => $request->input('road_test.highway_stability'),
                    'steering_feedback' => $request->input('road_test.steering_feedback'),
                    'abs_intervention' => $request->input('road_test.abs_intervention'),
                    'braking_performance' => $request->input('road_test.braking_performance'),
                    'transmission_harshness' => $request->input('road_test.transmission_harshness'),
                    'clutch_engagement' => $request->input('road_test.clutch_engagement'),
                    'noise_levels' => $request->input('road_test.noise_levels')
                ]);
            }

        }
    }
}