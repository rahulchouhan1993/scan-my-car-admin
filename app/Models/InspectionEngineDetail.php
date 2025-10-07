<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionEngineDetail extends Model
{
    protected $fillable = [
        'request_id',

        // Engine condition fields
        'engine_start_behavior_cold',
        'engine_start_behavior_warm',
        'idle_stability',
        'throttle_response',
        'abnormal_engine_noises',
        'engine_oil_level_check',
        'engine_oil_appearance',
        'visible_oil_leaks',
        'oil_filter_housing_condition',
        'coolant_level_check',
        'coolant_color',
        'coolant_leaks',
        'signs_of_coolant_in_oil',
        'hose_condition',
        'drive_belt_condition',
        'timing_belt_condition',
        'turbo_boost_check',
        'air_intake_condition',
        'air_filter_element',
        'starter_motor_cranking',
        'fuse_box_access',

        // Free text fields
        'any_noice',
        'comments_engine',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
