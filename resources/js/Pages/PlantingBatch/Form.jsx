import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import {
    ArrowLeftIcon,
    CheckIcon,
    ClipboardDocumentListIcon,
    HashtagIcon,
    SparklesIcon,
    CalendarDaysIcon,
    CubeIcon,
    DocumentTextIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline';

export default function Form({ varieties = [], units = [], batch }) {
    const isEdit = !!batch;

    const { data, setData, post, put, processing, errors } = useForm({
        batch_code: batch?.batch_code || '',
        plant_variety_id: batch?.plant_variety_id || '',
        seeding_date: batch?.seeding_date || '',
        seed_quantity: batch?.seed_quantity || '',
        germinated_quantity: batch?.germinated_quantity || '',
        transplanted_quantity: batch?.transplanted_quantity || '',
        expected_transplant_date: batch?.expected_transplant_date || '',
        expected_harvest_date: batch?.expected_harvest_date || '',
        notes: batch?.notes || '',
        status: batch?.status || 'active',
        allocation_unit_id: '',
        allocation_quantity: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('planting-batches.update', batch.id));
        } else {
            post(route('planting-batches.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit Batch' : 'Buat Batch Baru'}>
            <div className="mx-auto max-w-5xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <ClipboardDocumentListIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                {isEdit ? 'Edit Batch Semai' : 'Buat Batch Baru'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Kelola batch semai, jumlah benih, estimasi pindah tanam, dan panen.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('planting-batches.index')}
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
                            Informasi Batch
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                            Data ini menjadi dasar proses semai, pindah tanam, dan pencatatan panen.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <FormInput
                            id="batch_code"
                            label="Kode Batch"
                            value={data.batch_code}
                            error={errors.batch_code}
                            required
                            icon={HashtagIcon}
                            placeholder="Contoh: BTH-001"
                            onChange={(value) => setData('batch_code', value)}
                        />

                        <FormSelect
                            id="plant_variety_id"
                            label="Varietas Tanaman"
                            value={data.plant_variety_id}
                            error={errors.plant_variety_id}
                            required
                            icon={SparklesIcon}
                            onChange={(value) => setData('plant_variety_id', value)}
                            options={[
                                { value: '', label: 'Pilih Varietas' },
                                ...varieties.map((v) => ({
                                    value: v.id,
                                    label: `${v.plant?.plant_name || '-'} - ${v.variety_name}`,
                                })),
                            ]}
                        />

                        <FormInput
                            id="seeding_date"
                            type="date"
                            label="Tanggal Semai"
                            value={data.seeding_date}
                            error={errors.seeding_date}
                            required
                            icon={CalendarDaysIcon}
                            onChange={(value) => setData('seeding_date', value)}
                        />

                        <FormInput
                            id="seed_quantity"
                            type="number"
                            label="Jumlah Benih"
                            value={data.seed_quantity}
                            error={errors.seed_quantity}
                            required
                            icon={CubeIcon}
                            placeholder="Contoh: 500"
                            onChange={(value) => setData('seed_quantity', value)}
                        />

                        <FormInput
                            id="expected_transplant_date"
                            type="date"
                            label="Estimasi Pindah Tanam"
                            value={data.expected_transplant_date}
                            error={errors.expected_transplant_date}
                            icon={CalendarDaysIcon}
                            onChange={(value) => setData('expected_transplant_date', value)}
                        />

                        <FormInput
                            id="expected_harvest_date"
                            type="date"
                            label="Estimasi Panen"
                            value={data.expected_harvest_date}
                            error={errors.expected_harvest_date}
                            icon={CalendarDaysIcon}
                            onChange={(value) => setData('expected_harvest_date', value)}
                        />

                        <div className="md:col-span-2">
                            <FormTextarea
                                id="notes"
                                label="Catatan"
                                value={data.notes}
                                error={errors.notes}
                                icon={DocumentTextIcon}
                                placeholder="Contoh: Batch semai untuk panen akhir bulan."
                                onChange={(value) => setData('notes', value)}
                            />
                        </div>

                        {!isEdit && (
                            <div className="md:col-span-2">
                                <div className="rounded-3xl border border-green-100 bg-green-50 p-5 dark:border-white/10 dark:bg-[#0B2A1E]">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-green-700 dark:bg-white/10 dark:text-lime-400">
                                            <Squares2X2Icon className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-green-950 dark:text-white">
                                                Alokasi ke Bedengan
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-green-100">
                                                Opsional, isi jika batch langsung ditempatkan ke unit tanam.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <FormSelect
                                            id="allocation_unit_id"
                                            label="Bedengan / Unit Tanam"
                                            value={data.allocation_unit_id}
                                            error={errors.allocation_unit_id}
                                            icon={Squares2X2Icon}
                                            onChange={(value) => setData('allocation_unit_id', value)}
                                            options={[
                                                { value: '', label: 'Pilih Bedengan' },
                                                ...units.map((u) => ({
                                                    value: u.id,
                                                    label: u.unit_code + " - " + u.unit_name,
                                                })),
                                            ]}
                                        />

                                        <FormInput
                                            id="allocation_quantity"
                                            type="number"
                                            label="Jumlah Alokasi"
                                            value={data.allocation_quantity}
                                            error={errors.allocation_quantity}
                                            icon={CubeIcon}
                                            placeholder="Contoh: 250"
                                            onChange={(value) => setData('allocation_quantity', value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-white/10 sm:flex-row sm:justify-end">
                        <Link
                            href={route('planting-batches.index')}
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
                                    ? 'Update Batch'
                                    : 'Simpan Batch'}
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
