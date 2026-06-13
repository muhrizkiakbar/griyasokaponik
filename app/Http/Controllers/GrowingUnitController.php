<?php

namespace App\Http\Controllers;

use App\Models\GrowingUnit;
use App\Models\GrowingArea;
use App\Http\Requests\GrowingUnitRequest;
use Inertia\Inertia;

class GrowingUnitController extends Controller
{
    public function index()
    {
        $units = GrowingUnit::with('growingArea')->orderBy('unit_name')->get();
        return Inertia::render('GrowingUnit/Index', ['units' => $units]);
    }

    public function create()
    {
        $areas = GrowingArea::where('status', 'active')->get();
        return Inertia::render('GrowingUnit/Form', ['areas' => $areas]);
    }

    public function store(GrowingUnitRequest $request)
    {
        GrowingUnit::create($request->validated());
        return redirect()->route('growing-units.index')->with('success', 'Bedengan/Meja tanam berhasil ditambahkan.');
    }

    public function edit(GrowingUnit $growingUnit)
    {
        $areas = GrowingArea::where('status', 'active')->get();
        return Inertia::render('GrowingUnit/Form', [
            'unit' => $growingUnit,
            'areas' => $areas,
        ]);
    }

    public function update(GrowingUnitRequest $request, GrowingUnit $growingUnit)
    {
        $growingUnit->update($request->validated());
        return redirect()->route('growing-units.index')->with('success', 'Bedengan diperbarui.');
    }

    public function destroy(GrowingUnit $growingUnit)
    {
        $growingUnit->delete();
        return redirect()->route('growing-units.index')->with('success', 'Bedengan dihapus.');
    }
}
