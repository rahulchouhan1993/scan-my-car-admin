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
            $inspectionsDetail->status              = $request->status ?? 0;
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
}