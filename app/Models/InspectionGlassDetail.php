<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionGlassDetail extends Model
{
    protected $fillable = [
        'request_id',

        // Windshield
        'windshield_condition',
        'windshield_wiper_function',
        'wiper_blade_wear',
        'rear_wiper_function',

        // Side windows
        'side_window_operation_lf',
        'side_window_operation_rf',
        'side_window_operation_lr',
        'side_window_operation_rr',

        // Rear window
        'rear_window_condition',

        // Sunroof
        'sunroof_operation',
        'sunroof_drainage_check',
        'sunroof_glass_condition',

        // Mirrors
        'left_external_mirror_function',
        'right_external_mirror_function',
        'mirror_adjustment_motors',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
