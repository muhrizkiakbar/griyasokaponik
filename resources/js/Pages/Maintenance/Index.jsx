import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    BeakerIcon,
    CalendarDaysIcon,
    ClipboardDocumentListIcon,
    BanknotesIcon,
    DocumentTextIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { formatDate, formatNumber } from '@/utils/format';
import CursorPagination from '@/Components/CursorPagination';

const activityLabels = {
    watering: '💧 Penyiraman',
    fertilizing: '🌱 Pemupukan',
    spraying: '🧴 Penyemprotan',
    pruning: '✂️ Pemangkasan',
    ppm_check: '📊 Pengecekan PPM',
    ph_check: '🧪 Pengecekan pH',
    other: '📝 Lainnya',
};

export default function Index({
    activities = { data: [] },
    batches = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [plantingBatchId, setPlantingBatchId] = useState(filters.planting_batch_id || '');
    const [activityType, setActivityType] = useState(filters.activity_type || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = {};

            if (search) params.search = search;
            if (plantingBatchId) params.planting_batch_id = plantingBatchId;
            if (activityType) params.activity_type = activityType;

            router.get(route('maintenance.index'), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, plantingBatchId, activityType]);

    const resetSearch = () => {
        setSearch('');
        setPlantingBatchId('');
        setActivityType('');

        router.get(route('maintenance.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout title="Perawatan Kebun">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <BeakerIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                Perawatan Kebun
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Catatan pemupukan, penyiraman, pestisida, dan aktivitas perawatan lainnya.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('maintenance.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" />
                        Catat Perawatan
                    </Link>
                </div>

                <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-white/10 dark:bg-[#0B2A1E]">
                    <div className="grid gap-3 lg:grid-cols-12">
                        <div className="relative lg:col-span-5">
                            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-700 dark:text-lime-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari tanggal, deskripsi, biaya, atau tanggal input..."
                                className="w-full rounded-2xl border border-green-100 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white dark:placeholder:text-green-200/60"
                            />
                        </div>

                        <div className="lg:col-span-3">
                            <select
                                value={plantingBatchId}
                                onChange={(e) => setPlantingBatchId(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Batch</option>
                                {batches.map((batch) => (
                                    <option
                                        key={batch.id}
                                        value={batch.id}
                                        className="bg-white text-gray-900 dark:bg-[#0B2A1E] dark:text-white"
                                    >
                                        {batch.batch_code}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="lg:col-span-3">
                            <select
                                value={activityType}
                                onChange={(e) => setActivityType(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Jenis</option>
                                {Object.entries(activityLabels).map(([value, label]) => (
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

                        <div className="lg:col-span-1">
                            {(search || plantingBatchId || activityType) && (
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
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Batch</TableHead>
                                <TableHead>Jenis</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead>Biaya</TableHead>
                                <TableHead align="right">Aksi</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white dark:divide-white/10 dark:bg-[#0B2A1E]">
                            {activities.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-10 text-center">
                                        <EmptyState
                                            search={search}
                                            plantingBatchId={plantingBatchId}
                                            activityType={activityType}
                                        />
                                    </td>
                                </tr>
                            ) : (
                                activities.data.map((act) => (
                                    <tr
                                        key={act.id}
                                        className="transition hover:bg-green-50/60 dark:hover:bg-white/5"
                                    >
                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <CalendarDaysIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {formatDate(act.activity_date)}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 font-semibold text-green-950 dark:text-white">
                                                <ClipboardDocumentListIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {act.planting_batch?.batch_code || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                                {activityLabels[act.activity_type] || act.activity_type}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="max-w-xs truncate text-gray-600 dark:text-green-100">
                                                {act.description || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 font-semibold text-green-950 dark:text-white">
                                                <BanknotesIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Rp {formatNumber(act.cost || 0)}
                                            </div>
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('maintenance.edit', act.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-lime-400 dark:hover:bg-white/20"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>

                                                <Link
                                                    href={route('maintenance.destroy', act.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
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
                    {activities.data.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                            <EmptyState
                                compact
                                search={search}
                                plantingBatchId={plantingBatchId}
                                activityType={activityType}
                            />
                        </div>
                    ) : (
                        activities.data.map((act) => (
                            <div
                                key={act.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-white/10 dark:bg-[#0B2A1E]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                            {activityLabels[act.activity_type] || act.activity_type}
                                        </span>

                                        <h3 className="mt-3 font-bold text-green-950 dark:text-white">
                                            {act.planting_batch?.batch_code || '-'}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-green-100">
                                            <p className="flex items-center gap-2">
                                                <CalendarDaysIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {formatDate(act.activity_date)}
                                            </p>

                                            <p className="flex items-start gap-2">
                                                <DocumentTextIcon className="mt-0.5 h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {act.description || '-'}
                                            </p>

                                            <p className="flex items-center gap-2 font-semibold text-green-950 dark:text-white">
                                                <BanknotesIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Rp {formatNumber(act.cost || 0)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('maintenance.edit', act.id)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm dark:bg-white/10 dark:text-lime-400"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>

                                        <Link
                                            href={route('maintenance.destroy', act.id)}
                                            method="delete"
                                            as="button"
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 shadow-sm dark:bg-red-500/10 dark:text-red-300"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <CursorPagination data={activities} />
            </div>
        </AppLayout>
    );
}

function EmptyState({
    compact = false,
    search = '',
    plantingBatchId = '',
    activityType = '',
}) {
    const hasFilter = search || plantingBatchId || activityType;

    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <BeakerIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                {hasFilter ? 'Catatan perawatan tidak ditemukan' : 'Belum ada catatan perawatan'}
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    {hasFilter
                        ? 'Coba gunakan kata kunci lain, pilih batch berbeda, atau ubah jenis perawatan.'
                        : 'Catat aktivitas perawatan pertama seperti penyiraman, pemupukan, atau pengecekan pH.'}
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
