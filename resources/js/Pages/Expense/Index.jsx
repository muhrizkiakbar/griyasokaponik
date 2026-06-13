import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { formatNumber, formatDate } from '@/utils/format';

export default function Index({ expenses }) {
    return (
        <AppLayout title="Pengeluaran">
            <div className="sm:flex sm:items-center sm:justify-between">
                <h1 className="text-xl font-semibold">Pengeluaran</h1>
                <Link href={route('expenses.create')} className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-white text-sm">
                    <PlusIcon className="h-5 w-5 mr-1" /> Tambah Pengeluaran
                </Link>
            </div>
            <div className="mt-8 flow-root">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Tanggal</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Kategori</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Deskripsi</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Jumlah</th>
                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {expenses.map(exp => (
                            <tr key={exp.id}>
                                <td className="px-3 py-4 text-sm text-gray-500">{formatDate(exp.expense_date)}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{exp.category.name}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{exp.description}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">Rp {formatNumber(exp.amount)}</td>
                                <td className="px-3 py-4 text-right">
                                    <Link href={route('expenses.edit', exp.id)} className="text-indigo-600 mr-3"><PencilIcon className="h-5 w-5 inline" /></Link>
                                    <Link href={route('expenses.destroy', exp.id)} method="delete" as="button" className="text-red-600"><TrashIcon className="h-5 w-5 inline" /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
