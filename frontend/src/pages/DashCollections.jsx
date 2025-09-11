import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Link } from "react-router-dom";
import api from '../services/api';
import { toast } from 'sonner';

export default function DashCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/collections');
        setCollections(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке коллекций:', error);
        toast.error('Не удалось загрузить коллекции');
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/collections/${id}`);
      setCollections(collections.filter(collection => collection.id !== id));
      toast.success('Коллекция успешно удалена');
    } catch (error) {
      console.error('Ошибка при удалении коллекции:', error);
      toast.error(error.response?.data?.message || 'Произошла ошибка');
    }
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Коллекции</h2>
        <Link to="/admin_dash/add_collection">
          <Button>Добавить коллекцию</Button>
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
          {collections.map((collection) => (
            <TableRow key={collection.id}>
              <TableCell>{collection.id}</TableCell>
              <TableCell>{collection.name}</TableCell>
              <TableCell className="flex gap-2">
                <Link to={`/admin_dash/collections/edit/${collection.id}`}>
                  <Button variant="outline" size="sm">
                    Редактировать
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(collection.id)}
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