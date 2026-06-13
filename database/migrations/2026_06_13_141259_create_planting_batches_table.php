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
        Schema::create('planting_batches', function (Blueprint $table) {
            $table->id();
            $table->string('batch_code', 100)->unique();
            $table->foreignId('plant_variety_id')->constrained()->onDelete('cascade');
            $table->date('seeding_date');
            $table->integer('seed_quantity');
            $table->integer('germinated_quantity')->nullable();
            $table->integer('transplanted_quantity')->nullable();
            $table->integer('harvested_quantity')->default(0);
            $table->string('current_stage', 50)->default('seedling');
            $table->date('expected_transplant_date')->nullable();
            $table->date('expected_harvest_date')->nullable();
            $table->text('notes')->nullable();
            $table->string('status', 20)->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planting_batches');
    }
};
