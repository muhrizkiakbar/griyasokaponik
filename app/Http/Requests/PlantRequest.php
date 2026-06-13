<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlantRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $id = $this->route('plant') ? $this->route('plant')->id : null;

        return [
            'plant_code' => 'required|string|max:50|unique:plants,plant_code,' . $id,
            'plant_name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'typical_seedling_days' => 'nullable|integer|min:0',
            'typical_growth_days' => 'nullable|integer|min:0',
            'typical_harvest_days' => 'nullable|integer|min:0',
            'status' => 'required|in:active,inactive',
        ];
    }

    public function messages()
    {
        return [
            'plant_code.required' => 'Kode tanaman wajib diisi.',
            'plant_code.unique' => 'Kode tanaman sudah digunakan.',
            'plant_name.required' => 'Nama tanaman wajib diisi.',
            'category.required' => 'Kategori wajib dipilih.',
            'status.in' => 'Status tidak valid.',
        ];
    }
}
