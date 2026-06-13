import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Index({ units }) {
    return (
        <AppLayout title="Bedengan / Meja Tanam">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Bedengan / Meja Tanam</h1>
                    <p className="mt-2 text-sm text-gray-700">Daftar unit penanaman (bedengan, rak hidroponik, dll).</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link href={route('growing-units.create')} className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white">
                        <PlusIcon className="h-5 w-5 mr-1" /> Tambah Unit
                    </Link>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Kode</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Nama Unit</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Area</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Kapasitas</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Tipe</th>
                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {units.map((unit) => (
                            <tr key={unit.id}>
                                <td className="px-3 py-4 text-sm text-gray-500">{unit.unit_code}</td>
                                <td className="px-3 py-4 text-sm font-medium text-gray-900">{unit.unit_name}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{unit.growing_area?.area_name}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{unit.capacity}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{unit.unit_type}</td>
                                <td className="px-3 py-4 text-right">
                                    <Link href={route('growing-units.edit', unit.id)} className="text-indigo-600 mr-3"><PencilIcon className="h-5 w-5 inline" /></Link>
                                    <Link href={route('growing-units.destroy', unit.id)} method="delete" as="button" className="text-red-600"><TrashIcon className="h-5 w-5 inline" /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
