import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CheckIcon,
    MapIcon,
    HashtagIcon,
    Squares2X2Icon,
    ArrowsPointingOutIcon,
    DocumentTextIcon,
    AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';

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
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <MapIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                {isEdit ? 'Edit Area Kebun' : 'Tambah Area Kebun'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Kelola lokasi kebun seperti greenhouse, lahan outdoor, atau nursery.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('growing-areas.index')}
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
                            Informasi Area
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                            Data ini digunakan untuk mengelompokkan bedengan, meja tanam, dan unit produksi.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <FormInput
                            id="area_code"
                            label="Kode Area"
                            value={data.area_code}
                            error={errors.area_code}
                            required
                            icon={HashtagIcon}
                            placeholder="Contoh: GH-A"
                            onChange={(value) => setData('area_code', value)}
                        />

                        <FormInput
                            id="area_name"
                            label="Nama Area"
                            value={data.area_name}
                            error={errors.area_name}
                            required
                            icon={MapIcon}
                            placeholder="Contoh: Greenhouse A"
                            onChange={(value) => setData('area_name', value)}
                        />

                        <FormInput
                            id="area_type"
                            label="Tipe Area"
                            value={data.area_type}
                            error={errors.area_type}
                            required
                            icon={Squares2X2Icon}
                            placeholder="Contoh: Greenhouse / Outdoor / Nursery"
                            onChange={(value) => setData('area_type', value)}
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
                                        <ArrowsPointingOutIcon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-green-950 dark:text-white">
                                            Ukuran Area
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-green-100">
                                            Panjang dan lebar digunakan untuk menghitung estimasi luas area.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <FormInput
                                        id="length"
                                        type="number"
                                        step="0.01"
                                        label="Panjang"
                                        value={data.length}
                                        error={errors.length}
                                        required
                                        suffix="meter"
                                        onChange={(value) => setData('length', value)}
                                    />

                                    <FormInput
                                        id="width"
                                        type="number"
                                        step="0.01"
                                        label="Lebar"
                                        value={data.width}
                                        error={errors.width}
                                        required
                                        suffix="meter"
                                        onChange={(value) => setData('width', value)}
                                    />

                                    <AreaPreview
                                        length={data.length}
                                        width={data.width}
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
                                placeholder="Contoh: Area greenhouse untuk hidroponik NFT dan rak semai."
                                onChange={(value) => setData('description', value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10 sm:flex-row sm:justify-end">
                        <Link
                            href={route('growing-areas.index')}
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
                                    ? 'Update Area'
                                    : 'Simpan Area'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

function AreaPreview({ length, width }) {
    const areaSize = Number(length || 0) * Number(width || 0);

    return (
        <div className="rounded-2xl border border-green-100 bg-white p-4 dark:border-white/10 dark:bg-[#123D2A]">
            <p className="text-sm font-medium text-gray-500 dark:text-green-100">
                Estimasi Luas
            </p>
            <p className="mt-2 text-2xl font-extrabold text-green-950 dark:text-white">
                {areaSize} m²
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
