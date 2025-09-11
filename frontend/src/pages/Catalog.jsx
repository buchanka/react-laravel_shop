import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import ProductCards from "../components/ProductCards";
import FilterButton from "../components/FilterButton";
import SortButton from "../components/SortButton";
import api from '../services/api';

function Catalog() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);
    const [filters, setFilters] = useState({
        categories: [],
        collections: [],
        minPrice: '',
        maxPrice: '',
        search: ''
    });
    const [sortOption, setSortOption] = useState('');

    const [searchParams] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [productsRes, categoriesRes, collectionsRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/categories'),
                    api.get('/collections')
                ]);
                
                setProducts(productsRes.data);
                setCategories(categoriesRes.data);
                setCollections(collectionsRes.data);
                
                const urlCategories = searchParams.get('categories');
                const urlCollections = searchParams.get('collections');
                const urlSearch = searchParams.get('search');
                
                const newFilters = { ...filters };
                
                if (urlCategories) {
                    newFilters.categories = urlCategories.split(',');
                }

                if (urlCollections) {
                    newFilters.collections = urlCollections.split(',');
                }
                
                if (urlSearch) {
                    newFilters.search = urlSearch;
                }
                
                setFilters(newFilters);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            }
        };

        fetchInitialData();
    }, [searchParams]);

    useEffect(() => {
        applyFilters();
    }, [filters, sortOption]);

    const applyFilters = async () => {
        try {
            const params = {};
            
            if (filters.categories.length > 0) {
                params.categories = filters.categories.join(',');
            }
            
            if (filters.collections.length > 0) {
                params.collections = filters.collections.join(',');
            }
            
            if (filters.minPrice !== '') {
                params.min_price = filters.minPrice;
            }
            
            if (filters.maxPrice !== '') {
                params.max_price = filters.maxPrice;
            }
            
            if (filters.search !== '') {
                params.search = filters.search;
            }
            
            if (sortOption) {
                params.sort = sortOption;
            }
            
            const response = await api.get('/products', { 
                params,
                paramsSerializer: params => {
                    return Object.entries(params)
                        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                        .join('&');
                }
            });
            
            setProducts(response.data);
        } catch (error) {
            console.error('Ошибка применения фильтров:', error);
        }
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSortChange = (value) => {
        setSortOption(value);
    };

    return (
        <>
            <div className="flex flex-col gap-4 md:flex-row md:justify-between px-4 md:px-20 py-4">
                <FilterButton 
                    categories={categories}
                    collections={collections}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
                <SortButton 
                    onSortChange={handleSortChange}
                    selectedOption={sortOption}
                />
            </div>
            {filters.search && (
                <div className="px-4 md:px-20 py-2">
                    <p className="font-montserrat">
                        Результаты поиска по запросу: <span className="font-bold">"{filters.search}"</span>
                    </p>
                </div>
            )}
            <ProductCards products={products} />
        </>
    );
}

export default Catalog;