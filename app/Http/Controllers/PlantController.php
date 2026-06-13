<?php

namespace App\Http\Controllers;

use App\Models\Plant;
use App\Http\Requests\PlantRequest;
use Inertia\Inertia;

class PlantController extends Controller
{
    public function index()
    {
        $plants = Plant::with('varieties')->orderBy('plant_name')->get();
        return Inertia::render('Plant/Index', ['plants' => $plants]);
    }

    public function create()
    {
        return Inertia::render('Plant/Form');
    }

    public function store(PlantRequest $request)
    {
        Plant::create($request->validated());
        return redirect()->route('plants.index')->with('success', 'Tanaman berhasil ditambahkan.');
    }

    public function edit(Plant $plant)
    {
        return Inertia::render('Plant/Form', ['plant' => $plant]);
    }

    public function update(PlantRequest $request, Plant $plant)
    {
        $plant->update($request->validated());
        return redirect()->route('plants.index')->with('success', 'Tanaman berhasil diperbarui.');
    }

    public function destroy(Plant $plant)
    {
        $plant->delete();
        return redirect()->route('plants.index')->with('success', 'Tanaman dihapus.');
    }
}
