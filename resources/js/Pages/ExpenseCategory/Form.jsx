import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Form({ category }) {
    const isEdit = !!category;
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('expense-categories.update', category.id));
        } else {
            post(route('expense-categories.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Kategori' : 'Tambah Kategori'}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <div>
                    <InputLabel forInput="name" value="Nama Kategori" />
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors.name} />
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
