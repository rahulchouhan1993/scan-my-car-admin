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
        Schema::create('inspection_body_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');

            $table->boolean('front_bumper')->default(false);
            $table->boolean('rear_bumper')->default(false);
            $table->boolean('bonnet')->default(false);
            $table->boolean('boot_lid')->default(false);
            $table->boolean('left_front_wing')->default(false);
            $table->boolean('right_front_wing')->default(false);
            $table->boolean('left_front_door_fit')->default(false);
            $table->boolean('right_front_wing_fit')->default(false);
            $table->boolean('right_front_door_fit')->default(false);
            $table->boolean('left_rear_door_fit')->default(false);
            $table->boolean('right_rear_door_fit')->default(false);
            $table->boolean('left_rear_quarter_panel_fit')->default(false);
            $table->boolean('right_rear_quarter_panel_fit')->default(false);
            $table->boolean('roof_panel_alignment')->default(false);
            $table->boolean('fender_mounting_condition')->default(false);
            $table->boolean('panel_gap_uniformity')->default(false);
            $table->boolean('external_trim_condition')->default(false);
            $table->boolean('molding_clips_present')->default(false);
            $table->boolean('door_seals_fitment')->default(false);
            $table->boolean('boot_seal_fitment')->default(false);
            $table->boolean('fuel_filler_door_operation')->default(false);
            $table->boolean('body_fasteners_intact')->default(false);
            $table->boolean('tow_eye_point_secure')->default(false);
            $table->boolean('bumper_reinforcement_visible')->default(false);
            $table->boolean('undercarriage_guards')->default(false);
            $table->boolean('panel_repair_signs')->default(false);
            $table->boolean('exterior_accessory_fitment')->default(false);

            $table->timestamps();

            $table->foreign('request_id')
                  ->references('id')
                  ->on('inspection_requests')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_body_details');
    }
};
