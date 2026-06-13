import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    CubeIcon,
    SparklesIcon,
    BuildingStorefrontIcon,
    ScaleIcon,
} from '@heroicons/react/24/outline';

export default function Index({ varieties = [] }) {
    return (
        <AppLayout title="Daftar Varietas Tanaman">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <CubeIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                Varietas Tanaman
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Daftar semua varietas dari setiap jenis tanaman.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('plant-varieties.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" />
                        Tambah Varietas
                    </Link>
                </div>

                <div className="mt-6 hidden overflow-hidden rounded-2xl border border-green-100 shadow-sm dark:border-white/10 md:block">
                    <table className="min-w-full divide-y divide-green-100 dark:divide-white/10">
                        <thead className="bg-green-50 dark:bg-white/10">
                            <tr>
                                <TableHead>Tanaman</TableHead>
                                <TableHead>Nama Varietas</TableHead>
                                <TableHead>Merek Benih</TableHead>
                                <TableHead>Estimasi Hasil</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead align="right">Aksi</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white dark:divide-white/10 dark:bg-[#0B2A1E]">
                            {varieties.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-10 text-center">
                                        <EmptyState />
                                    </td>
                                </tr>
                            ) : (
                                varieties.map((variety) => (
                                    <tr
                                        key={variety.id}
                                        className="transition hover:bg-green-50/60 dark:hover:bg-white/5"
                                    >
                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <SparklesIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {variety.plant?.plant_name || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-semibold text-green-950 dark:text-white">
                                                {variety.variety_name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <BuildingStorefrontIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {variety.seed_brand || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <ScaleIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {variety.expected_yield_per_unit
                                                    ? `${variety.expected_yield_per_unit} kg/unit`
                                                    : '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <StatusBadge status={variety.status} />
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('plant-varieties.edit', variety.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-lime-400 dark:hover:bg-white/20"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>

                                                <Link
                                                    href={route('plant-varieties.destroy', variety.id)}
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
                    {varieties.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                            <EmptyState compact />
                        </div>
                    ) : (
                        varieties.map((variety) => (
                            <div
                                key={variety.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-white/10 dark:bg-[#0B2A1E]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                            <SparklesIcon className="h-3.5 w-3.5" />
                                            {variety.plant?.plant_name || '-'}
                                        </span>

                                        <h3 className="mt-3 font-bold text-green-950 dark:text-white">
                                            {variety.variety_name}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-green-100">
                                            <p className="flex items-center gap-2">
                                                <BuildingStorefrontIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {variety.seed_brand || '-'}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <ScaleIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {variety.expected_yield_per_unit
                                                    ? `${variety.expected_yield_per_unit} kg/unit`
                                                    : '-'}
                                            </p>

                                            <StatusBadge status={variety.status} />
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('plant-varieties.edit', variety.id)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm dark:bg-white/10 dark:text-lime-400"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>

                                        <Link
                                            href={route('plant-varieties.destroy', variety.id)}
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

function EmptyState({ compact = false }) {
    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <CubeIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                Belum ada varietas tanaman
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    Tambahkan varietas pertama untuk melengkapi data tanaman.
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
