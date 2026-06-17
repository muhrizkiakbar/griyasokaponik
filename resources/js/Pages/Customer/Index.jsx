import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    UserGroupIcon,
    PhoneIcon,
    EnvelopeIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';
import CursorPagination from '@/Components/CursorPagination';

export default function Index({ customers = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route('customers.index'),
                { search },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [search]);

    const resetSearch = () => {
        setSearch('');

        router.get(
            route('customers.index'),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    return (
        <AppLayout title="Daftar Customer">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <UserGroupIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                Customer
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Daftar pembeli dan pelanggan tetap hasil panen.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('customers.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" />
                        Tambah Customer
                    </Link>
                </div>

                <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-white/10 dark:bg-[#0B2A1E]">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative flex-1">
                            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-700 dark:text-lime-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari kode, nama, telepon, email, atau alamat customer..."
                                className="w-full rounded-2xl border border-green-100 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white dark:placeholder:text-green-200/60"
                            />
                        </div>

                        {search && (
                            <button
                                type="button"
                                onClick={resetSearch}
                                className="inline-flex items-center justify-center rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-green-100 dark:hover:bg-white/20"
                            >
                                <XMarkIcon className="mr-2 h-5 w-5" />
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-6 hidden overflow-hidden rounded-2xl border border-green-100 shadow-sm dark:border-white/10 md:block">
                    <table className="min-w-full divide-y divide-green-100 dark:divide-white/10">
                        <thead className="bg-green-50 dark:bg-white/10">
                            <tr>
                                <TableHead>Kode</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Telepon</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Alamat</TableHead>
                                <TableHead align="right">Aksi</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white dark:divide-white/10 dark:bg-[#0B2A1E]">
                            {customers.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-10 text-center">
                                        <EmptyState search={search} />
                                    </td>
                                </tr>
                            ) : (
                                customers.data.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="transition hover:bg-green-50/60 dark:hover:bg-white/5"
                                    >
                                        <TableCell>
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                                {customer.customer_code || '-'}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-semibold text-green-950 dark:text-white">
                                                {customer.name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <PhoneIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {customer.phone || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <EnvelopeIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {customer.email || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="max-w-xs truncate text-gray-600 dark:text-green-100">
                                                {customer.address || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('customers.edit', customer.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-lime-400 dark:hover:bg-white/20"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>

                                                <Link
                                                    href={route('customers.destroy', customer.id)}
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
                    {customers.data.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                            <EmptyState compact search={search} />
                        </div>
                    ) : (
                        customers.data.map((customer) => (
                            <div
                                key={customer.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-white/10 dark:bg-[#0B2A1E]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                            {customer.customer_code || '-'}
                                        </span>

                                        <h3 className="mt-3 font-bold text-green-950 dark:text-white">
                                            {customer.name}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-green-100">
                                            <p className="flex items-center gap-2">
                                                <PhoneIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {customer.phone || '-'}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <EnvelopeIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {customer.email || '-'}
                                            </p>

                                            <p className="flex items-start gap-2">
                                                <MapPinIcon className="mt-0.5 h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {customer.address || '-'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('customers.edit', customer.id)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm dark:bg-white/10 dark:text-lime-400"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>

                                        <Link
                                            href={route('customers.destroy', customer.id)}
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

                <CursorPagination data={customers} />
            </div>
        </AppLayout>
    );
}

function EmptyState({ compact = false, search = '' }) {
    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <UserGroupIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                {search ? 'Customer tidak ditemukan' : 'Belum ada customer'}
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    {search
                        ? 'Coba gunakan kata kunci lain pada kode, nama, telepon, email, atau alamat.'
                        : 'Tambahkan customer pertama untuk mencatat penjualan hasil panen.'}
                </p>
            )}
        </div>
    );
}

function TableHead({ children, align = 'left' }) {
    return (
        <th className={`px-4 py-3 text-${align} text-xs font-bold uppercase tracking-wider text-green-950 dark:text-green-50`}>
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
