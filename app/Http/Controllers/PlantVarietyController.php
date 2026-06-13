<?php

namespace App\Http\Controllers;

use App\Models\PlantVariety;
use App\Models\Plant;
use App\Http\Requests\PlantVarietyRequest;
use Inertia\Inertia;

class PlantVarietyController extends Controller
{
    public function index()
    {
        $varieties = PlantVariety::with('plant')->orderBy('variety_name')->get();
        return Inertia::render('PlantVariety/Index', ['varieties' => $varieties]);
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
