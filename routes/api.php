<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\InspectionsController;

Route::post('/contact-us', [CustomersController::class, 'contactUs'])->name('contactus');
Route::post('/register-user', [CustomersController::class, 'createUser'])->name('register');
Route::post('/forgot-password', [CustomersController::class, 'forgotPassword'])->name('forgot-password');
Route::post('/request-inspection', [InspectionsController::class, 'requestInspection'])->name('request-inspection');