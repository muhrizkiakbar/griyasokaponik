<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceActivity;
use App\Models\PlantingBatch;
use App\Http\Requests\MaintenanceActivityRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceActivityController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search'));
        $plantingBatchId = $request->query('planting_batch_id');
        $activityType = $request->query('activity_type');

        $activities = MaintenanceActivity::query()
            ->with(['plantingBatch'])
            ->when($plantingBatchId, function ($query) use ($plantingBatchId) {
                $query->where('planting_batch_id', $plantingBatchId);
            })
            ->when($activityType, function ($query) use ($activityType) {
                $query->where('activity_type', $activityType);
            })
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('activity_date', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('cost', 'like', "%{$search}%")
                        ->orWhere('created_at', 'like', "%{$search}%")
                        ->orWhereHas('plantingBatch', function ($batchQuery) use ($search) {
                            $batchQuery->where('batch_code', 'like', "%{$search}%");
                        });
                });
            })
            ->latest('id')
            ->cursorPaginate(10)
            ->withQueryString();

        $batches = PlantingBatch::query()
            ->latest('id')
            ->limit(24)
            ->get(['id', 'batch_code']);

        return Inertia::render(
            'Maintenance/Index',
            [
                'activities' => $activities,
                'batches' => $batches,
                'filters' => [
                    'search' => $search,
                    'planting_batch_id' => $plantingBatchId,
                    'activity_type' => $activityType,
                ],
            ]
        );
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
