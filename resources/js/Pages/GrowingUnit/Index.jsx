import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    Squares2X2Icon,
    HashtagIcon,
    MapIcon,
    CubeIcon,
    TagIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import CursorPagination from '@/Components/CursorPagination';

export default function Index({
    units = { data: [] },
    areas = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [growingAreaId, setGrowingAreaId] = useState(filters.growing_area_id || '');
    const [status, setStatus] = useState(filters.status || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = {};

            if (search) {
                params.search = search;
            }

            if (growingAreaId) {
                params.growing_area_id = growingAreaId;
            }

            if (status) {
                params.status = status;
            }

            router.get(route('growing-units.index'), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, growingAreaId, status]);

    const resetSearch = () => {
        setSearch('');
        setGrowingAreaId('');
        setStatus('');

        router.get(route('growing-units.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout title="Bedengan / Meja Tanam">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <Squares2X2Icon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                Bedengan / Meja Tanam
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Daftar unit penanaman seperti bedengan, rak hidroponik, dan meja tanam.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('growing-units.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" />
                        Tambah Unit
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
                                placeholder="Cari kode, nama unit, kapasitas, atau tipe unit..."
                                className="w-full rounded-2xl border border-green-100 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white dark:placeholder:text-green-200/60"
                            />
                        </div>

                        <div className="lg:col-span-3">
                            <select
                                value={growingAreaId}
                                onChange={(e) => setGrowingAreaId(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Area</option>
                                {areas.map((area) => (
                                    <option
                                        key={area.id}
                                        value={area.id}
                                        className="bg-white text-gray-900 dark:bg-[#0B2A1E] dark:text-white"
                                    >
                                        {area.area_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="lg:col-span-3">
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

                        <div className="lg:col-span-1">
                            {(search || growingAreaId || status) && (
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
                                <TableHead>Nama Unit</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Kapasitas</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead align="right">Aksi</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white dark:divide-white/10 dark:bg-[#0B2A1E]">
                            {units.data.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-4 py-10 text-center">
                                        <EmptyState
                                            search={search}
                                            growingAreaId={growingAreaId}
                                            status={status}
                                        />
                                    </td>
                                </tr>
                            ) : (
                                units.data.map((unit) => (
                                    <tr
                                        key={unit.id}
                                        className="transition hover:bg-green-50/60 dark:hover:bg-white/5"
                                    >
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                                <HashtagIcon className="h-3.5 w-3.5" />
                                                {unit.unit_code || '-'}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-semibold text-green-950 dark:text-white">
                                                {unit.unit_name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <MapIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {unit.growing_area?.area_name || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <CubeIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {unit.capacity || 0}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <TagIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {unit.unit_type || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <StatusBadge status={unit.status} />
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('growing-units.edit', unit.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-lime-400 dark:hover:bg-white/20"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>

                                                <Link
                                                    href={route('growing-units.destroy', unit.id)}
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
                    {units.data.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                            <EmptyState
                                compact
                                search={search}
                                growingAreaId={growingAreaId}
                                status={status}
                            />
                        </div>
                    ) : (
                        units.data.map((unit) => (
                            <div
                                key={unit.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-white/10 dark:bg-[#0B2A1E]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                            <HashtagIcon className="h-3.5 w-3.5" />
                                            {unit.unit_code || '-'}
                                        </span>

                                        <h3 className="mt-3 font-bold text-green-950 dark:text-white">
                                            {unit.unit_name}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-green-100">
                                            <p className="flex items-center gap-2">
                                                <MapIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {unit.growing_area?.area_name || '-'}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <CubeIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Kapasitas: {unit.capacity || 0}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <TagIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {unit.unit_type || '-'}
                                            </p>

                                            <StatusBadge status={unit.status} />
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('growing-units.edit', unit.id)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm dark:bg-white/10 dark:text-lime-400"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>

                                        <Link
                                            href={route('growing-units.destroy', unit.id)}
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

                <CursorPagination data={units} />
            </div>
        </AppLayout>
    );
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

function EmptyState({
    compact = false,
    search = '',
    growingAreaId = '',
    status = '',
}) {
    const hasFilter = search || growingAreaId || status;

    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <Squares2X2Icon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                {hasFilter ? 'Unit tanam tidak ditemukan' : 'Belum ada unit tanam'}
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    {hasFilter
                        ? 'Coba gunakan kata kunci lain, pilih area berbeda, atau ubah status.'
                        : 'Tambahkan bedengan, meja tanam, rak semai, atau instalasi hidroponik.'}
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
