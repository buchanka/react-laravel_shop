import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { CardButtons } from '../components/CardButtons';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';
import { toast } from 'sonner';
import FavoriteIconFullSmall from '../contexts/icons/FavoriteIconFull';

const ERROR_IMG = "https://res.cloudinary.com/dk5rocfla/image/upload/f_auto,q_auto,w_320,h_320/product-placeholder_qnpcs6.webp";

export default function Favorites() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchFavorites();
      } else {
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/customer/favorites');
      setFavoriteProducts(response.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = ERROR_IMG;
  }, []);
  
  const handleAddToFavorites = async (product) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      await api.post('/customer/favorites', {
        product_id: product.id
      });
      fetchFavorites();
      toast.success('Товар добавлен в избранное');
    } catch (err) {
      setError('Не удалось добавить в избранное');
      console.error(err);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      await api.delete(`/customer/favorites/${productId}`);
      setFavoriteProducts(prev => prev.filter(p => p.id !== productId));
      toast.success('Товар удалён из избранного');
    } catch (err) {
      setError('Не удалось удалить из избранного');
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      await Promise.all(
        favoriteProducts.map(product => 
          api.delete(`/customer/favorites/${product.id}`)
        )
      );
      setFavoriteProducts([]);
      toast.success('Все товары удалены из избранного');
    } catch (err) {
      setError('Не удалось очистить избранное');
      console.error(err);
    }
  };

  if (authLoading || loading) {
    return <div className="container mx-auto py-8 text-center">Загрузка...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-8 text-center">
          <FavoriteIconFullSmall className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">Необходима авторизация</h3>
          <p className="text-gray-500 mb-6">Войдите в систему, чтобы просмотреть избранное</p>
          <Button onClick={() => setShowAuthModal(true)} className="flex items-center gap-2">
            Войти
          </Button>
        </Card>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
          type="login"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <FavoriteIconFullSmall className="w-8 h-8 text-red-500" />
          <h1 className="text-2xl font-bold">Избранное</h1>
        </div>
        {favoriteProducts.length > 0 && (
          <Button 
            variant="outline" 
            onClick={handleClearAll}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Очистить избранное
          </Button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {favoriteProducts.length > 0 ? (
        <section>
          <div className="py-4 max-w-[1300px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="h-full p-4 min-w-[250px] group">
                  <div className="flex flex-col h-full">
                    <div className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg">
                      <img
                        src={product.image || ERROR_IMG}
                        loading="lazy"
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg transform hover:scale-110 transition-transform duration-300"
                      />
                      <button 
                        onClick={() => handleRemoveFavorite(product.id)}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all duration-200 group-hover:opacity-100 focus:outline-none"
                        aria-label="Удалить из избранного"
                      >
                        <FavoriteIconFullSmall className="h-5 w-5 text-red-500" />
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
              ))}
            </div>
          </div>
        </section>
      ) : (
        <Card className="p-8 text-center">
          <FavoriteIconFullSmall className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">В избранном пока пусто</h3>
          <p className="text-gray-500 mb-6">Добавляйте товары в избранное, чтобы не потерять</p>
          <Button asChild>
            <Link to="/catalog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Перейти в каталог
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}