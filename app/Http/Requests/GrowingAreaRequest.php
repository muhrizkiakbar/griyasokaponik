<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GrowingAreaRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $id = $this->route('growing_area') ? $this->route('growing_area')->id : null;

        return [
            'area_code' => 'required|string|max:50|unique:growing_areas,area_code,' . $id,
            'area_name' => 'required|string|max:255',
            'area_type' => 'required|string|max:50',
            'length' => 'required|numeric|min:0',
            'width' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ];
    }
}
