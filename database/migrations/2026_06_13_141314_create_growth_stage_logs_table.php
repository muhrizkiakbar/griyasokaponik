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
        Schema::create('growth_stage_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('planting_batch_id')->constrained()->onDelete('cascade');
            $table->string('from_stage', 50);
            $table->string('to_stage', 50);
            $table->date('change_date');
            $table->text('reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('growth_stage_logs');
    }
};
