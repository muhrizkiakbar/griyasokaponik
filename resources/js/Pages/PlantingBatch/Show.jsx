import { useState } from 'react';
import { router, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { formatDate, formatNumber } from '@/utils/format';
import { ArrowPathIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const stageLabels = {
    seedling: '🌱 Semai',
    vegetative: '🌿 Vegetatif',
    generative: '🌸 Generatif (Berbunga/Berbuah)',
    ready_to_harvest: '✂️ Siap Panen',
    harvested: '✅ Dipanen',
};

export default function Show({ batch, growingUnits }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedStage, setSelectedStage] = useState(batch.current_stage);
    const [showAllocationForm, setShowAllocationForm] = useState(false);
    const [showMovementForm, setShowMovementForm] = useState(false);

    const plantCategory = batch.plant_variety?.plant?.category;
    const isFruit = plantCategory === 'Fruit';

    let stageOrder = ['seedling', 'vegetative', 'ready_to_harvest', 'harvested'];
    if (isFruit) {
        stageOrder = ['seedling', 'vegetative', 'generative', 'ready_to_harvest', 'harvested'];
    }

    const currentIndex = stageOrder.indexOf(batch.current_stage);
    const nextStage = currentIndex < stageOrder.length - 1 ? stageOrder[currentIndex + 1] : null;

    // Form allocation
    const { data: allocData, setData: setAllocData, post: postAlloc, processing: allocProcessing, reset: resetAlloc } = useForm({
        growing_unit_id: '',
        allocation_date: new Date().toISOString().split('T')[0],
        quantity: batch.transplanted_quantity || '',
    });

    // Form movement
    const { data: moveData, setData: setMoveData, post: postMove, processing: moveProcessing, reset: resetMove } = useForm({
        from_unit_id: '',
        to_unit_id: '',
        movement_type: 'relocation',
        quantity: '',
        movement_date: new Date().toISOString().split('T')[0],
        notes: '',
    });

    const handleStageChange = (newStage) => {
        if (!confirm(`Ubah status dari "${stageLabels[batch.current_stage]}" menjadi "${stageLabels[newStage]}"?`)) return;
        setIsUpdating(true);
        router.patch(
            route('planting-batches.update-stage', batch.id),
            { current_stage: newStage },
            {
                preserveScroll: true,
                onSuccess: () => setIsUpdating(false),
                onError: () => setIsUpdating(false),
            }
        );
    };

    const handleAddAllocation = (e) => {
        e.preventDefault();
        postAlloc(route('planting-batches.allocations.store', batch.id), {
            preserveScroll: true,
            onSuccess: () => {
                resetAlloc();
                setShowAllocationForm(false);
            },
        });
    };

    const handleDeleteAllocation = (id) => {
        if (confirm('Hapus alokasi ini?')) {
            router.delete(route('batch-allocations.destroy', id), { preserveScroll: true });
        }
    };

    const handleAddMovement = (e) => {
        e.preventDefault();
        postMove(route('plant-movements.store', batch.id), {
            preserveScroll: true,
            onSuccess: () => {
                resetMove();
                setShowMovementForm(false);
            },
        });
    };

    return (
        <AppLayout title={`Detail Batch: ${batch.batch_code}`}>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                {/* Header dengan stage selector */}
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Informasi Batch</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Detail lengkap batch dan riwayat pertumbuhan.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={selectedStage}
                            onChange={(e) => {
                                setSelectedStage(e.target.value);
                                handleStageChange(e.target.value);
                            }}
                            disabled={isUpdating}
                            className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                        >
                            {stageOrder.map(stage => (
                                <option key={stage} value={stage}>
                                    {stageLabels[stage]}
                                </option>
                            ))}
                        </select>
                        {nextStage && (
                            <button
                                onClick={() => handleStageChange(nextStage)}
                                disabled={isUpdating}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                                <ArrowPathIcon className="h-4 w-4 mr-1" />
                                Lanjut ke {stageLabels[nextStage]}
                            </button>
                        )}
                    </div>

                </div>

                {/* Detail batch */}
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 p-6">
                    <div><dt className="text-sm font-medium text-gray-500">Kode Batch</dt><dd className="mt-1 text-sm">{batch.batch_code}</dd></div>
                    <div><dt className="text-sm font-medium text-gray-500">Tanaman</dt><dd className="mt-1 text-sm">{batch.plant_variety?.plant?.plant_name} - {batch.plant_variety?.variety_name} ({plantCategory})</dd></div>
                    <div><dt className="text-sm font-medium text-gray-500">Tanggal Semai</dt><dd className="mt-1 text-sm">{formatDate(batch.seeding_date)}</dd></div>
                    <div><dt className="text-sm font-medium text-gray-500">Jumlah Benih</dt><dd className="mt-1 text-sm">{batch.seed_quantity}</dd></div>
                    <div><dt className="text-sm font-medium text-gray-500">Jumlah Pindah Tanam</dt><dd className="mt-1 text-sm">{batch.transplanted_quantity}</dd></div>
                    <div><dt className="text-sm font-medium text-gray-500">Estimasi Panen</dt><dd className="mt-1 text-sm">{formatDate(batch.expected_harvest_date)}</dd></div>
                </dl>

                {/* Alokasi Bedengan */}
                <div className="px-4 py-5 sm:px-6 border-t">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Alokasi Bedengan</h3>
                        <button onClick={() => setShowAllocationForm(!showAllocationForm)} className="text-green-600 hover:text-green-800">
                            <PlusIcon className="h-5 w-5" />
                        </button>
                    </div>
                    {showAllocationForm && (
                        <form onSubmit={handleAddAllocation} className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <select
                                value={allocData.growing_unit_id}
                                onChange={e => setAllocData('growing_unit_id', e.target.value)}
                                className="rounded-md border-gray-300"
                                required
                            >
                                <option value="">Pilih Bedengan</option>
                                {growingUnits.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.unit_name} (Kapasitas {unit.capacity})</option>
                                ))}
                            </select>
                            <input type="date" value={allocData.allocation_date} onChange={e => setAllocData('allocation_date', e.target.value)} className="rounded-md border-gray-300" required />
                            <input type="number" value={allocData.quantity} onChange={e => setAllocData('quantity', e.target.value)} placeholder="Jumlah" className="rounded-md border-gray-300" required />
                            <button type="submit" disabled={allocProcessing} className="bg-green-600 text-white px-3 py-2 rounded">Simpan</button>
                        </form>
                    )}
                    <ul className="mt-4 divide-y divide-gray-200">
                        {batch.allocations?.map(alloc => (
                            <li key={alloc.id} className="py-2 flex justify-between items-center">
                                <span>{alloc.growing_unit?.unit_name} - {alloc.quantity} tanaman (sejak {formatDate(alloc.allocation_date)})</span>
                                <button onClick={() => handleDeleteAllocation(alloc.id)} className="text-red-600"><TrashIcon className="h-4 w-4" /></button>
                            </li>
                        ))}
                        {(!batch.allocations || batch.allocations.length === 0) && <li className="text-gray-500">Belum ada alokasi</li>}
                    </ul>
                </div>

                {/* Perpindahan Tanaman */}
                <div className="px-4 py-5 sm:px-6 border-t">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Riwayat Perpindahan</h3>
                        <button onClick={() => setShowMovementForm(!showMovementForm)} className="text-green-600 hover:text-green-800">
                            <PlusIcon className="h-5 w-5" />
                        </button>
                    </div>
                    {showMovementForm && (
                        <form onSubmit={handleAddMovement} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <select value={moveData.from_unit_id} onChange={e => setMoveData('from_unit_id', e.target.value)} className="rounded-md border-gray-300">
                                <option value="">Dari Bedengan</option>
                                {growingUnits.map(unit => <option key={unit.id} value={unit.id}>{unit.unit_name}</option>)}
                            </select>
                            <select value={moveData.to_unit_id} onChange={e => setMoveData('to_unit_id', e.target.value)} className="rounded-md border-gray-300" required>
                                <option value="">Ke Bedengan</option>
                                {growingUnits.map(unit => <option key={unit.id} value={unit.id}>{unit.unit_name}</option>)}
                            </select>
                            <input type="number" value={moveData.quantity} onChange={e => setMoveData('quantity', e.target.value)} placeholder="Jumlah" className="rounded-md border-gray-300" required />
                            <input type="date" value={moveData.movement_date} onChange={e => setMoveData('movement_date', e.target.value)} className="rounded-md border-gray-300" required />
                            <input type="text" value={moveData.notes} onChange={e => setMoveData('notes', e.target.value)} placeholder="Catatan" className="rounded-md border-gray-300 col-span-2" />
                            <button type="submit" disabled={moveProcessing} className="bg-green-600 text-white px-3 py-2 rounded col-span-2">Simpan Perpindahan</button>
                        </form>
                    )}
                    <ul className="mt-4 divide-y divide-gray-200">
                        {batch.movements?.map(move => {

                            return (
                                <li key={move.id} className="py-2 text-sm">
                                    {formatDate(move.movement_date)} : {move.quantity} tanaman
                                    {move.from_unit_id ? ` dari ${move.from_unit?.unit_name}` : ' dari gudang'}
                                    ke {move.to_unit?.unit_name} {move.notes && `(${move.notes})`}
                                </li>
                            );
                        })}
                        {(!batch.movements || batch.movements.length === 0) && <li className="text-gray-500">Belum ada perpindahan</li>}
                    </ul>
                </div>

                {/* Hasil Panen */}
                <div className="px-4 py-5 sm:px-6 border-t">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Hasil Panen</h3>
                    <ul className="mt-4 divide-y divide-gray-200">
                        {batch.harvests?.map(harvest => (
                            <li key={harvest.id} className="py-2 flex justify-between">
                                <span>{formatDate(harvest.harvest_date)} - {harvest.quantity} {harvest.unit} (Grade {harvest.grade})</span>
                            </li>
                        ))}
                        {(!batch.harvests || batch.harvests.length === 0) && <li className="text-gray-500">Belum ada catatan panen</li>}
                    </ul>
                </div>

                {/* Riwayat Perubahan Stage */}
                <div className="px-4 py-5 sm:px-6 border-t">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Riwayat Perubahan Tahap</h3>
                    <ul className="mt-4 space-y-1 text-sm text-gray-600">
                        {batch.stage_logs?.map(log => (
                            <li key={log.id}>
                                {formatDate(log.change_date)} : {stageLabels[log.from_stage]} → {stageLabels[log.to_stage]}
                                {log.reason && <span className="italic text-gray-400"> ({log.reason})</span>}
                            </li>
                        ))}
                        {(!batch.stage_logs || batch.stage_logs.length === 0) && <li className="text-gray-500">Belum ada riwayat</li>}
                    </ul>
                </div>


                {/* Maintenance / Perawatan */}
                <div className="px-4 py-5 sm:px-6 border-t">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Riwayat Perawatan</h3>
                        <Link href={route('maintenance.create', { planting_batch_id: batch.id })} className="text-green-600 hover:text-green-800">
                            <PlusIcon className="h-5 w-5" />
                        </Link>
                    </div>
                    <ul className="mt-4 divide-y divide-gray-200">
                        {batch.maintenance_activities?.map(act => (
                            <li key={act.id} className="py-2 text-sm">
                                {formatDate(act.activity_date)} - {activityLabels[act.activity_type] || act.activity_type}: {act.description}
                                {act.cost > 0 && <span className="text-gray-500 ml-2">(Rp {formatNumber(act.cost)})</span>}
                            </li>
                        ))}
                        {(!batch.maintenance_activities || batch.maintenance_activities.length === 0) && (
                            <li className="text-gray-500">Belum ada catatan perawatan</li>
                        )}
                    </ul>
                </div>
            </div>
        </AppLayout >
    );
}
