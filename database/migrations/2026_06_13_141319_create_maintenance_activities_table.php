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
        Schema::create('maintenance_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('planting_batch_id')->constrained()->onDelete('cascade');
            $table->string('activity_type', 50);
            $table->date('activity_date');
            $table->text('description')->nullable();
            $table->decimal('cost', 18, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_activities');
    }
};
