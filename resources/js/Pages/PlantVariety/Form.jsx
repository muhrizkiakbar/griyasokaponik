import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';

export default function Form({ plants, variety }) {
    const isEdit = !!variety;
    const { data, setData, post, put, processing, errors } = useForm({
        plant_id: variety?.plant_id || '',
        variety_name: variety?.variety_name || '',
        seed_brand: variety?.seed_brand || '',
        expected_yield_per_unit: variety?.expected_yield_per_unit || '',
        notes: variety?.notes || '',
        status: variety?.status || 'active',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('plant-varieties.update', variety.id));
        } else {
            post(route('plant-varieties.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Varietas Tanaman' : 'Tambah Varietas Tanaman'}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                {/* Pilih Tanaman Induk */}
                <div>
                    <InputLabel forInput="plant_id" value="Tanaman" />
                    <SelectInput
                        id="plant_id"
                        value={data.plant_id}
                        onChange={(e) => setData('plant_id', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    >
                        <option value="">Pilih Tanaman</option>
                        {plants.map((plant) => (
                            <option key={plant.id} value={plant.id}>
                                {plant.plant_name}
                            </option>
                        ))}
                    </SelectInput>
                    <InputError message={errors.plant_id} />
                </div>

                {/* Nama Varietas */}
                <div>
                    <InputLabel forInput="variety_name" value="Nama Varietas" />
                    <TextInput
                        id="variety_name"
                        value={data.variety_name}
                        onChange={(e) => setData('variety_name', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors.variety_name} />
                </div>

                {/* Merek Benih */}
                <div>
                    <InputLabel forInput="seed_brand" value="Merek Benih" />
                    <TextInput
                        id="seed_brand"
                        value={data.seed_brand}
                        onChange={(e) => setData('seed_brand', e.target.value)}
                        className="mt-1 block w-full"
                    />
                </div>

                {/* Estimasi Hasil per Unit */}
                <div>
                    <InputLabel forInput="expected_yield_per_unit" value="Estimasi Hasil (kg/unit)" />
                    <TextInput
                        id="expected_yield_per_unit"
                        type="number"
                        step="0.01"
                        value={data.expected_yield_per_unit}
                        onChange={(e) => setData('expected_yield_per_unit', e.target.value)}
                        className="mt-1 block w-full"
                    />
                </div>

                {/* Catatan */}
                <div>
                    <InputLabel forInput="notes" value="Catatan" />
                    <textarea
                        id="notes"
                        rows="3"
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                </div>

                {/* Status */}
                <div>
                    <InputLabel forInput="status" value="Status" />
                    <SelectInput
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="active">Aktif</option>
                        <option value="inactive">Nonaktif</option>
                    </SelectInput>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        {isEdit ? 'Update' : 'Simpan'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
