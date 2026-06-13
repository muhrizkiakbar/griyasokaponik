import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';

const activityTypes = [
    { value: 'watering', label: '💧 Penyiraman' },
    { value: 'fertilizing', label: '🌱 Pemupukan' },
    { value: 'spraying', label: '🧴 Penyemprotan' },
    { value: 'pruning', label: '✂️ Pemangkasan' },
    { value: 'ppm_check', label: '📊 Pengecekan PPM' },
    { value: 'ph_check', label: '🧪 Pengecekan pH' },
    { value: 'other', label: '📝 Lainnya' },
];

export default function Form({ batches, activity }) {
    const isEdit = !!activity;
    const { data, setData, post, put, processing, errors } = useForm({
        planting_batch_id: activity?.planting_batch_id || '',
        activity_type: activity?.activity_type || 'watering',
        activity_date: activity?.activity_date || new Date().toISOString().split('T')[0],
        description: activity?.description || '',
        cost: activity?.cost || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('maintenance.update', activity.id));
        } else {
            post(route('maintenance.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Perawatan' : 'Catat Perawatan'}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <div>
                    <InputLabel forInput="planting_batch_id" value="Batch Tanaman" />
                    <SelectInput value={data.planting_batch_id} onChange={e => setData('planting_batch_id', e.target.value)} required>
                        <option value="">Pilih Batch</option>
                        {batches.map(batch => (
                            <option key={batch.id} value={batch.id}>
                                {batch.batch_code} - {batch.plant_variety?.plant?.plant_name} ({batch.current_stage})
                            </option>
                        ))}
                    </SelectInput>
                    <InputError message={errors.planting_batch_id} />
                </div>
                <div>
                    <InputLabel forInput="activity_type" value="Jenis Perawatan" />
                    <SelectInput value={data.activity_type} onChange={e => setData('activity_type', e.target.value)} required>
                        {activityTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </SelectInput>
                </div>
                <div>
                    <InputLabel forInput="activity_date" value="Tanggal" />
                    <TextInput type="date" value={data.activity_date} onChange={e => setData('activity_date', e.target.value)} required />
                </div>
                <div>
                    <InputLabel forInput="description" value="Deskripsi" />
                    <textarea rows="3" value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300" placeholder="Contoh: Pupuk NPK 500g, atau penyemprotan pestisida..." />
                </div>
                <div>
                    <InputLabel forInput="cost" value="Biaya (Rp)" />
                    <TextInput type="number" step="0.01" value={data.cost} onChange={e => setData('cost', e.target.value)} placeholder="0" />
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
