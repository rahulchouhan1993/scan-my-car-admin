<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionVehicleDetail extends Model
{
    protected $fillable = [
        'request_id',
        'svg_image',
        'images',
        'engine_capacity',
        'engine_cylinders',
        'drive_type',
        'body_type',
        'exterior_color',
        'interior_color',
        'number_keys',
        'service_history',
        'last_service_date',
        'registration_emirate',
        'warranty_status',
        'plate_type',
        'registration_number',
        'chasis_no',
        'chasis_condition',
        'exterior_comments',
        'normal_comments'
    ];

    /**
     * Relationship: A vehicle detail belongs to an inspection request.
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
