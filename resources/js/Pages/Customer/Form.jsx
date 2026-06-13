import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CheckIcon,
    UserGroupIcon,
    IdentificationIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';

export default function Form({ customer }) {
    const isEdit = !!customer;

    const { data, setData, post, put, processing, errors } = useForm({
        customer_code: customer?.customer_code || '',
        name: customer?.name || '',
        phone: customer?.phone || '',
        email: customer?.email || '',
        address: customer?.address || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('customers.update', customer.id));
        } else {
            post(route('customers.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Customer' : 'Tambah Customer'}>
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700">
                            <UserGroupIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950">
                                {isEdit ? 'Edit Customer' : 'Tambah Customer'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Lengkapi data pembeli atau pelanggan hasil panen.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('customers.index')}
                        className="inline-flex items-center justify-center rounded-2xl border border-green-100 bg-white px-4 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50"
                    >
                        <ArrowLeftIcon className="mr-2 h-5 w-5" />
                        Kembali
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm"
                >
                    <div className="border-b border-green-100 bg-green-50 px-6 py-5">
                        <h3 className="text-lg font-bold text-green-950">
                            Informasi Customer
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Data ini digunakan pada transaksi penjualan hasil panen.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <FormInput
                            id="customer_code"
                            label="Kode Customer"
                            value={data.customer_code}
                            error={errors.customer_code}
                            required
                            icon={IdentificationIcon}
                            placeholder="Contoh: CUS-001"
                            onChange={(value) => setData('customer_code', value)}
                        />

                        <FormInput
                            id="name"
                            label="Nama Customer"
                            value={data.name}
                            error={errors.name}
                            required
                            icon={UserGroupIcon}
                            placeholder="Contoh: Warung Berkah"
                            onChange={(value) => setData('name', value)}
                        />

                        <FormInput
                            id="phone"
                            label="Telepon"
                            value={data.phone}
                            error={errors.phone}
                            icon={PhoneIcon}
                            placeholder="Contoh: 0812xxxxxxxx"
                            onChange={(value) => setData('phone', value)}
                        />

                        <FormInput
                            id="email"
                            type="email"
                            label="Email"
                            value={data.email}
                            error={errors.email}
                            icon={EnvelopeIcon}
                            placeholder="customer@email.com"
                            onChange={(value) => setData('email', value)}
                        />

                        <div className="md:col-span-2">
                            <FormTextarea
                                id="address"
                                label="Alamat"
                                value={data.address}
                                error={errors.address}
                                icon={MapPinIcon}
                                placeholder="Masukkan alamat customer"
                                onChange={(value) => setData('address', value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-green-100 bg-green-50 px-6 py-5 sm:flex-row sm:justify-end">
                        <Link
                            href={route('customers.index')}
                            className="inline-flex items-center justify-center rounded-2xl border border-green-100 bg-white px-5 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition hover:bg-green-50"
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
                                    ? 'Update Customer'
                                    : 'Simpan Customer'}
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
    icon: Icon,
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-green-950">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div
                className={`flex items-center rounded-2xl border bg-white px-3 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-300 ${error ? 'border-red-300' : 'border-green-100'
                    }`}
            >
                {Icon && (
                    <Icon className="mr-2 h-5 w-5 shrink-0 text-green-700" />
                )}

                <input
                    id={id}
                    type={type}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full border-0 bg-transparent px-1 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0"
                />
            </div>

            {error && (
                <p className="mt-2 text-sm font-medium text-red-600">
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
    placeholder = '',
    icon: Icon,
}) {
    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-semibold text-green-950">
                {label}
            </label>

            <div
                className={`flex rounded-2xl border bg-white px-3 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-300 ${error ? 'border-red-300' : 'border-green-100'
                    }`}
            >
                {Icon && (
                    <Icon className="mr-2 mt-2 h-5 w-5 shrink-0 text-green-700" />
                )}

                <textarea
                    id={id}
                    rows="4"
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full resize-none border-0 bg-transparent px-1 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0"
                />
            </div>

            {error && (
                <p className="mt-2 text-sm font-medium text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}
