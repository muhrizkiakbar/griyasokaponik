<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Customer;
use App\Models\Harvest;
use App\Http\Requests\SaleRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search'));
        $customerId = $request->query('customer_id');
        $paymentStatus = $request->query('payment_status');

        $sales = Sale::query()
            ->with(['customer'])
            ->when($customerId, function ($query) use ($customerId) {
                $query->where('customer_id', $customerId);
            })
            ->when($paymentStatus, function ($query) use ($paymentStatus) {
                $query->where('payment_status', $paymentStatus);
            })
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('sale_number', 'like', "%{$search}%")
                        ->orWhere('sale_date', 'like', "%{$search}%")
                        ->orWhere('subtotal', 'like', "%{$search}%")
                        ->orWhere('discount', 'like', "%{$search}%")
                        ->orWhere('grand_total', 'like', "%{$search}%")
                        ->orWhere('notes', 'like', "%{$search}%")
                        ->orWhere('created_at', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($customerQuery) use ($search) {
                            $customerQuery->where('name', 'like', "%{$search}%")
                                ->orWhere('customer_code', 'like', "%{$search}%")
                                ->orWhere('phone', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        });
                });
            })
            ->latest('id')
            ->cursorPaginate(10)
            ->withQueryString();

        $customers = Customer::query()
            ->orderBy('name')
            ->get(['id', 'name']);


        return Inertia::render('Sale/Index', [
            'sales' => $sales,
            'customers' => $customers,
            'filters' => [
                'search' => $search,
                'customer_id' => $customerId,
                'payment_status' => $paymentStatus,
            ],
        ]);
    }

    public function create()
    {
        $customers = Customer::orderBy('name')->get();
        $harvests = Harvest::with('plantingBatch.plantVariety.plant')
            ->orderBy('harvest_date', 'desc')
            ->limit(10)
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

            $subtotal = collect($items)->sum(function ($item) {
                return (float) $item['quantity'] * (float) $item['price'];
            });

            $discount = (float) ($request->discount ?? 0);
            $grandTotal = max($subtotal - $discount, 0);

            $paidAmount = match ($request->payment_status) {
                'lunas' => $grandTotal,
                'DP' => min((float) ($request->paid_amount ?? 0), $grandTotal),
                default => 0,
            };

            $remainingAmount = max($grandTotal - $paidAmount, 0);

            $paymentStatus = $remainingAmount <= 0
                ? 'lunas'
                : $request->payment_status;

            $sale = Sale::create([
                'sale_number' => $request->sale_number,
                'customer_id' => $request->customer_id,
                'sale_date' => $request->sale_date,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'grand_total' => $grandTotal,
                'paid_amount' => $paidAmount,
                'remaining_amount' => $remainingAmount,
                'payment_status' => $paymentStatus,
                'paid_at' => $paymentStatus === 'lunas' ? now() : null,
                'notes' => $request->notes,
            ]);

            foreach ($items as $item) {
                $sale->items()->create([
                    'harvest_id' => $item['harvest_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'total' => (float) $item['quantity'] * (float) $item['price'],
                ]);
            }
        });

        return redirect()
            ->route('sales.index')
            ->with('success', 'Penjualan berhasil dicatat.');
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

    public function payOff(Sale $sale)
    {
        if ($sale->payment_status === 'lunas') {
            return back()->with('success', 'Penjualan sudah lunas.');
        }

        $sale->update([
            'paid_amount' => $sale->grand_total,
            'remaining_amount' => 0,
            'payment_status' => 'lunas',
            'paid_at' => now(),
        ]);

        return back()->with('success', 'Penjualan berhasil dilunasi.');
    }

    public function destroy(Sale $sale)
    {
        $sale->items()->delete();
        $sale->delete();
        return redirect()->route('sales.index')->with('success', 'Penjualan dihapus.');
    }
}
