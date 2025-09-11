import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Link } from "react-router-dom";
import api from '../services/api';
import { toast } from 'sonner';

export default function DashCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/admin/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
        toast.error('Не удалось загрузить категории');
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/admin/categories/${id}`);
      setCategories(categories.filter(category => category.id !== id));
      toast.success('Категория успешно удалена');
    } catch (error) {
      console.error('Ошибка при удалении категории:', error);
      toast.error(error.response?.data?.message || 'Произошла ошибка при удалении');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Категории</h2>
        <Link to="/admin_dash/add_category">
          <Button>Добавить категорию</Button>
        </Link>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell className="flex gap-2">
                <Link to={`/admin_dash/categories/edit/${category.id}`}>
                  <Button variant="outline">
                    Редактировать
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  onClick={() => handleDelete(category.id)}
                  disabled={loading}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}