<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlantingBatchRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $id = $this->route('planting_batch') ? $this->route('planting_batch')->id : null;

        return [
            'batch_code' => 'required|string|max:100|unique:planting_batches,batch_code,' . $id,
            'plant_variety_id' => 'required|exists:plant_varieties,id',
            'seeding_date' => 'required|date',
            'seed_quantity' => 'required|integer|min:1',
            'germinated_quantity' => 'nullable|integer|min:0',
            'transplanted_quantity' => 'nullable|integer|min:0',
            'expected_transplant_date' => 'nullable|date|after_or_equal:seeding_date',
            'expected_harvest_date' => 'nullable|date|after_or_equal:expected_transplant_date',
            'notes' => 'nullable|string',
            'status' => 'required|in:active,completed,failed',
            // fields untuk allocation (opsional, tidak di tabel planting_batches)
            'allocation_unit_id' => 'nullable|exists:growing_units,id',
            'allocation_quantity' => 'nullable|integer|min:1',
        ];
    }

    public function messages()
    {
        return [
            'batch_code.unique' => 'Kode batch sudah digunakan.',
            'plant_variety_id.required' => 'Pilih varietas tanaman.',
            'seeding_date.required' => 'Tanggal semai wajib diisi.',
            'seed_quantity.min' => 'Jumlah benih minimal 1.',
            'expected_harvest_date.after_or_equal' => 'Estimasi panen harus setelah atau sama dengan estimasi pindah tanam.',
        ];
    }
}
