<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inspection_vehicle_details', function (Blueprint $table) {
            $table->id();

            // Foreign key to inspection_requests
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');

            // Vehicle details fields
            $table->string('engine_capacity')->nullable();
            $table->string('engine_cylinders')->nullable();
            $table->string('drive_type')->nullable();
            $table->string('body_type')->nullable();
            $table->string('exterior_color')->nullable();
            $table->string('interior_color')->nullable();
            $table->string('number_keys')->nullable();
            $table->string('service_history')->nullable();
            $table->date('last_service_date')->nullable();
            $table->string('registration_emirate')->nullable();
            $table->string('warranty_status')->nullable();
            $table->string('plate_type')->nullable();
            $table->string('registration_number')->nullable();
            $table->string('chasis_no')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_vehicle_details');
    }
};
