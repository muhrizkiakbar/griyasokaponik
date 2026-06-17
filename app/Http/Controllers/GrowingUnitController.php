<?php

namespace App\Http\Controllers;

use App\Models\GrowingUnit;
use App\Models\GrowingArea;
use App\Http\Requests\GrowingUnitRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GrowingUnitController extends Controller
{
    public function index(Request $request)
    {
        $units = GrowingUnit::with('growingArea')->orderBy('unit_name')->cursorPaginate(10)->withQueryString();


        $search = trim((string) $request->query('search'));
        $growingAreaId = $request->query('growing_area_id');
        $status = $request->query('status');

        $units = GrowingUnit::query()
            ->with(['growingArea'])
            ->when($growingAreaId, function ($query) use ($growingAreaId) {
                $query->where('growing_area_id', $growingAreaId);
            })
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('unit_code', 'like', "%{$search}%")
                        ->orWhere('unit_name', 'like', "%{$search}%")
                        ->orWhere('capacity', 'like', "%{$search}%")
                        ->orWhere('unit_type', 'like', "%{$search}%")
                        ->orWhereHas('growingArea', function ($areaQuery) use ($search) {
                            $areaQuery->where('area_name', 'like', "%{$search}%")
                                ->orWhere('area_code', 'like', "%{$search}%");
                        });
                });
            })
            ->latest('id')
            ->cursorPaginate(10)
            ->withQueryString();

        $areas = GrowingArea::query()
            ->orderBy('area_name')
            ->get(['id', 'area_name']);

        return Inertia::render(
            'GrowingUnit/Index',
            [
                'units' => $units,
                'areas' => $areas,
                'filters' => [
                    'search' => $search,
                    'growing_area_id' => $growingAreaId,
                    'status' => $status,
                ],
            ]
        );
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
