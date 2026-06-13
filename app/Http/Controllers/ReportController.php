<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Expense;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function profitLoss()
    {
        $year = request('year', Carbon::now()->year);
        $startDate = Carbon::create($year, 1, 1);
        $endDate = Carbon::create($year, 12, 31);

        $monthlySales = Sale::whereBetween('sale_date', [$startDate, $endDate])
            ->selectRaw('MONTH(sale_date) as month, SUM(grand_total) as total')
            ->groupBy('month')
            ->pluck('total', 'month');

        $monthlyExpenses = Expense::whereBetween('expense_date', [$startDate, $endDate])
            ->selectRaw('MONTH(expense_date) as month, SUM(amount) as total')
            ->groupBy('month')
            ->pluck('total', 'month');

        $months = [];
        for ($m = 1; $m <= 12; $m++) {
            $sales = $monthlySales[$m] ?? 0;
            $expenses = $monthlyExpenses[$m] ?? 0;
            $months[] = [
                'month' => Carbon::create($year, $m, 1)->translatedFormat('F'),
                'sales' => $sales,
                'expenses' => $expenses,
                'profit' => $sales - $expenses,
            ];
        }

        return Inertia::render('Report/ProfitLoss', [
            'year' => $year,
            'months' => $months,
            'totalSales' => $monthlySales->sum(),
            'totalExpenses' => $monthlyExpenses->sum(),
            'totalProfit' => $monthlySales->sum() - $monthlyExpenses->sum(),
        ]);
    }
}
