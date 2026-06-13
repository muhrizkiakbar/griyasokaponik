<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrowthStageLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'planting_batch_id', 'from_stage', 'to_stage', 'change_date', 'reason'
    ];

    protected $casts = [
        'change_date' => 'date',
    ];
}
