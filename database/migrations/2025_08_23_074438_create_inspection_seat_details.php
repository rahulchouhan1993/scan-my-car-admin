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
        Schema::create('inspection_seat_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
            $table->string('driver_seat_adjust_locks')->nullable();
            $table->string('passenger_seat_adjust_locks')->nullable();
            $table->string('seat_sliding_rails')->nullable();
            $table->string('seat_type')->nullable();
            $table->string('seat_cushion_wear')->nullable();
            $table->string('seat_upholstery_integrity')->nullable();
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_seat_details');
    }
};
