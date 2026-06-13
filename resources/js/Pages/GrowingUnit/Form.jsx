import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';

export default function Form({ areas, unit }) {
    const isEdit = !!unit;
    const { data, setData, post, put, processing, errors } = useForm({
        growing_area_id: unit?.growing_area_id || '',
        unit_code: unit?.unit_code || '',
        unit_name: unit?.unit_name || '',
        capacity: unit?.capacity || '',
        unit_type: unit?.unit_type || '',
        status: unit?.status || 'active',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('growing-units.update', unit.id));
        } else {
            post(route('growing-units.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Bedengan' : 'Tambah Bedengan'}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <div>
                    <InputLabel forInput="growing_area_id" value="Area Kebun" />
                    <SelectInput
                        id="growing_area_id"
                        value={data.growing_area_id}
                        onChange={e => setData('growing_area_id', e.target.value)}
                        required
                    >
                        <option value="">Pilih Area</option>
                        {areas.map(area => <option key={area.id} value={area.id}>{area.area_name}</option>)}
                    </SelectInput>
                </div>
                <div>
                    <InputLabel forInput="unit_code" value="Kode Unit" />
                    <TextInput value={data.unit_code} onChange={e => setData('unit_code', e.target.value)} required />
                </div>
                <div>
                    <InputLabel forInput="unit_name" value="Nama Unit" />
                    <TextInput value={data.unit_name} onChange={e => setData('unit_name', e.target.value)} required />
                </div>
                <div>
                    <InputLabel forInput="capacity" value="Kapasitas (jumlah tanaman)" />
                    <TextInput type="number" value={data.capacity} onChange={e => setData('capacity', e.target.value)} required />
                </div>
                <div>
                    <InputLabel forInput="unit_type" value="Tipe Unit" />
                    <TextInput value={data.unit_type} onChange={e => setData('unit_type', e.target.value)} required />
                </div>
                <div>
                    <InputLabel forInput="status" value="Status" />
                    <SelectInput value={data.status} onChange={e => setData('status', e.target.value)}>
                        <option value="active">Aktif</option>
                        <option value="inactive">Nonaktif</option>
                    </SelectInput>
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
