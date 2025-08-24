<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionInteriorDetail extends Model
{
    protected $fillable = [
        'request_id',
        'dashboard_fit_finish',
        'instrument_cluster_illumination',
        'warning_lights_active_start',
        'odometer_function',
        'interior_lighting',
        'glove_box_latching',
        'carpet_wear_retention',
        'interior_contamination_odour',
        'trunk_boot_interior_condition',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
