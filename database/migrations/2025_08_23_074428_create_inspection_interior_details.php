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
        Schema::create('inspection_interior_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
            $table->string('dashboard_fit_finish')->nullable();
            $table->string('instrument_cluster_illumination')->nullable();
            $table->string('odometer_function')->nullable();
            $table->string('interior_lighting')->nullable();
            $table->string('glove_box_latching')->nullable();
            $table->string('carpet_wear_retention')->nullable();
            $table->string('interior_contamination_odour')->nullable();
            $table->string('trunk_boot_interior_condition')->nullable();
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_interior_details');
    }
};
