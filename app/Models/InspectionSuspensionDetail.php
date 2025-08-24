<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionSuspensionDetail extends Model
{
    protected $fillable = [
        'request_id',
        'front_strut_mount_condition',
        'rear_strut_mount_condition',
        'front_shock_absorber_function',
        'rear_shock_absorber_function',
        'front_spring_integrity',
        'rear_spring_integrity',
        'control_arm_bush_condition',
        'lower_ball_joint_play',
        'upper_ball_joint_play',
        'anti_roll_bar_links_bushes',
        'steering_rack_seal_condition',
        'steering_rack_play_check',
        'rack_end_condition',
        'tie_rod_end_play',
        'steering_column_noises',
        'power_steering_fluid_level_color',
        'power_steering_pump_noise',
        'subframe_mount_condition',
        'chassis_mounts_security',
        'steering_wheel_free_play',
        'comments_suspension',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
