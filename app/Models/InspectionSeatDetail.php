<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionSeatDetail extends Model
{
    protected $fillable = [
        'request_id',
        'driver_seat_adjust_locks',
        'passenger_seat_adjust_locks',
        'seat_sliding_rails',
        'seat_cushion_wear',
        'seat_upholstery_integrity',
    ];

    /**
     * Relationship: belongs to InspectionRequest
     */
    public function inspectionRequest()
    {
        return $this->belongsTo(InspectionRequest::class, 'request_id');
    }
}
