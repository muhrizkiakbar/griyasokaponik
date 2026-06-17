<?php

namespace App\Http\Controllers;

use App\Models\PlantVariety;
use App\Models\Plant;
use App\Http\Requests\PlantVarietyRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlantVarietyController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search'));
        $plantId = $request->query('plant_id');
        $status = $request->query('status');

        $varieties = PlantVariety::query()
            ->with(['plant'])
            ->when($plantId, function ($query) use ($plantId) {
                $query->where('plant_id', $plantId);
            })
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('variety_name', 'like', "%{$search}%")
                        ->orWhere('seed_brand', 'like', "%{$search}%")
                        ->orWhere('expected_yield_per_unit', 'like', "%{$search}%")
                        ->orWhere('notes', 'like', "%{$search}%")
                        ->orWhereHas('plant', function ($plantQuery) use ($search) {
                            $plantQuery->where('plant_name', 'like', "%{$search}%")
                                ->orWhere('plant_code', 'like', "%{$search}%");
                        });
                });
            })
            ->latest('id')
            ->cursorPaginate(10)
            ->withQueryString();

        $plants = Plant::query()
            ->orderBy('plant_name')
            ->get(['id', 'plant_name']);


        return Inertia::render('PlantVariety/Index', [
            'varieties' => $varieties,
            'plants' => $plants,
            'filters' => [
                'search' => $search,
                'plant_id' => $plantId,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        $plants = Plant::where('status', 'active')->get();
        return Inertia::render('PlantVariety/Form', ['plants' => $plants]);
    }

    public function store(PlantVarietyRequest $request)
    {
        PlantVariety::create($request->validated());
        return redirect()->route('plant-varieties.index')->with('success', 'Varietas berhasil ditambahkan.');
    }

    public function edit(PlantVariety $plantVariety)
    {
        $plants = Plant::where('status', 'active')->get();
        return Inertia::render('PlantVariety/Form', [
            'variety' => $plantVariety,
            'plants' => $plants,
        ]);
    }

    public function update(PlantVarietyRequest $request, PlantVariety $plantVariety)
    {
        $plantVariety->update($request->validated());
        return redirect()->route('plant-varieties.index')->with('success', 'Varietas berhasil diperbarui.');
    }

    public function destroy(PlantVariety $plantVariety)
    {
        $plantVariety->delete();
        return redirect()->route('plant-varieties.index')->with('success', 'Varietas dihapus.');
    }
}
