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
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    public function index($roleType){
        $userDetails = User::where('role',$roleType)->paginate(10);
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
    
    public function inquiries(){
        $allInquiries = ContactUs::paginate(10);
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
        $allInspections = InspectionRequest::paginate(10);
        $pageTitle = 'Admin | Service Request';
        return inertia('Admin/Users/ServiceRequest',compact('pageTitle','allInspections'));
    }

    public function editRequest($id, Request $request){
        $inspectionsDetail = InspectionRequest::find($id);
        $pageTitle = 'Admin | Service Request';
        return inertia('Admin/Users/EditRequest',compact('pageTitle','inspectionsDetail'));
    }

    public function report($id, Request $request){
        $inspectionsDetail = InspectionRequest::find($id);
        $pageTitle = 'Admin | Report';
        return inertia('Admin/Users/Report',compact('pageTitle','inspectionsDetail'));
    }

    public function logs($id,){
        $inspectinLogs = InspectionLog::where('inspection_request_id', $id)->paginate(10);
        $pageTitle = 'Admin | Logs';
        return inertia('Admin/Users/Logs',compact('pageTitle','inspectinLogs'));
    }
}