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
            $table->string('city')->nullable(true)->after('address_line_2');
            $table->string('pin_code')->nullable(true)->after('city');
            $table->string('request_no')->nullable(false)->unique()->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inspection_requests', function (Blueprint $table) {
            //
        });
    }
};
