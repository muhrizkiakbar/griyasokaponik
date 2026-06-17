import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CheckIcon,
    BeakerIcon,
    ClipboardDocumentListIcon,
    CalendarDaysIcon,
    DocumentTextIcon,
    BanknotesIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';

const activityTypes = [
    { value: 'watering', label: '💧 Penyiraman' },
    { value: 'fertilizing', label: '🌱 Pemupukan' },
    { value: 'spraying', label: '🧴 Penyemprotan' },
    { value: 'pruning', label: '✂️ Pemangkasan' },
    { value: 'ppm_check', label: '📊 Pengecekan PPM' },
    { value: 'ph_check', label: '🧪 Pengecekan pH' },
    { value: 'other', label: '📝 Lainnya' },
];

export default function Form({ batches = [], activity }) {
    const isEdit = !!activity;

    const { data, setData, post, put, processing, errors } = useForm({
        planting_batch_id: activity?.planting_batch_id || '',
        activity_type: activity?.activity_type || 'watering',
        activity_date: activity?.activity_date || new Date().toISOString().split('T')[0],
        description: activity?.description || '',
        cost: activity?.cost || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('maintenance.update', activity.id));
        } else {
            post(route('maintenance.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Perawatan' : 'Catat Perawatan'}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <BeakerIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                {isEdit ? 'Edit Perawatan' : 'Catat Perawatan'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Catat aktivitas perawatan seperti penyiraman, pemupukan, pengecekan pH, dan biaya terkait.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('maintenance.index')}
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
                            Informasi Perawatan
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                            Data ini digunakan untuk riwayat operasional kebun dan perhitungan biaya produksi.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <FormSelect
                            id="planting_batch_id"
                            label="Batch Tanaman"
                            value={data.planting_batch_id}
                            error={errors.planting_batch_id}
                            required
                            icon={ClipboardDocumentListIcon}
                            onChange={(value) => setData('planting_batch_id', value)}
                            options={[
                                { value: '', label: 'Pilih Batch' },
                                ...batches.map((batch) => ({
                                    value: batch.id,
                                    label: `${batch.batch_code} - ${batch.plant_variety?.plant?.plant_name || '-'} (${batch.current_stage})`,
                                })),
                            ]}
                        />

                        <FormSelect
                            id="activity_type"
                            label="Jenis Perawatan"
                            value={data.activity_type}
                            error={errors.activity_type}
                            required
                            icon={SparklesIcon}
                            onChange={(value) => setData('activity_type', value)}
                            options={activityTypes}
                        />

                        <FormInput
                            id="activity_date"
                            type="date"
                            label="Tanggal"
                            value={data.activity_date}
                            error={errors.activity_date}
                            required
                            icon={CalendarDaysIcon}
                            onChange={(value) => setData('activity_date', value)}
                        />

                        <FormInput
                            id="cost"
                            type="number"
                            step="0.01"
                            label="Biaya"
                            value={data.cost}
                            error={errors.cost}
                            icon={BanknotesIcon}
                            placeholder="0"
                            prefix="Rp"
                            onChange={(value) => setData('cost', value)}
                        />

                        <div className="md:col-span-2">
                            <FormTextarea
                                id="description"
                                label="Deskripsi"
                                value={data.description}
                                error={errors.description}
                                icon={DocumentTextIcon}
                                placeholder="Contoh: Pupuk NPK 500g, penyemprotan pestisida, atau pengecekan nutrisi."
                                onChange={(value) => setData('description', value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10 sm:flex-row sm:justify-end">
                        <Link
                            href={route('maintenance.index')}
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
                                    ? 'Update Perawatan'
                                    : 'Simpan Perawatan'}
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
                    step={step}
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
