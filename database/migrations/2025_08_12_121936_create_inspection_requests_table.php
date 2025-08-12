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
        Schema::create('inspection_requests', function (Blueprint $table) {
            $table->id();
            $table->integer('inspector_id')->nullable(true);
            $table->string('full_name',50)->nullable(true);
            $table->string('contact_no',15)->nullable(true);
            $table->string('email',50)->nullable(true);
            $table->string('address_line_1',255)->nullable(true);
            $table->string('address_line_2',255)->nullable(true);
            $table->string('car_parked',20)->nullable(true);
            $table->string('vehicle_make')->nullable(true);
            $table->string('vehicle_model')->nullable(true);
            $table->year('vehicle_year')->nullable()->nullable(true);
            $table->string('registration_number')->nullable(true);
            $table->string('vin')->nullable()->nullable(true);
            $table->string('fuel_type')->nullable()->nullable(true); // Petrol/Diesel/Hybrid/Electric
            $table->string('transmission')->nullable()->nullable(true); // Manual/Automatic
            $table->string('mileage')->nullable()->nullable(true); 
            $table->date('preferred_date')->nullable();
            $table->string('preferred_time_slot')->nullable(); // Morning, Afternoon, Evening
            $table->text('additional_notes')->nullable();
            $table->integer('status')->nullable(true);
            $table->date('assign_date')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_requests');
    }
};
