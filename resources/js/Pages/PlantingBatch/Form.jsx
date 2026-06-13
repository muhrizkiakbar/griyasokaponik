import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import { useState } from 'react';

export default function Form({ varieties, units, batch }) {
    const isEdit = !!batch;
    const { data, setData, post, put, processing, errors } = useForm({
        batch_code: batch?.batch_code || '',
        plant_variety_id: batch?.plant_variety_id || '',
        seeding_date: batch?.seeding_date || '',
        seed_quantity: batch?.seed_quantity || '',
        germinated_quantity: batch?.germinated_quantity || '',
        transplanted_quantity: batch?.transplanted_quantity || '',
        expected_transplant_date: batch?.expected_transplant_date || '',
        expected_harvest_date: batch?.expected_harvest_date || '',
        notes: batch?.notes || '',
        status: batch?.status || 'active',
        allocation_unit_id: '',
        allocation_quantity: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('planting-batches.update', batch.id));
        } else {
            post(route('planting-batches.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Batch' : 'Buat Batch Baru'}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div>
                    <InputLabel forInput="batch_code" value="Kode Batch" />
                    <TextInput id="batch_code" value={data.batch_code} onChange={e => setData('batch_code', e.target.value)} className="mt-1 block w-full" required />
                    <InputError message={errors.batch_code} />
                </div>

                <div>
                    <InputLabel forInput="plant_variety_id" value="Varietas Tanaman" />
                    <SelectInput id="plant_variety_id" value={data.plant_variety_id} onChange={e => setData('plant_variety_id', e.target.value)} className="mt-1 block w-full" required>
                        <option value="">Pilih Varietas</option>
                        {varieties.map(v => (
                            <option key={v.id} value={v.id}>{v.plant.plant_name} - {v.variety_name}</option>
                        ))}
                    </SelectInput>
                    <InputError message={errors.plant_variety_id} />
                </div>

                <div>
                    <InputLabel forInput="seeding_date" value="Tanggal Semai" />
                    <TextInput type="date" id="seeding_date" value={data.seeding_date} onChange={e => setData('seeding_date', e.target.value)} className="mt-1 block w-full" required />
                </div>

                <div>
                    <InputLabel forInput="seed_quantity" value="Jumlah Benih" />
                    <TextInput type="number" id="seed_quantity" value={data.seed_quantity} onChange={e => setData('seed_quantity', e.target.value)} className="mt-1 block w-full" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel forInput="expected_transplant_date" value="Estimasi Pindah Tanam" />
                        <TextInput type="date" id="expected_transplant_date" value={data.expected_transplant_date} onChange={e => setData('expected_transplant_date', e.target.value)} className="mt-1 block w-full" />
                    </div>
                    <div>
                        <InputLabel forInput="expected_harvest_date" value="Estimasi Panen" />
                        <TextInput type="date" id="expected_harvest_date" value={data.expected_harvest_date} onChange={e => setData('expected_harvest_date', e.target.value)} className="mt-1 block w-full" />
                    </div>
                </div>

                <div>
                    <InputLabel forInput="notes" value="Catatan" />
                    <textarea id="notes" rows="3" value={data.notes} onChange={e => setData('notes', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                </div>

                {!isEdit && (
                    <div className="border-t pt-4">
                        <h3 className="text-lg font-medium">Alokasi ke Bedengan (Opsional)</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                                <SelectInput value={data.allocation_unit_id} onChange={e => setData('allocation_unit_id', e.target.value)} className="block w-full">
                                    <option value="">Pilih Bedengan</option>
                                    {units.map(u => <option key={u.id} value={u.id}>{u.unit_name}</option>)}
                                </SelectInput>
                            </div>
                            <div>
                                <TextInput type="number" placeholder="Jumlah" value={data.allocation_quantity} onChange={e => setData('allocation_quantity', e.target.value)} className="block w-full" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="rounded-md bg-green-600 px-4 py-2 text-white">
                        {isEdit ? 'Update' : 'Simpan Batch'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
