import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    EyeIcon,
    PlusIcon,
    ClipboardDocumentListIcon,
    SparklesIcon,
    CalendarDaysIcon,
    HashtagIcon,
    CubeIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import CursorPagination from '@/Components/CursorPagination';

const stageOptions = {
    planned: 'Direncanakan',
    seedling: 'Semai',
    vegetative: 'Vegetatif',
    generative: 'Generatif',
    harvested: 'Dipanen',
    failed: 'Gagal',
};

const statusOptions = {
    active: 'Aktif',
    inactive: 'Nonaktif',
};

export default function Index({
    batches = { data: [] },
    varieties = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [plantVarietyId, setPlantVarietyId] = useState(filters.plant_variety_id || '');
    const [currentStage, setCurrentStage] = useState(filters.current_stage || '');
    const [status, setStatus] = useState(filters.status || '');

    const isReadyToHarvest = (batch) => {
        return (
            batch.expected_harvest_date &&
            new Date(batch.expected_harvest_date) <= new Date() &&
            batch.current_stage !== 'harvested'
        );
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = {};

            if (search) params.search = search;
            if (plantVarietyId) params.plant_variety_id = plantVarietyId;
            if (currentStage) params.current_stage = currentStage;
            if (status) params.status = status;

            router.get(route('planting-batches.index'), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, plantVarietyId, currentStage, status]);

    const resetSearch = () => {
        setSearch('');
        setPlantVarietyId('');
        setCurrentStage('');
        setStatus('');

        router.get(route('planting-batches.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout title="Batch Semai">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <ClipboardDocumentListIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                Batch Semai
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Kelola batch semai, fase tanam, dan estimasi panen.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('planting-batches.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" />
                        Buat Batch Baru
                    </Link>
                </div>

                <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-white/10 dark:bg-[#0B2A1E]">
                    <div className="grid gap-3 xl:grid-cols-12">
                        <div className="relative xl:col-span-4">
                            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-700 dark:text-lime-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari kode batch, tanggal, jumlah, catatan, atau tanggal input..."
                                className="w-full rounded-2xl border border-green-100 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white dark:placeholder:text-green-200/60"
                            />
                        </div>

                        <div className="xl:col-span-3">
                            <select
                                value={plantVarietyId}
                                onChange={(e) => setPlantVarietyId(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Varietas</option>
                                {varieties.map((variety) => (
                                    <option
                                        key={variety.id}
                                        value={variety.id}
                                        className="bg-white text-gray-900 dark:bg-[#0B2A1E] dark:text-white"
                                    >
                                        {variety.plant?.plant_name || '-'} - {variety.variety_name || '-'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="xl:col-span-2">
                            <select
                                value={currentStage}
                                onChange={(e) => setCurrentStage(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Fase</option>
                                {Object.entries(stageOptions).map(([value, label]) => (
                                    <option
                                        key={value}
                                        value={value}
                                        className="bg-white text-gray-900 dark:bg-[#0B2A1E] dark:text-white"
                                    >
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="xl:col-span-2">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Status</option>
                                {Object.entries(statusOptions).map(([value, label]) => (
                                    <option
                                        key={value}
                                        value={value}
                                        className="bg-white text-gray-900 dark:bg-[#0B2A1E] dark:text-white"
                                    >
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="xl:col-span-1">
                            {(search || plantVarietyId || currentStage || status) && (
                                <button
                                    type="button"
                                    onClick={resetSearch}
                                    className="inline-flex w-full items-center justify-center rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-green-100 dark:hover:bg-white/20"
                                    title="Reset Filter"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 hidden overflow-hidden rounded-2xl border border-green-100 shadow-sm dark:border-white/10 md:block">
                    <table className="min-w-full divide-y divide-green-100 dark:divide-white/10">
                        <thead className="bg-green-50 dark:bg-white/10">
                            <tr>
                                <TableHead>Kode Batch</TableHead>
                                <TableHead>Tanaman</TableHead>
                                <TableHead>Tgl Semai</TableHead>
                                <TableHead>Jumlah Benih</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead align="right">Detail</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white dark:divide-white/10 dark:bg-[#0B2A1E]">
                            {batches.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-10 text-center">
                                        <EmptyState
                                            search={search}
                                            plantVarietyId={plantVarietyId}
                                            currentStage={currentStage}
                                            status={status}
                                        />
                                    </td>
                                </tr>
                            ) : (
                                batches.data.map((batch) => (
                                    <tr
                                        key={batch.id}
                                        className="transition hover:bg-green-50/60 dark:hover:bg-white/5"
                                    >
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                                <HashtagIcon className="h-3.5 w-3.5" />
                                                {batch.batch_code || '-'}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <SparklesIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                <span>
                                                    {batch.plant_variety?.plant?.plant_name || '-'}
                                                    {' - '}
                                                    {batch.plant_variety?.variety_name || '-'}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <CalendarDaysIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {batch.seeding_date || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <CubeIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {batch.seed_quantity || 0}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <StageBadge
                                                batch={batch}
                                                readyToHarvest={isReadyToHarvest(batch)}
                                            />
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end">
                                                <Link
                                                    href={route('planting-batches.show', batch.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-lime-400 dark:hover:bg-white/20"
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 space-y-3 md:hidden">
                    {batches.data.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                            <EmptyState
                                compact
                                search={search}
                                plantVarietyId={plantVarietyId}
                                currentStage={currentStage}
                                status={status}
                            />
                        </div>
                    ) : (
                        batches.data.map((batch) => (
                            <div
                                key={batch.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-white/10 dark:bg-[#0B2A1E]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                            <HashtagIcon className="h-3.5 w-3.5" />
                                            {batch.batch_code || '-'}
                                        </span>

                                        <h3 className="mt-3 font-bold text-green-950 dark:text-white">
                                            {batch.plant_variety?.plant?.plant_name || '-'}
                                            {' - '}
                                            {batch.plant_variety?.variety_name || '-'}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-green-100">
                                            <p className="flex items-center gap-2">
                                                <CalendarDaysIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Tgl Semai: {batch.seeding_date || '-'}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <CubeIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Jumlah Benih: {batch.seed_quantity || 0}
                                            </p>

                                            <StageBadge
                                                batch={batch}
                                                readyToHarvest={isReadyToHarvest(batch)}
                                            />
                                        </div>
                                    </div>

                                    <Link
                                        href={route('planting-batches.show', batch.id)}
                                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm dark:bg-white/10 dark:text-lime-400"
                                    >
                                        <EyeIcon className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <CursorPagination data={batches} />
            </div>
        </AppLayout>
    );
}

function StageBadge({ batch, readyToHarvest }) {
    if (readyToHarvest) {
        return (
            <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-300">
                Siap Panen
            </span>
        );
    }

    return (
        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-white/10 dark:text-green-100">
            {formatStage(batch.current_stage)}
        </span>
    );
}

function EmptyState({
    compact = false,
    search = '',
    plantVarietyId = '',
    currentStage = '',
    status = '',
}) {
    const hasFilter = search || plantVarietyId || currentStage || status;

    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <ClipboardDocumentListIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                {hasFilter ? 'Batch semai tidak ditemukan' : 'Belum ada batch semai'}
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    {hasFilter
                        ? 'Coba gunakan kata kunci lain, pilih varietas berbeda, atau ubah fase/status.'
                        : 'Buat batch pertama untuk mulai mencatat proses semai dan tanam.'}
                </p>
            )}
        </div>
    );
}

function TableHead({ children, align = 'left' }) {
    return (
        <th
            className={`px-4 py-3 text-${align} text-xs font-bold uppercase tracking-wider text-green-950 dark:text-green-50`}
        >
            {children}
        </th>
    );
}

function TableCell({ children, align = 'left' }) {
    return (
        <td className={`whitespace-nowrap px-4 py-4 text-${align} text-sm`}>
            {children}
        </td>
    );
}

function formatStage(stage) {
    return stageOptions[stage] || stage || '-';
}
