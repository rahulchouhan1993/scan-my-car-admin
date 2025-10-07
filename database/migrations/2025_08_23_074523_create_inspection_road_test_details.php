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
        Schema::create('inspection_road_test_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
            $table->string('start_performance')->nullable();
            $table->string('acceleration_responsiveness')->nullable();
            $table->string('cruise_control_engagement_test')->nullable();
            $table->string('garebox_performance')->nullable();
            $table->string('engine_vibration_idle')->nullable();
            $table->string('mid_range_power')->nullable();
            $table->string('highway_stability')->nullable();
            $table->string('steering_feedback')->nullable();
            $table->string('abs_intervention')->nullable();
            $table->string('braking_performance')->nullable();
            $table->string('transmission_harshness')->nullable();
            $table->string('clutch_engagement')->nullable();
            $table->string('noise_levels')->nullable();
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_road_test_details');
    }
};
