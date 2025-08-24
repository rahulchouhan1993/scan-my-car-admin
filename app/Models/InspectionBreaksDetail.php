<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionBreaksDetail extends Model
{
    protected $fillable = [
        'request_id',
        'master_cylinder_seal_condition',
        'brake_booster_operation',
        'front_disc_condition_runout',
        'rear_disc_drum_condition',
        'front_pad',
        'rear_pad',
        'handbrake_adjustment_holding',
        'abs_function_wheel_speed_check',
        'brake_pedal_travel_firmness',
        'brake_fluid_contamination_test_note',
        'comments_brakes',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
