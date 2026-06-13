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
        Schema::create('batch_allocations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('planting_batch_id')->constrained()->onDelete('cascade');
            $table->foreignId('growing_unit_id')->constrained()->onDelete('cascade');
            $table->date('allocation_date');
            $table->integer('quantity');
            $table->date('removal_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batch_allocations');
    }
};
