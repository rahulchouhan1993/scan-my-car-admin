<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionHvacDetail extends Model
{
    protected $fillable = [
        'request_id',
        'air_condition',
        'infotainment_condition',
        'radio_condition',
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
