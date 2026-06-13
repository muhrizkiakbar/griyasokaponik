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
        Schema::create('plant_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('planting_batch_id')->constrained()->onDelete('cascade');
            $table->foreignId('from_unit_id')->nullable()->constrained('growing_units')->nullOnDelete();
            $table->foreignId('to_unit_id')->nullable()->constrained('growing_units')->nullOnDelete();
            $table->string('movement_type', 50);
            $table->integer('quantity');
            $table->date('movement_date');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plant_movements');
    }
};
