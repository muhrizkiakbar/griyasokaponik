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
        Schema::create('growing_areas', function (Blueprint $table) {
            $table->id();
            $table->string('area_code', 50);
            $table->string('area_name', 255);
            $table->string('area_type', 50);
            $table->decimal('length', 10, 2);
            $table->decimal('width', 10, 2);
            $table->text('description')->nullable();
            $table->string('status', 20)->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('growing_areas');
    }
};
