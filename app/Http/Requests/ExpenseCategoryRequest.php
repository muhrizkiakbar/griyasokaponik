<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExpenseCategoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $id = $this->route('expense_category') ? $this->route('expense_category')->id : null;

        return [
            'name' => 'required|string|max:255|unique:expense_categories,name,' . $id,
        ];
    }
}
