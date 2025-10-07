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
        Schema::create('inspection_suspension_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
            $table->string('front_strut_mount_condition')->nullable();
            $table->string('rear_strut_mount_condition')->nullable();
            $table->string('front_shock_absorber_function')->nullable();
            $table->string('rear_shock_absorber_function')->nullable();
            $table->string('front_spring_integrity')->nullable();
            $table->string('rear_spring_integrity')->nullable();
            $table->string('control_arm_bush_condition')->nullable();
            $table->string('lower_ball_joint_play')->nullable();
            $table->string('upper_ball_joint_play')->nullable();
            $table->string('anti_roll_bar_links_bushes')->nullable();
            $table->string('steering_rack_seal_condition')->nullable();
            $table->string('steering_rack_play_check')->nullable();
            $table->string('rack_end_condition')->nullable();
            $table->string('tie_rod_end_play')->nullable();
            $table->string('steering_column_noises')->nullable();
            $table->string('power_steering_fluid_level_color')->nullable();
            $table->string('power_steering_pump_noise')->nullable();
            $table->string('subframe_mount_condition')->nullable();
            $table->string('chassis_mounts_security')->nullable();
            $table->string('steering_wheel_free_play')->nullable();
            $table->text('comments_suspension')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_suspension_details');
    }
};
