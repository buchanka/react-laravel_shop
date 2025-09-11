import { FaSliders } from "react-icons/fa6";
import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function FilterButton({ categories, collections, filters, onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => setIsOpen(!isOpen);

    const handleCategoryChange = (categoryId) => {
        const newCategories = filters.categories.includes(categoryId)
            ? filters.categories.filter(id => id !== categoryId)
            : [...filters.categories, categoryId];
        onFilterChange('categories', newCategories);
    };

    const handleCollectionChange = (collectionId) => {
        const newCollections = filters.collections.includes(collectionId)
            ? filters.collections.filter(id => id !== collectionId)
            : [...filters.collections, collectionId];
        onFilterChange('collections', newCollections);
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <>
            <div className="inline-flex">
                <button 
                    onClick={togglePopup} 
                    aria-label="Фильтры" 
                    className="h-10 md:h-10 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                    <FaSliders className="h-5 w-5 text-gray-700" />
                    <span className="text-gray-700 font-medium">Фильтры</span>
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="fixed inset-0 bg-black opacity-50" 
                        onClick={togglePopup}
                    ></div>
                    <div className="bg-white rounded-md shadow-lg p-4 z-50 w-[90%] md:w-[40%] lg:w-[30%] min-h-[200px] max-h-[90vh] overflow-y-auto relative">
                        <button 
                            onClick={togglePopup} 
                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                        >
                            <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                        </button>
                        <div className='text-black font-montserrat text-xl font-normal text-center align-baseline p-2'>
                            <h1>Фильтры</h1>
                        </div>
                        
                        <div className="mb-6">
                            <h2 className="text-lg font-medium mb-2">Категории</h2>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <div key={category.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`category-${category.id}`}
                                            checked={filters.categories.includes(category.id)}
                                            onChange={() => handleCategoryChange(category.id)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <h2 className="text-lg font-medium mb-2">Коллекции</h2>
                            <div className="space-y-2">
                                {collections.map(collection => (
                                    <div key={collection.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`collection-${collection.id}`}
                                            checked={filters.collections.includes(collection.id)}
                                            onChange={() => handleCollectionChange(collection.id)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor={`collection-${collection.id}`} className="ml-2 text-gray-700">
                                            {collection.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <h2 className="text-lg font-medium mb-2">Цена</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                        От
                                    </label>
                                    <input
                                        type="number"
                                        id="minPrice"
                                        name="minPrice"
                                        value={filters.minPrice}
                                        onChange={handlePriceChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Мин. цена"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                        До
                                    </label>
                                    <input
                                        type="number"
                                        id="maxPrice"
                                        name="maxPrice"
                                        value={filters.maxPrice}
                                        onChange={handlePriceChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Макс. цена"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FilterButton;