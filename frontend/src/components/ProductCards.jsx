import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CardButtons } from './CardButtons';
import FavoriteIconSmall from '../contexts/icons/FavoriteIconEmpty';
import FavoriteIconFullSmall from '../contexts/icons/FavoriteIconFull';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import { toast } from 'sonner';

const PLACEHOLDER_IMAGE = 'https://res.cloudinary.com/dk5rocfla/image/upload/f_auto,q_auto,w_320/product-placeholder_qnpcs6.webp';

function ProductCards({ products }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const { user } = useAuth();

    useEffect(() => {
        const preloadPlaceholder = () => {
            const img = new Image();
            img.src = PLACEHOLDER_IMAGE;
        };
        preloadPlaceholder();
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (user) {
                try {
                    const favoritesResponse = await api.get('/customer/favorites');
                    const favoritesData = Array.isArray(favoritesResponse.data) ? favoritesResponse.data : [];
                    setFavorites(favoritesData.map(f => f.id));
                } catch (err) {
                    console.error('Ошибка при загрузке избранного:', err);
                }
            }
        };

        fetchFavorites();
    }, [user]);

    const handleImageLoad = (productId) => {
        setLoadedImages(prev => new Set(prev).add(productId));
    };

    const handleImageError = (e, productId) => {
        e.target.src = PLACEHOLDER_IMAGE;
        handleImageLoad(productId);
    };

    const handleToggleFavorite = async (productId) => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        try {
            if (favorites.includes(productId)) {
                await api.delete(`/customer/favorites/${productId}`);
                setFavorites(prev => prev.filter(id => id !== productId));
                toast.success('Товар удалён из избранного');
            } else {
                await api.post('/customer/favorites', { product_id: productId });
                setFavorites(prev => [...prev, productId]);
                toast.success('Товар добавлен в избранное');
            }
        } catch (err) {
            console.error('Ошибка загрузки избранного:', err);
            setError('Произошла ошибка при обновлении избранного');
        }
    };

    const optimizedProducts = useMemo(() => products, [products]);

    if (loading) return <div className="text-center py-8">Загрузка...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;

    return (
        <>
            <section>
                <div className="py-4 max-w-[1300px] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
                        {optimizedProducts.map((product) => {
                            const imageUrl = product.image 
                                ? `${product.image}?auto=format,compress&w=320&q=80`
                                : PLACEHOLDER_IMAGE;
                            
                            const isImageLoaded = loadedImages.has(product.id);

                            return (
                                <div key={product.id} className="h-full p-4 min-w-[250px] group">
                                    <div className="flex flex-col h-full">
                                        <div className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg">
                                            <div className="relative w-full h-full">
                                                {!isImageLoaded && (
                                                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
                                                )}
                                                <img
                                                    src={imageUrl}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    className={`w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300 ${
                                                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                    onLoad={() => handleImageLoad(product.id)}
                                                    onError={(e) => handleImageError(e, product.id)}
                                                />
                                            </div>
                                            <button 
                                                onClick={() => handleToggleFavorite(product.id)}
                                                className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 group-hover:opacity-100 focus:outline-none"
                                                aria-label={favorites.includes(product.id) ? "Удалить из избранного" : "Добавить в избранное"}
                                            >
                                                {favorites.includes(product.id) ? (
                                                    <FavoriteIconFullSmall className="h-5 w-5 text-red-500" />
                                                ) : (
                                                    <FavoriteIconSmall className="h-5 w-5 text-gray-600 hover:text-red-500" />
                                                )}
                                            </button>
                                        </div>
                                        <div className="flex flex-col flex-grow justify-between mt-2">
                                            <div className='text-center'>
                                                <h4 className="font-montserrat italic text-black font-medium">
                                                    {product.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                    {product.price} руб.
                                                </p>
                                            </div>
                                            <div className="mt-1 space-y-2">
                                                <Link 
                                                    to={`/product_card/${product.id}`} 
                                                    className="block text-center text-black hover:text-gray-600 transition-colors text-sm underline"
                                                >
                                                    Подробнее
                                                </Link>
                                                <div className="flex justify-center">
                                                    <CardButtons productId={product.id} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>         
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)} 
                type="login"
            />
        </>
    );
}

export default React.memo(ProductCards);