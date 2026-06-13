import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Index({ areas }) {
    return (
        <AppLayout title="Area Kebun">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Area Kebun</h1>
                    <p className="mt-2 text-sm text-gray-700">Daftar area/lokasi kebun (greenhouse, lahan terbuka, dll).</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link href={route('growing-areas.create')} className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                        Tambah Area
                    </Link>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Kode</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nama Area</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tipe</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ukuran (m²)</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {areas.map((area) => (
                            <tr key={area.id}>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{area.area_code}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{area.area_name}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{area.area_type}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{area.length * area.width}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${area.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {area.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                    <Link href={route('growing-areas.edit', area.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        <PencilIcon className="h-5 w-5 inline" />
                                    </Link>
                                    <Link href={route('growing-areas.destroy', area.id)} method="delete" as="button" className="text-red-600 hover:text-red-900">
                                        <TrashIcon className="h-5 w-5 inline" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
