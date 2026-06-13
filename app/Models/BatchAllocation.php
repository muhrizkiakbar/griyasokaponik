<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BatchAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'planting_batch_id', 'growing_unit_id', 'allocation_date',
        'quantity', 'removal_date'
    ];

    protected $casts = [
        'allocation_date' => 'date',
        'removal_date' => 'date',
    ];

    public function plantingBatch()
    {
        return $this->belongsTo(PlantingBatch::class);
    }

    public function growingUnit()
    {
        return $this->belongsTo(GrowingUnit::class);
    }
}
