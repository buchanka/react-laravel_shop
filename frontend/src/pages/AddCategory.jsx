import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import api from '../services/api';
import { toast } from 'sonner';

export default function AddCategory() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const createPromise = api.post('/admin/categories', { name });

      await toast.promise(createPromise, {
        loading: 'Создание категории...',
        success: () => {
          setName('');
          return 'Категория успешно добавлена!';
        },
        error: (error) => {
          return error.response?.data?.message || 'Произошла ошибка при создании категории';
        }
      });

    } catch (error) {
      console.error('Ошибка при добавлении категории:', error);
      toast.error(error.response?.data?.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Управление категориями</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Добавить новую категорию</h2>
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
            <Button variant="outline" type="button" onClick={() => setName('')}>
              Очистить
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить категорию'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}