<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'sale_id', 'harvest_id', 'quantity', 'price', 'total'
    ];

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    public function harvest()
    {
        return $this->belongsTo(Harvest::class);
    }
}
