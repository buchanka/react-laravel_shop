import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import api from '../services/api';
import { toast } from 'sonner';

export default function EditCategories() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/admin/categories/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error('Ошибка при загрузке категории:', error);
        toast.error('Не удалось загрузить категорию');
        navigate('/admin_dash/categories');
      }
    };

    fetchCategory();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatePromise = api.put(`/admin/categories/${id}`, { name });

      await toast.promise(updatePromise, {
        loading: 'Обновление категории...',
        success: () => {
          navigate('/admin_dash/categories');
          return 'Категория успешно обновлена!';
        },
        error: (error) => {
          return error.response?.data?.message || 'Произошла ошибка при обновлении категории';
        }
      });

    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
      toast.error(error.response?.data?.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Редактирование категории</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Редактировать категорию</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Название категории</Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Название категории" 
              required
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => navigate('/admin_dash/categories')}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}