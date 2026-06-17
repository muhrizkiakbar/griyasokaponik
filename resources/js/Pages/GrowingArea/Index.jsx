import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    MapIcon,
    HashtagIcon,
    Squares2X2Icon,
    ArrowsPointingOutIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import CursorPagination from '@/Components/CursorPagination';

export default function Index({ areas = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = {};

            if (search) {
                params.search = search;
            }

            if (status) {
                params.status = status;
            }

            router.get(route('growing-areas.index'), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, status]);

    const resetSearch = () => {
        setSearch('');
        setStatus('');

        router.get(route('growing-areas.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout title="Area Kebun">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <MapIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                Area Kebun
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Daftar area atau lokasi kebun seperti greenhouse dan lahan terbuka.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('growing-areas.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" />
                        Tambah Area
                    </Link>
                </div>

                <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-white/10 dark:bg-[#0B2A1E]">
                    <div className="grid gap-3 md:grid-cols-12">
                        <div className="relative md:col-span-7">
                            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-700 dark:text-lime-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari kode, nama area, tipe, ukuran, atau deskripsi..."
                                className="w-full rounded-2xl border border-green-100 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white dark:placeholder:text-green-200/60"
                            />
                        </div>

                        <div className="md:col-span-4">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Status</option>
                                <option value="active">Aktif</option>
                                <option value="inactive">Nonaktif</option>
                            </select>
                        </div>

                        <div className="md:col-span-1">
                            {(search || status) && (
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
                                <TableHead>Kode</TableHead>
                                <TableHead>Nama Area</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Ukuran</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead align="right">Aksi</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white dark:divide-white/10 dark:bg-[#0B2A1E]">
                            {areas.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-10 text-center">
                                        <EmptyState search={search} status={status} />
                                    </td>
                                </tr>
                            ) : (
                                areas.data.map((area) => (
                                    <tr
                                        key={area.id}
                                        className="transition hover:bg-green-50/60 dark:hover:bg-white/5"
                                    >
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                                <HashtagIcon className="h-3.5 w-3.5" />
                                                {area.area_code || '-'}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-semibold text-green-950 dark:text-white">
                                                {area.area_name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <Squares2X2Icon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {area.area_type || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <ArrowsPointingOutIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {calculateAreaSize(area)} m²
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <StatusBadge status={area.status} />
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('growing-areas.edit', area.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-lime-400 dark:hover:bg-white/20"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>

                                                <Link
                                                    href={route('growing-areas.destroy', area.id)}
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
                    {areas.data.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                            <EmptyState compact search={search} status={status} />
                        </div>
                    ) : (
                        areas.data.map((area) => (
                            <div
                                key={area.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-white/10 dark:bg-[#0B2A1E]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                            <HashtagIcon className="h-3.5 w-3.5" />
                                            {area.area_code || '-'}
                                        </span>

                                        <h3 className="mt-3 font-bold text-green-950 dark:text-white">
                                            {area.area_name}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-green-100">
                                            <p className="flex items-center gap-2">
                                                <Squares2X2Icon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {area.area_type || '-'}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <ArrowsPointingOutIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {calculateAreaSize(area)} m²
                                            </p>

                                            <StatusBadge status={area.status} />
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('growing-areas.edit', area.id)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm dark:bg-white/10 dark:text-lime-400"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>

                                        <Link
                                            href={route('growing-areas.destroy', area.id)}
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

                <CursorPagination data={areas} />
            </div>
        </AppLayout>
    );
}

function calculateAreaSize(area) {
    const length = Number(area.length || 0);
    const width = Number(area.width || 0);

    return length * width;
}

function StatusBadge({ status }) {
    const active = status === 'active';

    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${active
                    ? 'bg-green-100 text-green-700 dark:bg-lime-400 dark:text-green-950'
                    : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-green-100'
                }`}
        >
            {active ? 'Aktif' : 'Nonaktif'}
        </span>
    );
}

function EmptyState({ compact = false, search = '', status = '' }) {
    const hasFilter = search || status;

    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <MapIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                {hasFilter ? 'Area kebun tidak ditemukan' : 'Belum ada area kebun'}
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    {hasFilter
                        ? 'Coba gunakan kata kunci lain atau pilih status berbeda.'
                        : 'Tambahkan area pertama seperti greenhouse, lahan outdoor, atau nursery.'}
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
