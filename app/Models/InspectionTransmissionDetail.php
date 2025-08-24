<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionTransmissionDetail extends Model
{
    protected $fillable = [
        'request_id',
        'transmission_fluid_level_auto',
        'transmission_fluid_condition_auto',
        'manual_gearbox_oil_check',
        'transmission_mount_integrity',
        'gear_selection_smoothness',
        'clutch_bite_slippage',
        'automatic_shift_quality',
        'transfer_case_engagement',
        'drive_shaft_visual_inspection',
        'cv_joint_boot_integrity',
        'u_joints_coupling_check',
        'differential_oil_condition',
        'differential_housing_leaks',
        'gearbox_unusual_noise',
        'comments_transmission',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
