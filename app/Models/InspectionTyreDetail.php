<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionTyreDetail extends Model
{
    protected $fillable = [
        'request_id',

        // Tyre brand & size
        'tyre_brand_size_lf',
        'tyre_brand_size_rf',
        'tyre_brand_size_lr',
        'tyre_brand_size_rr',

        // Tyre manufacture date
        'tyre_manufacture_date_lf',
        'tyre_manufacture_date_rf',
        'tyre_manufacture_date_lr',
        'tyre_manufacture_date_rr',

        // Tread depth
        'tread_depth_lf',
        'tread_depth_rf',
        'tread_depth_lr',
        'tread_depth_rr',

        // Tyre pressure
        'tyre_pressure',

        // Spare wheel
        'spare_wheel_condition',

        // Comment
        'tyre_comment',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
