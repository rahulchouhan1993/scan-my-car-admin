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
        Schema::create('inspection_transmission_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
            $table->string('transmission_fluid_level_auto')->nullable();
            $table->string('transmission_fluid_condition_auto')->nullable();
            $table->string('manual_gearbox_oil_check')->nullable();
            $table->string('transmission_mount_integrity')->nullable();
            $table->string('gear_selection_smoothness')->nullable();
            $table->string('clutch_bite_slippage')->nullable();
            $table->string('automatic_shift_quality')->nullable();
            $table->string('transfer_case_engagement')->nullable();
            $table->string('drive_shaft_visual_inspection')->nullable();
            $table->string('cv_joint_boot_integrity')->nullable();
            $table->string('u_joints_coupling_check')->nullable();
            $table->string('differential_oil_condition')->nullable();
            $table->string('differential_housing_leaks')->nullable();

            $table->text('gearbox_unusual_noise')->nullable();
            $table->text('comments_transmission')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_transmission_details');
    }
};
