import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    EyeIcon,
    PlusIcon,
    ShoppingCartIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    BanknotesIcon,
    HashtagIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { formatNumber, formatDate } from '@/utils/format';
import CursorPagination from '@/Components/CursorPagination';

export default function Index({
    sales = { data: [] },
    customers = [],
    filters = {},
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [customerId, setCustomerId] = useState(filters.customer_id || '');
    const [paymentStatus, setPaymentStatus] = useState(filters.payment_status || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = {};

            if (search) params.search = search;
            if (customerId) params.customer_id = customerId;
            if (paymentStatus) params.payment_status = paymentStatus;

            router.get(route('sales.index'), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [search, customerId, paymentStatus]);

    const resetSearch = () => {
        setSearch('');
        setCustomerId('');
        setPaymentStatus('');

        router.get(route('sales.index'), {}, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <AppLayout title="Penjualan">
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <ShoppingCartIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                Penjualan
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Catatan transaksi penjualan hasil panen.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('sales.create')}
                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                    >
                        <PlusIcon className="-ml-0.5 mr-2 h-5 w-5" />
                        Catat Penjualan
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
                                placeholder="Cari nomor, tanggal, subtotal, diskon, total, catatan, atau tanggal input..."
                                className="w-full rounded-2xl border border-green-100 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white dark:placeholder:text-green-200/60"
                            />
                        </div>

                        <div className="lg:col-span-3">
                            <select
                                value={customerId}
                                onChange={(e) => setCustomerId(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Customer</option>
                                {customers.map((customer) => (
                                    <option
                                        key={customer.id}
                                        value={customer.id}
                                        className="bg-white text-gray-900 dark:bg-[#0B2A1E] dark:text-white"
                                    >
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="lg:col-span-3">
                            <select
                                value={paymentStatus}
                                onChange={(e) => setPaymentStatus(e.target.value)}
                                className="w-full rounded-2xl border border-green-100 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white"
                            >
                                <option value="">Semua Status</option>
                                <option value="belum bayar">Belum Bayar</option>
                                <option value="DP">DP</option>
                                <option value="lunas">Lunas</option>
                            </select>
                        </div>

                        <div className="lg:col-span-1">
                            {(search || customerId || paymentStatus) && (
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
                                <TableHead>No. Penjualan</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead align="right">Detail</TableHead>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-green-100 bg-white dark:divide-white/10 dark:bg-[#0B2A1E]">
                            {sales.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-10 text-center">
                                        <EmptyState
                                            search={search}
                                            customerId={customerId}
                                            paymentStatus={paymentStatus}
                                        />
                                    </td>
                                </tr>
                            ) : (
                                sales.data.map((sale) => (
                                    <tr
                                        key={sale.id}
                                        className="transition hover:bg-green-50/60 dark:hover:bg-white/5"
                                    >
                                        <TableCell>
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                                <HashtagIcon className="h-3.5 w-3.5" />
                                                {sale.sale_number || '-'}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <CalendarDaysIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {formatDate(sale.sale_date)}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 text-gray-600 dark:text-green-100">
                                                <UserGroupIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {sale.customer?.name || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 font-semibold text-green-950 dark:text-white">
                                                <BanknotesIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Rp {formatNumber(sale.grand_total || 0)}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <PaymentBadge status={sale.payment_status} />
                                        </TableCell>

                                        <TableCell align="right">
                                            <div className="flex justify-end">
                                                <Link
                                                    href={route('sales.show', sale.id)}
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
                    {sales.data.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                            <EmptyState
                                compact
                                search={search}
                                customerId={customerId}
                                paymentStatus={paymentStatus}
                            />
                        </div>
                    ) : (
                        sales.data.map((sale) => (
                            <div
                                key={sale.id}
                                className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-white/10 dark:bg-[#0B2A1E]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                            <HashtagIcon className="h-3.5 w-3.5" />
                                            {sale.sale_number || '-'}
                                        </span>

                                        <h3 className="mt-3 font-bold text-green-950 dark:text-white">
                                            {sale.customer?.name || '-'}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-green-100">
                                            <p className="flex items-center gap-2">
                                                <CalendarDaysIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {formatDate(sale.sale_date)}
                                            </p>

                                            <p className="flex items-center gap-2 font-semibold text-green-950 dark:text-white">
                                                <BanknotesIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Rp {formatNumber(sale.grand_total || 0)}
                                            </p>

                                            <PaymentBadge status={sale.payment_status} />
                                        </div>
                                    </div>

                                    <Link
                                        href={route('sales.show', sale.id)}
                                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm dark:bg-white/10 dark:text-lime-400"
                                    >
                                        <EyeIcon className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <CursorPagination data={sales} />
            </div>
        </AppLayout>
    );
}

function PaymentBadge({ status }) {
    const normalized = String(status || '').toLowerCase();

    const isPaid = normalized === 'paid' || normalized === 'lunas';
    const isPending = normalized === 'pending' || normalized === 'belum bayar';
    const isPartial = normalized === 'partial' || normalized === 'dp';

    let label = status || '-';
    let className = 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-green-100';

    if (isPaid) {
        label = 'Lunas';
        className = 'bg-green-100 text-green-700 dark:bg-lime-400 dark:text-green-950';
    }

    if (isPending) {
        label = 'Belum Bayar';
        className = 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300';
    }

    if (isPartial) {
        label = 'DP';
        className = 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300';
    }

    return (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {label}
        </span>
    );
}

function EmptyState({
    compact = false,
    search = '',
    customerId = '',
    paymentStatus = '',
}) {
    const hasFilter = search || customerId || paymentStatus;

    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <ShoppingCartIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                {hasFilter ? 'Penjualan tidak ditemukan' : 'Belum ada penjualan'}
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    {hasFilter
                        ? 'Coba gunakan kata kunci lain, pilih customer berbeda, atau ubah status pembayaran.'
                        : 'Catat penjualan pertama dari hasil panen kebun.'}
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
