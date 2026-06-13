<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlantVarietyRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'plant_id' => 'required|exists:plants,id',
            'variety_name' => 'required|string|max:255',
            'seed_brand' => 'nullable|string|max:255',
            'expected_yield_per_unit' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ];
    }
}
