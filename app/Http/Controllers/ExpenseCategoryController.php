<?php

namespace App\Http\Controllers;

use App\Models\ExpenseCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseCategoryController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search'));

        $categories = ExpenseCategory::query()
            ->when($search !== '', function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->latest('id')
            ->cursorPaginate(10)
            ->withQueryString();
        return Inertia::render(
            'ExpenseCategory/Index',
            [
                'categories' => $categories,
                'filters' => [
                    'search' => $search
                ]
            ]);
    }

    public function create()
    {
        return Inertia::render('ExpenseCategory/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['name' => 'required|string|max:255|unique:expense_categories']);
        ExpenseCategory::create($validated);
        return redirect()->route('expense-categories.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function edit(ExpenseCategory $expenseCategory)
    {
        return Inertia::render('ExpenseCategory/Form', ['category' => $expenseCategory]);
    }

    public function update(Request $request, ExpenseCategory $expenseCategory)
    {
        $validated = $request->validate(['name' => 'required|string|max:255|unique:expense_categories,name,' . $expenseCategory->id]);
        $expenseCategory->update($validated);
        return redirect()->route('expense-categories.index')->with('success', 'Kategori diperbarui.');
    }

    public function destroy(ExpenseCategory $expenseCategory)
    {
        $expenseCategory->delete();
        return redirect()->route('expense-categories.index')->with('success', 'Kategori dihapus.');
    }
}
