<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GrowingUnitRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'growing_area_id' => 'required|exists:growing_areas,id',
            'unit_code' => 'required|string|max:50',
            'unit_name' => 'required|string|max:255',
            'capacity' => 'required|integer|min:1',
            'unit_type' => 'required|string|max:50',
            'status' => 'required|in:active,inactive',
        ];
    }
}
