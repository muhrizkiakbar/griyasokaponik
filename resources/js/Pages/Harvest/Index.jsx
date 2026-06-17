import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ScissorsIcon,
    CalendarDaysIcon,
    ClipboardDocumentListIcon,
    CubeIcon,
    ScaleIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import CursorPagination from '@/Components/CursorPagination';

export default function Index({
    harvests = { data: [] },
    batches = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [plantingBatchId, setPlantingBatchId] = useState(filters.planting_batch_id || '');
    const [unit, setUnit] = useState(filters.unit || '');
    const [grade, setGrade] = useState(filters.grade || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = {};

            if (search) params.search = search;
            if (plantingBatchId) params.planting_batch_id = plantingBatchId;
            if (unit) params.unit = unit;
            if (grade) params.grade = grade;

            router.get(route('harvests.index'), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, plantingBatchId, unit, grade]);

    const resetSearch = () => {
        setSearch('');
        setPlantingBatchId('');
        setUnit('');
        setGrade('');

        router.get(route('harvests.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout title="Panen">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <ScissorsIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                Data Panen
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Catatan hasil panen berdasarkan batch, jumlah, satuan, dan grade.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('harvests.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" />
                        Catat Panen
                    </Link>
                </div>

                <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-white/10 dark:bg-[#0B2A1E]">
                    <div className="grid gap-3 lg:grid-cols-12">
                        <div className="relative lg:col-span-4">
                            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-700 dark:text-lime-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari tanggal, jumlah, catatan, atau tanggal input..."
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

                        <div className="lg:col-span-2">
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Satuan</option>
                                <option value="kg">kg</option>
                                <option value="gram">gram</option>
                                <option value="pcs">pcs</option>
                                <option value="ikat">ikat</option>
                            </select>
                        </div>

                        <div className="lg:col-span-2">
                            <select
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Grade</option>
                                <option value="Grade A">Grade A</option>
                                <option value="Grade B">Grade B</option>
                                <option value="Reject">Reject</option>
                            </select>
                        </div>

                        <div className="lg:col-span-1">
                            {(search || plantingBatchId || unit || grade) && (
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
                                <TableHead>Batch</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Jumlah</TableHead>
                                <TableHead>Satuan</TableHead>
                                <TableHead>Grade</TableHead>
                                <TableHead align="right">Aksi</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white dark:divide-white/10 dark:bg-[#0B2A1E]">
                            {harvests.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-10 text-center">
                                        <EmptyState
                                            search={search}
                                            plantingBatchId={plantingBatchId}
                                            unit={unit}
                                            grade={grade}
                                        />
                                    </td>
                                </tr>
                            ) : (
                                harvests.data.map((harvest) => (
                                    <tr
                                        key={harvest.id}
                                        className="transition hover:bg-green-50/60 dark:hover:bg-white/5"
                                    >
                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 font-semibold text-green-950 dark:text-white">
                                                <ClipboardDocumentListIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {harvest.planting_batch?.batch_code || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <CalendarDaysIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {harvest.harvest_date || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <ScaleIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {harvest.quantity || 0}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <CubeIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {harvest.unit || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <GradeBadge grade={harvest.grade} />
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('harvests.edit', harvest.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-lime-400 dark:hover:bg-white/20"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>

                                                <Link
                                                    href={route('harvests.destroy', harvest.id)}
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
                    {harvests.data.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                            <EmptyState
                                compact
                                search={search}
                                plantingBatchId={plantingBatchId}
                                unit={unit}
                                grade={grade}
                            />
                        </div>
                    ) : (
                        harvests.data.map((harvest) => (
                            <div
                                key={harvest.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-white/10 dark:bg-[#0B2A1E]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                            <ClipboardDocumentListIcon className="h-3.5 w-3.5" />
                                            {harvest.planting_batch?.batch_code || '-'}
                                        </span>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-green-100">
                                            <p className="flex items-center gap-2">
                                                <CalendarDaysIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {harvest.harvest_date || '-'}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <ScaleIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Jumlah: {harvest.quantity || 0} {harvest.unit || '-'}
                                            </p>

                                            <GradeBadge grade={harvest.grade} />
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('harvests.edit', harvest.id)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm dark:bg-white/10 dark:text-lime-400"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>

                                        <Link
                                            href={route('harvests.destroy', harvest.id)}
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

                <CursorPagination data={harvests} />
            </div>
        </AppLayout>
    );
}

function GradeBadge({ grade }) {
    const normalized = String(grade || '').toUpperCase();

    const className =
        normalized === 'GRADE A' || normalized === 'A'
            ? 'bg-green-100 text-green-700 dark:bg-lime-400 dark:text-green-950'
            : normalized === 'GRADE B' || normalized === 'B'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
                : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-green-100';

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {grade || '-'}
        </span>
    );
}

function EmptyState({
    compact = false,
    search = '',
    plantingBatchId = '',
    unit = '',
    grade = '',
}) {
    const hasFilter = search || plantingBatchId || unit || grade;

    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <ScissorsIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                {hasFilter ? 'Data panen tidak ditemukan' : 'Belum ada data panen'}
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    {hasFilter
                        ? 'Coba gunakan kata kunci lain, pilih batch berbeda, atau ubah filter satuan dan grade.'
                        : 'Catat hasil panen pertama berdasarkan batch tanaman.'}
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
