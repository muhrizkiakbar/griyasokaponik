import AppLayout from '@/Layouts/AppLayout';
import { formatNumber, formatDate } from '@/utils/format';
import {
    ShoppingCartIcon,
    HashtagIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    BanknotesIcon,
    CubeIcon,
} from '@heroicons/react/24/outline';

export default function Show({ sale }) {
    return (
        <AppLayout title={`Penjualan ${sale.sale_number}`}>
            <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                <div className="border-b border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <ShoppingCartIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                Detail Penjualan
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Ringkasan transaksi penjualan hasil panen.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4">
                    <InfoCard
                        label="Nomor"
                        value={sale.sale_number}
                        icon={HashtagIcon}
                    />

                    <InfoCard
                        label="Tanggal"
                        value={formatDate(sale.sale_date)}
                        icon={CalendarDaysIcon}
                    />

                    <InfoCard
                        label="Customer"
                        value={sale.customer?.name || sale.customer?.customer_name || '-'}
                        icon={UserGroupIcon}
                    />

                    <InfoCard
                        label="Status"
                        value={formatPaymentStatus(sale.payment_status)}
                        icon={BanknotesIcon}
                    />
                </div>

                <section className="border-t border-green-100 px-6 py-6 dark:border-white/10">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <CubeIcon className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-green-950 dark:text-white">
                                Item Penjualan
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Daftar hasil panen yang dijual pada transaksi ini.
                            </p>
                        </div>
                    </div>

                    <div className="hidden overflow-hidden rounded-2xl border border-green-100 shadow-sm dark:border-white/10 md:block">
                        <table className="min-w-full divide-y divide-green-100 dark:divide-white/10">
                            <thead className="bg-green-50 dark:bg-white/10">
                                <tr>
                                    <TableHead>Produk</TableHead>
                                    <TableHead>Qty</TableHead>
                                    <TableHead>Harga</TableHead>
                                    <TableHead>Total</TableHead>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-green-100 bg-white dark:divide-white/10 dark:bg-[#0B2A1E]">
                                {sale.items?.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-4 py-10 text-center">
                                            <EmptyState />
                                        </td>
                                    </tr>
                                ) : (
                                    sale.items?.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="transition hover:bg-green-50/60 dark:hover:bg-white/5"
                                        >
                                            <TableCell>
                                                <span className="font-semibold text-green-950 dark:text-white">
                                                    {item.harvest?.planting_batch?.batch_code || '-'}
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                <span className="text-gray-600 dark:text-green-100">
                                                    {item.quantity}
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                <span className="text-gray-600 dark:text-green-100">
                                                    Rp {formatNumber(item.price)}
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                <span className="font-bold text-green-950 dark:text-white">
                                                    Rp {formatNumber(item.total)}
                                                </span>
                                            </TableCell>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="space-y-3 md:hidden">
                        {sale.items?.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center dark:border-white/10 dark:bg-white/5">
                                <EmptyState compact />
                            </div>
                        ) : (
                            sale.items?.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-green-100 bg-green-50 p-4 shadow-sm dark:border-white/10 dark:bg-[#0B2A1E]"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-bold text-green-950 dark:text-white">
                                                {item.harvest?.planting_batch?.batch_code || '-'}
                                            </p>

                                            <p className="mt-2 text-sm text-gray-500 dark:text-green-100">
                                                Qty: {item.quantity}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                                Harga: Rp {formatNumber(item.price)}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs font-medium text-gray-500 dark:text-green-100">
                                                Total
                                            </p>
                                            <p className="mt-1 font-bold text-green-950 dark:text-white">
                                                Rp {formatNumber(item.total)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                <section className="border-t border-green-100 bg-green-50 px-6 py-6 dark:border-white/10 dark:bg-white/10">
                    <div className="grid gap-4 md:grid-cols-3">
                        <SummaryCard
                            label="Subtotal"
                            value={sale.subtotal}
                        />

                        <SummaryCard
                            label="Diskon"
                            value={sale.discount}
                        />

                        <SummaryCard
                            label="Grand Total"
                            value={sale.grand_total}
                            highlight
                        />
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}

function InfoCard({ label, value, icon: Icon }) {
    return (
        <div className="rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-white/10 dark:bg-[#0B2A1E]">
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-green-700 dark:bg-white/10 dark:text-lime-400">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-green-100">
                        {label}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-green-950 dark:text-white">
                        {value || '-'}
                    </dd>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({ label, value, highlight = false }) {
    return (
        <div
            className={`rounded-2xl p-4 ${highlight
                    ? 'bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 text-white'
                    : 'border border-green-100 bg-white dark:border-white/10 dark:bg-[#0B2A1E]'
                }`}
        >
            <p
                className={`text-sm font-medium ${highlight ? 'text-green-50' : 'text-gray-500 dark:text-green-100'
                    }`}
            >
                {label}
            </p>

            <p
                className={`mt-2 text-xl font-extrabold ${highlight ? 'text-white' : 'text-green-950 dark:text-white'
                    }`}
            >
                Rp {formatNumber(value || 0)}
            </p>
        </div>
    );
}

function EmptyState({ compact = false }) {
    return (
        <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                <ShoppingCartIcon className="h-7 w-7" />
            </div>

            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                Belum ada item penjualan
            </p>

            {!compact && (
                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                    Item hasil panen yang dijual akan tampil di sini.
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

function formatPaymentStatus(status) {
    const normalized = String(status || '').toLowerCase();

    if (normalized === 'lunas' || normalized === 'paid') return 'Lunas';
    if (normalized === 'dp' || normalized === 'partial') return 'DP';
    if (normalized === 'belum bayar' || normalized === 'pending') return 'Belum Bayar';

    return status || '-';
}
