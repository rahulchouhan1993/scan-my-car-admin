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

    public function contactUs(Request $request){
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'name'         => 'required|string|max:100',
                'email'        => 'required|email|max:100',
                'phone_no'     => 'required|digits:10',
                'service_type' => 'required|string|max:50',
                'description'  => 'nullable|string',
                'seen_status'  => 'required|boolean'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Step 2: Save to database
            $contact = ContactUs::create($validator->validated());

            return redirect()->back()->with('success','Contact request submitted successfully.');
        }
        return inertia('Customers/Users/ContactUs');
    }

    public function createUser(Request $request){
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'name'              => ['required', 'string', 'max:100'],
                'email'             => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
                'phone_no'          => ['required', 'digits:10'],
                'password'          => ['required', 'string', 'min:8', 'confirmed'],
                //password_confirmation
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            $randomPass = rand();
            $user = User::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'role'      => 'customer',
                'phone_no'  => $request->phone_no,
                'password'  => Hash::make($randomPass),
            ]);
            Mail::to($user->email)->send(new UserLoginDetailsMail($user, $randomPass));
            return redirect()->back()->with('success','Please verify your email to activate your account');
            
        }
    }
    
    public function forgotPassword(Request $request){
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'email' => ['required', 'string', 'email']
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $checkuser = User::where('email',$request->email)->where('role','customer')->first();
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
        return inertia('Customers/ForgotPassword');
    }
    
}