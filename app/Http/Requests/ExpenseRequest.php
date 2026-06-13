<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'expense_category_id' => 'required|exists:expense_categories,id',
            'expense_date' => 'required|date',
            'description' => 'required|string|max:1000',
            'amount' => 'required|numeric|min:0',
            'receipt_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'expense_category_id.required' => 'Kategori pengeluaran wajib dipilih.',
            'description.required' => 'Deskripsi wajib diisi.',
            'amount.min' => 'Jumlah minimal 0.',
            'receipt_file.mimes' => 'Bukti harus berupa jpg, jpeg, png, atau pdf.',
            'receipt_file.max' => 'Ukuran file maksimal 2MB.',
        ];
    }
}
