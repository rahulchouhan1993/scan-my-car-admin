<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionLog extends Model
{
    protected $fillable = [
        'user_id',
        'log_details'
    ];
}
