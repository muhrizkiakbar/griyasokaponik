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
        Schema::create('plants', function (Blueprint $table) {
            $table->id();
            $table->string('plant_code', 50)->unique();
            $table->string('plant_name', 255);
            $table->string('category', 100);
            $table->text('description')->nullable();
            $table->integer('typical_seedling_days')->nullable();
            $table->integer('typical_growth_days')->nullable();
            $table->integer('typical_harvest_days')->nullable();
            $table->string('status', 20)->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plants');
    }
};
