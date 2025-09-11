import React, { useEffect, useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShoppingCart, Heart, Package, User } from "lucide-react";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import LogoutButton from '../components/LogoutButton';
import UploadAvatar from '../components/UploadAvatar';
import api from '../services/api';

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dk5rocfla/image/upload/";
const PLACEHOLDER_AVATAR = `${CLOUDINARY_BASE_URL}v1754667013/placeholder-avatar_j3fsgb.png`;

const optimizeCloudinaryUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  const baseUrl = url.split('/upload/')[0] + '/upload/';
  const publicId = url.split('/upload/')[1];
  
  const transformations = [
    options.quality && `q_${options.quality}`,
    options.width && `w_${options.width}`,
    options.height && `h_${options.height}`,
    options.crop && `c_${options.crop}`,
    'f_auto', 
    'fl_lossy' 
  ].filter(Boolean).join(',');

  return `${baseUrl}${transformations ? transformations + '/' : ''}${publicId}`;
};

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get('/customer/profile');
      const userData = response.data.user;
      
      if (userData.avatar) {
        userData.avatar = optimizeCloudinaryUrl(userData.avatar, {
          quality: '80',
          width: 96,
          height: 96,
          crop: 'fill'
        });
      }
      
      setUser(userData);
      setImageError(false);
    } catch (error) {
      console.error('Ошибка при загрузке данных пользователя:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleProfileUpdate = useCallback((updatedUser) => {
    setUser(prev => ({
      ...prev,
      ...updatedUser,
      avatar: updatedUser.avatar 
        ? optimizeCloudinaryUrl(updatedUser.avatar, {
            quality: '80',
            width: 96,
            height: 96,
            crop: 'fill'
          }) + `?t=${Date.now()}`
        : prev.avatar
    }));
    setImageError(false);
  }, []);

  const handleImageError = useCallback((e) => {
    setImageError(true);
    e.target.src = PLACEHOLDER_AVATAR;
  }, []);

  const handleImageRetry = useCallback((e) => {
    if (user?.avatar) {
      setImageError(false);
      e.target.src = `${user.avatar.split('?')[0]}?retry=${Date.now()}`;
    }
  }, [user?.avatar]);

  if (loading) {
    return <div className="container mx-auto py-8 px-4">Загрузка...</div>;
  }

  if (!user) {
    return <div className="container mx-auto py-8 px-4">Ошибка загрузки данных пользователя</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Личный кабинет</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 space-y-4">
          <Card className="p-4">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden mb-4">
                <img 
                  src={user.avatar || PLACEHOLDER_AVATAR}
                  alt="Аватар"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  onLoad={() => setImageError(false)}
                />
                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={handleImageRetry}
                      className="text-xs bg-white/80 px-2 py-1 rounded"
                    >
                      Повторить
                    </button>
                  </div>
                )}
              </div>
              <UploadAvatar onAvatarUpdate={handleProfileUpdate} />
              <h2 className="text-lg font-medium text-center">
                {user.first_name} {user.last_name}
              </h2>
            </div>
            
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/orders" className="flex items-center gap-3">
                  <Package className="h-5 w-5" />
                  <span>Мои заказы</span>
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/favorites" className="flex items-center gap-3">
                  <Heart className="h-5 w-5" />
                  <span>Избранное</span>
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/cart" className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Корзина</span>
                </Link>
              </Button>
            </nav>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Личные данные</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-1/3">
                    <p className="text-gray-500">Имя</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.first_name}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-1/3">
                    <p className="text-gray-500">Фамилия</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.last_name}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-1/3">
                    <p className="text-gray-500">Email</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                <div className='flex flex-row gap-2 justify-start'>
                  <LogoutButton />
                  <Link to="/user_profile/edit">
                    <Button className="hover:bg-cornflower_blue/20">
                      <p>Редактировать профиль</p>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
