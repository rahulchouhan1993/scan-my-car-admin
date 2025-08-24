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
        Schema::create('inspection_cluster_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
            $table->string('engine_light')->nullable();
            $table->string('abs_light')->nullable();
            $table->string('oil_pressure_light')->nullable();
            $table->string('battery_charging_system_light')->nullable();
            $table->string('coolant_temperature_warning_light')->nullable();
            $table->string('brake_system_warning_light')->nullable();
            $table->string('airbag_warning_light')->nullable();
            $table->string('seatbelt_reminder_light')->nullable();
            $table->string('traction_control_light')->nullable();
            $table->string('tpms')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_cluster_details');
    }
};
