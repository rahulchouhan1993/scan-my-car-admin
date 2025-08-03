<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ContactUs;
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
        return inertia('Admin/Users/Index',compact('userDetails','roleType'));
    }

    public function add($type,$id, Request $request){
        if($id>0){
            $userDetails = User::find($id);
        }else{
            $userDetails = new User();
        }
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'name'      => ['required', 'string', 'max:50'],
                'email'     => ['required', 'string', 'email', 'max:50', Rule::unique('users', 'email')->ignore($request->id)],
                'phone_no'  => ['required', 'string', 'max:15', Rule::unique('users', 'phone_no')->ignore($request->id)],
                'address'   => ['required', 'string', 'max:200'],
                'address2'  => ['nullable', 'string', 'max:200'],
                'city'      => ['required', 'string', 'max:50'],
                'state'     => ['required', 'string', 'max:50'],
                'zip'       => ['required', 'string', 'max:8'],
            ]);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput($request->all());
            }

            $userDetails->name = $request->name;
            $userDetails->email = $request->email;
            $userDetails->phone_no = $request->phone_no;
            $userDetails->role = $type;
            $userDetails->address = $request->address;
            $userDetails->address2 = $request->address2;
            $userDetails->city = $request->city;
            $userDetails->state = $request->state;
            $userDetails->zip = $request->zip;
            $randomPassword = rand();
            $userDetails->password = Hash::make($randomPassword);
            $userDetails->save();
            if($id>0){
                return redirect()->route('admin.users',['roleType'=>$type])->with('success','User Updated');
            }else{
                Mail::to($userDetails->email)->send(new UserLoginDetailsMail($userDetails, $randomPassword));
                return redirect()->route('admin.users',['roleType'=>$type])->with('success','User Added');
            }
            
        }
        return inertia('Admin/Users/Add',compact('type','id','userDetails'));
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
        return inertia('Admin/Users/Inquiries',compact('allInquiries'));
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
}