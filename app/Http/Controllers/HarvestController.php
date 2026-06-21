<?php

namespace App\Http\Controllers;

use App\Models\Harvest;
use App\Models\PlantingBatch;
use App\Http\Requests\HarvestRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HarvestController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search'));
        $plantingBatchId = $request->query('planting_batch_id');
        $unit = $request->query('unit');
        $grade = $request->query('grade');

        $harvests = Harvest::query()
            ->with(['plantingBatch'])
            ->when($plantingBatchId, function ($query) use ($plantingBatchId) {
                $query->where('planting_batch_id', $plantingBatchId);
            })
            ->when($unit, function ($query) use ($unit) {
                $query->where('unit', $unit);
            })
            ->when($grade, function ($query) use ($grade) {
                $query->where('grade', $grade);
            })
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('harvest_date', 'like', "%{$search}%")
                        ->orWhere('quantity', 'like', "%{$search}%")
                        ->orWhere('notes', 'like', "%{$search}%")
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
            ->get(['id', 'batch_code']);



        return Inertia::render(
            'Harvest/Index',
            [
                'harvests' => $harvests,
                'batches' => $batches,
                'filters' => [
                    'search' => $search,
                    'planting_batch_id' => $plantingBatchId,
                    'unit' => $unit,
                    'grade' => $grade,
                ],
            ]
        );
    }

    public function create(Request $request)
    {
        $batches = PlantingBatch::where('status', 'active')
            ->where('expected_harvest_date', '<=', Carbon::now())
            ->with('plantVariety.plant')
            ->orderBy('expected_harvest_date')
            ->get();

        $selectedBatch = null;
        if ($request->has('planting_batch_id')) {
            $selectedBatch = PlantingBatch::find($request->planting_batch_id);
        }

        return Inertia::render('Harvest/Form', [
            'batches' => $batches,
            'selectedBatch' => $selectedBatch,
        ]);
    }

    public function store(HarvestRequest $request)
    {
        DB::transaction(function () use ($request) {
            $harvest = Harvest::create($request->validated());
            // Update harvested_quantity di planting_batch
            $batch = $harvest->plantingBatch;
            $batch->increment('harvested_quantity', $harvest->quantity);
            // Jika total panen >= jumlah tanam, update status menjadi harvested
            if ($batch->harvested_quantity >= ($batch->transplanted_quantity ?? $batch->seed_quantity)) {
                $batch->update(['current_stage' => 'harvested', 'status' => 'completed']);
            }
        });

        return redirect()->route('harvests.index')->with('success', 'Panen berhasil dicatat.');
    }

    public function edit(Harvest $harvest)
    {
        $batches = PlantingBatch::with('plantVariety.plant')->get();
        return Inertia::render('Harvest/Form', [
            'harvest' => $harvest,
            'batches' => $batches,
        ]);
    }

    public function update(HarvestRequest $request, Harvest $harvest)
    {
        $oldQuantity = $harvest->quantity;
        $harvest->update($request->validated());
        // Adjust batch harvested quantity
        $diff = $harvest->quantity - $oldQuantity;
        $harvest->plantingBatch->increment('harvested_quantity', $diff);

        return redirect()->route('harvests.index')->with('success', 'Data panen diperbarui.');
    }

    public function destroy(Harvest $harvest)
    {
        $batch = $harvest->plantingBatch;
        $batch->decrement('harvested_quantity', $harvest->quantity);
        $harvest->delete();
        return redirect()->route('harvests.index')->with('success', 'Data panen dihapus.');
    }
}
