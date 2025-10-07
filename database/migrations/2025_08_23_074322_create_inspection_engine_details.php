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
            $table->text('engine_start_behavior_cold')->nullable();
            $table->text('engine_start_behavior_warm')->nullable();
            $table->text('idle_stability')->nullable();
            $table->text('throttle_response')->nullable();
            $table->text('abnormal_engine_noises')->nullable();
            $table->text('engine_oil_level_check')->nullable();
            $table->text('engine_oil_appearance')->nullable();
            $table->text('visible_oil_leaks')->nullable();
            $table->text('oil_filter_housing_condition')->nullable();
            $table->text('coolant_level_check')->nullable();
            $table->text('coolant_color')->nullable();
            $table->text('coolant_leaks')->nullable();
            $table->text('signs_of_coolant_in_oil')->nullable();
            $table->text('hose_condition')->nullable();
            $table->text('drive_belt_condition')->nullable();
            $table->text('timing_belt_condition')->nullable();
            $table->text('turbo_boost_check')->nullable();
            $table->text('air_intake_condition')->nullable();
            $table->text('air_filter_element')->nullable();
            $table->text('starter_motor_cranking')->nullable();
            $table->text('fuse_box_access')->nullable();

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
