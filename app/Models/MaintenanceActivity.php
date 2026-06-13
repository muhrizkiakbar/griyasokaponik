<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'planting_batch_id',
        'activity_type',
        'activity_date',
        'description',
        'cost',
    ];

    protected $casts = [
        'activity_date' => 'date',
        'cost' => 'decimal:2',
    ];

    public function plantingBatch()
    {
        return $this->belongsTo(PlantingBatch::class);
    }
}
