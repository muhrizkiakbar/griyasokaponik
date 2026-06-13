import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    SparklesIcon,
    TagIcon,
    HashtagIcon,
} from '@heroicons/react/24/outline';

export default function Index({ plants = [] }) {
    return (
        <AppLayout title="Daftar Tanaman">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700">
                            <SparklesIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950">
                                Tanaman
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Daftar semua jenis tanaman yang dibudidayakan.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('plants.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" />
                        Tambah Tanaman
                    </Link>
                </div>

                <div className="mt-6 hidden overflow-hidden rounded-2xl border border-green-100 shadow-sm md:block">
                    <table className="min-w-full divide-y divide-green-100">
                        <thead className="bg-green-50">
                            <tr>
                                <TableHead>Kode</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead align="right">Aksi</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white">
                            {plants.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-4 py-10 text-center">
                                        <EmptyState />
                                    </td>
                                </tr>
                            ) : (
                                plants.map((plant) => (
                                    <tr
                                        key={plant.id}
                                        className="transition hover:bg-green-50/60"
                                    >
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                <HashtagIcon className="h-3.5 w-3.5" />
                                                {plant.plant_code || '-'}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-semibold text-green-950">
                                                {plant.plant_name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600">
                                                <TagIcon className="h-4 w-4 text-green-700" />
                                                {plant.category || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <StatusBadge status={plant.status} />
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('plants.edit', plant.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 transition hover:bg-green-50"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>

                                                <Link
                                                    href={route('plants.destroy', plant.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100"
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
                    {plants.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center">
                            <EmptyState compact />
                        </div>
                    ) : (
                        plants.map((plant) => (
                            <div
                                key={plant.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            <HashtagIcon className="h-3.5 w-3.5" />
                                            {plant.plant_code || '-'}
                                        </span>

                                        <h3 className="mt-3 font-bold text-green-950">
                                            {plant.plant_name}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600">
                                            <p className="flex items-center gap-2">
                                                <TagIcon className="h-4 w-4 text-green-700" />
                                                {plant.category || '-'}
                                            </p>

                                            <StatusBadge status={plant.status} />
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('plants.edit', plant.id)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>

                                        <Link
                                            href={route('plants.destroy', plant.id)}
                                            method="delete"
                                            as="button"
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 shadow-sm"
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
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
        >
            {active ? 'Aktif' : 'Nonaktif'}
        </span>
    );
}

function EmptyState({ compact = false }) {
    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <SparklesIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950">
                Belum ada tanaman
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500">
                    Tambahkan tanaman pertama untuk mulai mengelola budidaya kebun.
                </p>
            )}
        </div>
    );
}

function TableHead({ children, align = 'left' }) {
    return (
        <th
            className={`px-4 py-3 text-${align} text-xs font-bold uppercase tracking-wider text-green-950`}
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
