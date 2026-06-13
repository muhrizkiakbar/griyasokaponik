import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CheckIcon,
    CubeIcon,
    SparklesIcon,
    BuildingStorefrontIcon,
    ScaleIcon,
    DocumentTextIcon,
    AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

export default function Form({ plants = [], variety }) {
    const isEdit = !!variety;

    const { data, setData, post, put, processing, errors } = useForm({
        plant_id: variety?.plant_id || '',
        variety_name: variety?.variety_name || '',
        seed_brand: variety?.seed_brand || '',
        expected_yield_per_unit: variety?.expected_yield_per_unit || '',
        notes: variety?.notes || '',
        status: variety?.status || 'active',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('plant-varieties.update', variety.id));
        } else {
            post(route('plant-varieties.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Varietas Tanaman' : 'Tambah Varietas Tanaman'}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <CubeIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                {isEdit ? 'Edit Varietas Tanaman' : 'Tambah Varietas Tanaman'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Kelola varietas, merek benih, dan estimasi hasil per tanaman.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('plant-varieties.index')}
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
                            Informasi Varietas
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                            Data ini digunakan untuk menentukan detail batch semai dan estimasi produktivitas.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <FormSelect
                            id="plant_id"
                            label="Tanaman"
                            value={data.plant_id}
                            error={errors.plant_id}
                            required
                            icon={SparklesIcon}
                            onChange={(value) => setData('plant_id', value)}
                            options={[
                                { value: '', label: 'Pilih Tanaman' },
                                ...plants.map((plant) => ({
                                    value: plant.id,
                                    label: plant.plant_name,
                                })),
                            ]}
                        />

                        <FormInput
                            id="variety_name"
                            label="Nama Varietas"
                            value={data.variety_name}
                            error={errors.variety_name}
                            required
                            icon={CubeIcon}
                            placeholder="Contoh: Grand Rapids"
                            onChange={(value) => setData('variety_name', value)}
                        />

                        <FormInput
                            id="seed_brand"
                            label="Merek Benih"
                            value={data.seed_brand}
                            error={errors.seed_brand}
                            icon={BuildingStorefrontIcon}
                            placeholder="Contoh: Known You Seed"
                            onChange={(value) => setData('seed_brand', value)}
                        />

                        <FormInput
                            id="expected_yield_per_unit"
                            type="number"
                            step="0.01"
                            label="Estimasi Hasil"
                            value={data.expected_yield_per_unit}
                            error={errors.expected_yield_per_unit}
                            icon={ScaleIcon}
                            placeholder="Contoh: 0.25"
                            suffix="kg/unit"
                            onChange={(value) => setData('expected_yield_per_unit', value)}
                        />

                        <FormSelect
                            id="status"
                            label="Status"
                            value={data.status}
                            error={errors.status}
                            icon={AdjustmentsHorizontalIcon}
                            onChange={(value) => setData('status', value)}
                            options={[
                                { value: 'active', label: 'Aktif' },
                                { value: 'inactive', label: 'Nonaktif' },
                            ]}
                        />

                        <div className="md:col-span-2">
                            <FormTextarea
                                id="notes"
                                label="Catatan"
                                value={data.notes}
                                error={errors.notes}
                                icon={DocumentTextIcon}
                                placeholder="Contoh: Cocok untuk hidroponik NFT, panen cepat, daun renyah."
                                onChange={(value) => setData('notes', value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10 sm:flex-row sm:justify-end">
                        <Link
                            href={route('plant-varieties.index')}
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
                                    ? 'Update Varietas'
                                    : 'Simpan Varietas'}
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
    step,
    required = false,
    placeholder = '',
    suffix,
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

                <input
                    id={id}
                    type={type}
                    step={step}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className="block w-full border-0 bg-transparent px-1 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white dark:placeholder:text-green-200/60"
                />

                {suffix && (
                    <span className="ml-2 whitespace-nowrap text-xs font-semibold text-gray-500 dark:text-green-100">
                        {suffix}
                    </span>
                )}
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
                    value={dataValue(value)}
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
    placeholder = '',
    icon: Icon,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-semibold text-green-950 dark:text-green-50"
            >
                {label}
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

function dataValue(value) {
    return value === null || value === undefined ? '' : value;
}
