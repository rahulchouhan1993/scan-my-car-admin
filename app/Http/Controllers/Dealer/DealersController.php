<?php

namespace App\Http\Controllers\Dealer;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\InspectionLog;
use App\Models\InspectionRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Mail\ForgotPasswordMail;
use Illuminate\Support\Facades\Mail;

class DealersController extends Controller
{
    public function dashboard(Request $request){
        $pageTitle = 'Dealer | Dashboard';
        return inertia('Dealer/Dashbaord/Index', compact('pageTitle'));
    }

    public function profile(Request $request){
        $userDetails = User::find(auth()->user()->id);
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'name'              => ['required', 'string', 'max:50'],
                'address'           => ['required', 'string', 'max:200'],
                'address2'          => ['required', 'string', 'max:200'],
                'city'              => ['required', 'string', 'max:50'],
                'state'             => ['required', 'string', 'max:50'],
                'zip'               => ['required', 'max:8', 'max:6'],
                'buying_limit'      => ['required'],
                'car_model'         => ['required'],
                'model_year'        => ['required'],
                'milage'            => ['required'],
                'account_manager'   => ['required'],
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
            $userDetails->buying_limit = $request->buying_limit;
            $userDetails->car_model = $request->car_model;
            $userDetails->model_year = $request->model_year;
            $userDetails->milage = $request->milage;
            $userDetails->account_manager = $request->account_manager;
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
        $pageTitle = 'Dealer | Profile';
        return inertia('Dealer/Users/Profile',compact('userDetails', 'pageTitle'));
    }

    public function forgotPassword(Request $request){
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'email' => ['required', 'string', 'email']
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            $checkuser = User::where('email',$request->email)->where('role','dealer')->first();
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
        $pageTitle = 'Dealer | Forgot Password';
        return inertia('Dealer/Users/ForgotPassword', compact('pageTitle'));
    }

    public function serviceRequest(){
        $allInspections = InspectionRequest::where('dealer_id',Auth()->user()->id)->orderBy('id','DESC')->paginate(10);
        $pageTitle = 'Dealer | Service Request';
        return inertia('Dealer/Users/ServiceRequest',compact('pageTitle','allInspections'));
    }

}