<?php

namespace App\Http\Controllers;

use App\Models\PlantingBatch;
use App\Models\PlantVariety;
use App\Models\GrowingUnit;
use App\Http\Requests\PlantingBatchRequest;
use App\Models\BatchAllocation;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PlantingBatchController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search'));
        $plantVarietyId = $request->query('plant_variety_id');
        $currentStage = $request->query('current_stage');
        $status = $request->query('status');

        $batches = PlantingBatch::query()
            ->with(['plantVariety.plant'])
            ->when($plantVarietyId, function ($query) use ($plantVarietyId) {
                $query->where('plant_variety_id', $plantVarietyId);
            })
            ->when($currentStage, function ($query) use ($currentStage) {
                $query->where('current_stage', $currentStage);
            })
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('batch_code', 'like', "%{$search}%")
                        ->orWhere('seeding_date', 'like', "%{$search}%")
                        ->orWhere('seed_quantity', 'like', "%{$search}%")
                        ->orWhere('germinated_quantity', 'like', "%{$search}%")
                        ->orWhere('transplanted_quantity', 'like', "%{$search}%")
                        ->orWhere('harvested_quantity', 'like', "%{$search}%")
                        ->orWhere('expected_transplant_date', 'like', "%{$search}%")
                        ->orWhere('expected_harvest_date', 'like', "%{$search}%")
                        ->orWhere('notes', 'like', "%{$search}%")
                        ->orWhere('created_at', 'like', "%{$search}%")
                        ->orWhereHas('plantVariety', function ($varietyQuery) use ($search) {
                            $varietyQuery->where('variety_name', 'like', "%{$search}%")
                                ->orWhereHas('plant', function ($plantQuery) use ($search) {
                                    $plantQuery->where('plant_name', 'like', "%{$search}%")
                                        ->orWhere('plant_code', 'like', "%{$search}%");
                                });
                        });
                });
            })
            ->latest('id')
            ->cursorPaginate(10)
            ->withQueryString();

        $varieties = PlantVariety::query()
            ->with(['plant'])
            ->orderBy('variety_name')
            ->get(['id', 'plant_id', 'variety_name']);

        return Inertia::render('PlantingBatch/Index', [
            'batches' => $batches,
            'varieties' => $varieties,
            'filters' => [
                'search' => $search,
                'plant_variety_id' => $plantVarietyId,
                'current_stage' => $currentStage,
                'status' => $status,
            ],
        ]);
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
            'reason' => $request->reason ?? 'Manual update by user '. Auth::user()->name,
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
                $batch->expected_harvest_date = $seedingDate->copy()->addDays($variety->plant->typical_harvest_days);
                $batch->save();
            }
            // Jika user mengirim manual, timpa
            if ($request->filled('expected_harvest_date')) {
                $batch->expected_harvest_date = $request->expected_harvest_date;
                $batch->save();
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
