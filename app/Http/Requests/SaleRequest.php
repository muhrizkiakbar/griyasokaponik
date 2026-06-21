<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $id = $this->route('sale') ? $this->route('sale')->id : null;

        return [
            'sale_number' => 'required|string|max:100|unique:sales,sale_number,' . $id,
            'customer_id' => 'required|exists:customers,id',
            'sale_date' => 'required|date',
            'paid_amount' => 'nullable|numeric|min:0',
            'items' => 'required|array|min:1',
            'items.*.harvest_id' => 'required|exists:harvests,id',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'payment_status' => 'required|in:belum bayar,DP,lunas',
            'notes' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'sale_number.unique' => 'Nomor penjualan sudah digunakan.',
            'items.required' => 'Minimal satu item produk.',
            'items.*.quantity.min' => 'Quantity minimal 0.01.',
            'payment_status.in' => 'Status pembayaran tidak valid.',
        ];
    }
}
