import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { EyeIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function Index({ batches }) {
    const isReadyToHarvest = (batch) => {
        return batch.expected_harvest_date &&
            new Date(batch.expected_harvest_date) <= new Date() &&
            batch.current_stage !== 'harvested';
    };

    return (
        <AppLayout title="Batch Semai">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Batch Semai</h1>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link href={route('planting-batches.create')} className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
                        <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
                        Buat Batch Baru
                    </Link>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Kode Batch</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tanaman</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tgl Semai</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Jumlah Benih</th>
                                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Detail</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {batches.map((batch) => (
                                    <tr key={batch.id}>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{batch.batch_code}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.plant_variety?.plant?.plant_name} - {batch.plant_variety?.variety_name}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.seeding_date}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{batch.seed_quantity}</td>
                                        <td className="px-3 py-4 text-sm">
                                            {isReadyToHarvest(batch) ? (
                                                <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                                    Siap Panen
                                                </span>
                                            ) : (
                                                <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                                                    {batch.current_stage}
                                                </span>
                                            )}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <Link href={route('planting-batches.show', batch.id)} className="text-indigo-600 hover:text-indigo-900">
                                                <EyeIcon className="h-5 w-5 inline" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
