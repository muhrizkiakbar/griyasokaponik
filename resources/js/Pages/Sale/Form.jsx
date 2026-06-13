import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';

export default function Create({ customers, harvests }) {
    const { data, setData, post, processing, errors } = useForm({
        sale_number: '',
        customer_id: '',
        sale_date: new Date().toISOString().split('T')[0],
        items: [{ harvest_id: '', quantity: 1, price: 0 }],
        discount: 0,
        payment_status: 'belum bayar',
        notes: '',
    });

    const addItem = () => {
        setData('items', [...data.items, { harvest_id: '', quantity: 1, price: 0 }]);
    };
    const removeItem = (index) => {
        const newItems = data.items.filter((_, i) => i !== index);
        setData('items', newItems);
    };
    const updateItem = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;
        if (field === 'harvest_id') {
            const selected = harvests.find(h => h.id == value);
            if (selected) newItems[index].price = selected.price || 0;
        }
        setData('items', newItems);
    };

    const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const grandTotal = subtotal - data.discount;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('sales.store'));
    };

    return (
        <AppLayout title="Tambah Penjualan">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel forInput="sale_number" value="Nomor Penjualan" />
                        <TextInput value={data.sale_number} onChange={e => setData('sale_number', e.target.value)} className="mt-1 block w-full" required />
                        <InputError message={errors.sale_number} />
                    </div>
                    <div>
                        <InputLabel forInput="sale_date" value="Tanggal" />
                        <TextInput type="date" value={data.sale_date} onChange={e => setData('sale_date', e.target.value)} className="mt-1 block w-full" required />
                    </div>
                </div>
                <div>
                    <InputLabel forInput="customer_id" value="Customer" />
                    <SelectInput value={data.customer_id} onChange={e => setData('customer_id', e.target.value)} className="mt-1 block w-full" required>
                        <option value="">Pilih Customer</option>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </SelectInput>
                </div>

                <div className="border p-4 rounded">
                    <h3 className="text-md font-medium">Item Penjualan</h3>
                    {data.items.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-2 mt-2 items-end">
                            <div>
                                <SelectInput value={item.harvest_id} onChange={e => updateItem(idx, 'harvest_id', e.target.value)}>
                                    <option value="">Pilih Hasil Panen</option>
                                    {harvests.map(h => (
                                        <option key={h.id} value={h.id}>
                                            {h.planting_batch?.batch_code} - {h.quantity} {h.unit} ({h.grade})
                                        </option>
                                    ))}
                                </SelectInput>
                            </div>
                            <div><TextInput type="number" value={item.quantity} onChange={e => updateItem(idx, 'quantity', e.target.value)} placeholder="Qty" /></div>
                            <div><TextInput type="number" value={item.price} onChange={e => updateItem(idx, 'price', e.target.value)} placeholder="Harga" /></div>
                            <div><button type="button" onClick={() => removeItem(idx)} className="text-red-600">Hapus</button></div>
                        </div>
                    ))}
                    <button type="button" onClick={addItem} className="mt-2 text-sm text-green-600">+ Tambah Item</button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <InputLabel forInput="discount" value="Diskon" />
                        <TextInput type="number" value={data.discount} onChange={e => setData('discount', e.target.value)} className="mt-1 block w-full" />
                    </div>
                    <div>
                        <InputLabel forInput="payment_status" value="Status Pembayaran" />
                        <SelectInput value={data.payment_status} onChange={e => setData('payment_status', e.target.value)}>
                            <option value="belum bayar">Belum Bayar</option>
                            <option value="DP">DP</option>
                            <option value="lunas">Lunas</option>
                        </SelectInput>
                    </div>
                </div>
                <div className="bg-gray-50 p-4 rounded text-right">
                    <p>Subtotal: Rp {formatNumber(subtotal)}</p>
                    <p>Grand Total: Rp {formatNumber(grandTotal)}</p>
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="bg-green-600 text-white px-4 py-2 rounded">Simpan Penjualan</button>
                </div>
            </form>
        </AppLayout>
    );
}

function formatNumber(value) {
    return new Intl.NumberFormat('id-ID').format(value);
}
