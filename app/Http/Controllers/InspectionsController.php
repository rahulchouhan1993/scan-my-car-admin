<?php

namespace App\Http\Controllers;

use App\Models\InspectionRequest;
use App\Models\InspectionLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InspectionsController extends Controller
{
    public function requestInspection(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'user_id'              => 'nullable|integer|exists:users,id',
            'inspector_id'         => 'nullable|integer|exists:users,id',
            'vehicle_make'         => 'required|string|max:100',
            'vehicle_model'        => 'required|string|max:100',
            'vehicle_year'         => 'nullable|integer|min:1900|max:' . now()->year,
            'registration_number'  => 'required|string|max:50',
            'vin'                  => 'nullable|string|max:100',
            'fuel_type'            => 'nullable|string|in:Petrol,Diesel,Hybrid,Electric',
            'transmission'         => 'nullable|string|in:Manual,Automatic',
            'color'                => 'nullable|string|max:50',
            'mileage'              => 'nullable|integer|min:0',
            'preferred_date'       => 'nullable|date|after_or_equal:today',
            'preferred_time_slot'  => 'nullable|string|in:Morning,Afternoon,Evening',
            'additional_notes'     => 'nullable|string|max:1000',
            'status'               => 'nullable|integer|in:0,1,2', // define status codes if needed
            'assign_date'          => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Error',
                'data' => $validator->errors()
            ], 422);
        }

        $inspectionRequest = InspectionRequest::create([
            'user_id'             => $request->user_id,
            'inspector_id'        => $request->inspector_id,
            'vehicle_make'        => $request->vehicle_make,
            'vehicle_model'       => $request->vehicle_model,
            'vehicle_year'        => $request->vehicle_year,
            'registration_number' => $request->registration_number,
            'vin'                 => $request->vin,
            'fuel_type'           => $request->fuel_type,
            'transmission'        => $request->transmission,
            'color'               => $request->color,
            'mileage'             => $request->mileage,
            'preferred_date'      => $request->preferred_date,
            'preferred_time_slot' => $request->preferred_time_slot,
            'additional_notes'    => $request->additional_notes,
            'status'              => $request->status ?? 0,
            'assign_date'         => $request->assign_date,
        ]);

        InspectionLog::create([
            'inspection_request_id' => $inspectionRequest->id,
            'inspector_id'          => $request->inspector_id,
            'stlog_detailsatus'     => 'Dummy log',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Inspection request created successfully',
            'data' => $inspectionRequest
        ], 201);
    }
}
