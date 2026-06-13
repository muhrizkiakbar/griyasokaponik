// resources/js/Layouts/AppLayout.jsx
import { Fragment, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Dialog, Transition } from '@headlessui/react';
import {
    HomeIcon,
    SparklesIcon,
    ClipboardIcon,
    ShoppingCartIcon,
    ChartBarIcon,
    CubeIcon,
    MapIcon,
    Squares2X2Icon,
    BeakerIcon,
    UserGroupIcon,
    TagIcon,
    XMarkIcon,
    Bars3Icon,
    BanknotesIcon,
} from '@heroicons/react/24/outline';

const navigationGroups = [
    {
        label: 'Utama',
        items: [
            { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
            { name: 'Tanaman', href: '/plants', icon: SparklesIcon },
            { name: 'Varietas Tanaman', href: '/plant-varieties', icon: CubeIcon },
            { name: 'Batch Semai', href: '/planting-batches', icon: ClipboardIcon },
        ],
    },
    {
        label: 'Operasional Kebun',
        items: [
            { name: 'Area Kebun', href: '/growing-areas', icon: MapIcon },
            { name: 'Bedengan', href: '/growing-units', icon: Squares2X2Icon },
            { name: 'Perawatan', href: '/maintenance', icon: BeakerIcon },
            { name: 'Panen', href: '/harvests', icon: SparklesIcon },
        ],
    },
    {
        label: 'Bisnis',
        items: [
            { name: 'Penjualan', href: '/sales', icon: ShoppingCartIcon },
            { name: 'Pengeluaran', href: '/expenses', icon: BanknotesIcon },
            { name: 'Customer', href: '/customers', icon: UserGroupIcon },
            { name: 'Kategori Pengeluaran', href: '/expense-categories', icon: TagIcon },
        ],
    },
    {
        label: 'Laporan',
        items: [
            { name: 'Laporan Laba Rugi', href: '/reports/profit-loss', icon: ChartBarIcon },
        ],
    },
];

export default function AppLayout({ children, title = 'Manajemen Kebun' }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();

    const isActive = (href) => {
        if (href === '/dashboard') return url === href;
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-[#F5F7F2]">
            <MobileSidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
                isActive={isActive}
            />

            <DesktopSidebar isActive={isActive} />

            <div className="lg:pl-72">
                <Header setSidebarOpen={setSidebarOpen} />

                <main className="min-h-screen">
                    <div className="px-4 py-6 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-6 overflow-hidden rounded-3xl border border-green-100 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-600 p-6 shadow-sm">
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm font-medium text-green-100">
                                        KebunKu Management System
                                    </span>
                                    <h1 className="text-2xl font-bold text-white md:text-3xl">
                                        {title}
                                    </h1>
                                    <p className="max-w-2xl text-sm text-green-50">
                                        Kelola aktivitas kebun, semai, panen, penjualan, dan pengeluaran dalam satu dashboard.
                                    </p>
                                </div>
                            </div>

                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function MobileSidebar({ open, setOpen, isActive }) {
    return (
        <Transition show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-250 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-250 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[#123D2A] shadow-xl">
                            <div className="absolute right-0 top-0 -mr-12 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <SidebarContent isActive={isActive} />
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

function DesktopSidebar({ isActive }) {
    return (
        <aside className="fixed inset-y-0 left-0 hidden w-72 overflow-hidden border-r border-green-900/10 bg-[#123D2A] lg:flex lg:flex-col">
            <SidebarContent isActive={isActive} />
        </aside>
    );
}

function SidebarContent({ isActive }) {
    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex h-20 items-center gap-3 px-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400 shadow-lg shadow-lime-900/20">
                    <SparklesIcon className="h-7 w-7 text-green-950" />
                </div>

                <div>
                    <h1 className="text-xl font-extrabold tracking-tight text-white">
                        KebunKu
                    </h1>
                    <p className="text-xs font-medium text-green-200">
                        Smart Farm Dashboard
                    </p>
                </div>
            </div>

            <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-xs text-green-100">Musim Tanam Aktif</p>
                <p className="mt-1 text-lg font-bold text-white">Hidroponik & Kebun</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-green-950/50">
                    <div className="h-full w-1/2 rounded-full bg-lime-400" />
                </div>
            </div>

            <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6">
                {navigationGroups.map((group) => (
                    <div key={group.label}>
                        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-green-300">
                            {group.label}
                        </div>

                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const active = isActive(item.href);

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={[
                                            'group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                            active
                                                ? 'bg-white text-green-950 shadow-sm'
                                                : 'text-green-100 hover:bg-white/10 hover:text-white',
                                        ].join(' ')}
                                    >
                                        <span
                                            className={[
                                                'flex h-9 w-9 items-center justify-center rounded-xl transition',
                                                active
                                                    ? 'bg-lime-100 text-green-700'
                                                    : 'bg-white/10 text-green-100 group-hover:bg-lime-400 group-hover:text-green-950',
                                            ].join(' ')}
                                        >
                                            <item.icon className="h-5 w-5" />
                                        </span>

                                        <span className="truncate">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="border-t border-white/10 p-4">
                <div className="rounded-2xl bg-green-950/40 p-4">
                    <p className="text-sm font-semibold text-white">Tips Kebun</p>
                    <p className="mt-1 text-xs leading-5 text-green-100">
                        Pantau semai dan panen rutin untuk menjaga produktivitas kebun.
                    </p>
                </div>
            </div>
        </div>
    );
}

function Header({ setSidebarOpen }) {
    return (
        <header className="sticky top-0 z-30 border-b border-green-100 bg-white/80 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="rounded-xl p-2 text-gray-700 hover:bg-green-50 lg:hidden"
                >
                    <Bars3Icon className="h-6 w-6" />
                </button>

                <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-500">
                        Selamat datang kembali
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                        Kelola kebun dengan lebih rapi
                    </p>
                </div>

                <div className="flex-1" />

                <div className="flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 px-3 py-2">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-green-950">Admin</p>
                        <p className="text-xs text-green-700">Farm Manager</p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-700 font-bold text-white">
                        A
                    </div>
                </div>
            </div>
        </header>
    );
}
