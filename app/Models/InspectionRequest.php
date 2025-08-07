<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionRequest extends Model
{
    protected $fillable = [
        'user_id',
        'inspector_id',
        'vehicle_make',
        'vehicle_model',
        'vehicle_year',
        'registration_number',
        'vin',
        'fuel_type',
        'transmission',
        'color',
        'mileage',
        'preferred_date',
        'preferred_time_slot',
        'additional_notes',
        'status',
        'assign_date',
    ];
}
