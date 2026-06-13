<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plant extends Model
{
    use HasFactory;

    protected $fillable = [
        'plant_code', 'plant_name', 'category', 'description',
        'typical_seedling_days', 'typical_growth_days', 'typical_harvest_days',
        'status'
    ];

    public function varieties()
    {
        return $this->hasMany(PlantVariety::class);
    }
}
