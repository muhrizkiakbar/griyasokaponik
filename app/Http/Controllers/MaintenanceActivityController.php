<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceActivity;
use App\Models\PlantingBatch;
use App\Http\Requests\MaintenanceActivityRequest;
use Inertia\Inertia;

class MaintenanceActivityController extends Controller
{
    public function index()
    {
        $activities = MaintenanceActivity::with('plantingBatch.plantVariety.plant')
            ->orderBy('activity_date', 'desc')
            ->get();
        return Inertia::render('Maintenance/Index', ['activities' => $activities]);
    }

    public function create()
    {
        $batches = PlantingBatch::where('status', 'active')
            ->with('plantVariety.plant')
            ->get();
        return Inertia::render('Maintenance/Form', ['batches' => $batches]);
    }

    public function store(MaintenanceActivityRequest $request)
    {
        MaintenanceActivity::create($request->validated());
        return redirect()->route('maintenance.index')->with('success', 'Perawatan berhasil dicatat.');
    }

    public function edit(MaintenanceActivity $maintenance)
    {
        $batches = PlantingBatch::with('plantVariety.plant')->get();
        return Inertia::render('Maintenance/Form', [
            'activity' => $maintenance,
            'batches' => $batches,
        ]);
    }

    public function update(MaintenanceActivityRequest $request, MaintenanceActivity $maintenance)
    {
        $maintenance->update($request->validated());
        return redirect()->route('maintenance.index')->with('success', 'Perawatan diperbarui.');
    }

    public function destroy(MaintenanceActivity $maintenance)
    {
        $maintenance->delete();
        return redirect()->route('maintenance.index')->with('success', 'Perawatan dihapus.');
    }
}
