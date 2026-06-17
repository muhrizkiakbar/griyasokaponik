import AppLayout from '@/Layouts/AppLayout';
import CursorPagination from '@/Components/CursorPagination';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    EnvelopeIcon,
    IdentificationIcon,
} from '@heroicons/react/24/outline';

export default function Index({ users = { data: [] }, filters = {} }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = {};

            if (search) params.search = search;
            if (role) params.role = role;

            router.get(route('users.index'), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, role]);

    const resetSearch = () => {
        setSearch('');
        setRole('');

        router.get(route('users.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout title="Manajemen User">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <UserGroupIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                User
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Kelola akun pengguna aplikasi KebunKu.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('users.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" />
                        Tambah User
                    </Link>
                </div>

                <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-white/10 dark:bg-[#0B2A1E]">
                    <div className="grid gap-3 lg:grid-cols-12">
                        <div className="relative lg:col-span-8">
                            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-700 dark:text-lime-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama, username, email, role, atau tanggal..."
                                className="w-full rounded-2xl border border-green-100 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white dark:placeholder:text-green-200/60"
                            />
                        </div>

                        <div className="lg:col-span-3">
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Role</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>

                        <div className="lg:col-span-1">
                            {(search || role) && (
                                <button
                                    type="button"
                                    onClick={resetSearch}
                                    className="inline-flex w-full items-center justify-center rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-green-100 dark:hover:bg-white/20"
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
                                <TableHead>Nama</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead align="right">Aksi</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white dark:divide-white/10 dark:bg-[#0B2A1E]">
                            {users.data.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-4 py-10 text-center">
                                        <EmptyState search={search} role={role} />
                                    </td>
                                </tr>
                            ) : (
                                users.data.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="transition hover:bg-green-50/60 dark:hover:bg-white/5"
                                    >
                                        <TableCell>
                                            <div className="font-semibold text-green-950 dark:text-white">
                                                {user.name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <IdentificationIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {user.username || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <EnvelopeIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {user.email}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <RoleBadge role={user.role} />
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('users.edit', user.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-lime-400 dark:hover:bg-white/20"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>

                                                <Link
                                                    href={route('users.destroy', user.id)}
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
                    {users.data.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                            <EmptyState compact search={search} role={role} />
                        </div>
                    ) : (
                        users.data.map((user) => (
                            <div
                                key={user.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-white/10 dark:bg-[#0B2A1E]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-green-950 dark:text-white">
                                            {user.name}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-green-100">
                                            <p>@{user.username || '-'}</p>
                                            <p>{user.email}</p>
                                            <RoleBadge role={user.role} />
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('users.edit', user.id)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm dark:bg-white/10 dark:text-lime-400"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>

                                        <Link
                                            href={route('users.destroy', user.id)}
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

                <CursorPagination data={users} />
            </div>
        </AppLayout>
    );
}

function RoleBadge({ role }) {
    return (
        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
            {role || '-'}
        </span>
    );
}

function EmptyState({ compact = false, search = '', role = '' }) {
    const hasFilter = search || role;

    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <UserGroupIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                {hasFilter ? 'User tidak ditemukan' : 'Belum ada user'}
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    {hasFilter
                        ? 'Coba gunakan kata kunci lain atau ubah filter role.'
                        : 'Tambahkan user pertama untuk mengelola akses aplikasi.'}
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
