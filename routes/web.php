<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MaintenanceActivityController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PlantController;
use App\Http\Controllers\PlantVarietyController;
use App\Http\Controllers\GrowingAreaController;
use App\Http\Controllers\GrowingUnitController;
use App\Http\Controllers\PlantingBatchController;
use App\Http\Controllers\HarvestController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\PlantMovementController;
use App\Http\Controllers\UserController;


Route::get('/', function () {
    return redirect('/dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Master Data - Tanaman
    Route::resource('plants', PlantController::class);

    // Master Data - Varietas Tanaman
    Route::resource('plant-varieties', PlantVarietyController::class);

    // Master Data - Area Kebun
    Route::resource('growing-areas', GrowingAreaController::class);

    // Master Data - Bedengan / Meja Tanam
    Route::resource('growing-units', GrowingUnitController::class);

    Route::resource('maintenance', MaintenanceActivityController::class);

    // Manajemen Batch Semai & Tanam
    Route::resource('planting-batches', PlantingBatchController::class);

    Route::patch('/planting-batches/{plantingBatch}/update-stage', [PlantingBatchController::class, 'updateStage'])->name('planting-batches.update-stage');
    Route::post('/planting-batches/{plantingBatch}/allocations', [PlantingBatchController::class, 'storeAllocation'])->name('planting-batches.allocations.store');
    Route::delete('/batch-allocations/{batchAllocation}', [PlantingBatchController::class, 'destroyAllocation'])->name('batch-allocations.destroy');
    Route::post('/planting-batches/{plantingBatch}/movements', [PlantMovementController::class, 'store'])->name('plant-movements.store');
    Route::delete('/plant-movements/{plantMovement}', [PlantMovementController::class, 'destroy'])->name('plant-movements.destroy');

    // Manajemen Panen
    Route::resource('harvests', HarvestController::class);

    // Master Data - Customer
    Route::resource('customers', CustomerController::class);

    // Manajemen Penjualan
    Route::resource('sales', SaleController::class);

    // Master Data - Kategori Pengeluaran
    Route::resource('expense-categories', ExpenseCategoryController::class);

    // Manajemen Pengeluaran
    Route::resource('expenses', ExpenseController::class);

    // Laporan
    Route::prefix('reports')->name('reports.')->group(function () {
        Route::get('/profit-loss', [ReportController::class, 'profitLoss'])->name('profit-loss');
        // Tambahkan laporan lain jika diperlukan:
        // Route::get('/planting', [ReportController::class, 'planting'])->name('planting');
        // Route::get('/harvest', [ReportController::class, 'harvest'])->name('harvest');
        // Route::get('/sales', [ReportController::class, 'sales'])->name('sales');
        // Route::get('/expenses', [ReportController::class, 'expenses'])->name('expenses');
        // Route::get('/productivity', [ReportController::class, 'productivity'])->name('productivity');
        // Route::get('/stock', [ReportController::class, 'stock'])->name('stock');
    });

    Route::resource('users', UserController::class);
});

require __DIR__.'/auth.php';
