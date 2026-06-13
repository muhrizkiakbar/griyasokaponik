<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Http\Requests\ExpenseRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::with('category')->orderBy('expense_date', 'desc')->get();
        return Inertia::render('Expense/Index', ['expenses' => $expenses]);
    }

    public function create()
    {
        $categories = ExpenseCategory::orderBy('name')->get();
        return Inertia::render('Expense/Form', ['categories' => $categories]);
    }

    public function store(ExpenseRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('receipt_file')) {
            $path = $request->file('receipt_file')->store('receipts', 'public');
            $data['receipt_file'] = $path;
        }
        Expense::create($data);
        return redirect()->route('expenses.index')->with('success', 'Pengeluaran ditambahkan.');
    }

    public function edit(Expense $expense)
    {
        $categories = ExpenseCategory::orderBy('name')->get();
        return Inertia::render('Expense/Form', [
            'expense' => $expense,
            'categories' => $categories,
        ]);
    }

    public function update(ExpenseRequest $request, Expense $expense)
    {
        $data = $request->validated();
        if ($request->hasFile('receipt_file')) {
            if ($expense->receipt_file) {
                Storage::disk('public')->delete($expense->receipt_file);
            }
            $path = $request->file('receipt_file')->store('receipts', 'public');
            $data['receipt_file'] = $path;
        }
        $expense->update($data);
        return redirect()->route('expenses.index')->with('success', 'Pengeluaran diperbarui.');
    }

    public function destroy(Expense $expense)
    {
        if ($expense->receipt_file) {
            Storage::disk('public')->delete($expense->receipt_file);
        }
        $expense->delete();
        return redirect()->route('expenses.index')->with('success', 'Pengeluaran dihapus.');
    }
}
