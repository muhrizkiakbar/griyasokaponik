<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrowingArea extends Model
{
    use HasFactory;

    protected $fillable = [
        'area_code', 'area_name', 'area_type', 'length', 'width',
        'description', 'status'
    ];

    public function growingUnits()
    {
        return $this->hasMany(GrowingUnit::class);
    }
}
