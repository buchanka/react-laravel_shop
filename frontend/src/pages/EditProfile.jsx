import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import api from '../services/api';

export default function EditProfile() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    middle_name: ''
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/customer/profile');
        setUser(response.data.user);
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await api.put('/customer/profile', user);
      setUser(response.data.user);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      setError(error.response?.data?.message || 'Произошла ошибка при обновлении профиля');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8 px-4">Загрузка...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Редактирование профиля</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Личные данные</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    Профиль успешно обновлен
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-1/3">
                    <Label htmlFor="first_name">Имя</Label>
                  </div>
                  <div className="flex-1 w-full">
                    <Input
                      id="first_name"
                      name="first_name"
                      value={user.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-1/3">
                    <Label htmlFor="last_name">Фамилия</Label>
                  </div>
                  <div className="flex-1 w-full">
                    <Input
                      id="last_name"
                      name="last_name"
                      value={user.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-1/3">
                    <Label htmlFor="middle_name">Отчество (необязательно)</Label>
                  </div>
                  <div className="flex-1 w-full">
                    <Input
                      id="middle_name"
                      name="middle_name"
                      value={user.middle_name || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-1/3">
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <div className="flex-1 w-full">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex flex-row gap-2 justify-start pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/user_profile')}
                  >
                    Назад
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}