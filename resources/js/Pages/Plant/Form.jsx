import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

export default function Form({ plant }) {
    const { data, setData, post, put, processing, errors } = useForm({
        plant_code: plant?.plant_code || '',
        plant_name: plant?.plant_name || '',
        category: plant?.category || '',
        description: plant?.description || '',
        typical_seedling_days: plant?.typical_seedling_days || '',
        typical_growth_days: plant?.typical_growth_days || '',
        typical_harvest_days: plant?.typical_harvest_days || '',
        status: plant?.status || 'active',
    });

    const isEdit = !!plant;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('plants.update', plant.id));
        } else {
            post(route('plants.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Tanaman' : 'Tambah Tanaman'}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <div>
                    <InputLabel forInput="plant_code" value="Kode Tanaman" />
                    <TextInput id="plant_code" type="text" value={data.plant_code} onChange={e => setData('plant_code', e.target.value)} className="mt-1 block w-full" required />
                    <InputError message={errors.plant_code} />
                </div>
                <div>
                    <InputLabel forInput="plant_name" value="Nama Tanaman" />
                    <TextInput id="plant_name" type="text" value={data.plant_name} onChange={e => setData('plant_name', e.target.value)} className="mt-1 block w-full" required />
                    <InputError message={errors.plant_name} />
                </div>
                <div>
                    <InputLabel forInput="category" value="Kategori" />
                    <SelectInput id="category" value={data.category} onChange={e => setData('category', e.target.value)} className="mt-1 block w-full">
                        <option value="">Pilih Kategori</option>
                        <option value="Leaf">Daun</option>
                        <option value="Fruit">Buah</option>
                        <option value="Root">Umbi</option>
                    </SelectInput>
                    <InputError message={errors.category} />
                </div>
                <div>
                    <InputLabel forInput="description" value="Deskripsi" />
                    <textarea id="description" rows="3" value={data.description} onChange={e => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <InputLabel forInput="typical_seedling_days" value="Hari Semai" />
                        <TextInput type="number" value={data.typical_seedling_days} onChange={e => setData('typical_seedling_days', e.target.value)} className="mt-1 block w-full" />
                    </div>
                    <div>
                        <InputLabel forInput="typical_growth_days" value="Hari Tumbuh" />
                        <TextInput type="number" value={data.typical_growth_days} onChange={e => setData('typical_growth_days', e.target.value)} className="mt-1 block w-full" />
                    </div>
                    <div>
                        <InputLabel forInput="typical_harvest_days" value="Hari Panen" />
                        <TextInput type="number" value={data.typical_harvest_days} onChange={e => setData('typical_harvest_days', e.target.value)} className="mt-1 block w-full" />
                    </div>
                </div>
                <div>
                    <InputLabel forInput="status" value="Status" />
                    <SelectInput id="status" value={data.status} onChange={e => setData('status', e.target.value)} className="mt-1 block w-full">
                        <option value="active">Aktif</option>
                        <option value="inactive">Nonaktif</option>
                    </SelectInput>
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                        {isEdit ? 'Update' : 'Simpan'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
