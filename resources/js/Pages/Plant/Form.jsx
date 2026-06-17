import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CheckIcon,
    SparklesIcon,
    HashtagIcon,
    TagIcon,
    DocumentTextIcon,
    CalendarDaysIcon,
    AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

export default function Form({ plant }) {
    const isEdit = !!plant;

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
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <SparklesIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                {isEdit ? 'Edit Tanaman' : 'Tambah Tanaman'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Kelola data tanaman, kategori, dan estimasi masa budidaya.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('plants.index')}
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
                            Informasi Tanaman
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                            Data ini menjadi dasar untuk semai, pindah tanam, dan estimasi panen.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <FormInput
                            id="plant_code"
                            label="Kode Tanaman"
                            value={data.plant_code}
                            error={errors.plant_code}
                            required
                            icon={HashtagIcon}
                            placeholder="Contoh: PLT-001"
                            onChange={(value) => setData('plant_code', value)}
                        />

                        <FormInput
                            id="plant_name"
                            label="Nama Tanaman"
                            value={data.plant_name}
                            error={errors.plant_name}
                            required
                            icon={SparklesIcon}
                            placeholder="Contoh: Selada"
                            onChange={(value) => setData('plant_name', value)}
                        />

                        <FormSelect
                            id="category"
                            label="Kategori"
                            value={data.category}
                            error={errors.category}
                            icon={TagIcon}
                            onChange={(value) => setData('category', value)}
                            options={[
                                { value: '', label: 'Pilih Kategori' },
                                { value: 'Leaf', label: 'Daun' },
                                { value: 'Fruit', label: 'Buah' },
                                { value: 'Root', label: 'Umbi' },
                            ]}
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
                            <div className="rounded-3xl border border-green-100 bg-green-50 p-5 dark:border-white/10 dark:bg-[#0B2A1E]">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-green-700 dark:bg-white/10 dark:text-lime-400">
                                        <CalendarDaysIcon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-green-950 dark:text-white">
                                            Estimasi Hari Budidaya
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-green-100">
                                            Digunakan untuk menghitung jadwal pindah tanam dan panen.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <FormInput
                                        id="typical_seedling_days"
                                        type="number"
                                        label="Hari Semai"
                                        value={data.typical_seedling_days}
                                        error={errors.typical_seedling_days}
                                        placeholder="Contoh: 14"
                                        onChange={(value) => setData('typical_seedling_days', value)}
                                    />

                                    <FormInput
                                        id="typical_growth_days"
                                        type="number"
                                        label="Hari Tumbuh"
                                        value={data.typical_growth_days}
                                        error={errors.typical_growth_days}
                                        placeholder="Contoh: 21"
                                        onChange={(value) => setData('typical_growth_days', value)}
                                    />

                                    <FormInput
                                        id="typical_harvest_days"
                                        type="number"
                                        label="Hari Panen"
                                        value={data.typical_harvest_days}
                                        error={errors.typical_harvest_days}
                                        placeholder="Contoh: 35"
                                        onChange={(value) => setData('typical_harvest_days', value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <FormTextarea
                                id="description"
                                label="Deskripsi"
                                value={data.description}
                                error={errors.description}
                                icon={DocumentTextIcon}
                                placeholder="Contoh: Cocok untuk hidroponik NFT dan panen cepat."
                                onChange={(value) => setData('description', value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10 sm:flex-row sm:justify-end">
                        <Link
                            href={route('plants.index')}
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
                                    ? 'Update Tanaman'
                                    : 'Simpan Tanaman'}
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
