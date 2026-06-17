import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F5F7F2] dark:bg-[#071F16]">
            <div className="hidden">
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-green-700 dark:text-lime-400" />
                </Link>
            </div>

            {children}
        </div>
    );
}
