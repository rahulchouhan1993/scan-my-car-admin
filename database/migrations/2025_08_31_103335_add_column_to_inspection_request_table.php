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
        Schema::table('inspection_requests', function (Blueprint $table) {
            $table->string('other_vehicle_make')->nullable()->after('vehicle_make'); 
            $table->date('visiblity_till')->nullable()->after('completed_date'); 
            $table->json('documents')->nullable()->after('dealer_id'); 
            $table->mediumText('over_comments')->nullable()->after('visiblity_till'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inspection_request', function (Blueprint $table) {
            //
        });
    }
};
