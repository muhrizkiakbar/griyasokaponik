import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatDate, formatNumber } from '@/utils/format';

const activityLabels = {
    watering: '💧 Penyiraman',
    fertilizing: '🌱 Pemupukan',
    spraying: '🧴 Penyemprotan',
    pruning: '✂️ Pemangkasan',
    ppm_check: '📊 Pengecekan PPM',
    ph_check: '🧪 Pengecekan pH',
    other: '📝 Lainnya',
};

export default function Index({ activities }) {
    return (
        <AppLayout title="Perawatan Kebun">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Perawatan Kebun</h1>
                    <p className="mt-2 text-sm text-gray-700">Catatan pemupukan, penyiraman, pestisida, dan lainnya.</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <Link href={route('maintenance.create')} className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm text-white">
                        <PlusIcon className="h-5 w-5 mr-1" /> Catat Perawatan
                    </Link>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Tanggal</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Batch</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Jenis</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Deskripsi</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold">Biaya</th>
                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {activities.map(act => (
                            <tr key={act.id}>
                                <td className="px-3 py-4 text-sm text-gray-500">{formatDate(act.activity_date)}</td>
                                <td className="px-3 py-4 text-sm text-gray-900">{act.planting_batch?.batch_code}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{activityLabels[act.activity_type] || act.activity_type}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">{act.description}</td>
                                <td className="px-3 py-4 text-sm text-gray-500">Rp {formatNumber(act.cost)}</td>
                                <td className="px-3 py-4 text-right">
                                    <Link href={route('maintenance.edit', act.id)} className="text-indigo-600 mr-3"><PencilIcon className="h-5 w-5 inline" /></Link>
                                    <Link href={route('maintenance.destroy', act.id)} method="delete" as="button" className="text-red-600"><TrashIcon className="h-5 w-5 inline" /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
