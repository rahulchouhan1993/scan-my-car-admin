<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionElectricalDetail extends Model
{
    protected $fillable = [
        'request_id',
        'starter_engagement_reliability',
        'front_indicators_function',
        'rear_indicators_function',
        'reverse_light_function',
        'fog_lights_front_rear',
        'interior_control_switches_backlight',
        'parking_sensor_functionality',
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
