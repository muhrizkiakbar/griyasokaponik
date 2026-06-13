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
        Schema::create('growing_units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('growing_area_id')->constrained()->onDelete('cascade');
            $table->string('unit_code', 50);
            $table->string('unit_name', 255);
            $table->integer('capacity');
            $table->string('unit_type', 50);
            $table->string('status', 20)->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('growing_units');
    }
};
