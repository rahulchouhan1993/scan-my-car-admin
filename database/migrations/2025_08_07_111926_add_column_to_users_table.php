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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone_no2', 15)->nullable()->after('phone_no');
            $table->string('branch_manager', 50)->nullable()->after('phone_no2');
            $table->string('report_to', 25)->nullable()->after('branch_manager');
            $table->string('work_type', 25)->nullable()->after('report_to');
            $table->string('allocation_branch', 15)->nullable()->after('work_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
