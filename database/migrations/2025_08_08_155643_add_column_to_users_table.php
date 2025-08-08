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
            $table->string('company_name', 15)->nullable()->after('zip');
            $table->string('buying_limit', 50)->nullable()->after('company_name');
            $table->string('car_model', 25)->nullable()->after('buying_limit');
            $table->string('model_year', 25)->nullable()->after('car_model');
            $table->string('milage', 15)->nullable()->after('model_year');
            $table->string('account_manager', 15)->nullable()->after('milage');
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
