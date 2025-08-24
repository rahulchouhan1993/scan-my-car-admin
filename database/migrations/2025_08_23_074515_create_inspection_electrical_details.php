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
        Schema::create('inspection_electrical_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
            $table->string('starter_engagement_reliability')->nullable();
            $table->string('front_indicators_function')->nullable();
            $table->string('rear_indicators_function')->nullable();
            $table->string('reverse_light_function')->nullable();
            $table->string('fog_lights_front_rear')->nullable();
            $table->string('interior_control_switches_backlight')->nullable();
            $table->string('parking_sensor_functionality')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_electrical_details');
    }
};
