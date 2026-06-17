import { Link } from '@inertiajs/react';

export default function Pagination({ data }) {
    console.log(data);
    const links = data?.links || data?.meta?.links || [];

    if (!links || links.length === 0) return null;

    return (
        <div className="mt-6 rounded-3xl border border-green-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
            <div className="flex flex-wrap items-center gap-2">
                {links.map((link, index) => {
                    const label = String(link.label)
                        .replace('&laquo;', '‹')
                        .replace('&raquo;', '›')
                        .replace('Previous', 'Sebelumnya')
                        .replace('Next', 'Berikutnya');

                    if (!link.url) {
                        return (
                            <span
                                key={index}
                                className="inline-flex min-w-10 cursor-not-allowed items-center justify-center rounded-2xl border border-green-100 bg-green-50 px-3 py-2 text-sm font-semibold text-gray-400 dark:border-white/10 dark:bg-white/5 dark:text-green-200/50"
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={link.url}
                            preserveScroll
                            preserveState
                            className={[
                                'inline-flex min-w-10 items-center justify-center rounded-2xl border px-3 py-2 text-sm font-semibold shadow-sm transition',
                                link.active
                                    ? 'border-green-700 bg-green-700 text-white dark:border-lime-400 dark:bg-lime-400 dark:text-green-950'
                                    : 'border-green-100 bg-white text-green-700 hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-green-100 dark:hover:bg-white/20',
                            ].join(' ')}
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
