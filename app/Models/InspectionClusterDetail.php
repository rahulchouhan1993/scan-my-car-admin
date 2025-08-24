<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionClusterDetail extends Model
{
    protected $fillable = [
        'request_id',
        'engine_light',
        'abs_light',
        'oil_pressure_light',
        'battery_charging_system_light',
        'coolant_temperature_warning_light',
        'brake_system_warning_light',
        'airbag_warning_light',
        'seatbelt_reminder_light',
        'traction_control_light',
        'tpms',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
