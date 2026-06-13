import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import SearchableSelect from '@/Components/SearchableSelect';
import InputError from '@/Components/InputError';

export default function Form({ batches, selectedBatch, harvest }) {
    const isEdit = !!harvest;
    const { data, setData, post, put, processing, errors } = useForm({
        planting_batch_id: harvest?.planting_batch_id || selectedBatch?.id || '',
        harvest_date: harvest?.harvest_date || new Date().toISOString().split('T')[0],
        quantity: harvest?.quantity || '',
        unit: harvest?.unit || 'kg',
        grade: harvest?.grade || 'Grade A',
        notes: harvest?.notes || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('harvests.update', harvest.id));
        } else {
            post(route('harvests.store'));
        }
    };

    // Siapkan options untuk SearchableSelect
    const batchOptions = batches.map(batch => ({
        id: batch.id,
        label: `${batch.batch_code} - ${batch.plant_variety?.plant?.plant_name} (${batch.plant_variety?.variety_name}) - Estimasi: ${batch.expected_harvest_date}`,
        value: batch.id,
    }));

    return (
        <AppLayout title={isEdit ? 'Edit Panen' : 'Catat Panen'}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <div>
                    <InputLabel forInput="planting_batch_id" value="Batch Tanaman" />
                    <SearchableSelect
                        options={batchOptions}
                        value={data.planting_batch_id}
                        onChange={(e) => setData('planting_batch_id', e.target.value)}
                        placeholder="Cari atau pilih batch yang akan dipanen..."
                        required
                    />
                    <InputError message={errors.planting_batch_id} />
                    {data.planting_batch_id && (
                        <p className="mt-1 text-xs text-gray-500">
                            Batch yang ditampilkan hanya yang sudah lewat jadwal panen lebih dari 5 hari.
                        </p>
                    )}
                </div>
                <div>
                    <InputLabel forInput="harvest_date" value="Tanggal Panen" />
                    <TextInput type="date" value={data.harvest_date} onChange={e => setData('harvest_date', e.target.value)} required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <InputLabel forInput="quantity" value="Jumlah" />
                        <TextInput type="number" step="0.01" value={data.quantity} onChange={e => setData('quantity', e.target.value)} required />
                    </div>
                    <div>
                        <InputLabel forInput="unit" value="Satuan" />
                        <SelectInput value={data.unit} onChange={e => setData('unit', e.target.value)}>
                            <option value="kg">kg</option>
                            <option value="gram">gram</option>
                            <option value="pcs">pcs</option>
                            <option value="ikat">ikat</option>
                        </SelectInput>
                    </div>
                    <div>
                        <InputLabel forInput="grade" value="Grade" />
                        <SelectInput value={data.grade} onChange={e => setData('grade', e.target.value)}>
                            <option value="Grade A">Grade A</option>
                            <option value="Grade B">Grade B</option>
                            <option value="Reject">Reject</option>
                        </SelectInput>
                    </div>
                </div>
                <div>
                    <InputLabel forInput="notes" value="Catatan" />
                    <textarea rows="2" value={data.notes} onChange={e => setData('notes', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="bg-green-600 text-white px-4 py-2 rounded">
                        {isEdit ? 'Update' : 'Simpan'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
