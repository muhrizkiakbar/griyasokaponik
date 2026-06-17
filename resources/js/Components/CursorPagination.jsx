import { Link } from '@inertiajs/react';

export default function CursorPagination({ data }) {
    if (!data?.prev_page_url && !data?.next_page_url) return null;

    return (
        <div className="mt-6 flex items-center justify-between rounded-3xl border border-green-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#123D2A]">
            {data.prev_page_url ? (
                <Link
                    href={data.prev_page_url}
                    preserveScroll
                    preserveState
                    className="rounded-2xl border border-green-100 bg-white px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50 dark:border-white/10 dark:bg-white/10 dark:text-green-100 dark:hover:bg-white/20"
                >
                    ← Sebelumnya
                </Link>
            ) : (
                <span />
            )}

            {data.next_page_url ? (
                <Link
                    href={data.next_page_url}
                    preserveScroll
                    preserveState
                    className="rounded-2xl bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
                >
                    Berikutnya →
                </Link>
            ) : (
                <span />
            )}
        </div>
    );
}
