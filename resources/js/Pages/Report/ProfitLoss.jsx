import { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { formatNumber } from '@/utils/format';

export default function ProfitLoss({ year, months, totalSales, totalExpenses, totalProfit }) {
    const [selectedYear, setSelectedYear] = useState(year);

    const changeYear = (e) => {
        const newYear = e.target.value;
        setSelectedYear(newYear);
        router.get(route('reports.profit-loss'), { year: newYear }, { preserveState: true });
    };

    return (
        <AppLayout title="Laporan Laba Rugi">
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <h1 className="text-xl font-semibold">Laporan Laba Rugi Tahunan</h1>
                <div>
                    <label className="mr-2">Tahun:</label>
                    <select value={selectedYear} onChange={changeYear} className="rounded-md border-gray-300">
                        <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                        <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
                    </select>
                </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bulan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Penjualan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pengeluaran</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Laba/Rugi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {months.map(m => (
                            <tr key={m.month}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{m.month}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {formatNumber(m.sales)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {formatNumber(m.expenses)}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${m.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    Rp {formatNumber(m.profit)}
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-gray-100 font-bold">
                            <td className="px-6 py-4 whitespace-nowrap text-sm">TOTAL</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">Rp {formatNumber(totalSales)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">Rp {formatNumber(totalExpenses)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">Rp {formatNumber(totalProfit)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
