// resources/js/Pages/Dashboard.jsx
import AppLayout from '@/Layouts/AppLayout';
import { formatNumber } from '@/utils/format';
import {
    SparklesIcon,
    Squares2X2Icon,
    ScissorsIcon,
    BanknotesIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CalendarDaysIcon,
    ExclamationTriangleIcon,
    ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({
    totalActivePlants = 0,
    totalSeedlingBatches = 0,
    totalUsedArea = 0,
    harvestThisMonth = 0,
    salesThisMonth = 0,
    expensesThisMonth = 0,
    profit = 0,
    upcomingHarvests = [],
    overdueHarvests = [],
}) {
    return (
        <AppLayout title="Dashboard">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Tanaman Aktif"
                    value={totalActivePlants}
                    description="Tanaman dalam masa produksi"
                    icon={SparklesIcon}
                />

                <StatCard
                    title="Total Batch Semai"
                    value={totalSeedlingBatches}
                    description="Batch yang sedang disemai"
                    icon={ClipboardDocumentListIcon}
                />

                <StatCard
                    title="Area Terpakai"
                    value={`${totalUsedArea} unit`}
                    description="Bedengan / meja aktif"
                    icon={Squares2X2Icon}
                />

                <StatCard
                    title="Panen Bulan Ini"
                    value={`${harvestThisMonth} kg`}
                    description="Akumulasi hasil panen"
                    icon={ScissorsIcon}
                />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm xl:col-span-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Keuangan Bulan Ini
                            </p>
                            <h2 className="mt-1 text-xl font-bold text-green-950">
                                Ringkasan Laba Rugi
                            </h2>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700">
                            <BanknotesIcon className="h-6 w-6" />
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <FinanceRow
                            label="Penjualan"
                            value={salesThisMonth}
                            icon={ArrowTrendingUpIcon}
                            type="income"
                        />

                        <FinanceRow
                            label="Pengeluaran"
                            value={expensesThisMonth}
                            icon={ArrowTrendingDownIcon}
                            type="expense"
                        />

                        <div className="rounded-2xl bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 p-5 text-white">
                            <p className="text-sm font-medium text-green-50">
                                Estimasi Laba Bersih
                            </p>
                            <p className="mt-2 text-3xl font-extrabold">
                                Rp {formatNumber(profit)}
                            </p>
                        </div>
                    </div>
                </div>

                <HarvestScheduleCard
                    title="Jadwal Panen Terdekat"
                    description="Batch yang akan masuk masa panen"
                    icon={CalendarDaysIcon}
                    items={upcomingHarvests}
                    emptyText="Belum ada jadwal panen terdekat."
                    type="upcoming"
                />

                <HarvestScheduleCard
                    title="Panen Terlambat"
                    description="Batch yang melewati estimasi panen"
                    icon={ExclamationTriangleIcon}
                    items={overdueHarvests}
                    emptyText="Tidak ada panen terlambat."
                    type="overdue"
                />
            </div>

            <div className="mt-8 rounded-3xl border border-green-100 bg-green-50 p-6 shadow-sm">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-green-950">
                            Aktivitas Kebun
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Pantau semai, area tanam, panen, dan kondisi keuangan secara berkala.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-green-700 shadow-sm">
                        Sistem aktif dan siap digunakan
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ title, value, description, icon: Icon }) {
    return (
        <div className="group overflow-hidden rounded-3xl border border-green-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>
                    <p className="mt-3 text-3xl font-extrabold text-green-950">
                        {value}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        {description}
                    </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lime-100 text-green-700 transition group-hover:bg-lime-400 group-hover:text-green-950">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}

function FinanceRow({ label, value, icon: Icon, type }) {
    const isIncome = type === 'income';

    return (
        <div className="flex items-center justify-between rounded-2xl border border-green-100 bg-green-50 p-4">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-700">
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {label}
                    </p>
                    <p className="text-lg font-bold text-green-950">
                        Rp {formatNumber(value)}
                    </p>
                </div>
            </div>

            <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${isIncome
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
            >
                {isIncome ? 'Masuk' : 'Keluar'}
            </span>
        </div>
    );
}

function HarvestScheduleCard({
    title,
    description,
    icon: Icon,
    items = [],
    emptyText,
    type,
}) {
    const isOverdue = type === 'overdue';

    return (
        <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {description}
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-green-950">
                        {title}
                    </h2>
                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isOverdue
                            ? 'bg-red-50 text-red-600'
                            : 'bg-lime-100 text-green-700'
                        }`}
                >
                    <Icon className="h-6 w-6" />
                </div>
            </div>

            <div className="mt-6">
                {items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-5 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            {emptyText}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {items.map((batch) => (
                            <div
                                key={batch.id}
                                className="flex items-center justify-between gap-4 rounded-2xl border border-green-100 bg-green-50 px-4 py-3"
                            >
                                <div>
                                    <p className="font-semibold text-green-950">
                                        {batch.batch_code}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Estimasi panen
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${isOverdue
                                            ? 'bg-red-50 text-red-600'
                                            : 'bg-green-100 text-green-700'
                                        }`}
                                >
                                    {batch.expected_harvest_date}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
