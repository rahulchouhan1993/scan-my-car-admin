<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactUs extends Model
{
    protected $fillable = [
        'name', 'email', 'phone_no', 'service_type', 'description', 'assign', 'notes', 'seen_status'
    ];
}
