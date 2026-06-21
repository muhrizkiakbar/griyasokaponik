import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function FormDatePicker({
    id,
    label,
    value,
    onChange,
    error,
    required = false,
    icon: Icon,
}) {
    const selectedDate = value ? new Date(value) : null;

    const handleChange = (date) => {
        if (!date) {
            onChange('');
            return;
        }

        const formatted = date.toLocaleDateString('en-CA');
        onChange(formatted);
    };

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

                <DatePicker
                    id={id}
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="dd MMMM yyyy"
                    placeholderText="Pilih tanggal"
                    required={required}
                    className="block w-full border-0 bg-transparent px-1 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 dark:text-white dark:placeholder:text-green-200/60"
                    wrapperClassName="w-full"
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
