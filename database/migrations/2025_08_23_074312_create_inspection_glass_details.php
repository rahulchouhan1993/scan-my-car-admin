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
            $table->string('windshield_condition')->nullable();
            $table->string('windshield_wiper_function')->nullable();
            $table->string('wiper_blade_wear')->nullable();
            $table->string('rear_wiper_function')->nullable();
            
            // Side windows
            $table->string('side_window_operation_lf')->nullable();
            $table->string('side_window_operation_rf')->nullable();
            $table->string('side_window_operation_lr')->nullable();
            $table->string('side_window_operation_rr')->nullable();

            // Rear window
            $table->string('rear_window_condition')->nullable();

            // Sunroof
            $table->string('sunroof_operation')->nullable();
            $table->string('sunroof_drainage_check')->nullable();
            $table->string('sunroof_glass_condition')->nullable();

            // Mirrors
            $table->string('left_external_mirror_function')->nullable();
            $table->string('right_external_mirror_function')->nullable();
            $table->string('mirror_adjustment_motors')->nullable();
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
