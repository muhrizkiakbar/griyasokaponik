import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    EnvelopeIcon,
    LockClosedIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login - Manajemen Kebun" />

            <div className="flex min-h-screen items-center justify-center bg-[#F5F7F2] px-4 py-12 dark:bg-[#071F16] sm:px-6 lg:px-8">
                <div className="w-full max-w-md overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl dark:border-white/10 dark:bg-[#123D2A]">
                    <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 px-8 py-8 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/95 p-2 shadow-lg shadow-green-950/20">
                            <img
                                src="/images/logo-auth.png"
                                alt="Logo Hidroponik"
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <h2 className="mt-5 text-3xl font-extrabold text-white">
                            Manajemen Kebun
                        </h2>

                        <p className="mt-2 text-sm text-green-50">
                            Silakan login ke akun Anda
                        </p>
                    </div>

                    <div className="p-8">
                        {status && (
                            <div className="mb-6 rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-white/10 dark:bg-white/5">
                                <div className="text-sm font-medium text-green-700 dark:text-green-100">
                                    {status}
                                </div>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={submit}>
                            <FormInput
                                id="email"
                                type="email"
                                label="Alamat Email"
                                value={data.email}
                                error={errors.email}
                                icon={EnvelopeIcon}
                                placeholder="Email"
                                autoFocus
                                onChange={(value) => setData('email', value)}
                            />

                            <FormInput
                                id="password"
                                type="password"
                                label="Kata Sandi"
                                value={data.password}
                                error={errors.password}
                                icon={LockClosedIcon}
                                placeholder="********"
                                autoComplete="current-password"
                                onChange={(value) => setData('password', value)}
                            />

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-green-100 text-green-700 focus:ring-lime-300 dark:border-white/10 dark:bg-[#0B2A1E]"
                                    />

                                    <span className="ml-2 text-sm text-gray-600 dark:text-green-100">
                                        Ingat saya
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm font-semibold text-green-700 hover:text-green-800 dark:text-lime-400 dark:hover:text-lime-300"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton
                                className="flex w-full justify-center rounded-2xl bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus:ring-2 focus:ring-lime-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:focus:ring-offset-[#123D2A]"
                                disabled={processing}
                            >
                                {processing ? 'Memproses...' : 'Masuk'}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

function FormInput({
    id,
    label,
    value,
    onChange,
    error,
    type = 'text',
    placeholder = '',
    icon: Icon,
    autoComplete,
    autoFocus = false,
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

                <TextInput
                    id={id}
                    type={type}
                    name={id}
                    value={value}
                    autoComplete={autoComplete}
                    isFocused={autoFocus}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="block w-full border-0 bg-transparent px-1 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white dark:placeholder:text-green-200/60"
                />
            </div>

            <InputError message={error} className="mt-2" />
        </div>
    );
}
