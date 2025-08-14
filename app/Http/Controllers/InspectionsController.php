<?php

namespace App\Http\Controllers;

use App\Models\InspectionRequest;
use App\Models\InspectionLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\InspectionRequestSubmitted;
use App\Mail\InspectionRequestConfirmation;

class InspectionsController extends Controller
{

    public function requestInspection(Request $request){
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'inspector_id'         => 'nullable|integer|exists:users,id',
                'full_name'            => 'required|string|max:50',
                'contact_no'           => 'required|string|max:15',
                'email'                => 'required|string|max:50',
                'address_line_1'       => 'required|string|max:100',
                'address_line_2'       => 'required|string|max:100',
                'car_parked'           => 'required|string|max:20',
                'vehicle_make'         => 'required|string|max:30',
                'vehicle_model'        => 'required|string|max:30',
                'vehicle_year'         => 'nullable|integer|min:1900|max:' . now()->year,
                'registration_number'  => 'required|string|max:50',
                'vin'                  => 'required|string|max:100',
                'fuel_type'            => 'required|string|in:Petrol,Diesel,Hybrid,Electric',
                'transmission'         => 'required|string|in:Manual,Automatic',
                'mileage'              => 'required',
                'preferred_date'       => 'required|date|after_or_equal:today',
                'preferred_time_slot'  => 'required|string',
                'additional_notes'     => 'nullable|string|max:1000',
                'status'               => 'nullable|integer|in:0,1,2', // define status codes if needed
                'assign_date'          => 'nullable|date',
            ]);
           
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput($request->all());
            }

            $preferredDate = $request->preferred_date ? Carbon::parse($request->preferred_date)->format('Y-m-d') : null;
            $assignDate = $request->assign_date ? Carbon::parse($request->assign_date)->format('Y-m-d') : null;
            $inspectionRequest = InspectionRequest::create([
                'inspector_id'        => NULL,
                'full_name'           => $request->full_name,
                'contact_no'          => $request->contact_no,
                'email'               => $request->email,
                'address_line_1'      => $request->address_line_1,
                'address_line_2'      => $request->address_line_2,
                'car_parked'          => $request->car_parked,
                'vehicle_make'        => $request->vehicle_make,
                'vehicle_model'       => $request->vehicle_model,
                'vehicle_year'        => $request->vehicle_year,
                'registration_number' => $request->registration_number,
                'vin'                 => $request->vin,
                'fuel_type'           => $request->fuel_type,
                'transmission'        => $request->transmission,
                'mileage'             => $request->mileage,
                'preferred_date'      => $preferredDate,
                'preferred_time_slot' => $request->preferred_time_slot,
                'additional_notes'    => $request->additional_notes,
                'status'              => $request->status ?? 0,
                'assign_date'         => $assignDate,
            ]);

            InspectionLog::create([
                'inspection_request_id' => $inspectionRequest->id,
                'inspector_id'          => $request->inspector_id,
                'log_details'           => 'New Service Request Created',
            ]);

            //Send Email to user and admin
            Mail::to($inspectionRequest->email)->send(new InspectionRequestConfirmation($inspectionRequest));

            // Notify Admin
            $adminDetails = User::find(1);
            if ($adminDetails) {
                Mail::to($adminDetails->email)->send(new InspectionRequestSubmitted($inspectionRequest));
            }
            return redirect()->back()->with('success', 'Inspection request created successfully.');
        }

        $pageTitle = 'Book An Inspection | CertifyCars';
        return inertia('Customers/BookInspection', compact('pageTitle'));
        
    }

    public function inspectionDetails(Request $request){

        $pageTitle = 'Inspection Details | CertifyCars';
        return inertia('Customers/InspectionDetails', compact('pageTitle'));

    }
}
