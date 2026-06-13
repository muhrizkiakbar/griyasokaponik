<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlantingBatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'batch_code', 'plant_variety_id', 'seeding_date', 'seed_quantity',
        'germinated_quantity', 'transplanted_quantity', 'harvested_quantity',
        'current_stage', 'expected_transplant_date', 'expected_harvest_date',
        'notes', 'status'
    ];

    protected $casts = [
        'seeding_date' => 'date',
        'expected_transplant_date' => 'date',
        'expected_harvest_date' => 'date',
    ];

    public function plantVariety()
    {
        return $this->belongsTo(PlantVariety::class);
    }

    public function allocations()
    {
        return $this->hasMany(BatchAllocation::class);
    }

    public function movements()
    {
        return $this->hasMany(PlantMovement::class)->orderBy('movement_date', 'desc');
    }

    public function stageLogs()
    {
        return $this->hasMany(GrowthStageLog::class)->orderBy('change_date', 'desc');
    }

    public function maintenanceActivities()
    {
        return $this->hasMany(MaintenanceActivity::class)->orderBy('activity_date', 'desc');
    }

    public function harvests()
    {
        return $this->hasMany(Harvest::class);
    }

    public function scopeReadyToHarvest($query)
    {
        return $query->where('expected_harvest_date', '<=', now())
                    ->where('current_stage', '!=', 'harvested')
                    ->where('status', 'active');
    }

    public function scopeOverdueHarvest($query)
    {
        return $query->where('expected_harvest_date', '<', now())
                    ->where('current_stage', '!=', 'harvested')
                    ->where('status', 'active');
    }
}
