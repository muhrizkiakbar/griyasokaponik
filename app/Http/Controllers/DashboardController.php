<?php

namespace App\Http\Controllers;

use App\Models\PlantingBatch;
use App\Models\Harvest;
use App\Models\Sale;
use App\Models\Expense;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now->copy()->endOfMonth();

        $totalActivePlants = PlantingBatch::where('status', 'active')->count();
        $totalSeedlingBatches = PlantingBatch::where('current_stage', 'seedling')->count();

        // Luas area terpakai (jumlah tanaman dipindah)
        $totalUsedArea = PlantingBatch::where('status', 'active')
            ->with('allocations')
            ->get()
            ->sum(fn($batch) => $batch->allocations->sum('quantity'));

        $harvestThisMonth = Harvest::whereBetween('harvest_date', [$startOfMonth, $endOfMonth])->sum('quantity');
        $salesThisMonth = Sale::whereBetween('sale_date', [$startOfMonth, $endOfMonth])->sum('grand_total');
        $expensesThisMonth = Expense::whereBetween('expense_date', [$startOfMonth, $endOfMonth])->sum('amount');
        $profit = $salesThisMonth - $expensesThisMonth;

        $upcomingHarvests = PlantingBatch::where('expected_harvest_date', '>=', $now)
            ->where('status', 'active')
            ->orderBy('expected_harvest_date')
            ->limit(5)
            ->get(['id', 'batch_code', 'expected_harvest_date']);

        $overdueHarvests = PlantingBatch::overdueHarvest()
            ->orderBy('expected_harvest_date')
            ->limit(5)
            ->get(['id', 'batch_code', 'expected_harvest_date']);

        return Inertia::render('Dashboard', [
            'totalActivePlants' => $totalActivePlants,
            'totalSeedlingBatches' => $totalSeedlingBatches,
            'totalUsedArea' => $totalUsedArea,
            'harvestThisMonth' => $harvestThisMonth,
            'salesThisMonth' => $salesThisMonth,
            'expensesThisMonth' => $expensesThisMonth,
            'profit' => $profit,
            'upcomingHarvests' => $upcomingHarvests,
            'overdueHarvests' => $overdueHarvests,
        ]);
    }
}
