import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import api from '../services/api';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditCollection() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await api.get(`/admin/collections/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error('Ошибка при загрузке коллекции:', error);
        toast.error('Не удалось загрузить коллекцию');
      }
    };

    fetchCollection();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/admin/collections/${id}`, { name });
      
      toast.success('Коллекция успешно обновлена!');
      navigate('/admin_dash/collections');
    } catch (error) {
      console.error('Ошибка при обновлении коллекции:', error);
      toast.error(error.response?.data?.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Редактирование коллекции</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
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
              onClick={() => navigate('/admin_dash/collections')}
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