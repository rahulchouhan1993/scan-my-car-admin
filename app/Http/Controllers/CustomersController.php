<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use App\Models\ContactUs;
use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\UserLoginDetailsMail;
use Illuminate\Support\Facades\Hash;
use App\Mail\ForgotPasswordMail;
use Illuminate\Support\Facades\Mail;

class CustomersController extends Controller
{

    public function home(){
        $pageTitle = 'Home | CertifyCars';
        return inertia('Customers/Home', compact('pageTitle'));
    }

    public function aboutUs(){
        $pageTitle = 'About Us | CertifyCars';
        return inertia('Customers/AboutUs', compact('pageTitle'));
    }

    public function termsAndConditions(){
        $pageTitle = 'Terms and Conditions | CertifyCars';
        return inertia('Customers/TermsAndConditions', compact('pageTitle'));
    }
 
    public function contactUs(Request $request){
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'name'         => 'required|string|max:100',
                'email'        => 'required|email|max:100',
                'phone_no'     => 'required|digits:10',
                'service_type' => 'required|string|max:50',
                'description'  => 'required|nullable|string'
            ]);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput($request->all());
            }

            // Step 2: Save to database
            $contact = ContactUs::create($validator->validated());

            return back()->with('success', 'Contact request submitted successfully.');
        }
        $pageTitle = 'Contact Us | CertifyCars';
        return inertia('Customers/ContactUs', compact('pageTitle'));
    }

    public function createUser(Request $request){
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'name'                  => ['required', 'string', 'max:50'],
                'company_name'          => ['required', 'string', 'max:50'],
                'email'                 => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
                'buying_limit'          => ['required'],
                'car_model'             => ['required'],
                'model_year'            => ['required'],
                'milage'                => ['required'],
                'account_manager'       => ['required'],
                'phone_no'              => ['required', 'digits:10'],
                'password'              => ['required', 'string', 'min:8', 'confirmed'],
                'password_confirmation' => ['required', 'string', 'min:8']
            ]);

            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput($request->all());
            }
            $randomPass = $request->password;
            $user = User::create([
                'name'              => $request->name,
                'company_name'      => $request->company_name,
                'email'             => $request->email,
                'role'              => 'dealer',
                'buying_limit'      => $request->buying_limit,
                'car_model'         => $request->car_model,
                'model_year'        => $request->model_year,
                'milage'            => $request->milage,
                'account_manager'   => $request->account_manager,
                'phone_no'          => $request->phone_no,
                'password'          => Hash::make($randomPass),
            ]);
            Mail::to($user->email)->send(new UserLoginDetailsMail($user, $randomPass));
            return redirect()->back()->with('success','Please verify your email to activate your account');
            
        }
        $pageTitle = 'Registration | CertifyCars';
        return inertia('Customers/Register', compact('pageTitle'));
    }
    
}