<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HarvestRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'planting_batch_id' => 'required|exists:planting_batches,id',
            'harvest_date' => 'required|date',
            'quantity' => 'required|numeric|min:0.01',
            'unit' => 'required|string|max:20',
            'grade' => 'required|string|max:20|in:Grade A,Grade B,Reject',
            'notes' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'quantity.min' => 'Jumlah panen minimal 0.01.',
            'grade.in' => 'Grade harus Grade A, Grade B, atau Reject.',
        ];
    }
}
