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
            $table->string('phone_no',15)->after('email')->default(NULL);
            $table->enum('role', ['admin', 'inspector', 'customer'])->after('phone_no')->default('customer');
            $table->string('address')->after('role')->default(NULL)->nullable(true);
            $table->string('address2')->after('address')->default(NULL)->nullable(true);
            $table->string('city')->after('address2')->default(NULL)->nullable(true);
            $table->string('state')->after('city')->default(NULL)->nullable(true);
            $table->string('zip')->after('state')->default(NULL)->nullable(true);
            $table->tinyInteger('status')->after('zip')->default(0);
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
