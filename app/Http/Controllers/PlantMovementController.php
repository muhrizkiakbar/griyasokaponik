<?php

namespace App\Http\Controllers;

use App\Models\PlantMovement;
use App\Models\PlantingBatch;
use Illuminate\Http\Request;

class PlantMovementController extends Controller
{
    public function store(Request $request, PlantingBatch $plantingBatch)
    {
        $request->validate([
            'from_unit_id' => 'nullable|exists:growing_units,id',
            'to_unit_id' => 'required|exists:growing_units,id',
            'movement_type' => 'required|in:transplant,relocation,harvest,dispose',
            'quantity' => 'required|integer|min:1',
            'movement_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $data = $request->all();
        $data['planting_batch_id'] = $plantingBatch->id;
        PlantMovement::create($data);

        return redirect()->back()->with('success', 'Perpindahan dicatat.');
    }

    public function destroy(PlantMovement $plantMovement)
    {
        $plantMovement->delete();
        return redirect()->back()->with('success', 'Perpindahan dihapus.');
    }
}
