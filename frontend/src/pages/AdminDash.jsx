import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/card";
import api from '../services/api';
import { toast } from 'sonner';
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function AdminDash() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    latestProduct: null,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productsRes, ordersRes] = await Promise.all([
        api.get('/admin/products?per_page=1&sort=desc'),
        api.get('/admin/orders?status=pending')
      ]);
      
      const totalProducts = productsRes.data.total;
      const latestProduct = productsRes.data.products[0];
      const pendingOrders = ordersRes.data.total;

      setStats({
        totalProducts,
        totalOrders: pendingOrders, 
        latestProduct,
        pendingOrders
      });
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      toast.error('Не удалось загрузить данные дашборда');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <h1 className="text-3xl font-bold">Административная панель</h1>
      

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Товары</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link to="/admin_dash/products">Управление товарами</Link>
            </Button>
          </CardFooter>
        </Card>


        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Заказы</CardTitle>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">{stats.pendingOrders} ожидают обработки</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="w-full">
              <Link to="/admin_dash/orders">Управление заказами</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>


      <div className="grid gap-6 md:grid-cols-2">
        {stats.latestProduct && (
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Последний добавленный товар</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {stats.latestProduct.image ? (
                    <img 
                      src={stats.latestProduct.image} 
                      alt={stats.latestProduct.name}
                      className="h-16 w-16 rounded-md object-cover"
                      loading='lazy'
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-md bg-gray-200"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{stats.latestProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{stats.latestProduct.price} руб.</p>
                 <p className="text-xs text-muted-foreground">
                  Добавлен: {new Date(stats.latestProduct.created_at).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to={`/admin_dash/products/edit/${stats.latestProduct.id}`}>Редактировать</Link>
              </Button>
            </CardFooter>
          </Card>
        )}

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 grid-cols-2">
            <Button asChild variant="outline">
              <Link to="/admin_dash/add_product">Добавить товар</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin_dash/categories">Управление категориями</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin_dash/users">Пользователи</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin_dash/collections">Коллекции</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}