import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';

export default function Form({ area }) {
    const isEdit = !!area;
    const { data, setData, post, put, processing, errors } = useForm({
        area_code: area?.area_code || '',
        area_name: area?.area_name || '',
        area_type: area?.area_type || '',
        length: area?.length || '',
        width: area?.width || '',
        description: area?.description || '',
        status: area?.status || 'active',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('growing-areas.update', area.id));
        } else {
            post(route('growing-areas.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Area Kebun' : 'Tambah Area Kebun'}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <div>
                    <InputLabel forInput="area_code" value="Kode Area" />
                    <TextInput
                        id="area_code"
                        value={data.area_code}
                        onChange={e => setData('area_code', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors.area_code} />
                </div>
                <div>
                    <InputLabel forInput="area_name" value="Nama Area" />
                    <TextInput
                        id="area_name"
                        value={data.area_name}
                        onChange={e => setData('area_name', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                </div>
                <div>
                    <InputLabel forInput="area_type" value="Tipe Area" />
                    <TextInput
                        id="area_type"
                        value={data.area_type}
                        onChange={e => setData('area_type', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel forInput="length" value="Panjang (meter)" />
                        <TextInput
                            type="number"
                            step="0.01"
                            value={data.length}
                            onChange={e => setData('length', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <InputLabel forInput="width" value="Lebar (meter)" />
                        <TextInput
                            type="number"
                            step="0.01"
                            value={data.width}
                            onChange={e => setData('width', e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <InputLabel forInput="description" value="Deskripsi" />
                    <textarea
                        id="description"
                        rows="3"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300"
                    />
                </div>
                <div>
                    <InputLabel forInput="status" value="Status" />
                    <SelectInput
                        id="status"
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
                    >
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
