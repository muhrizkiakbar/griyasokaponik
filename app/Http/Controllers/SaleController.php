<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Customer;
use App\Models\Harvest;
use App\Http\Requests\SaleRequest;
use Inertia\Inertia;
use DB;

class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::with('customer')->orderBy('sale_date', 'desc')->get();
        return Inertia::render('Sale/Index', ['sales' => $sales]);
    }

    public function create()
    {
        $customers = Customer::orderBy('name')->get();
        $harvests = Harvest::with('plantingBatch.plantVariety.plant')
            ->orderBy('harvest_date', 'desc')
            ->get();
        return Inertia::render('Sale/Form', [
            'customers' => $customers,
            'harvests' => $harvests,
        ]);
    }

    public function store(SaleRequest $request)
    {
        DB::transaction(function () use ($request) {
            $items = $request->items;
            $subtotal = collect($items)->sum(fn($item) => $item['quantity'] * $item['price']);
            $discount = $request->discount ?? 0;
            $grandTotal = $subtotal - $discount;

            $sale = Sale::create([
                'sale_number' => $request->sale_number,
                'customer_id' => $request->customer_id,
                'sale_date' => $request->sale_date,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'grand_total' => $grandTotal,
                'payment_status' => $request->payment_status,
                'notes' => $request->notes,
            ]);

            foreach ($items as $item) {
                $sale->items()->create([
                    'harvest_id' => $item['harvest_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'total' => $item['quantity'] * $item['price'],
                ]);
            }
        });

        return redirect()->route('sales.index')->with('success', 'Penjualan berhasil dicatat.');
    }

    public function show(Sale $sale)
    {
        $sale->load([
            'customer',
            'items.harvest.plantingBatch.plantVariety.plant'
        ]);
        return Inertia::render('Sale/Show', ['sale' => $sale]);
    }

    public function edit(Sale $sale)
    {
        // Untuk edit sale (jika diperlukan) – bisa ditambahkan nanti
        abort(404);
    }

    public function update(SaleRequest $request, Sale $sale)
    {
        // Update sale – jika diperlukan
        abort(404);
    }

    public function destroy(Sale $sale)
    {
        $sale->items()->delete();
        $sale->delete();
        return redirect()->route('sales.index')->with('success', 'Penjualan dihapus.');
    }
}
