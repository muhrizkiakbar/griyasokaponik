import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { EyeIcon, PlusIcon } from '@heroicons/react/24/outline';
import { formatNumber, formatDate } from '@/utils/format';

export default function Index({ sales }) {
    return (
        <AppLayout title="Penjualan">
            <div className="sm:flex sm:items-center sm:justify-between">
                <h1 className="text-xl font-semibold text-gray-900">Penjualan</h1>
                <Link href={route('sales.create')} className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white">
                    <PlusIcon className="h-5 w-5 mr-1" /> Catat Penjualan
                </Link>
            </div>
            <div className="mt-8 flow-root">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">No. Penjualan</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Tanggal</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Customer</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Total</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {sales.map(sale => (
                            <tr key={sale.id}>
                                <td className="px-3 py-4 text-sm font-medium text-gray-900">{sale.sale_number}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{formatDate(sale.sale_date)}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{sale.customer.name}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">Rp {formatNumber(sale.grand_total)}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{sale.payment_status}</td>
                                <td className="px-3 py-4 text-right">
                                    <Link href={route('sales.show', sale.id)} className="text-indigo-600"><EyeIcon className="h-5 w-5 inline" /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
