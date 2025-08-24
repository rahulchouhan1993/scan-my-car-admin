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
        Schema::create('inspection_engine_details', function (Blueprint $table) {
            $table->id();
            // Link to requests table
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');

            // Engine condition fields
            $table->string('engine_start_behavior_cold')->nullable();
            $table->string('engine_start_behavior_warm')->nullable();
            $table->string('idle_stability')->nullable();
            $table->string('throttle_response')->nullable();
            $table->string('abnormal_engine_noises')->nullable();
            $table->string('engine_oil_level_check')->nullable();
            $table->string('engine_oil_appearance')->nullable();
            $table->string('visible_oil_leaks')->nullable();
            $table->string('oil_filter_housing_condition')->nullable();
            $table->string('coolant_level_check')->nullable();
            $table->string('coolant_color')->nullable();
            $table->string('coolant_leaks')->nullable();
            $table->string('signs_of_coolant_in_oil')->nullable();
            $table->string('hose_condition')->nullable();
            $table->string('drive_belt_condition')->nullable();
            $table->string('timing_belt_condition')->nullable();
            $table->string('turbo_boost_check')->nullable();
            $table->string('air_intake_condition')->nullable();
            $table->string('air_filter_element')->nullable();
            $table->string('starter_motor_cranking')->nullable();
            $table->string('fuse_box_access')->nullable();

            // Free text fields
            $table->text('any_noice')->nullable();
            $table->text('comments_engine')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_engine_details');
    }
};
