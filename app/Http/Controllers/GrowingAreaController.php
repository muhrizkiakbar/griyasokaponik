<?php

namespace App\Http\Controllers;

use App\Models\GrowingArea;
use App\Http\Requests\GrowingAreaRequest;
use Inertia\Inertia;

class GrowingAreaController extends Controller
{
    public function index()
    {
        $areas = GrowingArea::with('growingUnits')->orderBy('area_name')->get();
        return Inertia::render('GrowingArea/Index', ['areas' => $areas]);
    }

    public function create()
    {
        return Inertia::render('GrowingArea/Form');
    }

    public function store(GrowingAreaRequest $request)
    {
        GrowingArea::create($request->validated());
        return redirect()->route('growing-areas.index')->with('success', 'Area kebun berhasil ditambahkan.');
    }

    public function edit(GrowingArea $growingArea)
    {
        return Inertia::render('GrowingArea/Form', ['area' => $growingArea]);
    }

    public function update(GrowingAreaRequest $request, GrowingArea $growingArea)
    {
        $growingArea->update($request->validated());
        return redirect()->route('growing-areas.index')->with('success', 'Area kebun diperbarui.');
    }

    public function destroy(GrowingArea $growingArea)
    {
        $growingArea->delete();
        return redirect()->route('growing-areas.index')->with('success', 'Area kebun dihapus.');
    }
}
