<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionRoadTestDetail extends Model
{
    protected $fillable = [
        'request_id',
        'start_performance',
        'acceleration_responsiveness',
        'cruise_control_engagement_test',
        'garebox_performance',
        'engine_vibration_idle',
        'mid_range_power',
        'highway_stability',
        'steering_feedback',
        'abs_intervention',
        'braking_performance',
        'transmission_harshness',
        'clutch_engagement',
        'noise_levels',
        'comment',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
