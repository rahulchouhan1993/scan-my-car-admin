<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ContactUs;
use App\Models\InspectionRequest;
use App\Models\InspectionLog;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Mail\UserLoginDetailsMail;
use App\Mail\AssignedEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Carbon\Carbon;
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
use Illuminate\Support\Facades\Storage;
class UsersController extends Controller
{
    public function index($roleType){
        $userDetails = User::where('role',$roleType)->orderBy('id','DESC')->paginate(10);
        $pageTitle = 'Admin | Users - '.ucfirst($roleType).'';
        return inertia('Admin/Users/Index',compact('userDetails','roleType', 'pageTitle'));
    }

    public function add($id, Request $request){
        if($id>0){
            $userDetails = User::find($id);
        }else{
            $userDetails = new User();
        }
        if($request->isMethod('post')){
            $rules = [
                'name'              => ['required', 'string', 'max:50'],
                'email'             => ['required', 'string', 'email', 'max:50', Rule::unique('users', 'email')->ignore($id)],
                'phone_no'          => ['required', 'string', 'max:15', Rule::unique('users', 'phone_no')->ignore($id)],
                'address'           => ['required', 'string', 'max:200'],
                'address2'          => ['nullable', 'string', 'max:200'],
                'city'              => ['required', 'string', 'max:50'],
                'state'             => ['required', 'string', 'max:50'],
                'zip'               => ['required', 'string', 'max:8'],
                'phone_no2'         => ['required'],
                'company_name'      => ['required', 'string', 'max:25'],
                'buying_limit'      => ['required', 'string', 'max:8'],
                'car_model'         => ['required', 'string', 'max:25'],
                'model_year'        => ['required', 'string', 'max:4'],
                'milage'            => ['required', 'string', 'max:8'],
                'account_manager'   => ['required', 'string', 'max:25']
            ];
            
            if ($id > 0) {
                // Editing: password is optional but must be valid if provided
                $rules['password'] = ['nullable', 'string', 'min:6', 'max:8'];
            } else {
                // Creating: password is required
                $rules['password'] = ['required', 'string', 'min:6', 'max:8'];
            }
            
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput($request->all());
            }

            $userDetails->name = $request->name;
            $userDetails->email = $request->email;
            $userDetails->phone_no = $request->phone_no;
            $userDetails->phone_no2 = $request->phone_no2;
            $userDetails->role = 'dealer';
            $userDetails->address = $request->address;
            $userDetails->address2 = $request->address2;
            $userDetails->city = $request->city;
            $userDetails->state = $request->state;
            $userDetails->zip = $request->zip;
            $userDetails->company_name = $request->company_name;
            $userDetails->buying_limit = $request->buying_limit;
            $userDetails->car_model = $request->car_model;
            $userDetails->model_year = $request->model_year;
            $userDetails->milage = $request->milage;
            $userDetails->account_manager = $request->account_manager;
            if($id>0){
                if(!empty($request->password)){
                    $userDetails->password = Hash::make($request->password);
                }
            }else{
                $randomPassword = $request->password;
                $userDetails->password = Hash::make($randomPassword);
            }
            $userDetails->save();
            if($id>0){
                return redirect()->route('admin.users',['roleType'=>'dealer'])->with('success','User Updated');
            }else{
                Mail::to($userDetails->email)->send(new UserLoginDetailsMail($userDetails, $randomPassword));
                return redirect()->route('admin.users',['roleType'=>'dealer'])->with('success','User Added');
            }
            
        }
        $pageTitle = 'Admin | Add Dealer';
        return inertia('Admin/Users/Add',compact('id','userDetails', 'pageTitle'));
    }

    public function addInspector($id, Request $request){
        if($id>0){
            $userDetails = User::find($id);
        }else{
            $userDetails = new User();
        }
        if($request->isMethod('post')){
            $rules = [
                'name'              => ['required', 'string', 'max:50'],
                'email'             => ['required', 'string', 'email', 'max:50', Rule::unique('users', 'email')->ignore($id)],
                'phone_no'          => ['required', 'string', 'max:15', Rule::unique('users', 'phone_no')->ignore($id)],
                'address'           => ['required', 'string', 'max:200'],
                'address2'          => ['nullable', 'string', 'max:200'],
                'city'              => ['required', 'string', 'max:50'],
                'state'             => ['required', 'string', 'max:50'],
                'zip'               => ['required', 'string', 'max:8'],
                'phone_no2'         => ['required'],
                'branch_manager'    => ['required', 'string', 'max:25'],
                'report_to'         => ['required', 'string', 'max:25'],
                'work_type'         => ['required', 'string', 'max:25'],
                'allocation_branch' => ['required', 'string', 'max:25'],
            ];
            
            if ($id > 0) {
                // Editing: password is optional but must be valid if provided
                $rules['password'] = ['nullable', 'string', 'min:6', 'max:8'];
            } else {
                // Creating: password is required
                $rules['password'] = ['required', 'string', 'min:6', 'max:8'];
            }
            
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput($request->all());
            }

            $userDetails->name = $request->name;
            $userDetails->email = $request->email;
            $userDetails->phone_no = $request->phone_no;
            $userDetails->phone_no2 = $request->phone_no2;
            $userDetails->role = 'inspector';
            $userDetails->address = $request->address;
            $userDetails->address2 = $request->address2;
            $userDetails->city = $request->city;
            $userDetails->state = $request->state;
            $userDetails->zip = $request->zip;
            $userDetails->branch_manager = $request->branch_manager;
            $userDetails->report_to = $request->report_to;
            $userDetails->work_type = $request->work_type;
            $userDetails->allocation_branch = $request->allocation_branch;
            if($id>0){
                if(!empty($request->password)){
                    $userDetails->password = Hash::make($request->password);
                }
            }else{
                $randomPassword = $request->password;
                $userDetails->password = Hash::make($randomPassword);
            }
            $userDetails->save();
            if($id>0){
                return redirect()->route('admin.users',['roleType'=>'inspector'])->with('success','User Updated');
            }else{
                Mail::to($userDetails->email)->send(new UserLoginDetailsMail($userDetails, $randomPassword));
                return redirect()->route('admin.users',['roleType'=>'inspector'])->with('success','User Added');
            }
            
        }
        $pageTitle = 'Admin | Add Inspector';
        return inertia('Admin/Users/AddInspector',compact('id','userDetails', 'pageTitle'));
    }

    public function updateStatus($id){
        $userDetail = User::find($id);
        if($userDetail->status==1){
            $userDetail->status = 0;
        }else{
            $userDetail->status = 1;
        }
        $userDetail->save();
        return redirect()->back()->with('success','Status Updated');
    }

    public function deleteUser($id)
    {
        $userDetail = User::find($id);
        $userDetail->delete();

        return Redirect::back()->with('success', 'User deleted successfully.');
    }

    public function markSold($id)
    {
        $detail = InspectionRequest::find($id);
        $detail->status = ($detail->status==5) ? 6 : 5;
        $detail->save();

        return Redirect::back()->with('success', 'Status Updated.');
    }
    
    public function inquiries(){
        $allInquiries = ContactUs::orderBy('id','DESC')->paginate(10);
        $pageTitle = 'Admin | Inquiries';
        return inertia('Admin/Users/Inquiries',compact('allInquiries', 'pageTitle'));
    }

    public function inquiryStatus($id){
        $userDetail = ContactUs::find($id);
        if($userDetail->seen_status==1){
            $userDetail->seen_status = 0;
        }else{
            $userDetail->seen_status = 1;
        }
        $userDetail->save();
        return redirect()->back()->with('success','Status Updated');
    }

     public function deleteInquiry($id)
    {
        $userDetail = ContactUs::find($id);
        $userDetail->delete();

        return Redirect::back()->with('success', 'Inquiry deleted successfully.');
    }

    public function serviceRequest(){
        $allInspections = InspectionRequest::with(['dealer', 'inspector'])->orderBy('id','DESC')->paginate(10);
        $pageTitle = 'Admin | Service Request';
        return inertia('Admin/Users/ServiceRequest',compact('pageTitle','allInspections'));
    }

    public function editRequest($id, Request $request){
        $inspectionsDetail = InspectionRequest::find($id);
        $oldData = $inspectionsDetail;
        $alInspectors = User::where('role','inspector')->where('status',1)->get();
        $alDealers = User::where('role','dealer')->where('status',1)->get();
        if($request->isMethod('post')){
            $preferredDate = $request->preferred_date ? Carbon::parse($request->preferred_date)->format('Y-m-d') : null;
            $assignDate = $request->assign_date ? Carbon::parse($request->assign_date)->format('Y-m-d') : null;
            $visibleTill = $request->visiblity_till ? Carbon::parse($request->visiblity_till)->format('Y-m-d') : null;
            $inspectionsDetail->inspector_id        = $request->inspector_id;
            $inspectionsDetail->dealer_id          = $request->dealer_id ?? NULL;
            $inspectionsDetail->full_name           = $request->full_name;
            $inspectionsDetail->contact_no          = $request->contact_no;
            $inspectionsDetail->email               = $request->email;
            $inspectionsDetail->address_line_1      = $request->address_line_1;
            $inspectionsDetail->address_line_2      = $request->address_line_2;
            $inspectionsDetail->city                = $request->city;
            $inspectionsDetail->pin_code            = $request->pin_code ?? NULL;
            $inspectionsDetail->car_parked          = $request->car_parked;
            $inspectionsDetail->vehicle_make        = $request->vehicle_make;
            $inspectionsDetail->other_vehicle_make  = $request->other_vehicle_make;
            $inspectionsDetail->vehicle_model       = $request->vehicle_model;
            $inspectionsDetail->vehicle_year        = $request->vehicle_year;
            $inspectionsDetail->fuel_type           = $request->fuel_type;
            $inspectionsDetail->transmission        = $request->transmission;
            $inspectionsDetail->mileage             = $request->mileage;
            $inspectionsDetail->preferred_date      = $preferredDate;
            $inspectionsDetail->visiblity_till      = $visibleTill ?? NULL;
            $inspectionsDetail->preferred_time_slot = $request->preferred_time_slot;
            $inspectionsDetail->additional_notes    = $request->additional_notes;
            $inspectionsDetail->status              = $request->status ?? 0;
            $inspectionsDetail->assign_date         = $assignDate;
            $inspectionsDetail->save();

            InspectionLog::create([
                'inspection_request_id' => $inspectionsDetail->id,
                'inspector_id'          => Auth()->user()->id,
                'log_details'           => 'Inspection Details Changed By Admin',
            ]);
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
                        'log_details'           => 'Inspection Status Changed By Admin: '.$inspectionLogBtn,
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
            
            if($request->change_identifier=='status_and_inspector_changed' || $request->change_identifier=='inspector_changed'){
                $userDetail = User::find($request->inspector_id);
                Mail::to($inspectionsDetail->email)->send(new AssignedEmail($inspectionsDetail,$userDetail));
            }

            return redirect()->back()->with('success', 'Inspection details updated successfully.');
        }
        $pageTitle = 'Admin | Service Request';
        return inertia('Admin/Users/EditRequest',compact('pageTitle','inspectionsDetail','alInspectors','alDealers'));
    }

    public function report($id, Request $request){
        $inspectionsDetail = InspectionRequest::find($id);
        $pageTitle = 'Admin | Report';
        return inertia('Admin/Users/Report',compact('pageTitle','inspectionsDetail'));
    }

    public function logs($id){
        $inspectinLogs = InspectionLog::where('inspection_request_id', $id)->orderBy('id','DESC')->paginate(10);
        $pageTitle = 'Admin | Logs';
        return inertia('Admin/Users/Logs',compact('pageTitle','inspectinLogs'));
    }

    public function updateContact($id, Request $request){
        $pageTitle = 'Admin | Contact Update';
        $contactDetails = ContactUs::find($id);

        if($request->isMethod('post')){
            $contactDetails->name = $request->name;
            $contactDetails->email = $request->email;
            $contactDetails->phone_no = $request->phone_no;
            $contactDetails->service_type = $request->service_type;
            $contactDetails->description = $request->description;
            $contactDetails->assign = $request->assign ?? NULL;
            $contactDetails->seen_status = $request->seen_status ?? 1;
            $contactDetails->notes = $request->notes;
            $contactDetails->save();
            return redirect()->back()->with('success', 'Information Updated Successfully.');
        }
        $userOption = User::where('role','inspector')->get();
        return inertia('Admin/Users/ContactUpdate',compact('pageTitle','contactDetails','userOption','id'));
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

        if($inspectionsDetail->status==1){
            $updateStatus = InspectionRequest::find($id);
            $updateStatus->status = 2;
            $updateStatus->save();
        }
        
        $pageTitle = 'Admin | Add Inspection';
        return inertia('Admin/Users/AddInspection',compact('pageTitle','inspectionsDetail'));
    }

    public function saveSvg($id, Request $request){
        $vehicleDetail = InspectionVehicleDetail::where('request_id', $id)->first();
        $vehicleDetail->svg_image = $request->svg;
        $vehicleDetail->save();
        echo 1; die;
    }

    public function submitTest($id,$savetype, Request $request){
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
            if ($inspectionsDetail && $inspectionsDetail->completed_date && $inspectionsDetail->status==5 ) {
                $completedAt = Carbon::parse($inspectionsDetail->completed_date);
                $now = Carbon::now();

                $diffMinutes = $completedAt->diffInMinutes($now);

                if ($diffMinutes > 30) {
                    return redirect()->route('admin.service-request')->with('error','You can no longer edit the details now.');
                } 
            }
            
            $documentPaths = json_decode($inspectionsDetail->documents ?? '[]', true);
            if($savetype=='normal'){
                if ($request->hasFile('documents')) {
                    foreach ($request->file('documents') as $file) {
                        $path = $file->store('vehicle_documents', 'public'); 
                        $documentPaths[] = '/storage/' . $path; 
                    }
                }
            }

            $inspectionsDetail->update([
                'other_vehicle_make' => $request->input('other_vehicle_make'),
                'vehicle_make' => $request->input('vehicle_make'),
                'vehicle_model' => $request->input('vehicle_model'),
                'vehicle_year' => $request->input('vehicle_year'),
                'fuel_type' => $request->input('fuel_type'),
                'transmission' => $request->input('transmission'),
                'car_parked' => $request->input('car_parked'),
                'mileage' => $request->input('mileage'),
                'over_comments' => $request->input('over_comments') ?? NULL,
                'accident' => $request->input('accident') ?? NULL,
                'documents' =>json_encode($documentPaths)
            ]);

            $imagePaths = json_decode($vehicleDetail->images ?? '[]', true);

            if($savetype=='normal'){
                if ($request->hasFile('vehicle_detail.images')) {
                    foreach ($request->file('vehicle_detail.images') as $file) {
                        $path = $file->store('vehicle_images', 'public'); 
                        $imagePaths[] = '/storage/' . $path; 
                    }
                }
            }

            if(empty($vehicleDetail)){
                $vehicleDetail = new InspectionVehicleDetail();
                $inspectionsDetail->vehicleDetail()->create([
                    'inspection_request_id' => $inspectionsDetail->id,
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
                    'chasis_condition' => $request->input('vehicle_detail.chasis_condition'),
                    'exterior_comments' => $request->input('vehicle_detail.exterior_comments'),
                    'normal_comments' => $request->input('vehicle_detail.normal_comments'),
                    'svg_image' => $request->input('svg_code'),
                    'images' =>json_encode($imagePaths)
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
                    'chasis_condition' => $request->input('vehicle_detail.chasis_condition'),
                    'exterior_comments' => $request->input('vehicle_detail.exterior_comments'),
                    'normal_comments' => $request->input('vehicle_detail.normal_comments'),
                    'svg_image' => $request->input('svg_code'),
                    'images' => json_encode($imagePaths)
                ]);
            }

            if(empty($bodyDetail)){
                $bodyDetail = new InspectionBodyDetail();
                $bodyDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'front_bumper' => $request->input('body_condition.front_bumper') ?? false,
                    'rear_bumper' => $request->input('body_condition.rear_bumper') ?? false,
                    'bonnet' => $request->input('body_condition.bonnet') ?? false,
                    'boot_lid' => $request->input('body_condition.boot_lid') ?? false,
                    'left_front_wing' => $request->input('body_condition.left_front_wing') ?? false,
                    'right_front_wing' => $request->input('body_condition.right_front_wing') ?? false,
                    'left_front_door_fit' => $request->input('body_condition.left_front_door_fit') ?? false,
                    'right_front_wing_fit' => $request->input('body_condition.right_front_wing_fit') ?? false,
                    'right_front_door_fit' => $request->input('body_condition.right_front_door_fit') ?? false,
                    'left_rear_door_fit' => $request->input('body_condition.left_rear_door_fit') ?? false,
                    'right_rear_door_fit' => $request->input('body_condition.right_rear_door_fit') ?? false,
                    'left_rear_quarter_panel_fit' => $request->input('body_condition.left_rear_quarter_panel_fit') ?? false,
                    'right_rear_quarter_panel_fit' => $request->input('body_condition.right_rear_quarter_panel_fit') ?? false,
                    'roof_panel_alignment' => $request->input('body_condition.roof_panel_alignment') ?? false,
                    'fender_mounting_condition' => $request->input('body_condition.fender_mounting_condition') ?? false,
                    'panel_gap_uniformity' => $request->input('body_condition.panel_gap_uniformity') ?? false,
                    'external_trim_condition' => $request->input('body_condition.external_trim_condition') ?? false,
                    'molding_clips_present' => $request->input('body_condition.molding_clips_present') ?? false,
                    'door_seals_fitment' => $request->input('body_condition.door_seals_fitment') ?? false,
                    'boot_seal_fitment' => $request->input('body_condition.boot_seal_fitment') ?? false,
                    'fuel_filler_door_operation' => $request->input('body_condition.fuel_filler_door_operation') ?? false,
                    'body_fasteners_intact' => $request->input('body_condition.body_fasteners_intact') ?? false,
                    'tow_eye_point_secure' => $request->input('body_condition.tow_eye_point_secure') ?? false,
                    'bumper_reinforcement_visible' => $request->input('body_condition.bumper_reinforcement_visible') ?? false,
                    'undercarriage_guards' => $request->input('body_condition.undercarriage_guards') ?? false,
                    'panel_repair_signs' => $request->input('body_condition.panel_repair_signs') ?? false,
                    'exterior_accessory_fitment' => $request->input('body_condition.exterior_accessory_fitment') ?? false,
                ]);
            }else{
                $bodyDetail->update([
                    'front_bumper' => $request->input('body_condition.front_bumper') ?? false,
                    'rear_bumper'  => $request->input('body_condition.rear_bumper') ?? false,
                    'bonnet' => $request->input('body_condition.bonnet') ?? false,
                    'boot_lid' => $request->input('body_condition.boot_lid') ?? false,
                    'left_front_wing' => $request->input('body_condition.left_front_wing') ?? false,
                    'right_front_wing' => $request->input('body_condition.right_front_wing') ?? false,
                    'left_front_door_fit' => $request->input('body_condition.left_front_door_fit') ?? false,
                    'right_front_wing_fit' => $request->input('body_condition.right_front_wing_fit') ?? false,
                    'right_front_door_fit' => $request->input('body_condition.right_front_door_fit') ?? false,
                    'left_rear_door_fit' => $request->input('body_condition.left_rear_door_fit') ?? false,
                    'right_rear_door_fit' => $request->input('body_condition.right_rear_door_fit') ?? false,
                    'left_rear_quarter_panel_fit' => $request->input('body_condition.left_rear_quarter_panel_fit') ?? false,
                    'right_rear_quarter_panel_fit' => $request->input('body_condition.right_rear_quarter_panel_fit') ?? false,
                    'roof_panel_alignment' => $request->input('body_condition.roof_panel_alignment') ?? false,
                    'fender_mounting_condition' => $request->input('body_condition.fender_mounting_condition') ?? false,
                    'panel_gap_uniformity' => $request->input('body_condition.panel_gap_uniformity') ?? false,
                    'external_trim_condition' => $request->input('body_condition.external_trim_condition') ?? false,
                    'molding_clips_present' => $request->input('body_condition.molding_clips_present') ?? false,
                    'door_seals_fitment' => $request->input('body_condition.door_seals_fitment') ?? false,
                    'boot_seal_fitment' => $request->input('body_condition.boot_seal_fitment') ?? false,
                    'fuel_filler_door_operation' => $request->input('body_condition.fuel_filler_door_operation') ?? false,
                    'body_fasteners_intact' => $request->input('body_condition.body_fasteners_intact') ?? false,
                    'tow_eye_point_secure' => $request->input('body_condition.tow_eye_point_secure') ?? false,
                    'bumper_reinforcement_visible' => $request->input('body_condition.bumper_reinforcement_visible') ?? false,
                    'undercarriage_guards' => $request->input('body_condition.undercarriage_guards') ?? false,
                    'panel_repair_signs' => $request->input('body_condition.panel_repair_signs') ?? false,
                    'exterior_accessory_fitment' => $request->input('body_condition.exterior_accessory_fitment') ?? false,
                ]);
            }

            if(empty($glassDetail)){
                $glassDetail = new InspectionGlassDetail();
                $glassDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'windshield_condition' => implode(',', (array)$request->input('glass_detail.windshield_condition')),
                    'windshield_wiper_function' => implode(',', (array)$request->input('glass_detail.windshield_wiper_function')),
                    'wiper_blade_wear' => implode(',', (array)$request->input('glass_detail.wiper_blade_wear')),
                    'rear_wiper_function' => implode(',', (array)$request->input('glass_detail.rear_wiper_function')),
                    'side_window_operation_lf' => implode(',', (array)$request->input('glass_detail.side_window_operation_lf')),
                    'side_window_operation_rf' => implode(',', (array)$request->input('glass_detail.side_window_operation_rf')),
                    'side_window_operation_lr' => implode(',', (array)$request->input('glass_detail.side_window_operation_lr')),
                    'side_window_operation_rr' => implode(',', (array)$request->input('glass_detail.side_window_operation_rr')),
                    'rear_window_condition' => implode(',', (array)$request->input('glass_detail.rear_window_condition')),
                    'sunroof_operation' => implode(',', (array)$request->input('glass_detail.sunroof_operation')),
                    'sunroof_drainage_check' => implode(',', (array)$request->input('glass_detail.sunroof_drainage_check')),
                    'sunroof_glass_condition' => implode(',', (array)$request->input('glass_detail.sunroof_glass_condition')),
                    'left_external_mirror_function' => implode(',', (array)$request->input('glass_detail.left_external_mirror_function')),
                    'right_external_mirror_function' => implode(',', (array)$request->input('glass_detail.right_external_mirror_function')),
                    'mirror_adjustment_motors' => implode(',', (array)$request->input('glass_detail.mirror_adjustment_motors')),
                    'comments' => implode(',', (array)$request->input('glass_detail.comments')) ?? NULL
                ]);
            }else{
                $glassDetail->update([
                    'windshield_condition' => implode(',', (array)$request->input('glass_detail.windshield_condition')),
                    'windshield_wiper_function' => implode(',', (array)$request->input('glass_detail.windshield_wiper_function')),
                    'wiper_blade_wear' => implode(',', (array)$request->input('glass_detail.wiper_blade_wear')),
                    'rear_wiper_function' => implode(',', (array)$request->input('glass_detail.rear_wiper_function')),
                    'side_window_operation_lf' => implode(',', (array)$request->input('glass_detail.side_window_operation_lf')),
                    'side_window_operation_rf' => implode(',', (array)$request->input('glass_detail.side_window_operation_rf')),
                    'side_window_operation_lr' => implode(',', (array)$request->input('glass_detail.side_window_operation_lr')),
                    'side_window_operation_rr' => implode(',', (array)$request->input('glass_detail.side_window_operation_rr')),
                    'rear_window_condition' => implode(',', (array)$request->input('glass_detail.rear_window_condition')),
                    'sunroof_operation' => implode(',', (array)$request->input('glass_detail.sunroof_operation')),
                    'sunroof_drainage_check' => implode(',', (array)$request->input('glass_detail.sunroof_drainage_check')),
                    'sunroof_glass_condition' => implode(',', (array)$request->input('glass_detail.sunroof_glass_condition')),
                    'left_external_mirror_function' => implode(',', (array)$request->input('glass_detail.left_external_mirror_function')),
                    'right_external_mirror_function' => implode(',', (array)$request->input('glass_detail.right_external_mirror_function')),
                    'mirror_adjustment_motors' => implode(',', (array)$request->input('glass_detail.mirror_adjustment_motors')),
                    'comments' => implode(',', (array)$request->input('glass_detail.comments')) ?? NULL
                ]);
            }
            
            if(empty($engineDetail)){
                $engineDetail = new InspectionEngineDetail();
                $engineDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'engine_start_behavior_cold' => implode(',', (array)$request->input('engine_detail.engine_start_behavior_cold')),
                    'engine_start_behavior_warm' => implode(',', (array)$request->input('engine_detail.engine_start_behavior_warm')),
                    'idle_stability' => implode(',', (array)$request->input('engine_detail.idle_stability')),
                    'throttle_response' => implode(',', (array)$request->input('engine_detail.throttle_response')),
                    'abnormal_engine_noises' => implode(',', (array)$request->input('engine_detail.abnormal_engine_noises')),
                    'engine_oil_level_check' => implode(',', (array)$request->input('engine_detail.engine_oil_level_check')),
                    'engine_oil_appearance' => implode(',', (array)$request->input('engine_detail.engine_oil_appearance')),
                    'visible_oil_leaks' => implode(',', (array)$request->input('engine_detail.visible_oil_leaks')),
                    'oil_filter_housing_condition' => implode(',', (array)$request->input('engine_detail.oil_filter_housing_condition')),
                    'coolant_level_check' => implode(',', (array)$request->input('engine_detail.coolant_level_check')),
                    'coolant_color' => implode(',', (array)$request->input('engine_detail.coolant_color')),
                    'coolant_leaks' => implode(',', (array)$request->input('engine_detail.coolant_leaks')),
                    'signs_of_coolant_in_oil' => implode(',', (array)$request->input('engine_detail.signs_of_coolant_in_oil')),
                    'hose_condition' => implode(',', (array)$request->input('engine_detail.hose_condition')),
                    'drive_belt_condition' => implode(',', (array)$request->input('engine_detail.drive_belt_condition')),
                    'timing_belt_condition' => implode(',', (array)$request->input('engine_detail.timing_belt_condition')),
                    'turbo_boost_check' => implode(',', (array)$request->input('engine_detail.turbo_boost_check')),
                    'air_intake_condition' => implode(',', (array)$request->input('engine_detail.air_intake_condition')),
                    'air_filter_element' => implode(',', (array)$request->input('engine_detail.air_filter_element')),
                    'starter_motor_cranking' => implode(',', (array)$request->input('engine_detail.starter_motor_cranking')),
                    'fuse_box_access' => implode(',', (array)$request->input('engine_detail.fuse_box_access')),
                    // Free text fields
                    'any_noice' => $request->input('engine_detail.any_noice') ?? NULL,
                    'comments_engine' => $request->input('engine_detail.comments_engine') ?? NULL
                ]);
            }else{
                $engineDetail->update([
                    'engine_start_behavior_cold' => implode(',', (array)$request->input('engine_detail.engine_start_behavior_cold')),
                    'engine_start_behavior_warm' => implode(',', (array)$request->input('engine_detail.engine_start_behavior_warm')),
                    'idle_stability' => implode(',', (array)$request->input('engine_detail.idle_stability')),
                    'throttle_response' => implode(',', (array)$request->input('engine_detail.throttle_response')),
                    'abnormal_engine_noises' => implode(',', (array)$request->input('engine_detail.abnormal_engine_noises')),
                    'engine_oil_level_check' => implode(',', (array)$request->input('engine_detail.engine_oil_level_check')),
                    'engine_oil_appearance' => implode(',', (array)$request->input('engine_detail.engine_oil_appearance')),
                    'visible_oil_leaks' => implode(',', (array)$request->input('engine_detail.visible_oil_leaks')),
                    'oil_filter_housing_condition' => implode(',', (array)$request->input('engine_detail.oil_filter_housing_condition')),
                    'coolant_level_check' => implode(',', (array)$request->input('engine_detail.coolant_level_check')),
                    'coolant_color' => implode(',', (array)$request->input('engine_detail.coolant_color')),
                    'coolant_leaks' => implode(',', (array)$request->input('engine_detail.coolant_leaks')),
                    'signs_of_coolant_in_oil' => implode(',', (array)$request->input('engine_detail.signs_of_coolant_in_oil')),
                    'hose_condition' => implode(',', (array)$request->input('engine_detail.hose_condition')),
                    'drive_belt_condition' => implode(',', (array)$request->input('engine_detail.drive_belt_condition')),
                    'timing_belt_condition' => implode(',', (array)$request->input('engine_detail.timing_belt_condition')),
                    'turbo_boost_check' => implode(',', (array)$request->input('engine_detail.turbo_boost_check')),
                    'air_intake_condition' => implode(',', (array)$request->input('engine_detail.air_intake_condition')),
                    'air_filter_element' => implode(',', (array)$request->input('engine_detail.air_filter_element')),
                    'starter_motor_cranking' => implode(',', (array)$request->input('engine_detail.starter_motor_cranking')),
                    'fuse_box_access' => implode(',', (array)$request->input('engine_detail.fuse_box_access')),
                    // Free text fields
                    'any_noice' => $request->input('engine_detail.any_noice') ?? NULL,
                    'comments_engine' => $request->input('engine_detail.comments_engine') ?? NULL
                ]);
            }

            if(empty($clusterDetail)){
                $clusterDetail = new InspectionClusterDetail();
                $clusterDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'engine_light' => $request->input('cluster_detail.engine_light'),
                    'abs_light' => $request->input('cluster_detail.abs_light'),
                    'oil_pressure_light' => $request->input('cluster_detail.oil_pressure_light'),
                    'battery_charging_system_light' => $request->input('cluster_detail.battery_charging_system_light'),
                    'coolant_temperature_warning_light' => $request->input('cluster_detail.coolant_temperature_warning_light'),
                    'brake_system_warning_light' => $request->input('cluster_detail.brake_system_warning_light'),
                    'airbag_warning_light' => $request->input('cluster_detail.airbag_warning_light'),
                    'seatbelt_reminder_light' => $request->input('cluster_detail.seatbelt_reminder_light'),
                    'traction_control_light' => $request->input('cluster_detail.traction_control_light'),
                    'tpms' => $request->input('cluster_detail.tpms'),
                    'comments' => $request->input('cluster_detail.comments') ?? NULL,
                    'brake_system_warning_light' => $request->input('cluster_detail.brake_system_warning_light') ?? NULL,
                ]);
            }else{
                $clusterDetail->update([
                    'engine_light' => $request->input('cluster_detail.engine_light'),
                    'abs_light' => $request->input('cluster_detail.abs_light'),
                    'oil_pressure_light' => $request->input('cluster_detail.oil_pressure_light'),
                    'battery_charging_system_light' => $request->input('cluster_detail.battery_charging_system_light'),
                    'coolant_temperature_warning_light' => $request->input('cluster_detail.coolant_temperature_warning_light'),
                    'brake_system_warning_light' => $request->input('cluster_detail.brake_system_warning_light'),
                    'airbag_warning_light' => $request->input('cluster_detail.airbag_warning_light'),
                    'seatbelt_reminder_light' => $request->input('cluster_detail.seatbelt_reminder_light'),
                    'traction_control_light' => $request->input('cluster_detail.traction_control_light'),
                    'tpms' => $request->input('cluster_detail.tpms'),
                    'comments' => $request->input('cluster_detail.comments') ?? NULL,
                    'brake_system_warning_light' => $request->input('cluster_detail.brake_system_warning_light') ?? NULL,
                ]);
            }

            if(empty($transmissionDetail)){
                $transmissionDetail = new InspectionTransmissionDetail();
                $transmissionDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'transmission_fluid_level_auto' => $request->input('transmission_detail.transmission_fluid_level_auto'),
                    'manual_gearbox_oil_check' => $request->input('transmission_detail.manual_gearbox_oil_check'),
                    'transmission_mount_integrity' => $request->input('transmission_detail.transmission_mount_integrity'),
                    'gear_selection_smoothness' => $request->input('transmission_detail.gear_selection_smoothness'),
                    'clutch_bite_slippage' => $request->input('transmission_detail.clutch_bite_slippage'),
                    'automatic_shift_quality' => $request->input('transmission_detail.automatic_shift_quality'),
                    'transfer_case_engagement' => $request->input('transmission_detail.transfer_case_engagement'),
                    'drive_shaft_visual_inspection' => $request->input('transmission_detail.drive_shaft_visual_inspection'),
                    'cv_joint_boot_integrity' => $request->input('transmission_detail.cv_joint_boot_integrity'),
                    'u_joints_coupling_check' => $request->input('transmission_detail.u_joints_coupling_check'),
                    'differential_oil_condition' => $request->input('transmission_detail.differential_oil_condition'),
                    'differential_housing_leaks' => $request->input('transmission_detail.differential_housing_leaks'),
                    'gearbox_unusual_noise' => $request->input('transmission_detail.gearbox_unusual_noise') ?? NULL,
                    'comments_transmission' => $request->input('transmission_detail.comments_transmission') ?? NULL
                ]);
            }else{
                $transmissionDetail->update([
                    'transmission_fluid_level_auto' => $request->input('transmission_detail.transmission_fluid_level_auto'),
                    'manual_gearbox_oil_check' => $request->input('transmission_detail.manual_gearbox_oil_check'),
                    'transmission_mount_integrity' => $request->input('transmission_detail.transmission_mount_integrity'),
                    'gear_selection_smoothness' => $request->input('transmission_detail.gear_selection_smoothness'),
                    'clutch_bite_slippage' => $request->input('transmission_detail.clutch_bite_slippage'),
                    'automatic_shift_quality' => $request->input('transmission_detail.automatic_shift_quality'),
                    'transfer_case_engagement' => $request->input('transmission_detail.transfer_case_engagement'),
                    'drive_shaft_visual_inspection' => $request->input('transmission_detail.drive_shaft_visual_inspection'),
                    'cv_joint_boot_integrity' => $request->input('transmission_detail.cv_joint_boot_integrity'),
                    'u_joints_coupling_check' => $request->input('transmission_detail.u_joints_coupling_check'),
                    'differential_oil_condition' => $request->input('transmission_detail.differential_oil_condition'),
                    'differential_housing_leaks' => $request->input('transmission_detail.differential_housing_leaks'),
                    'gearbox_unusual_noise' => $request->input('transmission_detail.gearbox_unusual_noise') ?? NULL,
                    'comments_transmission' => $request->input('transmission_detail.comments_transmission') ?? NULL
                ]);
            }

            if(empty($suspensionDetail)){
                $suspensionDetail = new InspectionSuspensionDetail();
                $suspensionDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'front_strut_mount_condition' => $request->input('suspension_detail.front_strut_mount_condition'),
                    'rear_strut_mount_condition' => $request->input('suspension_detail.rear_strut_mount_condition'),
                    'front_shock_absorber_function' => $request->input('suspension_detail.front_shock_absorber_function'),
                    'rear_shock_absorber_function' => $request->input('suspension_detail.rear_shock_absorber_function'),
                    'front_spring_integrity' => $request->input('suspension_detail.front_spring_integrity'),
                    'rear_spring_integrity' => $request->input('suspension_detail.rear_spring_integrity'),
                    'control_arm_bush_condition' => $request->input('suspension_detail.control_arm_bush_condition'),
                    'lower_ball_joint_play' => $request->input('suspension_detail.lower_ball_joint_play'),
                    'upper_ball_joint_play' => $request->input('suspension_detail.upper_ball_joint_play'),
                    'anti_roll_bar_links_bushes' => $request->input('suspension_detail.anti_roll_bar_links_bushes'),
                    'steering_rack_seal_condition' => $request->input('suspension_detail.steering_rack_seal_condition'),
                    'steering_rack_play_check' => $request->input('suspension_detail.steering_rack_play_check'),
                    'rack_end_condition' => $request->input('suspension_detail.rack_end_condition'),
                    'tie_rod_end_play' => $request->input('suspension_detail.tie_rod_end_play'),
                    'steering_column_noises' => $request->input('suspension_detail.steering_column_noises'),
                    'power_steering_fluid_level_color' => $request->input('suspension_detail.power_steering_fluid_level_color'),
                    'power_steering_pump_noise' => $request->input('suspension_detail.power_steering_pump_noise'),
                    'subframe_mount_condition' => $request->input('suspension_detail.subframe_mount_condition'),
                    'chassis_mounts_security' => $request->input('suspension_detail.chassis_mounts_security'),
                    'steering_wheel_free_play' => $request->input('suspension_detail.steering_wheel_free_play'),
                    'comments_suspension' => $request->input('suspension_detail.comments_suspension') ?? NULL
                ]);
            }else{
                $suspensionDetail->update([
                    'front_strut_mount_condition' => $request->input('suspension_detail.front_strut_mount_condition'),
                    'rear_strut_mount_condition' => $request->input('suspension_detail.rear_strut_mount_condition'),
                    'front_shock_absorber_function' => $request->input('suspension_detail.front_shock_absorber_function'),
                    'rear_shock_absorber_function' => $request->input('suspension_detail.rear_shock_absorber_function'),
                    'front_spring_integrity' => $request->input('suspension_detail.front_spring_integrity'),
                    'rear_spring_integrity' => $request->input('suspension_detail.rear_spring_integrity'),
                    'control_arm_bush_condition' => $request->input('suspension_detail.control_arm_bush_condition'),
                    'lower_ball_joint_play' => $request->input('suspension_detail.lower_ball_joint_play'),
                    'upper_ball_joint_play' => $request->input('suspension_detail.upper_ball_joint_play'),
                    'anti_roll_bar_links_bushes' => $request->input('suspension_detail.anti_roll_bar_links_bushes'),
                    'steering_rack_seal_condition' => $request->input('suspension_detail.steering_rack_seal_condition'),
                    'steering_rack_play_check' => $request->input('suspension_detail.steering_rack_play_check'),
                    'rack_end_condition' => $request->input('suspension_detail.rack_end_condition'),
                    'tie_rod_end_play' => $request->input('suspension_detail.tie_rod_end_play'),
                    'steering_column_noises' => $request->input('suspension_detail.steering_column_noises'),
                    'power_steering_fluid_level_color' => $request->input('suspension_detail.power_steering_fluid_level_color'),
                    'power_steering_pump_noise' => $request->input('suspension_detail.power_steering_pump_noise'),
                    'subframe_mount_condition' => $request->input('suspension_detail.subframe_mount_condition'),
                    'chassis_mounts_security' => $request->input('suspension_detail.chassis_mounts_security'),
                    'steering_wheel_free_play' => $request->input('suspension_detail.steering_wheel_free_play'),
                    'comments_suspension' => $request->input('suspension_detail.comments_suspension') ?? NULL
                ]);
            }
            
            if(empty($brakeDetail)){
                $brakeDetail = new InspectionBreaksDetail();
                $brakeDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'master_cylinder_seal_condition' => $request->input('brakes_detail.master_cylinder_seal_condition'),
                    'brake_booster_operation' => $request->input('brakes_detail.brake_booster_operation'),
                    'front_disc_condition_runout' => $request->input('brakes_detail.front_disc_condition_runout'),
                    'rear_disc_drum_condition' => $request->input('brakes_detail.rear_disc_drum_condition'),
                    'front_pad' => $request->input('brakes_detail.front_pad'),
                    'rear_pad' => $request->input('brakes_detail.rear_pad'),
                    'handbrake_adjustment_holding' => $request->input('brakes_detail.handbrake_adjustment_holding'),
                    'abs_function_wheel_speed_check' => $request->input('brakes_detail.abs_function_wheel_speed_check'),
                    'brake_pedal_travel_firmness' => $request->input('brakes_detail.brake_pedal_travel_firmness'),
                    'brake_fluid_contamination_test_note' => $request->input('brakes_detail.brake_fluid_contamination_test_note'),
                    'comments_brakes' => $request->input('brakes_detail.comments_brakes') ?? NULL,
                ]);
            }else{
                $brakeDetail->update([
                    'master_cylinder_seal_condition' => $request->input('brakes_detail.master_cylinder_seal_condition'),
                    'brake_booster_operation' => $request->input('brakes_detail.brake_booster_operation'),
                    'front_disc_condition_runout' => $request->input('brakes_detail.front_disc_condition_runout'),
                    'rear_disc_drum_condition' => $request->input('brakes_detail.rear_disc_drum_condition'),
                    'front_pad' => $request->input('brakes_detail.front_pad'),
                    'rear_pad' => $request->input('brakes_detail.rear_pad'),
                    'handbrake_adjustment_holding' => $request->input('brakes_detail.handbrake_adjustment_holding'),
                    'abs_function_wheel_speed_check' => $request->input('brakes_detail.abs_function_wheel_speed_check'),
                    'brake_pedal_travel_firmness' => $request->input('brakes_detail.brake_pedal_travel_firmness'),
                    'brake_fluid_contamination_test_note' => $request->input('brakes_detail.brake_fluid_contamination_test_note'),
                    'comments_brakes' => $request->input('brakes_detail.comments_brakes') ?? NULL,
                ]);
            }

            if(empty($tyreDetail)){
                $tyreDetail = new InspectionTyreDetail();
                $tyreDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'tyre_brand_size_lf' => $request->input('tyre_detail.tyre_brand_size_lf'),
                    'tyre_brand_size_rf' => $request->input('tyre_detail.tyre_brand_size_rf'),
                    'tyre_brand_size_lr' => $request->input('tyre_detail.tyre_brand_size_lr'),
                    'tyre_brand_size_rr' => $request->input('tyre_detail.tyre_brand_size_rr'),
                    'tyre_manufacture_date_lf' => $request->input('tyre_detail.tyre_manufacture_date_lf'),
                    'tyre_manufacture_date_rf' => $request->input('tyre_detail.tyre_manufacture_date_rf'),
                    'tyre_manufacture_date_lr' => $request->input('tyre_detail.tyre_manufacture_date_lr'),
                    'tyre_manufacture_date_rr' => $request->input('tyre_detail.tyre_manufacture_date_rr'),
                    'tread_depth_lf' => $request->input('tyre_detail.tread_depth_lf'),
                    'tread_depth_rf' => $request->input('tyre_detail.tread_depth_rf'),
                    'tread_depth_lr' => $request->input('tyre_detail.tread_depth_lr'),
                    'tread_depth_rr' => $request->input('tyre_detail.tread_depth_rr'),
                    'tyre_pressure' => $request->input('tyre_detail.tyre_pressure'),
                    'spare_wheel_condition' => $request->input('tyre_detail.spare_wheel_condition'),
                    'tyre_comment' => $request->input('tyre_detail.tyre_comment') ?? NULL
                ]);
            }else{
                $tyreDetail->update([
                    'tyre_brand_size_lf' => $request->input('tyre_detail.tyre_brand_size_lf'),
                    'tyre_brand_size_rf' => $request->input('tyre_detail.tyre_brand_size_rf'),
                    'tyre_brand_size_lr' => $request->input('tyre_detail.tyre_brand_size_lr'),
                    'tyre_brand_size_rr' => $request->input('tyre_detail.tyre_brand_size_rr'),
                    'tyre_manufacture_date_lf' => $request->input('tyre_detail.tyre_manufacture_date_lf'),
                    'tyre_manufacture_date_rf' => $request->input('tyre_detail.tyre_manufacture_date_rf'),
                    'tyre_manufacture_date_lr' => $request->input('tyre_detail.tyre_manufacture_date_lr'),
                    'tyre_manufacture_date_rr' => $request->input('tyre_detail.tyre_manufacture_date_rr'),
                    'tread_depth_lf' => $request->input('tyre_detail.tread_depth_lf'),
                    'tread_depth_rf' => $request->input('tyre_detail.tread_depth_rf'),
                    'tread_depth_lr' => $request->input('tyre_detail.tread_depth_lr'),
                    'tread_depth_rr' => $request->input('tyre_detail.tread_depth_rr'),
                    'tyre_pressure' => $request->input('tyre_detail.tyre_pressure'),
                    'spare_wheel_condition' => $request->input('tyre_detail.spare_wheel_condition'),
                    'tyre_comment' => $request->input('tyre_detail.tyre_comment') ?? NULL
                ]);
            }

            if(empty($interiorDetail)){
                $interiorDetail = new InspectionInteriorDetail();
                $interiorDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'dashboard_fit_finish' => $request->input('interior_detail.dashboard_fit_finish'),
                    'instrument_cluster_illumination' => $request->input('interior_detail.instrument_cluster_illumination'),
                    'odometer_function' => $request->input('interior_detail.odometer_function'),
                    'interior_lighting' => $request->input('interior_detail.interior_lighting'),
                    'glove_box_latching' => $request->input('interior_detail.glove_box_latching'),
                    'carpet_wear_retention' => $request->input('interior_detail.carpet_wear_retention'),
                    'interior_contamination_odour' => $request->input('interior_detail.interior_contamination_odour'),
                    'trunk_boot_interior_condition' => $request->input('interior_detail.trunk_boot_interior_condition'),
                    'comment' => $request->input('interior_detail.comment') ?? NULL
                ]);
            }else{
                $interiorDetail->update([
                    'request_id' => $inspectionsDetail->id,
                    'dashboard_fit_finish' => $request->input('interior_detail.dashboard_fit_finish'),
                    'instrument_cluster_illumination' => $request->input('interior_detail.instrument_cluster_illumination'),
                    'odometer_function' => $request->input('interior_detail.odometer_function'),
                    'interior_lighting' => $request->input('interior_detail.interior_lighting'),
                    'glove_box_latching' => $request->input('interior_detail.glove_box_latching'),
                    'carpet_wear_retention' => $request->input('interior_detail.carpet_wear_retention'),
                    'interior_contamination_odour' => $request->input('interior_detail.interior_contamination_odour'),
                    'trunk_boot_interior_condition' => $request->input('interior_detail.trunk_boot_interior_condition'),
                     'comment' => $request->input('interior_detail.comment') ?? NULL
                ]);
            }

            if(empty($seatDetail)){
                $seatDetail = new InspectionSeatDetail();
                $seatDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'driver_seat_adjust_locks' => $request->input('seat_detail.driver_seat_adjust_locks'),
                    'passenger_seat_adjust_locks' => $request->input('seat_detail.passenger_seat_adjust_locks'),
                    'seat_type' => $request->input('seat_detail.seat_type'),
                    'seat_sliding_rails' => $request->input('seat_detail.seat_sliding_rails'),
                    'seat_cushion_wear' => $request->input('seat_detail.seat_cushion_wear'),
                    'seat_upholstery_integrity' => $request->input('seat_detail.seat_upholstery_integrity'),
                    'comment' => $request->input('seat_detail.comment') ?? NULL
                ]);
            }else{
                $seatDetail->update([
                    'request_id' => $inspectionsDetail->id,
                    'driver_seat_adjust_locks' => $request->input('seat_detail.driver_seat_adjust_locks'),
                    'passenger_seat_adjust_locks' => $request->input('seat_detail.passenger_seat_adjust_locks'),
                    'seat_type' => $request->input('seat_detail.seat_type'),
                    'seat_sliding_rails' => $request->input('seat_detail.seat_sliding_rails'),
                    'seat_cushion_wear' => $request->input('seat_detail.seat_cushion_wear'),
                    'seat_upholstery_integrity' => $request->input('seat_detail.seat_upholstery_integrity'),
                    'comment' => $request->input('seat_detail.comment') ?? NULL
                ]);
            }

            if(empty($hvacDetail)){
                $hvacDetail = new InspectionHvacDetail();
                $hvacDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'air_condition' => implode(',', (array)$request->input('hvac_detail.air_condition')),
                    'infotainment_condition' => implode(',', (array)$request->input('hvac_detail.infotainment_condition')),
                    'radio_condition' => implode(',', (array)$request->input('hvac_detail.radio_condition')),
                    'heating_cooling_system' => $request->input('hvac_detail.heating_cooling_system'),
                    'comment' => $request->input('hvac_detail.comment') ?? NULL
                ]);
            }else{
                $hvacDetail->update([
                    'request_id' => $inspectionsDetail->id,
                    'air_condition' => implode(',', (array)$request->input('hvac_detail.air_condition')),
                    'infotainment_condition' => implode(',', (array)$request->input('hvac_detail.infotainment_condition')),
                    'radio_condition' => implode(',', (array)$request->input('hvac_detail.radio_condition')),
                    'heating_cooling_system' => $request->input('hvac_detail.heating_cooling_system'),
                    'comment' => $request->input('hvac_detail.comment') ?? NULL
                ]);
            }

            if(empty($coolingDetail)){
                $coolingDetail = new InspectionCoolingDetail();
                $coolingDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'radiator_core_condition' => $request->input('cooling_detail.radiator_core_condition'),
                    'radiator_fan_operation' => $request->input('cooling_detail.radiator_fan_operation'),
                    'cycling_observation' => $request->input('cooling_detail.cycling_observation'),
                    'overflow_expansion_tank_condition' => $request->input('cooling_detail.overflow_expansion_tank_condition'),
                    'heater_core_performance' => $request->input('cooling_detail.heater_core_performance'),
                    'fuel_tank_inspection' => $request->input('cooling_detail.fuel_tank_inspection'),
                    'comment' => $request->input('cooling_detail.comment') ?? NULL
                ]);
            }else{
                $coolingDetail->update([
                    'radiator_core_condition' => $request->input('cooling_detail.radiator_core_condition'),
                    'radiator_fan_operation' => $request->input('cooling_detail.radiator_fan_operation'),
                    'cycling_observation' => $request->input('cooling_detail.cycling_observation'),
                    'overflow_expansion_tank_condition' => $request->input('cooling_detail.overflow_expansion_tank_condition'),
                    'heater_core_performance' => $request->input('cooling_detail.heater_core_performance'),
                    'fuel_tank_inspection' => $request->input('cooling_detail.fuel_tank_inspection'),
                    'comment' => $request->input('cooling_detail.comment') ?? NULL
                ]); 
            }

            if(empty($electricalDetail)){
                $electricalDetail = new InspectionElectricalDetail();
                $electricalDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'starter_engagement_reliability' => $request->input('electrical_detail.starter_engagement_reliability'),
                    'front_indicators_function' => $request->input('electrical_detail.front_indicators_function'),
                    'rear_indicators_function' => $request->input('electrical_detail.rear_indicators_function'),
                    'reverse_light_function' => $request->input('electrical_detail.reverse_light_function'),
                    'fog_lights_front_rear' => $request->input('electrical_detail.fog_lights_front_rear'),
                    'interior_control_switches_backlight' => $request->input('electrical_detail.interior_control_switches_backlight'),
                    'parking_sensor_functionality' => $request->input('electrical_detail.parking_sensor_functionality'),
                     'comment' => $request->input('electrical_detail.comment') ?? NULL
                ]);
            }else{
                $electricalDetail->update([
                    'starter_engagement_reliability' => $request->input('electrical_detail.starter_engagement_reliability'),
                    'front_indicators_function' => $request->input('electrical_detail.front_indicators_function'),
                    'rear_indicators_function' => $request->input('electrical_detail.rear_indicators_function'),
                    'reverse_light_function' => $request->input('electrical_detail.reverse_light_function'),
                    'fog_lights_front_rear' => $request->input('electrical_detail.fog_lights_front_rear'),
                    'interior_control_switches_backlight' => $request->input('electrical_detail.interior_control_switches_backlight'),
                    'parking_sensor_functionality' => $request->input('electrical_detail.parking_sensor_functionality'),
                    'comment' => $request->input('electrical_detail.comment') ?? NULL
                ]);
            }

            if(empty($roadTestDetail)){
                $roadTestDetail = new InspectionRoadTestDetail();
                $roadTestDetail->create([
                    'request_id' => $inspectionsDetail->id,
                    'start_performance' => $request->input('road_test_detail.start_performance'),
                    'acceleration_responsiveness' => $request->input('road_test_detail.acceleration_responsiveness'),
                    'cruise_control_engagement_test' => $request->input('road_test_detail.cruise_control_engagement_test'),
                    'garebox_performance' => $request->input('road_test_detail.garebox_performance'),
                    'engine_vibration_idle' => $request->input('road_test_detail.engine_vibration_idle'),
                    'mid_range_power' => $request->input('road_test_detail.mid_range_power'),
                    'highway_stability' => $request->input('road_test_detail.highway_stability'),
                    'steering_feedback' => $request->input('road_test_detail.steering_feedback'),
                    'abs_intervention' => $request->input('road_test_detail.abs_intervention'),
                    'braking_performance' => $request->input('road_test_detail.braking_performance'),
                    'transmission_harshness' => $request->input('road_test_detail.transmission_harshness'),
                    'clutch_engagement' => $request->input('road_test_detail.clutch_engagement'),
                    'noise_levels' => $request->input('road_test_detail.noise_levels'),
                    'comment' => $request->input('road_test_detail.comment') ?? NULL
                ]);
            }else{
                $roadTestDetail->update([
                    'start_performance' => $request->input('road_test_detail.start_performance'),
                    'acceleration_responsiveness' => $request->input('road_test_detail.acceleration_responsiveness'),
                    'cruise_control_engagement_test' => $request->input('road_test_detail.cruise_control_engagement_test'),
                    'garebox_performance' => $request->input('road_test_detail.garebox_performance'),
                    'engine_vibration_idle' => $request->input('road_test_detail.engine_vibration_idle'),
                    'mid_range_power' => $request->input('road_test_detail.mid_range_power'),
                    'highway_stability' => $request->input('road_test_detail.highway_stability'),
                    'steering_feedback' => $request->input('road_test_detail.steering_feedback'),
                    'abs_intervention' => $request->input('road_test_detail.abs_intervention'),
                    'braking_performance' => $request->input('road_test_detail.braking_performance'),
                    'transmission_harshness' => $request->input('road_test_detail.transmission_harshness'),
                    'clutch_engagement' => $request->input('road_test_detail.clutch_engagement'),
                    'noise_levels' => $request->input('road_test_detail.noise_levels'),
                    'comment' => $request->input('road_test_detail.comment') ?? NULL
                ]);
            }

            if($savetype=='normal'){
                $inspectionsDetail->update([
                    'completed_date' => Carbon::now(), // saves current date & time
                    'status' => 4,
                ]);
                return redirect()->route('admin.service-request')->with('success','Inspection Saved.');
            }
        
        }

    }

    public function deleteFile($id,$typefile,$index){
        $typefile = $typefile;
        $index = (int) $index;
       
        if ($typefile === 'documents') {
            $inspection = InspectionRequest::findOrFail($id);
            $documents = json_decode($inspection->documents, true) ?? [];
            if (isset($documents[$index])) {
                $fileToDelete = $documents[$index];
                unset($documents[$index]);
                $inspection->documents = array_values($documents);
                $inspection->save();

                $path = str_replace('/storage/vehicle_documents/', '', $fileToDelete);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }
        } else {
            $inspectionDetail = InspectionVehicleDetail::where('request_id', $id)->firstOrFail();
            $images = json_decode($inspectionDetail->images, true) ?? [];
            if (isset($images[$index])) {
                $fileToDelete = $images[$index];
                unset($images[$index]);
                $inspectionDetail->images = array_values($images);
                $inspectionDetail->save();

                $path = str_replace('/storage/vehicle_images/', '', $fileToDelete);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }
        }

        return back()->with('success', 'File deleted');
    }

    public function deleteRequest($id)
    {
        $inspectionData = InspectionRequest::findOrFail($id);
        // Delete related records (assuming each detail table has inspection_request_id column)
        InspectionVehicleDetail::where('request_id', $id)->delete();
        InspectionBodyDetail::where('request_id', $id)->delete();
        InspectionBreaksDetail::where('request_id', $id)->delete();
        InspectionClusterDetail::where('request_id', $id)->delete();
        InspectionCoolingDetail::where('request_id', $id)->delete();
        InspectionElectricalDetail::where('request_id', $id)->delete();
        InspectionEngineDetail::where('request_id', $id)->delete();
        InspectionGlassDetail::where('request_id', $id)->delete();
        InspectionHvacDetail::where('request_id', $id)->delete();
        InspectionInteriorDetail::where('request_id', $id)->delete();
        InspectionRoadTestDetail::where('request_id', $id)->delete();
        InspectionSeatDetail::where('request_id', $id)->delete();
        InspectionSuspensionDetail::where('request_id', $id)->delete();
        InspectionTransmissionDetail::where('request_id', $id)->delete();
        InspectionTyreDetail::where('request_id', $id)->delete();

        // Finally delete the inspection request itself
        $inspectionData->delete();

        return Redirect::back()->with('success', 'Inspection request and related details deleted successfully.');
    }
}