<?php

namespace App\Http\Controllers;

use App\Models\PlantingBatch;
use App\Models\PlantVariety;
use App\Models\GrowingUnit;
use App\Http\Requests\PlantingBatchRequest;
use App\Models\BatchAllocation;
use Carbon\Carbon;
use Inertia\Inertia;
use DB;
use Symfony\Component\HttpFoundation\Request;

class PlantingBatchController extends Controller
{
    public function index()
    {
        $batches = PlantingBatch::with('plantVariety.plant')
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('PlantingBatch/Index', ['batches' => $batches]);
    }

    public function create()
    {
        $varieties = PlantVariety::with('plant')->where('status', 'active')->get();
        $units = GrowingUnit::where('status', 'active')->get();
        return Inertia::render('PlantingBatch/Form', [
            'varieties' => $varieties,
            'units' => $units,
        ]);
    }

    public function updateStage(Request $request, PlantingBatch $plantingBatch)
    {
        $request->validate([
            'current_stage' => 'required|in:seedling,vegetative,generative,ready_to_harvest,harvested',
        ]);

        $oldStage = $plantingBatch->current_stage;
        $newStage = $request->current_stage;

        // Update stage
        $plantingBatch->update([
            'current_stage' => $newStage,
            'status' => $newStage === 'harvested' ? 'completed' : 'active',
        ]);

        // Catat log perubahan stage (opsional)
        DB::table('growth_stage_logs')->insert([
            'planting_batch_id' => $plantingBatch->id,
            'from_stage' => $oldStage,
            'to_stage' => $newStage,
            'change_date' => now(),
            'reason' => $request->reason ?? 'Manual update by user',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('success', "Tahapan berhasil diubah dari {$oldStage} ke {$newStage}.");
    }


    public function store(PlantingBatchRequest $request)
    {
        DB::transaction(function () use ($request) {
            $batch = PlantingBatch::create($request->validated());

            $data = $request->validated();
            $variety = PlantVariety::with('plant')->find($data['plant_variety_id']);
            if ($variety && $variety->plant->typical_harvest_days) {
                $seedingDate = Carbon::parse($data['seeding_date']);
                $data['expected_harvest_date'] = $seedingDate->copy()->addDays($variety->plant->typical_harvest_days);
            }
            // Jika user mengirim manual, timpa
            if ($request->filled('expected_harvest_date')) {
                $data['expected_harvest_date'] = $request->expected_harvest_date;
            }


            if ($request->filled('allocation_unit_id') && $request->filled('allocation_quantity')) {
                $batch->allocations()->create([
                    'growing_unit_id' => $request->allocation_unit_id,
                    'allocation_date' => $batch->seeding_date,
                    'quantity' => $request->allocation_quantity,
                ]);
            }
        });

        return redirect()->route('planting-batches.index')
            ->with('success', 'Batch semai berhasil dibuat.');
    }

    public function show(PlantingBatch $plantingBatch)
    {
        $plantingBatch->load([
            'plantVariety.plant',
            'allocations.growingUnit',
            'harvests',
            'movements' => function ($query) {
                $query->with(['toUnit', 'fromUnit']);
            },
            'stageLogs',
            'maintenanceActivities'
        ]);
        $growingUnits = GrowingUnit::with('growingArea')->where('status', 'active')->get();

        return Inertia::render('PlantingBatch/Show', [
            'batch' => $plantingBatch,
            'growingUnits' => $growingUnits,
        ]);
    }

    public function storeAllocation(Request $request, PlantingBatch $plantingBatch)
    {
        $request->validate([
            'growing_unit_id' => 'required|exists:growing_units,id',
            'allocation_date' => 'required|date',
            'quantity' => 'required|integer|min:1',
        ]);

        $plantingBatch->allocations()->create($request->all());

        return redirect()->back()->with('success', 'Alokasi bedengan ditambahkan.');
    }

    public function destroyAllocation(BatchAllocation $batchAllocation)
    {
        $batchAllocation->delete();
        return redirect()->back()->with('success', 'Alokasi dihapus.');
    }

    public function edit(PlantingBatch $plantingBatch)
    {
        $varieties = PlantVariety::with('plant')->where('status', 'active')->get();
        $units = GrowingUnit::where('status', 'active')->get();
        return Inertia::render('PlantingBatch/Form', [
            'batch' => $plantingBatch,
            'varieties' => $varieties,
            'units' => $units,
        ]);
    }

    public function update(PlantingBatchRequest $request, PlantingBatch $plantingBatch)
    {
        $data = $request->validated();
        $variety = PlantVariety::with('plant')->find($data['plant_variety_id']);
        if ($variety && $variety->plant->typical_harvest_days) {
            $seedingDate = Carbon::parse($data['seeding_date']);
            $data['expected_harvest_date'] = $seedingDate->copy()->addDays($variety->plant->typical_harvest_days);
        }
        // Jika user mengirim manual, timpa
        if ($request->filled('expected_harvest_date')) {
            $data['expected_harvest_date'] = $request->expected_harvest_date;
        }

        $plantingBatch->update($request->validated());
        return redirect()->route('planting-batches.index')
            ->with('success', 'Batch berhasil diperbarui.');
    }

    public function destroy(PlantingBatch $plantingBatch)
    {
        $plantingBatch->delete();
        return redirect()->route('planting-batches.index')
            ->with('success', 'Batch dihapus.');
    }
}
