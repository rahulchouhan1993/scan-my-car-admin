<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionInteriorDetail extends Model
{
    protected $fillable = [
        'request_id',
        'dashboard_fit_finish',
        'instrument_cluster_illumination',
        'odometer_function',
        'interior_lighting',
        'glove_box_latching',
        'carpet_wear_retention',
        'interior_contamination_odour',
        'trunk_boot_interior_condition',
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
