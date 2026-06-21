<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MaintenanceActivityRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'planting_batch_id' => 'required|exists:planting_batches,id',
            'activity_type' => 'required|string|max:50|in:watering,fertilizing,spraying,pruning,ppm_check,ph_check,other',
            'activity_date' => 'required|date',
            'description' => 'nullable|string',
            'cost' => 'required|numeric|min:0',
        ];
    }

    public function messages()
    {
        return [
            'activity_type.in' => 'Jenis perawatan tidak valid.',
            'cost.min' => 'Biaya tidak boleh negatif.',
        ];
    }
}
