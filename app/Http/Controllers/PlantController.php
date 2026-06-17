<?php

namespace App\Http\Controllers;

use App\Models\Plant;
use App\Http\Requests\PlantRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlantController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search'));
        $category = $request->query('category');
        $status = $request->query('status');

        $plants = Plant::query()
            ->when($category, function ($query) use ($category) {
                $query->where('category', $category);
            })
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('plant_code', 'like', "%{$search}%")
                        ->orWhere('plant_name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('typical_seedling_days', 'like', "%{$search}%")
                        ->orWhere('typical_growth_days', 'like', "%{$search}%")
                        ->orWhere('typical_harvest_days', 'like', "%{$search}%");
                });
            })
            ->latest('id')
            ->cursorPaginate(10)
            ->withQueryString();

        return Inertia::render('Plant/Index', [
            'plants' => $plants,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'status' => $status,
            ],
        ]);
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
