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
        Schema::create('contact_us', function (Blueprint $table) {
            $table->id();
            $table->string('email',50)->nullable(true);
            $table->string('name',20)->nullable(true);
            $table->string('phone_no',15)->nullable(true);
            $table->string('service_type',20)->nullable(true);
            $table->mediumText('description',20)->nullable(true);
            $table->tinyInteger('seen_status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_us');
    }
};
