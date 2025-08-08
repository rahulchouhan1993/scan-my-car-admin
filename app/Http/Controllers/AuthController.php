<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    function showDealerLogin(Request $request){
        if ($request->isMethod('post')) {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            $user = User::where('email', $credentials['email'])->where('role','dealer')->first();
            if ($user && $user->status == 0) {
                return back()->with('error', 'Your account is inactive. Please contact support.');
            }
            if(!empty($user)){
                if (Auth::attempt($credentials)) {
                    $request->session()->regenerate();
                    return redirect()->route('dealer.dashboard');
                }
            }

            return back()->with('error', 'The provided credentials do not match our records.');
        }
        $pageTitle = 'Dealer | Login';
        return inertia('Dealer/Users/Login', compact('pageTitle'));
    }

    function showAdminLogin(Request $request){
        if ($request->isMethod('post')) {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            $user = User::where('email', $credentials['email'])->where('role','admin')->first();
            if ($user && $user->status == 0) {
                return back()->with('error', 'Your account is inactive. Please contact support.');
            }
            
            if(!empty($user)){
                if (Auth::attempt($credentials)) {
                    $request->session()->regenerate();
                    return redirect()->route('admin.dashboard');
                }
            }

            return back()->with('error', 'The provided credentials do not match our records.');
        }
        $pageTitle = 'Admin | Login';
        return inertia('Admin/Users/Login', compact('pageTitle'));
    }

    function showInspectorLogin(Request $request){
        if ($request->isMethod('post')) {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            $user = User::where('email', $credentials['email'])->where('role','inspector')->first();
            if ($user && $user->status == 0) {
                return back()->with('error', 'Your account is inactive. Please contact support.');
            }
            if(!empty($user)){
                if (Auth::attempt($credentials)) {
                    $request->session()->regenerate();
                    return redirect()->route('inspector.dashboard');
                }
            }

            return back()->with('error', 'The provided credentials do not match our records.');
        }
        $pageTitle = 'Inspector | Login';
        return inertia('Inspector/Users/Login', compact('pageTitle'));
    }

     public function logout(Request $request){
        $role = auth()->user()->role;
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken(); 
        
        return redirect()->route($role.'.login')->with('success','Logged Out.');
    }
}
