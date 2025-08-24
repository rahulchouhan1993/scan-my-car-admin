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
        Schema::create('inspection_tyre_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->foreign('request_id')->references('id')->on('inspection_requests')->onDelete('cascade');
             // Tyre brand & size
            $table->string('tyre_brand_size_lf')->nullable();
            $table->string('tyre_brand_size_rf')->nullable();
            $table->string('tyre_brand_size_lr')->nullable();
            $table->string('tyre_brand_size_rr')->nullable();

            // Tyre manufacture date
            $table->string('tyre_manufacture_date_lf')->nullable();
            $table->string('tyre_manufacture_date_rf')->nullable();
            $table->string('tyre_manufacture_date_lr')->nullable();
            $table->string('tyre_manufacture_date_rr')->nullable();

            // Tread depth
            $table->string('tread_depth_lf')->nullable();
            $table->string('tread_depth_rf')->nullable();
            $table->string('tread_depth_lr')->nullable();
            $table->string('tread_depth_rr')->nullable();

            // Tyre pressure (all four together)
            $table->string('tyre_pressure')->nullable();

            // Spare wheel
            $table->string('spare_wheel_condition')->nullable();

            // Comment
            $table->text('tyre_comment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_tyre_details');
    }
};
