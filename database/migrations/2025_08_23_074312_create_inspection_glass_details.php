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
        Schema::create('inspection_glass_details', function (Blueprint $table) {
            $table->id();

            // Relation to requests table
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');

            // Windshield
            $table->text('windshield_condition')->nullable();
            $table->text('windshield_wiper_function')->nullable();
            $table->text('wiper_blade_wear')->nullable();
            $table->text('rear_wiper_function')->nullable();
            
            // Side windows
            $table->text('side_window_operation_lf')->nullable();
            $table->text('side_window_operation_rf')->nullable();
            $table->text('side_window_operation_lr')->nullable();
            $table->text('side_window_operation_rr')->nullable();

            // Rear window
            $table->text('rear_window_condition')->nullable();

            // Sunroof
            $table->text('sunroof_operation')->nullable();
            $table->text('sunroof_drainage_check')->nullable();
            $table->text('sunroof_glass_condition')->nullable();

            // Mirrors
            $table->text('left_external_mirror_function')->nullable();
            $table->text('right_external_mirror_function')->nullable();
            $table->text('mirror_adjustment_motors')->nullable();
            $table->text('comments')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_glass_details');
    }
};
