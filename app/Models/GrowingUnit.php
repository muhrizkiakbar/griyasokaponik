<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrowingUnit extends Model
{
    use HasFactory;

    protected $fillable = [
        'growing_area_id', 'unit_code', 'unit_name', 'capacity',
        'unit_type', 'status'
    ];

    public function growingArea()
    {
        return $this->belongsTo(GrowingArea::class);
    }

    public function batchAllocations()
    {
        return $this->hasMany(BatchAllocation::class);
    }
}
