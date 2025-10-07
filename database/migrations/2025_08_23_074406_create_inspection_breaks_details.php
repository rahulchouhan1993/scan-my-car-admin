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
        Schema::create('inspection_breaks_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
            $table->string('master_cylinder_seal_condition')->nullable();
            $table->string('brake_booster_operation')->nullable();
            $table->string('front_disc_condition_runout')->nullable();
            $table->string('rear_disc_drum_condition')->nullable();
            $table->string('front_pad')->nullable();
            $table->string('rear_pad')->nullable();
            $table->string('handbrake_adjustment_holding')->nullable();
            $table->string('abs_function_wheel_speed_check')->nullable();
            $table->string('brake_pedal_travel_firmness')->nullable();
            $table->string('brake_fluid_contamination_test_note')->nullable();
            $table->text('comments_brakes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_breaks_details');
    }
};
