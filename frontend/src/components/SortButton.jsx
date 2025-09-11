import React from 'react';
import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { FaArrowUpWideShort, FaArrowUpShortWide } from "react-icons/fa6";

function SortButton({ onSortChange, selectedOption }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    const sortOptions = [
        { 
            label: 'Цена - возрастание', 
            icon: <FaArrowUpShortWide className="h-4 w-4 mr-2" />,
            value: 'price_asc'
        },
        { 
            label: 'Цена - убывание', 
            icon: <FaArrowUpWideShort className="h-4 w-4 mr-2" />,
            value: 'price_desc'
        },
        { 
            label: 'Название - А-Я', 
            icon: <FaArrowUpShortWide className="h-4 w-4 mr-2" />,
            value: 'name_asc'
        },
        { 
            label: 'Название - Я-А', 
            icon: <FaArrowUpWideShort className="h-4 w-4 mr-2" />,
            value: 'name_desc'
        }
    ];

    const handleSelect = (value) => {
        onSortChange(value);
        closeDropdown();
    };

    const getCurrentSortLabel = () => {
        const option = sortOptions.find(opt => opt.value === selectedOption);
        return option ? option.label : 'Сортировать';
    };

    return (
        <div className="relative inline-block">
            <button 
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
                <span className="text-gray-700 font-medium">{getCurrentSortLabel()}</span>
                <FaChevronDown className="h-4 w-4 text-gray-700" />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`flex items-center w-full px-4 py-2 text-left text-sm ${selectedOption === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                {option.icon}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SortButton;