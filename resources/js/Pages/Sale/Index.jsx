import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import {
    EyeIcon,
    PlusIcon,
    ShoppingCartIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    BanknotesIcon,
    HashtagIcon,
} from '@heroicons/react/24/outline';
import { formatNumber, formatDate } from '@/utils/format';

export default function Index({ sales = [] }) {
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
                            {sales.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-4 py-10 text-center">
                                        <EmptyState />
                                    </td>
                                </tr>
                            ) : (
                                sales.map((sale) => (
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
                                                {sale.customer?.name || sale.customer?.customer_name || '-'}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="inline-flex items-center gap-2 font-semibold text-green-950 dark:text-white">
                                                <BanknotesIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Rp {formatNumber(sale.grand_total)}
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
                    {sales.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                            <EmptyState compact />
                        </div>
                    ) : (
                        sales.map((sale) => (
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
                                            {sale.customer?.name || sale.customer?.customer_name || '-'}
                                        </h3>

                                        <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-green-100">
                                            <p className="flex items-center gap-2">
                                                <CalendarDaysIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                {formatDate(sale.sale_date)}
                                            </p>

                                            <p className="flex items-center gap-2 font-semibold text-green-950 dark:text-white">
                                                <BanknotesIcon className="h-4 w-4 text-green-700 dark:text-lime-400" />
                                                Rp {formatNumber(sale.grand_total)}
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

function EmptyState({ compact = false }) {
    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <ShoppingCartIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                Belum ada penjualan
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    Catat penjualan pertama dari hasil panen kebun.
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
