import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function Index({ plants }) {
    return (
        <AppLayout title="Daftar Tanaman">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Tanaman</h1>
                    <p className="mt-2 text-sm text-gray-700">Daftar semua jenis tanaman yang dibudidayakan.</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <Link href={route('plants.create')} className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700">
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                        Tambah Tanaman
                    </Link>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Kode</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nama</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Kategori</th>
                                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                        <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Aksi</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {plants.map((plant) => (
                                        <tr key={plant.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{plant.plant_code}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{plant.plant_name}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{plant.category}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${plant.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {plant.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                                </span>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <Link href={route('plants.edit', plant.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                    <PencilIcon className="h-5 w-5 inline" />
                                                </Link>
                                                <Link href={route('plants.destroy', plant.id)} method="delete" as="button" className="text-red-600 hover:text-red-900">
                                                    <TrashIcon className="h-5 w-5 inline" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
