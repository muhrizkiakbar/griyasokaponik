<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlantVariety extends Model
{
    use HasFactory;

    protected $fillable = [
        'plant_id', 'variety_name', 'seed_brand', 'expected_yield_per_unit',
        'notes', 'status'
    ];

    public function plant()
    {
        return $this->belongsTo(Plant::class);
    }

    public function plantingBatches()
    {
        return $this->hasMany(PlantingBatch::class);
    }
}
