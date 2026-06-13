<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlantMovement extends Model
{
    use HasFactory;

    protected $fillable = [
        'planting_batch_id', 'from_unit_id', 'to_unit_id', 'movement_type',
        'quantity', 'movement_date', 'notes'
    ];

    protected $casts = [
        'movement_date' => 'date',
    ];


    public function fromUnit()
    {
        return $this->belongsTo(GrowingUnit::class, 'from_unit_id');
    }

    public function toUnit()
    {
        return $this->belongsTo(GrowingUnit::class, 'to_unit_id');
    }
}
