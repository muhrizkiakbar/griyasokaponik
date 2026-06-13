import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Index({ categories }) {
    return (
        <AppLayout title="Kategori Pengeluaran">
            <div className="sm:flex sm:items-center sm:justify-between">
                <h1 className="text-xl font-semibold text-gray-900">Kategori Pengeluaran</h1>
                <Link href={route('expense-categories.create')} className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm text-white">
                    <PlusIcon className="h-5 w-5 mr-1" /> Tambah Kategori
                </Link>
            </div>
            <div className="mt-8 flow-root">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Nama Kategori</th>
                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td className="px-3 py-4 text-sm text-gray-500">{category.name}</td>
                                <td className="px-3 py-4 text-right">
                                    <Link href={route('expense-categories.edit', category.id)} className="text-indigo-600 mr-3"><PencilIcon className="h-5 w-5 inline" /></Link>
                                    <Link href={route('expense-categories.destroy', category.id)} method="delete" as="button" className="text-red-600"><TrashIcon className="h-5 w-5 inline" /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
