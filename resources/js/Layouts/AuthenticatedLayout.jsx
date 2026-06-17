import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    Bars3Icon,
    XMarkIcon,
    SunIcon,
    MoonIcon,
} from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-[#F5F7F2] dark:bg-[#071F16]">
            <nav className="sticky top-0 z-30 border-b border-green-100 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#123D2A]/90">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-green-700 dark:text-lime-400" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center sm:gap-3">
                            <button
                                type="button"
                                onClick={() => setDarkMode(!darkMode)}
                                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-green-100 bg-green-50 text-green-700 shadow-sm transition hover:bg-lime-100 dark:border-white/10 dark:bg-white/10 dark:text-lime-300 dark:hover:bg-white/20"
                                title={darkMode ? 'Ubah ke Light Mode' : 'Ubah ke Dark Mode'}
                            >
                                {darkMode ? (
                                    <SunIcon className="h-5 w-5" />
                                ) : (
                                    <MoonIcon className="h-5 w-5" />
                                )}
                            </button>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-2xl">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-2xl border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-950 shadow-sm transition hover:bg-lime-100 focus:outline-none dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>

                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center gap-2 sm:hidden">
                            <button
                                type="button"
                                onClick={() => setDarkMode(!darkMode)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-green-100 bg-green-50 text-green-700 shadow-sm transition hover:bg-lime-100 dark:border-white/10 dark:bg-white/10 dark:text-lime-300 dark:hover:bg-white/20"
                                title={darkMode ? 'Ubah ke Light Mode' : 'Ubah ke Dark Mode'}
                            >
                                {darkMode ? (
                                    <SunIcon className="h-5 w-5" />
                                ) : (
                                    <MoonIcon className="h-5 w-5" />
                                )}
                            </button>

                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown((previousState) => !previousState)
                                }
                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl p-2 text-green-700 transition hover:bg-green-50 focus:bg-green-50 focus:outline-none dark:text-green-100 dark:hover:bg-white/10 dark:focus:bg-white/10"
                            >
                                {showingNavigationDropdown ? (
                                    <XMarkIcon className="h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' border-t border-green-100 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#123D2A]/95 sm:hidden'}>
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-green-100 pb-1 pt-4 dark:border-white/10">
                        <div className="px-4">
                            <div className="text-base font-bold text-green-950 dark:text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500 dark:text-green-100">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1 px-4">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-green-100 bg-white shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
                    <div className="mx-auto max-w-7xl px-4 py-6 text-green-950 dark:text-white sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
