<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionLog extends Model
{
    protected $fillable = [
        'inspection_request_id',
        'inspector_id',
        'log_details',
    ];
}
