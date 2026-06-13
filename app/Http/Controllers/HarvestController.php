<?php

namespace App\Http\Controllers;

use App\Models\Harvest;
use App\Models\PlantingBatch;
use App\Http\Requests\HarvestRequest;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Request;

class HarvestController extends Controller
{
    public function index()
    {
        $harvests = Harvest::with('plantingBatch.plantVariety.plant')
            ->orderBy('harvest_date', 'desc')
            ->get();
        return Inertia::render('Harvest/Index', ['harvests' => $harvests]);
    }

    public function create(Request $request)
    {
        $batches = PlantingBatch::where('status', 'active')
            ->where('expected_harvest_date', '<=', Carbon::now()->subDays(5))
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
