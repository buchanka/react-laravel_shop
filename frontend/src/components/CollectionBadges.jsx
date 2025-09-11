import React, { useState, useEffect } from 'react';
import api from '../services/api';


const COLLECTION_COLORS = [
    'bg-cornflower_blue/30',
    'bg-dust_pink/30',
    'bg-plum/30',
    'bg-poise/30',
    'bg-darkpurple/30',
    'bg-violet/30',
    'bg-haze/30',
];

export const CollectionBadges = ({ productId }) => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                let response;
                
                if (productId) {
                    response = await api.get(`/products/${productId}/collections`);
                } else {
                    response = await api.get('/collections');
                }
                
                setCollections(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching collections:', error);
                setError('Не удалось загрузить коллекции');
                setLoading(false);
            }
        };

        fetchCollections();
    }, [productId]);

    if (loading) return <div className="text-gray-500">Загрузка коллекций...</div>;
    if (error) return <div className="text-red-500 text-sm">{error}</div>;

    return (
        <div className="flex flex-wrap gap-2">
            {collections.map((collection, index) => {
                
                const colorIndex = index % COLLECTION_COLORS.length;
                const colorClass = COLLECTION_COLORS[colorIndex];
                
                return (
                    <span 
                        key={collection.id} 
                        className={`px-3 py-1 rounded-full text-sm font-bold transition-colors duration-200 ${colorClass} hover:bg-opacity-70`}
                    >
                        {collection.name}
                    </span>
                );
            })}
            {collections.length === 0 && (
                <span className="text-gray-500 text-sm italic">Нет коллекций</span>
            )}
        </div>
    );
};

export default CollectionBadges;
