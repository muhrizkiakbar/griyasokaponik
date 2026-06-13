import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SearchableSelect({
    options = [],
    value,
    onChange,
    placeholder = 'Pilih...',
    labelKey = 'label',
    valueKey = 'value',
    className = '',
    required = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);

    // Format options menjadi { label, value } jika belum
    const formattedOptions = options.map(opt => ({
        label: opt[labelKey] || opt.label || opt.batch_code,
        value: opt[valueKey] || opt.id || opt.value,
        original: opt,
    }));

    const selectedOption = formattedOptions.find(opt => opt.value == value);

    // Filter options berdasarkan search term
    const filteredOptions = formattedOptions.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (opt) => {
        onChange({ target: { value: opt.value, name: 'planting_batch_id' } });
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(0);
    };

    const clearSelection = () => {
        onChange({ target: { value: '', name: 'planting_batch_id' } });
        setSearchTerm('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && isOpen && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            {/* Trigger / Selected value */}
            <div
                className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption ? (
                    <span className="block truncate">{selectedOption.label}</span>
                ) : (
                    <span className="block truncate text-gray-400">{placeholder}</span>
                )}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {selectedOption ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                clearSelection();
                            }}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    )}
                </span>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                    <div className="p-2 border-b border-gray-100">
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                ref={inputRef}
                                className="w-full rounded-md border border-gray-300 py-1.5 pl-8 pr-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="Cari batch..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                            />
                        </div>
                    </div>
                    <ul className="max-h-60 overflow-auto py-1 text-base sm:text-sm">
                        {filteredOptions.length === 0 ? (
                            <li className="relative cursor-default select-none py-2 px-3 text-gray-500">
                                Tidak ada data
                            </li>
                        ) : (
                            filteredOptions.map((opt, idx) => (
                                <li
                                    key={opt.value}
                                    className={`relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-green-50 ${highlightedIndex === idx ? 'bg-green-100' : ''
                                        }`}
                                    onClick={() => handleSelect(opt)}
                                    onMouseEnter={() => setHighlightedIndex(idx)}
                                >
                                    <span className="block truncate">{opt.label}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
            {required && !value && (
                <input
                    type="hidden"
                    required
                    name="planting_batch_id"
                    value={value}
                    onChange={() => { }}
                />
            )}
        </div>
    );
}
