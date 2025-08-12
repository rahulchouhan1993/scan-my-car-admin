<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UsersController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\InspectionsController;
use App\Http\Controllers\Inspector\InspectorController;
use App\Http\Controllers\Dealer\DealersController;
//use App\Http\Controllers\Customer\CustomerController;

// =========================
// CUSTOMER ROUTES
// =========================

Route::get('/', [CustomersController::class, 'home'])->name('home');
Route::get('/about-us', [CustomersController::class, 'aboutUs'])->name('about');
Route::get('/terms-and-conditions', [CustomersController::class, 'termsAndConditions'])->name('terms');
Route::match(['post','get'],'/contact-us', [CustomersController::class, 'contactUs'])->name('contactus');
Route::match(['post','get'],'/register-dealer', [CustomersController::class, 'createUser'])->name('register');
Route::match(['post','get'],'/book-inspection', [InspectionsController::class, 'requestInspection'])->name('register');
Route::get('/inspection-details', [InspectionsController::class, 'inspectionDetails'])->name('inspectionDetails');


Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/dashboard', [CustomersController::class, 'dashboard'])->name('customer.dashboard');
    // Add other customer-only routes
});


// =========================
// Dealer ROUTES
// =========================

Route::prefix('dealer')->name('dealer.')->group(function () {
    // Dealer Guest Routes (Login Only)
    Route::middleware('guest')->group(function () {
        Route::match(['post','get'],'/', [AuthController::class, 'showDealerLogin'])->name('login');
        Route::match(['post','get'],'/forgot-password', [DealersController::class, 'forgotPassword'])->name('forgot-password');
    });

    // Dealer Authenticated Routes
    Route::middleware(['auth', 'role:dealer'])->group(function () {
        //Users Routes
        Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::match(['post','get'],'/profile', [DealersController::class, 'profile'])->name('profile');
        Route::get('/dashboard', [DealersController::class, 'dashboard'])->name('dashboard');
        Route::get('/service-request', [DealersController::class, 'serviceRequest'])->name('service-request');
    });
});


// =========================
// ADMIN ROUTES
// =========================

Route::prefix('admin')->name('admin.')->group(function () {
    // Admin Guest Routes (Login Only)
    Route::middleware('guest')->group(function () {
        Route::match(['post','get'],'/', [AuthController::class, 'showAdminLogin'])->name('login');
        Route::match(['post','get'],'/forgot-password', [AdminController::class, 'forgotPassword'])->name('forgot-password');
    });

    // Admin Authenticated Routes
    Route::middleware(['auth', 'role:admin'])->group(function () {
        //Users Routes
        Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::match(['post','get'],'/profile', [AdminController::class, 'profile'])->name('profile');
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::get('/update-user/{id}', [UsersController::class, 'updateStatus'])->name('users.status');
        Route::get('/delete-user/{id}', [UsersController::class, 'deleteUser'])->name('users.delete');
        Route::get('/users/{roleType}', [UsersController::class, 'index'])->name('users');
        Route::match(['post','get'],'/add-dealer/{id}', [UsersController::class, 'add'])->name('users.add');
        Route::match(['post','get'],'/add-inspector/{id}', [UsersController::class, 'addInspector'])->name('inspector.add');

        //Contact Us Routes
        Route::get('/inquiries', [UsersController::class, 'inquiries'])->name('inquiries');
        Route::get('/inquiry-status/{id}', [UsersController::class, 'inquiryStatus'])->name('inquirystatus');
        Route::get('/delete-inquiry/{id}', [UsersController::class, 'deleteInquiry'])->name('delete.inquiry');

        //service request
        Route::get('/service-request', [UsersController::class, 'serviceRequest'])->name('service-request');
    });
});


// =========================
// INSPECTOR ROUTES
// =========================

Route::prefix('inspector')->name('inspector.')->group(function () {
    // Inspector Guest Routes (Login Only)
    Route::middleware('guest')->group(function () {
        Route::match(['post','get'],'/', [AuthController::class, 'showInspectorLogin'])->name('login');
        Route::match(['post','get'],'/forgot-password', [InspectorController::class, 'forgotPassword'])->name('forgot-password');
    });

    // Inspector Authenticated Routes
    Route::middleware(['auth', 'role:inspector'])->group(function () {
        Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('/dashboard', [InspectorController::class, 'dashboard'])->name('dashboard');
        Route::match(['post','get'],'/profile', [InspectorController::class, 'profile'])->name('profile');
        // Add other inspector-only routes
    });
});
