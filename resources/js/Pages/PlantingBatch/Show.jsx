import { useState } from 'react';
import { router, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { formatDate, formatNumber } from '@/utils/format';
import {
    ArrowPathIcon,
    PlusIcon,
    TrashIcon,
    ClipboardDocumentListIcon,
    Squares2X2Icon,
    ArrowRightIcon,
    CalendarDaysIcon,
    ScissorsIcon,
    ClockIcon,
    BeakerIcon,
} from '@heroicons/react/24/outline';
import FormDatePicker from '@/Components/FormDatePicker';

const stageLabels = {
    seedling: '🌱 Semai',
    vegetative: '🌿 Vegetatif',
    generative: '🌸 Generatif',
    ready_to_harvest: '✂️ Siap Panen',
    harvested: '✅ Dipanen',
};

const activityLabels = {
    watering: 'Penyiraman',
    fertilizing: 'Pemupukan',
    spraying: 'Penyemprotan',
    pruning: 'Pemangkasan',
    ppm_check: 'Cek PPM',
    ph_check: 'Cek pH',
};

export default function Show({ batch, growingUnits = [] }) {
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

    const {
        data: allocData,
        setData: setAllocData,
        post: postAlloc,
        processing: allocProcessing,
        reset: resetAlloc,
    } = useForm({
        growing_unit_id: '',
        allocation_date: new Date().toISOString().split('T')[0],
        quantity: batch.transplanted_quantity || '',
    });

    const {
        data: moveData,
        setData: setMoveData,
        post: postMove,
        processing: moveProcessing,
        reset: resetMove,
        errors
    } = useForm({
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
                onFinish: () => setIsUpdating(false),
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
            router.delete(route('batch-allocations.destroy', id), {
                preserveScroll: true,
            });
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
            <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="border-b border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                                <ClipboardDocumentListIcon className="h-6 w-6" />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                    Informasi Batch
                                </h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                    Detail lengkap batch dan riwayat pertumbuhan.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <select
                                value={selectedStage}
                                onChange={(e) => {
                                    setSelectedStage(e.target.value);
                                    handleStageChange(e.target.value);
                                }}
                                disabled={isUpdating}
                                className="rounded-2xl border border-green-100 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#0B2A1E] dark:text-white"
                            >
                                {stageOrder.map((stage) => (
                                    <option key={stage} value={stage}>
                                        {stageLabels[stage]}
                                    </option>
                                ))}
                            </select>

                            {nextStage && (
                                <button
                                    onClick={() => handleStageChange(nextStage)}
                                    disabled={isUpdating}
                                    className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    <ArrowPathIcon className="mr-2 h-4 w-4" />
                                    Lanjut ke {stageLabels[nextStage]}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
                    <InfoCard label="Kode Batch" value={batch.batch_code} />
                    <InfoCard
                        label="Tanaman"
                        value={`${batch.plant_variety?.plant?.plant_name || '-'} - ${batch.plant_variety?.variety_name || '-'} (${plantCategory || '-'})`}
                    />
                    <InfoCard label="Tanggal Semai" value={formatDate(batch.seeding_date)} />
                    <InfoCard label="Jumlah Benih" value={batch.seed_quantity} />
                    <InfoCard label="Jumlah Pindah Tanam" value={batch.transplanted_quantity || 0} />
                    <InfoCard label="Estimasi Panen" value={formatDate(batch.expected_harvest_date)} />
                </div>

                <Section
                    title="Alokasi Bedengan"
                    description="Daftar penempatan batch pada bedengan atau unit tanam."
                    icon={Squares2X2Icon}
                    action={
                        <IconButton onClick={() => setShowAllocationForm(!showAllocationForm)}>
                            <PlusIcon className="h-5 w-5" />
                        </IconButton>
                    }
                >
                    {showAllocationForm && (
                        <form onSubmit={handleAddAllocation} className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
                            <SelectInput value={allocData.growing_unit_id} onChange={(e) => setAllocData('growing_unit_id', e.target.value)} required>
                                <option value="">Pilih Bedengan</option>
                                {growingUnits.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.unit_name} (Kapasitas {unit.capacity})
                                    </option>
                                ))}
                            </SelectInput>

                            <FormDatePicker
                                id="allocation_date"
                                value={allocData.allocation_date}
                                error={errors.allocation_date}
                                icon={CalendarDaysIcon}
                                onChange={(value) => setAllocData('allocation_date', value)}
                            />

                            <TextInput type="number" value={allocData.quantity} onChange={(e) => setAllocData('quantity', e.target.value)} placeholder="Jumlah" required />

                            <button
                                type="submit"
                                disabled={allocProcessing}
                                className="rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:opacity-70"
                            >
                                Simpan
                            </button>
                        </form>
                    )}

                    <ListWrapper empty={!batch.allocations || batch.allocations.length === 0} emptyText="Belum ada alokasi">
                        {batch.allocations?.map((alloc) => (
                            <ListItem key={alloc.id}>
                                <span>
                                    {alloc.growing_unit?.unit_name} - {alloc.quantity} tanaman sejak {formatDate(alloc.allocation_date)}
                                </span>
                                <button onClick={() => handleDeleteAllocation(alloc.id)} className="text-red-600 dark:text-red-300">
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </ListItem>
                        ))}
                    </ListWrapper>
                </Section>

                <Section
                    title="Riwayat Perpindahan"
                    description="Catatan perpindahan tanaman antar bedengan."
                    icon={ArrowRightIcon}
                    action={
                        <IconButton onClick={() => setShowMovementForm(!showMovementForm)}>
                            <PlusIcon className="h-5 w-5" />
                        </IconButton>
                    }
                >
                    {showMovementForm && (
                        <form onSubmit={handleAddMovement} className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <SelectInput value={moveData.from_unit_id} onChange={(e) => setMoveData('from_unit_id', e.target.value)}>
                                <option value="">Dari Bedengan</option>
                                {growingUnits.map((unit) => (
                                    <option key={unit.id} value={unit.id}>{unit.unit_name}</option>
                                ))}
                            </SelectInput>

                            <SelectInput value={moveData.to_unit_id} onChange={(e) => setMoveData('to_unit_id', e.target.value)} required>
                                <option value="">Ke Bedengan</option>
                                {growingUnits.map((unit) => (
                                    <option key={unit.id} value={unit.id}>{unit.unit_name}</option>
                                ))}
                            </SelectInput>

                            <TextInput type="number" value={moveData.quantity} onChange={(e) => setMoveData('quantity', e.target.value)} placeholder="Jumlah" required />

                            <FormDatePicker
                                id="movement_date"
                                value={moveData.movement_date}
                                error={errors.movement_date}
                                icon={CalendarDaysIcon}
                                onChange={(value) => setMoveData('expected_harvest_date', value)}
                            />

                            <TextInput value={moveData.notes} onChange={(e) => setMoveData('notes', e.target.value)} placeholder="Catatan" className="sm:col-span-2" />

                            <button
                                type="submit"
                                disabled={moveProcessing}
                                className="rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:opacity-70 sm:col-span-2"
                            >
                                Simpan Perpindahan
                            </button>
                        </form>
                    )}

                    <ListWrapper empty={!batch.movements || batch.movements.length === 0} emptyText="Belum ada perpindahan">
                        {batch.movements?.map((move) => (
                            <ListItem key={move.id}>
                                {formatDate(move.movement_date)}: {move.quantity} tanaman
                                {move.from_unit_id ? ` dari ${move.from_unit?.unit_name}` : ' dari gudang'}
                                {' '}ke {move.to_unit?.unit_name}
                                {move.notes && ` (${move.notes})`}
                            </ListItem>
                        ))}
                    </ListWrapper>
                </Section>

                <Section title="Hasil Panen" description="Catatan hasil panen dari batch ini." icon={ScissorsIcon}>
                    <ListWrapper empty={!batch.harvests || batch.harvests.length === 0} emptyText="Belum ada catatan panen">
                        {batch.harvests?.map((harvest) => (
                            <ListItem key={harvest.id}>
                                {formatDate(harvest.harvest_date)} - {harvest.quantity} {harvest.unit} (Grade {harvest.grade})
                            </ListItem>
                        ))}
                    </ListWrapper>
                </Section>

                <Section title="Riwayat Perubahan Tahap" description="Catatan perubahan fase pertumbuhan batch." icon={ClockIcon}>
                    <ListWrapper empty={!batch.stage_logs || batch.stage_logs.length === 0} emptyText="Belum ada riwayat">
                        {batch.stage_logs?.map((log) => (
                            <ListItem key={log.id}>
                                {formatDate(log.change_date)}: {stageLabels[log.from_stage]} → {stageLabels[log.to_stage]}
                                {log.reason && <span className="italic text-gray-400 dark:text-green-200"> ({log.reason})</span>}
                            </ListItem>
                        ))}
                    </ListWrapper>
                </Section>

                <Section
                    title="Riwayat Perawatan"
                    description="Catatan aktivitas perawatan yang dilakukan pada batch."
                    icon={BeakerIcon}
                    action={
                        <Link
                            href={route('maintenance.create', { planting_batch_id: batch.id })}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-green-700 text-white shadow-sm transition hover:bg-green-800"
                        >
                            <PlusIcon className="h-5 w-5" />
                        </Link>
                    }
                >
                    <ListWrapper empty={!batch.maintenance_activities || batch.maintenance_activities.length === 0} emptyText="Belum ada catatan perawatan">
                        {batch.maintenance_activities?.map((act) => (
                            <ListItem key={act.id}>
                                {formatDate(act.activity_date)} - {activityLabels[act.activity_type] || act.activity_type}: {act.description}
                                {act.cost > 0 && (
                                    <span className="ml-2 text-gray-500 dark:text-green-100">
                                        (Rp {formatNumber(act.cost)})
                                    </span>
                                )}
                            </ListItem>
                        ))}
                    </ListWrapper>
                </Section>
            </div>
        </AppLayout>
    );
}

function InfoCard({ label, value }) {
    return (
        <div className="rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-white/10 dark:bg-[#0B2A1E]">
            <dt className="text-sm font-medium text-gray-500 dark:text-green-100">{label}</dt>
            <dd className="mt-1 text-sm font-semibold text-green-950 dark:text-white">{value || '-'}</dd>
        </div>
    );
}

function Section({ title, description, icon: Icon, action, children }) {
    return (
        <section className="border-t border-green-100 px-6 py-6 dark:border-white/10">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-green-950 dark:text-white">{title}</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-green-100">{description}</p>
                    </div>
                </div>

                {action}
            </div>

            {children}
        </section>
    );
}

function IconButton({ children, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-green-700 text-white shadow-sm transition hover:bg-green-800"
        >
            {children}
        </button>
    );
}

function ListWrapper({ children, empty, emptyText }) {
    if (empty) {
        return (
            <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-5 text-center text-sm font-medium text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-green-100">
                {emptyText}
            </div>
        );
    }

    return (
        <ul className="divide-y divide-green-100 overflow-hidden rounded-2xl border border-green-100 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-[#0B2A1E]">
            {children}
        </ul>
    );
}

function ListItem({ children }) {
    return (
        <li className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-gray-600 dark:text-green-100">
            {children}
        </li>
    );
}

function TextInput({ className = '', ...props }) {
    return (
        <input
            {...props}
            className={`rounded-2xl border border-green-100 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#0B2A1E] dark:text-white dark:placeholder:text-green-200/60 ${className}`}
        />
    );
}

function SelectInput({ children, className = '', ...props }) {
    return (
        <select
            {...props}
            className={`rounded-2xl border border-green-100 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#0B2A1E] dark:text-white ${className}`}
        >
            {children}
        </select>
    );
}
