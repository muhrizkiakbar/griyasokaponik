<?php

namespace App\Http\Controllers;

use App\Models\GrowingArea;
use App\Http\Requests\GrowingAreaRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GrowingAreaController extends Controller
{
    public function index(Request $request)
    {
        $areas = GrowingArea::with('growingUnits')->orderBy('area_name')->cursorPaginate(10)->withQueryString();

        $search = trim((string) $request->query('search'));
        $status = $request->query('status');

        $areas = GrowingArea::query()
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('area_code', 'like', "%{$search}%")
                        ->orWhere('area_name', 'like', "%{$search}%")
                        ->orWhere('area_type', 'like', "%{$search}%")
                        ->orWhere('length', 'like', "%{$search}%")
                        ->orWhere('width', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->latest('id')
            ->cursorPaginate(10)
            ->withQueryString();


        return Inertia::render(
            'GrowingArea/Index',
            [
                'areas' => $areas,
                'filters' => [
                    'search' => $search,
                    'status' => $status,
                ],
            ]
        );
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
