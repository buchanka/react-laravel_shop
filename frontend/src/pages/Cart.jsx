import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShoppingCart, X, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import AuthModal from '../components/AuthModal';
import { toast } from 'sonner';

const PLACEHOLDER_IMAGE = "https://res.cloudinary.com/dk5rocfla/image/upload/f_auto,q_auto,w_320,h_320/product-placeholder_qnpcs6.webp";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = PLACEHOLDER_IMAGE;
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/catalog');
      toast.error('Для доступа к корзине необходимо авторизоваться');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const response = await api.get('/customer/cart');
      setCartItems(response.data.cart.items || []);
      
      const initialImageState = {};
      response.data.cart.items.forEach(item => {
        if (item.product?.image) {
          initialImageState[item.id] = false;
        }
      });
      setImageLoaded(initialImageState);
    } catch (error) {
      console.error('Ошибка при загрузке корзины:', error);
      toast.error('Ошибка при загрузке корзины');
    } finally {
      setLoading(false);
    }
  };

  const handleImageLoad = (itemId) => {
    setImageLoaded(prev => ({ ...prev, [itemId]: true }));
  };

  const handleImageError = (itemId, e) => {
    setImageLoaded(prev => ({ ...prev, [itemId]: true }));
    e.target.src = PLACEHOLDER_IMAGE;
  };

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    try {
      await api.put(`/customer/cart/items/${cartItemId}`, {
        quantity: newQuantity
      });
      fetchCart();
      toast.success('Количество товара обновлено');
    } catch (error) {
      console.error('Ошибка при обновлении количества:', error);
      toast.error('Ошибка при обновлении количества');
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await api.delete(`/customer/cart/items/${cartItemId}`);
      fetchCart();
      toast.success('Товар удален из корзины');
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
      toast.error('Ошибка при удалении товара');
    }
  };

  const handleCheckout = async () => {
    try {
      navigate('/checkout');
    } catch (error) {
      console.error('Ошибка при переходе к оформлению:', error);
      toast.error('Ошибка при переходе к оформлению заказа');
    }
  };

  const total = useMemo(() => cartItems.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : Number(item.price);
    return sum + (price * item.quantity);
  }, 0), [cartItems]);

  const totalItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  if (authLoading) {
    return <div className="container mx-auto py-8 text-center">Загрузка...</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-8 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">Необходима авторизация</h3>
          <p className="text-gray-500 mb-6">Войдите в систему, чтобы просмотреть корзину</p>
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

  if (loading) {
    return <div className="container mx-auto py-8">Загрузка...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-6">
        <ShoppingCart className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Ваша корзина</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Card key={item.id} className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                  <img
                    src={item.product?.image || PLACEHOLDER_IMAGE}
                    alt={item.product?.name}
                    className={'w-full h-full object-cover'}
                    loading="lazy"
                    onLoad={() => handleImageLoad(item.id)}
                    onError={(e) => handleImageError(item.id, e)}
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col sm:flex-row justify-between">
                  <div>
                    <h3 className="font-medium">{item.product?.name}</h3>
                    <p className="text-gray-500 mt-1">
                      {typeof item.price === 'number' ? item.price.toFixed(2) : Number(item.price).toFixed(2)} руб.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className="px-2">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-500"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Ваша корзина пуста</p>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Итого</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Товары ({totalItems})</span>
                <span>{total.toFixed(2)} руб.</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Общая сумма</span>
                <span>{total.toFixed(2)} руб.</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button 
                className="w-full bg-cornflower_blue/30 hover:bg-cornflower_blue/50"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Оформить заказ
              </Button>
            </CardFooter>
          </Card>
          <Button variant="outline" className="w-full bg-dust_pink/30 hover:bg-dust_pink/50" asChild>
            <Link to="/catalog" className="flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Продолжить покупки
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}