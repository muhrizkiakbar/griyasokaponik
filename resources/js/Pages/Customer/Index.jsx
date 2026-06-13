import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    UserGroupIcon,
    PhoneIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline';

export default function Index({ customers = [] }) {
    return (
        <AppLayout title="Daftar Customer">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700">
                                <UserGroupIcon className="h-6 w-6" />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-green-950">
                                    Customer
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Daftar pembeli dan pelanggan tetap hasil panen.
                                </p>
                            </div>
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

                <div className="mt-6 hidden overflow-hidden rounded-2xl border border-green-100 shadow-sm md:block">
                    <table className="min-w-full divide-y divide-green-100">
                        <thead className="bg-green-50">
                            <tr>
                                <TableHead>Kode</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Telepon</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead align="right">Aksi</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white">
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-4 py-10 text-center">
                                        <div className="mx-auto flex max-w-sm flex-col items-center">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                                                <UserGroupIcon className="h-7 w-7" />
                                            </div>
                                            <p className="mt-3 font-semibold text-green-950">
                                                Belum ada customer
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Tambahkan customer pertama untuk mencatat penjualan hasil panen.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer.id} className="transition hover:bg-green-50/60">
                                        <TableCell>
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                {customer.customer_code || '-'}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-semibold text-green-950">
                                                {customer.name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <PhoneIcon className="h-4 w-4 text-green-700" />
                                                {customer.phone || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <EnvelopeIcon className="h-4 w-4 text-green-700" />
                                                {customer.email || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={route('customers.edit', customer.id)}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-white text-green-700 transition hover:bg-green-50"
                                                >
                                                    <PencilIcon className="h-4 w-4" />
                                                </Link>

                                                <Link
                                                    href={route('customers.destroy', customer.id)}
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
                    {customers.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-700">
                                <UserGroupIcon className="h-7 w-7" />
                            </div>
                            <p className="mt-3 font-semibold text-green-950">
                                Belum ada customer
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                Tambahkan customer pertama.
                            </p>
                        </div>
                    ) : (
                        customers.map((customer) => (
                            <div
                                key={customer.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                            {customer.customer_code || '-'}
                                        </span>

                                        <h3 className="mt-3 font-bold text-green-950">
                                            {customer.name}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600">
                                            <p className="flex items-center gap-2">
                                                <PhoneIcon className="h-4 w-4 text-green-700" />
                                                {customer.phone || '-'}
                                            </p>

                                            <p className="flex items-center gap-2">
                                                <EnvelopeIcon className="h-4 w-4 text-green-700" />
                                                {customer.email || '-'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('customers.edit', customer.id)}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Link>

                                        <Link
                                            href={route('customers.destroy', customer.id)}
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
