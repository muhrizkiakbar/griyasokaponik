import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowLeftIcon,
    CheckIcon,
    UserGroupIcon,
    IdentificationIcon,
    EnvelopeIcon,
    LockClosedIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function Form({ user = null }) {
    const isEdit = !!user;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user?.name || '',
        username: user?.username || '',
        email: user?.email || '',
        role: user?.role || 'staff',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('users.update', user.id), {
                onSuccess: () => reset('password', 'password_confirmation'),
            });
        } else {
            post(route('users.store'));
        }
    };

    return (
        <AppLayout title={isEdit ? 'Edit User' : 'Tambah User'}>
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-green-700 dark:bg-lime-400 dark:text-green-950">
                            <UserGroupIcon className="h-6 w-6" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-950 dark:text-white">
                                {isEdit ? 'Edit User' : 'Tambah User'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                                Kelola akun pengguna dan hak akses aplikasi.
                            </p>
                        </div>
                    </div>

                    <Link
                        href={route('users.index')}
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
                    <div className="border-b border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-[#0B2A1E]">
                        <h3 className="text-lg font-bold text-green-950 dark:text-white">
                            Informasi User
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-green-100">
                            Password wajib diisi saat membuat user baru. Saat edit, kosongkan password jika tidak ingin mengubahnya.
                        </p>
                    </div>

                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <FormInput
                            id="name"
                            label="Nama Lengkap"
                            value={data.name}
                            error={errors.name}
                            required
                            icon={UserGroupIcon}
                            placeholder="Contoh: Gibran niyee"
                            onChange={(value) => setData('name', value)}
                        />

                        <FormInput
                            id="username"
                            label="Username"
                            value={data.username}
                            error={errors.username}
                            required
                            icon={IdentificationIcon}
                            placeholder="Contoh: gibran"
                            onChange={(value) => setData('username', value)}
                        />

                        <FormInput
                            id="email"
                            type="email"
                            label="Email"
                            value={data.email}
                            error={errors.email}
                            required
                            icon={EnvelopeIcon}
                            placeholder="user@email.com"
                            onChange={(value) => setData('email', value)}
                        />

                        <FormSelect
                            id="role"
                            label="Role"
                            value={data.role}
                            error={errors.role}
                            required
                            icon={ShieldCheckIcon}
                            onChange={(value) => setData('role', value)}
                            options={[
                                { value: 'admin', label: 'Admin' },
                                { value: 'manager', label: 'Manager' },
                                { value: 'staff', label: 'Staff' },
                            ]}
                        />

                        <FormInput
                            id="password"
                            type="password"
                            label={isEdit ? 'Password Baru' : 'Password'}
                            value={data.password}
                            error={errors.password}
                            required={!isEdit}
                            icon={LockClosedIcon}
                            placeholder={isEdit ? 'Kosongkan jika tidak diubah' : 'Minimal 8 karakter'}
                            onChange={(value) => setData('password', value)}
                        />

                        <FormInput
                            id="password_confirmation"
                            type="password"
                            label="Konfirmasi Password"
                            value={data.password_confirmation}
                            error={errors.password_confirmation}
                            required={!isEdit}
                            icon={LockClosedIcon}
                            placeholder="Ulangi password"
                            onChange={(value) => setData('password_confirmation', value)}
                        />
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-green-100 bg-green-50 px-6 py-5 dark:border-white/10 dark:bg-[#0B2A1E] sm:flex-row sm:justify-end">
                        <Link
                            href={route('users.index')}
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
                                    ? 'Update User'
                                    : 'Simpan User'}
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
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div
                className={[
                    'flex items-center rounded-2xl border bg-white px-3 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-300 dark:bg-[#0B2A1E]',
                    error
                        ? 'border-red-300 dark:border-red-400/40'
                        : 'border-green-100 dark:border-white/10',
                ].join(' ')}
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
    required = false,
    icon: Icon,
    options = [],
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-semibold text-green-950 dark:text-green-50"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div
                className={[
                    'flex items-center rounded-2xl border bg-white px-3 shadow-sm transition focus-within:ring-2 focus-within:ring-lime-300 dark:bg-[#0B2A1E]',
                    error
                        ? 'border-red-300 dark:border-red-400/40'
                        : 'border-green-100 dark:border-white/10',
                ].join(' ')}
            >
                {Icon && (
                    <Icon className="mr-2 h-5 w-5 shrink-0 text-green-700 dark:text-lime-400" />
                )}

                <select
                    id={id}
                    value={value}
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
