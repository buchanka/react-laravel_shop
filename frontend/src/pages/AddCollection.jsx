import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import api from '../services/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function AddCollection() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/admin/collections', { name });
      
      toast.success('Коллекция успешно создана!');
      navigate('/admin_dash/collections');
    } catch (error) {
      console.error('Ошибка при создании коллекции:', error);
      toast.error(error.response?.data?.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Управление коллекциями</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Добавить новую коллекцию</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Название коллекции</Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Новая коллекция" 
              required
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => setName('')}
            >
              Очистить
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить коллекцию'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}