<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionRequest extends Model
{
    protected $fillable = [
        'inspector_id',
        'full_name',
        'contact_no',
        'email',
        'address_line_1',
        'address_line_2',
        'car_parked',
        'vehicle_make',
        'vehicle_model',
        'vehicle_year',
        'registration_number',
        'vin',
        'fuel_type',
        'transmission',
        'mileage',
        'preferred_date',
        'preferred_time_slot',
        'additional_notes',
        'status',
        'assign_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
