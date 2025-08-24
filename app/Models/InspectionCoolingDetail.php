<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionCoolingDetail extends Model
{
    protected $fillable = [
        'request_id',
        'radiator_core_condition',
        'radiator_fan_operation',
        'cycling_observation',
        'overflow_expansion_tank_condition',
        'heater_core_performance',
        'fuel_tank_inspection',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
