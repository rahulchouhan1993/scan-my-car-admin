<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionRequest extends Model
{
    protected $fillable = [
        'inspector_id',
         'dealer_id',
        'full_name',
        'contact_no',
        'email',
        'address_line_1',
        'address_line_2',
        'car_parked',
        'vehicle_make',
        'vehicle_model',
        'vehicle_year',
        'fuel_type',
        'transmission',
        'mileage',
        'preferred_date',
        'preferred_time_slot',
        'additional_notes',
        'status',
        'assign_date',
        'completed_date',
        'package_id',
        'request_no',
        'pin_code',
        'city'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function bodyDetail()
    {
        return $this->hasOne(InspectionBodyDetail::class, 'request_id');
    }

    public function vehicleDetail()
    {
        return $this->hasOne(InspectionVehicleDetail::class, 'request_id');
    }

    public function interiorDetails()
    {
        return $this->hasOne(InspectionInteriorDetail::class, 'request_id');
    }

    public function glassDetails()
    {
        return $this->hasOne(InspectionGlassDetail::class, 'request_id');
    }

    public function engineDetails()
    {
        return $this->hasOne(InspectionEngineDetail::class, 'request_id');
    }

    public function clusterDetails()
    {
        return $this->hasOne(InspectionClusterDetail::class, 'request_id');
    }

    public function transmissionDetails()
    {
        return $this->hasOne(InspectionTransmissionDetail::class, 'request_id');
    }

    public function suspensionDetails()
    {
        return $this->hasOne(InspectionSuspensionDetail::class, 'request_id');
    }

    public function brakesDetails()
    {
        return $this->hasOne(InspectionBreaksDetail::class, 'request_id');
    }

    public function tyresDetails()
    {
        return $this->hasOne(InspectionTyreDetail::class, 'request_id');
    }

    public function seatDetails()
    {
        return $this->hasOne(InspectionSeatDetail::class, 'request_id');
    }

    public function hvacDetails()
    {
        return $this->hasOne(InspectionHvacDetail::class, 'request_id');
    }

    public function coolingFuelDetails()
    {
        return $this->hasOne(InspectionCoolingDetail::class, 'request_id');
    }

    public function electricalLightingDetails()
    {
        return $this->hasOne(InspectionElectricalDetail::class, 'request_id');
    }

    public function performanceRoadTestDetails()
    {
        return $this->hasOne(InspectionRoadTestDetail::class, 'request_id');
    }
}
