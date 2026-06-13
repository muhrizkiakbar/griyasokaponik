<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Harvest extends Model
{
    use HasFactory;

    protected $fillable = [
        'planting_batch_id', 'harvest_date', 'quantity', 'unit', 'grade', 'notes'
    ];

    protected $casts = [
        'harvest_date' => 'date',
    ];

    public function plantingBatch()
    {
        return $this->belongsTo(PlantingBatch::class);
    }

    public function saleItems()
    {
        return $this->hasMany(SaleItem::class);
    }
}
