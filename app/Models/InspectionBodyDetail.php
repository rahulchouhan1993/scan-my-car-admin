<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionBodyDetail extends Model
{
    protected $fillable = [
        'request_id',
        'front_bumper',
        'rear_bumper',
        'bonnet',
        'boot_lid',
        'left_front_wing',
        'right_front_wing',
        'left_front_door_fit',
        'right_front_wing_fit',
        'right_front_door_fit',
        'left_rear_door_fit',
        'right_rear_door_fit',
        'left_rear_quarter_panel_fit',
        'right_rear_quarter_panel_fit',
        'roof_panel_alignment',
        'fender_mounting_condition',
        'panel_gap_uniformity',
        'external_trim_condition',
        'molding_clips_present',
        'door_seals_fitment',
        'boot_seal_fitment',
        'fuel_filler_door_operation',
        'body_fasteners_intact',
        'tow_eye_point_secure',
        'bumper_reinforcement_visible',
        'undercarriage_guards',
        'panel_repair_signs',
        'exterior_accessory_fitment',
    ];

    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
