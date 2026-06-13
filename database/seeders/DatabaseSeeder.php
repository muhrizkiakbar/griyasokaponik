<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('id_ID'); // Indonesian locale

        // ==================== 1. USERS ====================
        $users = [
            ['name' => 'Admin Utama', 'username' => 'admin', 'email' => 'admin@kebun.test', 'role' => 'admin', 'password' => Hash::make('password')],
            ['name' => 'Petugas Kebun', 'username' => 'petugas_kebun', 'email' => 'kebun@kebun.test', 'role' => 'petugas_kebun', 'password' => Hash::make('password')],
            ['name' => 'Petugas Penjualan', 'username' => 'petugas_penjualan', 'email' => 'penjualan@kebun.test', 'role' => 'petugas_penjualan', 'password' => Hash::make('password')],
            ['name' => 'Owner', 'username' => 'owner', 'email' => 'owner@kebun.test', 'role' => 'owner', 'password' => Hash::make('password')],
            ['name' => 'Petugas Lapang 1', 'username' => 'lapang1', 'email' => 'lapang1@kebun.test', 'role' => 'petugas_kebun', 'password' => Hash::make('password')],
            ['name' => 'Petugas Lapang 2', 'username' => 'lapang2', 'email' => 'lapang2@kebun.test', 'role' => 'petugas_kebun', 'password' => Hash::make('password')],
        ];
        foreach ($users as $user) {
            DB::table('users')->updateOrInsert(['email' => $user['email']], $user);
        }

        // ==================== 2. EXPENSE CATEGORIES ====================
        $expenseCategories = [
            'Benih', 'Pupuk', 'Nutrisi Hidroponik', 'Pestisida', 'Herbisida',
            'Tenaga Kerja', 'Listrik', 'Air', 'Transportasi', 'Peralatan',
            'Perawatan Greenhouse', 'Biaya Administrasi', 'Sewa Lahan', 'Lain-lain'
        ];
        foreach ($expenseCategories as $cat) {
            DB::table('expense_categories')->updateOrInsert(['name' => $cat], [
                'name' => $cat,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // ==================== 3. PLANTS & VARIETIES ====================
        $plants = [
            'Selada' => ['category' => 'Leaf', 'seedling_days' => 14, 'growth_days' => 30, 'harvest_days' => 45, 'varieties' => ['Grand Rapids', 'Romaine', 'Green Coral', 'Red Leaf']],
            'Kangkung' => ['category' => 'Leaf', 'seedling_days' => 10, 'growth_days' => 20, 'harvest_days' => 30, 'varieties' => ['Kangkung Biasa', 'Kangkung Ungu', 'Kangkung Bangkok']],
            'Bayam' => ['category' => 'Leaf', 'seedling_days' => 10, 'growth_days' => 20, 'harvest_days' => 30, 'varieties' => ['Bayam Hijau', 'Bayam Merah', 'Bayam Cabut']],
            'Pakcoy' => ['category' => 'Leaf', 'seedling_days' => 14, 'growth_days' => 25, 'harvest_days' => 40, 'varieties' => ['Pakcoy Nauli F1', 'Pakcoy Green']],
            'Tomat' => ['category' => 'Fruit', 'seedling_days' => 21, 'growth_days' => 40, 'harvest_days' => 80, 'varieties' => ['Tomat Cherry', 'Tomat Gondol', 'Tomat Beef']],
            'Cabai' => ['category' => 'Fruit', 'seedling_days' => 21, 'growth_days' => 45, 'harvest_days' => 90, 'varieties' => ['Cabai Rawit', 'Cabai Keriting', 'Cabai Besar']],
            'Timun' => ['category' => 'Fruit', 'seedling_days' => 14, 'growth_days' => 30, 'harvest_days' => 55, 'varieties' => ['Timun Jepang', 'Timun Suri']],
            'Terong' => ['category' => 'Fruit', 'seedling_days' => 21, 'growth_days' => 35, 'harvest_days' => 70, 'varieties' => ['Terong Ungu', 'Terong Hijau']],
        ];

        foreach ($plants as $plantName => $data) {
            $plantCode = strtoupper(substr($plantName, 0, 3));
            $plantId = DB::table('plants')->insertGetId([
                'plant_code' => $plantCode,
                'plant_name' => $plantName,
                'category' => $data['category'],
                'description' => $faker->sentence(),
                'typical_seedling_days' => $data['seedling_days'],
                'typical_growth_days' => $data['growth_days'],
                'typical_harvest_days' => $data['harvest_days'],
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            foreach ($data['varieties'] as $variety) {
                DB::table('plant_varieties')->insert([
                    'plant_id' => $plantId,
                    'variety_name' => $variety,
                    'seed_brand' => $faker->company(),
                    'expected_yield_per_unit' => rand(1, 5) * 0.5,
                    'notes' => $faker->sentence(),
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // ==================== 4. GROWING AREAS & UNITS ====================
        $areas = [
            ['area_code' => 'GH1', 'area_name' => 'Greenhouse 1', 'area_type' => 'Greenhouse', 'length' => 30, 'width' => 15],
            ['area_code' => 'GH2', 'area_name' => 'Greenhouse 2', 'area_type' => 'Greenhouse', 'length' => 25, 'width' => 12],
            ['area_code' => 'OF1', 'area_name' => 'Lahan Terbuka Timur', 'area_type' => 'Outdoor', 'length' => 50, 'width' => 30],
            ['area_code' => 'OF2', 'area_name' => 'Lahan Terbuka Barat', 'area_type' => 'Outdoor', 'length' => 40, 'width' => 25],
            ['area_code' => 'HY1', 'area_name' => 'Hidroponik A', 'area_type' => 'Hydroponic', 'length' => 20, 'width' => 10],
        ];
        foreach ($areas as $area) {
            DB::table('growing_areas')->insert([
                'area_code' => $area['area_code'],
                'area_name' => $area['area_name'],
                'area_type' => $area['area_type'],
                'length' => $area['length'],
                'width' => $area['width'],
                'description' => $faker->sentence(),
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $areaIds = DB::table('growing_areas')->pluck('id', 'area_code');
        foreach ($areaIds as $areaCode => $areaId) {
            for ($i = 1; $i <= 4; $i++) {
                DB::table('growing_units')->insert([
                    'growing_area_id' => $areaId,
                    'unit_code' => $areaCode . '-B' . $i,
                    'unit_name' => $areaCode . ' Bed ' . $i,
                    'capacity' => rand(100, 500),
                    'unit_type' => ($areaCode == 'HY1') ? 'NFT' : 'Bedengan',
                    'status' => 'active',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // ==================== 5. CUSTOMERS ====================
        for ($i = 1; $i <= 10; $i++) {
            DB::table('customers')->insert([
                'customer_code' => 'CUST' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'name' => $faker->company(),
                'phone' => $faker->phoneNumber(),
                'email' => $faker->email(),
                'address' => $faker->address(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        $customerIds = DB::table('customers')->pluck('id');

        // ==================== 6. PLANTING BATCHES ====================
        $plantVarietyIds = DB::table('plant_varieties')->pluck('id');
        $stages = ['seedling', 'vegetative', 'generative', 'harvested'];
        for ($i = 1; $i <= 20; $i++) {
            $varietyId = $faker->randomElement($plantVarietyIds);
            $plantVariety = DB::table('plant_varieties')->where('id', $varietyId)->first();
            $plant = DB::table('plants')->where('id', $plantVariety->plant_id)->first();
            $seedingDate = Carbon::now()->subDays(rand(10, 100));
            $expectedTransplant = (clone $seedingDate)->addDays($plant->typical_seedling_days);
            $expectedHarvest = (clone $expectedTransplant)->addDays($plant->typical_growth_days);
            $currentStage = $faker->randomElement($stages);
            $status = ($currentStage == 'harvested') ? 'completed' : 'active';
            $harvestedQty = ($currentStage == 'harvested') ? rand(50, 500) : 0;

            DB::table('planting_batches')->insert([
                'batch_code' => 'BATCH-' . strtoupper(substr($plant->plant_name, 0, 3)) . '-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'plant_variety_id' => $varietyId,
                'seeding_date' => $seedingDate,
                'seed_quantity' => rand(100, 1000),
                'germinated_quantity' => rand(80, 980),
                'transplanted_quantity' => rand(70, 950),
                'harvested_quantity' => $harvestedQty,
                'current_stage' => $currentStage,
                'expected_transplant_date' => $expectedTransplant,
                'expected_harvest_date' => $expectedHarvest,
                'notes' => $faker->sentence(),
                'status' => $status,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // ==================== 7. BATCH ALLOCATIONS ====================
        $batchIds = DB::table('planting_batches')->where('status', 'active')->pluck('id');
        $unitIds = DB::table('growing_units')->pluck('id');
        foreach ($batchIds as $batchId) {
            $numUnits = rand(1, 3);
            $unitsSelected = $faker->randomElements($unitIds, $numUnits);
            $totalQuantity = DB::table('planting_batches')->where('id', $batchId)->value('transplanted_quantity');
            if ($totalQuantity && $totalQuantity > 0) {
                $quantityPerUnit = floor($totalQuantity / $numUnits);
                foreach ($unitsSelected as $unitId) {
                    DB::table('batch_allocations')->insert([
                        'planting_batch_id' => $batchId,
                        'growing_unit_id' => $unitId,
                        'allocation_date' => DB::table('planting_batches')->where('id', $batchId)->value('expected_transplant_date'),
                        'quantity' => $quantityPerUnit,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        // ==================== 8. HARVESTS ====================
        $allBatchIds = DB::table('planting_batches')->pluck('id');
        foreach ($allBatchIds as $batchId) {
            $batch = DB::table('planting_batches')->where('id', $batchId)->first();
            if ($batch->current_stage == 'harvested' || ($batch->expected_harvest_date < now() && $batch->status == 'active')) {
                $numHarvests = rand(1, 3);
                $totalHarvested = 0;
                for ($h = 1; $h <= $numHarvests; $h++) {
                    $quantity = rand(10, 200);
                    $totalHarvested += $quantity;
                    if ($totalHarvested > $batch->transplanted_quantity) break;
                    DB::table('harvests')->insert([
                        'planting_batch_id' => $batchId,
                        'harvest_date' => Carbon::parse($batch->expected_harvest_date)->addDays(rand(-5, 10)),
                        'quantity' => $quantity,
                        'unit' => 'kg',
                        'grade' => $faker->randomElement(['Grade A', 'Grade B', 'Reject']),
                        'notes' => $faker->sentence(),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
                DB::table('planting_batches')->where('id', $batchId)->update(['harvested_quantity' => $totalHarvested]);
            }
        }

        // ==================== 9. SALES & SALE ITEMS ====================
        $harvestIds = DB::table('harvests')->pluck('id');
        for ($i = 1; $i <= 30; $i++) {
            $customerId = $faker->randomElement($customerIds);
            $saleDate = Carbon::now()->subDays(rand(0, 60));
            $saleNumber = 'INV-' . $saleDate->format('Ymd') . '-' . str_pad($i, 4, '0', STR_PAD_LEFT);
            $items = [];
            $subtotal = 0;
            $numItems = rand(1, 5);
            $selectedHarvests = $faker->randomElements($harvestIds, $numItems);
            foreach ($selectedHarvests as $hid) {
                $harvest = DB::table('harvests')->where('id', $hid)->first();
                $qty = rand(1, 20);
                $price = rand(5000, 30000);
                $total = $qty * $price;
                $subtotal += $total;
                $items[] = [
                    'harvest_id' => $hid,
                    'quantity' => $qty,
                    'price' => $price,
                    'total' => $total,
                ];
            }
            $discount = ($subtotal > 0) ? rand(0, $subtotal * 0.1) : 0;
            $grandTotal = $subtotal - $discount;
            $paymentStatus = $faker->randomElement(['belum bayar', 'DP', 'lunas']);

            $saleId = DB::table('sales')->insertGetId([
                'sale_number' => $saleNumber,
                'customer_id' => $customerId,
                'sale_date' => $saleDate,
                'subtotal' => $subtotal,
                'discount' => $discount,
                'grand_total' => $grandTotal,
                'payment_status' => $paymentStatus,
                'notes' => $faker->sentence(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            foreach ($items as $item) {
                DB::table('sale_items')->insert([
                    'sale_id' => $saleId,
                    'harvest_id' => $item['harvest_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'total' => $item['total'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // ==================== 10. EXPENSES ====================
        $expenseCatIds = DB::table('expense_categories')->pluck('id');
        for ($i = 1; $i <= 50; $i++) {
            DB::table('expenses')->insert([
                'expense_category_id' => $faker->randomElement($expenseCatIds),
                'expense_date' => Carbon::now()->subDays(rand(0, 90)),
                'description' => $faker->sentence(3),
                'amount' => rand(50000, 5000000),
                'receipt_file' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('✅ Database seeding completed! Data telah berhasil diisi.');
    }
}
