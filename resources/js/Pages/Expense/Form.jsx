import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CheckIcon,
    BanknotesIcon,
    TagIcon,
    CalendarDaysIcon,
    DocumentTextIcon,
    PaperClipIcon,
} from '@heroicons/react/24/outline';

export default function Form({ categories = [], expense }) {
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
            put(route('expenses.update', expense.id), {
                forceFormData: true,
            });
        } else {
            post(route('expenses.store'), {
                forceFormData: true,
            });
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Pengeluaran' : 'Tambah Pengeluaran'}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <BanknotesIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                {isEdit ? 'Edit Pengeluaran' : 'Tambah Pengeluaran'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Catat biaya operasional kebun, pembelian alat, bibit, pupuk, atau kebutuhan produksi.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('expenses.index')}
                        className="inline-flex items-center justify-center rounded-2xl border border-green-100 bg-white px-4 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-green-100 dark:hover:bg-white/20"
                    >
                        <ArrowLeftIcon className="mr-2 h-5 w-5" />
                        Kembali
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm dark:border-white/10 dark:bg-[#123D2A]"
                >
                    <div className="border-b border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10">
                        <h3 className="text-lg font-bold text-green-950 dark:text-white">
                            Informasi Pengeluaran
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                            Data ini digunakan untuk laporan laba rugi dan kontrol biaya produksi.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <FormSelect
                            id="expense_category_id"
                            label="Kategori"
                            value={data.expense_category_id}
                            error={errors.expense_category_id}
                            required
                            icon={TagIcon}
                            onChange={(value) => setData('expense_category_id', value)}
                            options={[
                                { value: '', label: 'Pilih Kategori' },
                                ...categories.map((category) => ({
                                    value: category.id,
                                    label: category.name || category.category_name,
                                })),
                            ]}
                        />

                        <FormInput
                            id="expense_date"
                            type="date"
                            label="Tanggal"
                            value={data.expense_date}
                            error={errors.expense_date}
                            required
                            icon={CalendarDaysIcon}
                            onChange={(value) => setData('expense_date', value)}
                        />

                        <FormInput
                            id="amount"
                            type="number"
                            label="Jumlah"
                            value={data.amount}
                            error={errors.amount}
                            required
                            icon={BanknotesIcon}
                            prefix="Rp"
                            placeholder="0"
                            onChange={(value) => setData('amount', value)}
                        />

                        <FormFile
                            id="receipt_file"
                            label="Bukti Transaksi"
                            error={errors.receipt_file}
                            onChange={(file) => setData('receipt_file', file)}
                        />

                        <div className="md:col-span-2">
                            <FormTextarea
                                id="description"
                                label="Deskripsi"
                                value={data.description}
                                error={errors.description}
                                required
                                icon={DocumentTextIcon}
                                placeholder="Contoh: Pembelian pupuk AB Mix, rockwool, pestisida, atau alat kebun."
                                onChange={(value) => setData('description', value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10 sm:flex-row sm:justify-end">
                        <Link
                            href={route('expenses.index')}
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
                            {processing
                                ? 'Menyimpan...'
                                : isEdit
                                    ? 'Update Pengeluaran'
                                    : 'Simpan Pengeluaran'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
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
    prefix,
    icon: Icon,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-semibold text-green-950 dark:text-green-50"
            >
                {label} {required && <span className="text-red-500 dark:text-red-300">*</span>}
            </label>

            <div
                className={`flex items-center rounded-2xl border bg-white px-3 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-300 dark:bg-[#0B2A1E] ${error
                        ? 'border-red-300 dark:border-red-400/40'
                        : 'border-green-100 dark:border-white/10'
                    }`}
            >
                {Icon && (
                    <Icon className="mr-2 h-5 w-5 shrink-0 text-green-700 dark:text-lime-400" />
                )}

                {prefix && (
                    <span className="mr-2 text-sm font-semibold text-gray-500 dark:text-green-100">
                        {prefix}
                    </span>
                )}

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

            {error && (
                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-300">
                    {error}
                </p>
            )}
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
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-semibold text-green-950 dark:text-green-50"
            >
                {label} {required && <span className="text-red-500 dark:text-red-300">*</span>}
            </label>

            <div
                className={`flex items-center rounded-2xl border bg-white px-3 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-300 dark:bg-[#0B2A1E] ${error
                        ? 'border-red-300 dark:border-red-400/40'
                        : 'border-green-100 dark:border-white/10'
                    }`}
            >
                {Icon && (
                    <Icon className="mr-2 h-5 w-5 shrink-0 text-green-700 dark:text-lime-400" />
                )}

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

            {error && (
                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-300">
                    {error}
                </p>
            )}
        </div>
    );
}

function FormTextarea({
    id,
    label,
    value,
    onChange,
    error,
    required = false,
    placeholder = '',
    icon: Icon,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-semibold text-green-950 dark:text-green-50"
            >
                {label} {required && <span className="text-red-500 dark:text-red-300">*</span>}
            </label>

            <div
                className={`flex rounded-2xl border bg-white px-3 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-300 dark:bg-[#0B2A1E] ${error
                        ? 'border-red-300 dark:border-red-400/40'
                        : 'border-green-100 dark:border-white/10'
                    }`}
            >
                {Icon && (
                    <Icon className="mr-2 mt-2 h-5 w-5 shrink-0 text-green-700 dark:text-lime-400" />
                )}

                <textarea
                    id={id}
                    rows="4"
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full resize-none border-0 bg-transparent px-1 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white dark:placeholder:text-green-200/60"
                />
            </div>

            {error && (
                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-300">
                    {error}
                </p>
            )}
        </div>
    );
}

function FormFile({ id, label, error, onChange }) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-semibold text-green-950 dark:text-green-50"
            >
                {label}
            </label>

            <label
                htmlFor={id}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 text-sm shadow-sm transition hover:bg-green-50 dark:bg-[#0B2A1E] dark:hover:bg-white/5 ${error
                        ? 'border-red-300 dark:border-red-400/40'
                        : 'border-green-100 dark:border-white/10'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-white/10 dark:text-lime-400">
                        <PaperClipIcon className="h-5 w-5" />
                    </div>

                    <div>
                        <p className="font-semibold text-green-950 dark:text-white">
                            Upload bukti
                        </p>
                        <p className="text-xs text-gray-500 dark:text-green-100">
                            JPG, PNG, atau PDF
                        </p>
                    </div>
                </div>

                <span className="rounded-xl bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-lime-400 dark:text-green-950">
                    Pilih File
                </span>

                <input
                    id={id}
                    type="file"
                    className="hidden"
                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                />
            </label>

            {error && (
                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-300">
                    {error}
                </p>
            )}
        </div>
    );
}
