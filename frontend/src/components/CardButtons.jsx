import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/button';

export const CardButtons = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalType, setAuthModalType] = useState('login');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      setAuthModalType('login');
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/customer/cart/items', {
        product_id: productId,
        quantity: quantity
      });
      toast.success('Товар добавлен в корзину');
      navigate('/cart');
    } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
      toast.error(error.response?.data?.message || 'Не удалось добавить товар в корзину');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    handleAddToCart(); 
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button 
          onClick={handleAddToCart}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 bg-cornflower_blue/10 hover:bg-cornflower_blue/30 w-32 h-10 text-black"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{isLoading ? 'Добавление...' : 'В корзину'}</span>
        </Button>

        <div className="flex items-center justify-between border rounded-md px-2 w-20 h-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <FaMinus className="h-3 w-3" />
          </Button>
          <span className="text-sm">{quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <FaPlus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          type={authModalType}
          onSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
};