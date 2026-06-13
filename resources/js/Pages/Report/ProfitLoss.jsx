import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { formatNumber } from '@/utils/format';
import {
    ChartBarIcon,
    BanknotesIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function ProfitLoss({
    year,
    months = [],
    totalSales = 0,
    totalExpenses = 0,
    totalProfit = 0,
}) {
    const [selectedYear, setSelectedYear] = useState(year);

    const changeYear = (e) => {
        const newYear = e.target.value;

        setSelectedYear(newYear);

        router.get(
            route('reports.profit-loss'),
            { year: newYear },
            { preserveState: true }
        );
    };

    const currentYear = new Date().getFullYear();

    return (
        <AppLayout title="Laporan Laba Rugi">
            <div className="space-y-6">
                <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                                <ChartBarIcon className="h-6 w-6" />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                    Laporan Laba Rugi Tahunan
                                </h2>
                                <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                    Ringkasan penjualan, pengeluaran, dan laba/rugi per bulan.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-4 py-3 dark:border-white/10 dark:bg-[#0B2A1E]">
                            <CalendarDaysIcon className="h-5 w-5 text-green-700 dark:text-lime-400" />

                            <label className="text-sm font-semibold text-green-950 dark:text-green-50">
                                Tahun
                            </label>

                            <select
                                value={selectedYear}
                                onChange={changeYear}
                                className="rounded-xl border border-green-100 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:border-lime-300 focus:ring-lime-300 dark:border-white/10 dark:bg-[#0B2A1E] dark:text-white"
                            >
                                <option value={currentYear}>{currentYear}</option>
                                <option value={currentYear - 1}>{currentYear - 1}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <SummaryCard
                        title="Total Penjualan"
                        value={totalSales}
                        icon={ArrowTrendingUpIcon}
                        type="sales"
                    />

                    <SummaryCard
                        title="Total Pengeluaran"
                        value={totalExpenses}
                        icon={ArrowTrendingDownIcon}
                        type="expense"
                    />

                    <SummaryCard
                        title={totalProfit >= 0 ? 'Total Laba' : 'Total Rugi'}
                        value={totalProfit}
                        icon={BanknotesIcon}
                        type={totalProfit >= 0 ? 'profit' : 'loss'}
                    />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {months.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-green-200 bg-green-50 p-8 text-center dark:border-white/10 dark:bg-white/5 md:col-span-2 xl:col-span-3">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-700 dark:bg-white/10 dark:text-lime-400">
                                <ChartBarIcon className="h-7 w-7" />
                            </div>

                            <p className="mt-3 font-semibold text-green-950 dark:text-white">
                                Belum ada data laporan
                            </p>

                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Data penjualan dan pengeluaran akan tampil setelah transaksi dicatat.
                            </p>
                        </div>
                    ) : (
                        months.map((month) => (
                            <MonthCard key={month.month} month={month} />
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

function SummaryCard({ title, value, icon: Icon, type }) {
    const isLoss = type === 'loss';
    const isExpense = type === 'expense';

    return (
        <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-green-100">
                        {title}
                    </p>

                    <p
                        className={`mt-3 text-2xl font-extrabold ${isLoss
                                ? 'text-red-600 dark:text-red-300'
                                : 'text-green-950 dark:text-white'
                            }`}
                    >
                        Rp {formatNumber(value)}
                    </p>
                </div>

                <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isLoss || isExpense
                            ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300'
                            : 'bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950'
                        }`}
                >
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}

function MonthCard({ month }) {
    const profit = Number(month.profit || 0);
    const isProfit = profit >= 0;

    return (
        <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-[#123D2A]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-green-100">
                        Bulan
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-green-950 dark:text-white">
                        {month.month}
                    </h3>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${isProfit
                            ? 'bg-green-100 text-green-700 dark:bg-lime-400 dark:text-green-950'
                            : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300'
                        }`}
                >
                    {isProfit ? 'Laba' : 'Rugi'}
                </span>
            </div>

            <div className="mt-5 space-y-3">
                <FinanceLine
                    label="Penjualan"
                    value={month.sales}
                    icon={ArrowTrendingUpIcon}
                />

                <FinanceLine
                    label="Pengeluaran"
                    value={month.expenses}
                    icon={ArrowTrendingDownIcon}
                    danger
                />
            </div>

            <div
                className={`mt-5 rounded-2xl p-4 ${isProfit
                        ? 'bg-green-50 dark:bg-[#0B2A1E]'
                        : 'bg-red-50 dark:bg-red-500/10'
                    }`}
            >
                <p className="text-sm font-medium text-gray-500 dark:text-green-100">
                    Laba/Rugi
                </p>

                <p
                    className={`mt-1 text-xl font-extrabold ${isProfit
                            ? 'text-green-950 dark:text-white'
                            : 'text-red-600 dark:text-red-300'
                        }`}
                >
                    Rp {formatNumber(profit)}
                </p>
            </div>
        </div>
    );
}

function FinanceLine({ label, value, icon: Icon, danger = false }) {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-green-100 bg-green-50 px-4 py-3 dark:border-white/10 dark:bg-[#0B2A1E]">
            <div className="flex items-center gap-2">
                <Icon
                    className={`h-4 w-4 ${danger
                            ? 'text-red-500 dark:text-red-300'
                            : 'text-green-700 dark:text-lime-400'
                        }`}
                />

                <span className="text-sm font-medium text-gray-500 dark:text-green-100">
                    {label}
                </span>
            </div>

            <span className="text-sm font-bold text-green-950 dark:text-white">
                Rp {formatNumber(value)}
            </span>
        </div>
    );
}
