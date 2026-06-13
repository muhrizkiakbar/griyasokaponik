import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';

export default function Form({ categories, expense }) {
    const isEdit = !!expense;
    const { data, setData, post, put, processing, errors } = useForm({
        expense_category_id: expense?.expense_category_id || '',
        expense_date: expense?.expense_date || new Date().toISOString().split('T')[0],
        description: expense?.description || '',
        amount: expense?.amount || '',
        receipt_file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('expenses.update', expense.id));
        } else {
            post(route('expenses.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Pengeluaran' : 'Tambah Pengeluaran'}>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl" encType="multipart/form-data">
                <div>
                    <InputLabel forInput="expense_category_id" value="Kategori" />
                    <SelectInput value={data.expense_category_id} onChange={e => setData('expense_category_id', e.target.value)} required>
                        <option value="">Pilih Kategori</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </SelectInput>
                </div>
                <div>
                    <InputLabel forInput="expense_date" value="Tanggal" />
                    <TextInput type="date" value={data.expense_date} onChange={e => setData('expense_date', e.target.value)} required />
                </div>
                <div>
                    <InputLabel forInput="description" value="Deskripsi" />
                    <TextInput value={data.description} onChange={e => setData('description', e.target.value)} required />
                </div>
                <div>
                    <InputLabel forInput="amount" value="Jumlah (Rp)" />
                    <TextInput type="number" value={data.amount} onChange={e => setData('amount', e.target.value)} required />
                </div>
                <div>
                    <InputLabel forInput="receipt_file" value="Bukti Transaksi" />
                    <input type="file" onChange={e => setData('receipt_file', e.target.files[0])} />
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="bg-green-600 text-white px-4 py-2 rounded">Simpan</button>
                </div>
            </form>
        </AppLayout>
    );
}
