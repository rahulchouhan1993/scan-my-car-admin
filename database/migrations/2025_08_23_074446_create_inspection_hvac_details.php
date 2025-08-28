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
        Schema::create('inspection_hvac_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
            $table->text('air_condition')->nullable();
            $table->text('infotainment_condition')->nullable();
            $table->text('radio_condition')->nullable();
            $table->text('comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_hvac_details');
    }
};
