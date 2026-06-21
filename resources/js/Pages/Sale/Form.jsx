import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CheckIcon,
    PlusIcon,
    TrashIcon,
    ShoppingCartIcon,
    HashtagIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    CubeIcon,
    BanknotesIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';
import SearchableSelect from '@/Components/SearchableSelect';

export default function Create({ customers = [], harvests = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        sale_number: '',
        customer_id: '',
        sale_date: new Date().toISOString().split('T')[0],
        items: [{ harvest_id: '', quantity: 1, price: 0 }],
        discount: 0,
        paid_amount: 0,
        payment_status: 'belum bayar',
        notes: '',
    });

    const subtotal = data.items.reduce((sum, item) => {
        return sum + Number(item.quantity || 0) * Number(item.price || 0);
    }, 0);

    const grandTotal = Math.max(subtotal - Number(data.discount || 0), 0);

    const paidAmount =
        data.payment_status === 'lunas'
            ? grandTotal
            : data.payment_status === 'belum bayar'
                ? 0
                : Number(data.paid_amount || 0);

    const remainingAmount = Math.max(grandTotal - paidAmount, 0);

    const addItem = () => {
        setData('items', [
            ...data.items,
            { harvest_id: '', quantity: 1, price: 0 },
        ]);
    };

    const removeItem = (index) => {
        if (data.items.length === 1) return;

        setData(
            'items',
            data.items.filter((_, i) => i !== index)
        );
    };

    const updateItem = (index, field, value) => {
        const newItems = [...data.items];

        newItems[index][field] = value;

        if (field === 'harvest_id') {
            const selected = harvests.find((h) => h.id == value);

            if (selected) {
                newItems[index].price = selected.price || 0;
            }
        }

        setData('items', newItems);
    };

    const handlePaymentStatusChange = (value) => {
        setData((previous) => ({
            ...previous,
            payment_status: value,
            paid_amount:
                value === 'lunas'
                    ? grandTotal
                    : value === 'belum bayar'
                        ? 0
                        : previous.paid_amount,
        }));
    };

    const handlePaidAmountChange = (value) => {
        const amount = Math.min(Number(value || 0), grandTotal);
        setData('paid_amount', amount);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setData((previous) => ({
            ...previous,
            paid_amount: paidAmount,
        }));

        post(route('sales.store'));
    };

    return (
        <AppLayout title="Tambah Penjualan">
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <ShoppingCartIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                Tambah Penjualan
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Catat transaksi penjualan hasil panen kebun.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('sales.index')}
                        className="inline-flex items-center justify-center rounded-2xl border border-green-100 bg-white px-4 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-green-100 dark:hover:bg-white/20"
                    >
                        <ArrowLeftIcon className="mr-2 h-5 w-5" />
                        Kembali
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm dark:border-white/10 dark:bg-[#123D2A]"
                >
                    <div className="border-b border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10">
                        <h3 className="text-lg font-bold text-green-950 dark:text-white">
                            Informasi Transaksi
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                            Jika status DP atau Belum Bayar, transaksi bisa dilunasi nanti.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <FormInput
                            id="sale_number"
                            label="Nomor Penjualan"
                            value={data.sale_number}
                            error={errors.sale_number}
                            required
                            icon={HashtagIcon}
                            placeholder="Contoh: SALE-001"
                            onChange={(value) => setData('sale_number', value)}
                        />

                        <FormInput
                            id="sale_date"
                            type="date"
                            label="Tanggal"
                            value={data.sale_date}
                            error={errors.sale_date}
                            required
                            icon={CalendarDaysIcon}
                            onChange={(value) => setData('sale_date', value)}
                        />

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-green-950 dark:text-green-50">
                                Customer
                                <span className="text-red-500 dark:text-red-300"> *</span>
                            </label>

                            <SearchableSelect
                                value={data.customer_id}
                                options={customers.map((customer) => ({
                                    id: customer.id,
                                    label: customer.name + " - " + customer.phone,
                                }))}
                                labelKey="label"
                                valueKey="id"
                                required
                                placeholder="Cari customer..."
                                className="w-full"
                                onChange={(e) => setData('customer_id', e.target.value)}
                            />

                            {errors.customer_id && (
                                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-300">
                                    {errors.customer_id}
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <div className="rounded-3xl border border-green-100 bg-green-50 p-5 dark:border-white/10 dark:bg-[#0B2A1E]">
                                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-green-700 dark:bg-white/10 dark:text-lime-400">
                                            <CubeIcon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-green-950 dark:text-white">
                                                Item Penjualan
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-green-100">
                                                Pilih hasil panen, jumlah, dan harga jual.
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                                    >
                                        <PlusIcon className="mr-2 h-5 w-5" />
                                        Tambah Item
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {data.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#123D2A]"
                                        >
                                            <div className="grid gap-4 lg:grid-cols-12">
                                                <div className="lg:col-span-5">
                                                    <FormSelect
                                                        id={`harvest_id_${idx}`}
                                                        label="Hasil Panen"
                                                        value={item.harvest_id}
                                                        icon={CubeIcon}
                                                        onChange={(value) =>
                                                            updateItem(idx, 'harvest_id', value)
                                                        }
                                                        options={[
                                                            { value: '', label: 'Pilih Hasil Panen' },
                                                            ...harvests.map((h) => ({
                                                                value: h.id,
                                                                label: `${h.planting_batch?.batch_code || '-'} - ${h.quantity} ${h.unit} (${h.grade})`,
                                                            })),
                                                        ]}
                                                    />
                                                </div>

                                                <div className="lg:col-span-2">
                                                    <FormInput
                                                        id={`quantity_${idx}`}
                                                        type="number"
                                                        label="Qty"
                                                        value={item.quantity}
                                                        icon={CubeIcon}
                                                        onChange={(value) =>
                                                            updateItem(idx, 'quantity', value)
                                                        }
                                                    />
                                                </div>

                                                <div className="lg:col-span-3">
                                                    <FormInput
                                                        id={`price_${idx}`}
                                                        type="number"
                                                        label="Harga"
                                                        value={item.price}
                                                        icon={BanknotesIcon}
                                                        onChange={(value) =>
                                                            updateItem(idx, 'price', value)
                                                        }
                                                    />
                                                </div>

                                                <div className="flex items-end lg:col-span-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(idx)}
                                                        disabled={data.items.length === 1}
                                                        className="inline-flex w-full items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                                                    >
                                                        <TrashIcon className="mr-2 h-5 w-5" />
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <FormInput
                            id="discount"
                            type="number"
                            label="Diskon"
                            value={data.discount}
                            error={errors.discount}
                            icon={BanknotesIcon}
                            onChange={(value) => setData('discount', value)}
                        />

                        <FormSelect
                            id="payment_status"
                            label="Status Pembayaran"
                            value={data.payment_status}
                            error={errors.payment_status}
                            icon={BanknotesIcon}
                            onChange={handlePaymentStatusChange}
                            options={[
                                { value: 'lunas', label: 'Lunas' },
                                { value: 'belum bayar', label: 'Belum Bayar / Belum Lunas' },
                                { value: 'DP', label: 'DP' },
                            ]}
                        />

                        {data.payment_status === 'DP' && (
                            <FormInput
                                id="paid_amount"
                                type="number"
                                label="Nominal DP"
                                value={data.paid_amount}
                                error={errors.paid_amount}
                                icon={BanknotesIcon}
                                placeholder="Contoh: 50000"
                                onChange={handlePaidAmountChange}
                            />
                        )}

                        {data.payment_status === 'belum bayar' && (
                            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 dark:border-amber-400/20 dark:bg-amber-500/10">
                                <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                                    Transaksi belum lunas. Pelunasan bisa dilakukan nanti dari halaman daftar/detail penjualan.
                                </p>
                            </div>
                        )}

                        <div className="md:col-span-2">
                            <FormTextarea
                                id="notes"
                                label="Catatan"
                                value={data.notes}
                                error={errors.notes}
                                icon={DocumentTextIcon}
                                placeholder="Tambahkan catatan transaksi jika diperlukan."
                                onChange={(value) => setData('notes', value)}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <div className="rounded-3xl border border-green-100 bg-green-50 p-5 dark:border-white/10 dark:bg-[#0B2A1E]">
                                <div className="grid gap-4 md:grid-cols-5">
                                    <SummaryItem label="Subtotal" value={subtotal} />
                                    <SummaryItem label="Diskon" value={data.discount} />
                                    <SummaryItem label="Grand Total" value={grandTotal} />
                                    <SummaryItem label="Dibayar" value={paidAmount} />
                                    <SummaryItem label="Sisa Bayar" value={remainingAmount} highlight />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10 sm:flex-row sm:justify-end">
                        <Link
                            href={route('sales.index')}
                            className="inline-flex items-center justify-center rounded-2xl border border-green-100 bg-white px-5 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-green-100 dark:hover:bg-white/20"
                        >
                            Batal
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center rounded-2xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <CheckIcon className="mr-2 h-5 w-5" />
                            {processing ? 'Menyimpan...' : 'Simpan Penjualan'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

function SummaryItem({ label, value, highlight = false }) {
    return (
        <div
            className={`rounded-2xl p-4 ${highlight
                ? 'bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 text-white'
                : 'border border-green-100 bg-white dark:border-white/10 dark:bg-[#123D2A]'
                }`}
        >
            <p className={`text-sm font-medium ${highlight ? 'text-green-50' : 'text-gray-500 dark:text-green-100'}`}>
                {label}
            </p>

            <p className={`mt-2 text-xl font-extrabold ${highlight ? 'text-white' : 'text-green-950 dark:text-white'}`}>
                Rp {formatNumber(value || 0)}
            </p>
        </div>
    );
}

function FormInput({
    id,
    label,
    value,
    onChange,
    error,
    type = 'text',
    required = false,
    placeholder = '',
    icon: Icon,
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-green-950 dark:text-green-50">
                {label} {required && <span className="text-red-500 dark:text-red-300">*</span>}
            </label>

            <div className={`flex items-center rounded-2xl border bg-white px-3 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-300 dark:bg-[#0B2A1E] ${error ? 'border-red-300 dark:border-red-400/40' : 'border-green-100 dark:border-white/10'}`}>
                {Icon && <Icon className="mr-2 h-5 w-5 shrink-0 text-green-700 dark:text-lime-400" />}

                <input
                    id={id}
                    type={type}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full border-0 bg-transparent px-1 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white dark:placeholder:text-green-200/60"
                />
            </div>

            {error && <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-300">{error}</p>}
        </div>
    );
}

function FormSelect({
    id,
    label,
    value,
    onChange,
    error,
    options = [],
    icon: Icon,
    required = false,
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-green-950 dark:text-green-50">
                {label} {required && <span className="text-red-500 dark:text-red-300">*</span>}
            </label>

            <div className={`flex items-center rounded-2xl border bg-white px-3 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-300 dark:bg-[#0B2A1E] ${error ? 'border-red-300 dark:border-red-400/40' : 'border-green-100 dark:border-white/10'}`}>
                {Icon && <Icon className="mr-2 h-5 w-5 shrink-0 text-green-700 dark:text-lime-400" />}

                <select
                    id={id}
                    value={value ?? ''}
                    required={required}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full border-0 bg-transparent px-1 py-3 text-sm text-gray-900 focus:ring-0 dark:text-white"
                >
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-white text-gray-900 dark:bg-[#0B2A1E] dark:text-white"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-300">{error}</p>}
        </div>
    );
}

function FormTextarea({
    id,
    label,
    value,
    onChange,
    error,
    placeholder = '',
    icon: Icon,
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-green-950 dark:text-green-50">
                {label}
            </label>

            <div className={`flex rounded-2xl border bg-white px-3 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-300 dark:bg-[#0B2A1E] ${error ? 'border-red-300 dark:border-red-400/40' : 'border-green-100 dark:border-white/10'}`}>
                {Icon && <Icon className="mr-2 mt-2 h-5 w-5 shrink-0 text-green-700 dark:text-lime-400" />}

                <textarea
                    id={id}
                    rows="4"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full resize-none border-0 bg-transparent px-1 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white dark:placeholder:text-green-200/60"
                />
            </div>

            {error && <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-300">{error}</p>}
        </div>
    );
}

function formatNumber(value) {
    return new Intl.NumberFormat('id-ID').format(value);
}
