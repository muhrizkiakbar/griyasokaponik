import { useState, useEffect, useRef } from 'react';
import {
    ChevronDownIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

export default function SearchableSelect({
    options = [],
    value,
    onChange,
    placeholder = 'Pilih...',
    searchPlaceholder = 'Cari data...',
    labelKey = 'label',
    valueKey = 'value',
    name = 'planting_batch_id',
    className = '',
    required = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    const formattedOptions = options.map((opt) => ({
        label: opt[labelKey] || opt.label || opt.batch_code || '-',
        value: opt[valueKey] || opt.id || opt.value,
        original: opt,
    }));

    const selectedOption = formattedOptions.find((opt) => opt.value == value);

    const filteredOptions = formattedOptions.filter((opt) =>
        String(opt.label).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const emitChange = (selectedValue) => {
        onChange({
            target: {
                value: selectedValue,
                name,
            },
        });
    };

    const handleSelect = (opt) => {
        emitChange(opt.value);
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(0);
    };

    const clearSelection = () => {
        emitChange('');
        setSearchTerm('');
        setHighlightedIndex(0);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                Math.min(prev + 1, filteredOptions.length - 1)
            );
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        }

        if (e.key === 'Enter' && isOpen && filteredOptions[highlightedIndex]) {
            e.preventDefault();
            handleSelect(filteredOptions[highlightedIndex]);
        }

        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    useEffect(() => {
        setHighlightedIndex(0);
    }, [searchTerm]);

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={[
                    'relative flex w-full items-center rounded-2xl border bg-white px-3 py-3 text-left text-sm shadow-sm transition',
                    'border-green-100 text-gray-900 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-lime-300',
                    'dark:border-white/10 dark:bg-[#0B2A1E] dark:text-white dark:hover:bg-white/10',
                    isOpen ? 'ring-2 ring-lime-300' : '',
                ].join(' ')}
            >
                <span
                    className={[
                        'block flex-1 truncate pr-8',
                        selectedOption
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-400 dark:text-green-200/60',
                    ].join(' ')}
                >
                    {selectedOption ? selectedOption.label : placeholder}
                </span>

                <span className="absolute inset-y-0 right-3 flex items-center">
                    {selectedOption ? (
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                                e.stopPropagation();
                                clearSelection();
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    clearSelection();
                                }
                            }}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-xl text-gray-400 transition hover:bg-red-50 hover:text-red-600 dark:text-green-100 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </span>
                    ) : (
                        <ChevronDownIcon
                            className={[
                                'h-5 w-5 text-green-700 transition dark:text-lime-400',
                                isOpen ? 'rotate-180' : '',
                            ].join(' ')}
                        />
                    )}
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-green-100 bg-white shadow-xl dark:border-white/10 dark:bg-[#123D2A]">
                    <div className="border-b border-green-100 bg-green-50 p-3 dark:border-white/10 dark:bg-[#0B2A1E]">
                        <div className="relative">
                            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-700 dark:text-lime-400" />

                            <input
                                type="text"
                                ref={inputRef}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={searchPlaceholder}
                                className="w-full rounded-2xl border border-green-100 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-300 dark:border-white/10 dark:bg-[#123D2A] dark:text-white dark:placeholder:text-green-200/60"
                            />
                        </div>
                    </div>

                    <ul className="max-h-64 overflow-auto py-1 text-sm">
                        {filteredOptions.length === 0 ? (
                            <li className="px-4 py-4 text-center text-sm text-gray-500 dark:text-green-100">
                                Tidak ada data
                            </li>
                        ) : (
                            filteredOptions.map((opt, idx) => {
                                const active = highlightedIndex === idx;
                                const selected = opt.value == value;

                                return (
                                    <li
                                        key={`${opt.value}-${idx}`}
                                        onClick={() => handleSelect(opt)}
                                        onMouseEnter={() => setHighlightedIndex(idx)}
                                        className={[
                                            'cursor-pointer select-none px-4 py-2.5 transition',
                                            active
                                                ? 'bg-green-50 text-green-950 dark:bg-white/10 dark:text-white'
                                                : 'text-gray-700 dark:text-green-100',
                                            selected
                                                ? 'font-semibold text-green-700 dark:text-lime-400'
                                                : '',
                                        ].join(' ')}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="block truncate">
                                                {opt.label}
                                            </span>

                                            {selected && (
                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:bg-lime-400 dark:text-green-950">
                                                    Dipilih
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            )}

            {required && !value && (
                <input
                    type="text"
                    required
                    tabIndex={-1}
                    value=""
                    onChange={() => { }}
                    className="pointer-events-none absolute h-px w-px opacity-0"
                />
            )}
        </div>
    );
}
