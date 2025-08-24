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
        Schema::create('inspection_cooling_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
            $table->string('radiator_core_condition')->nullable();
            $table->string('radiator_fan_operation')->nullable();
            $table->string('cycling_observation')->nullable();
            $table->string('overflow_expansion_tank_condition')->nullable();
            $table->string('heater_core_performance')->nullable();
            $table->string('fuel_tank_inspection')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_cooling_details');
    }
};
