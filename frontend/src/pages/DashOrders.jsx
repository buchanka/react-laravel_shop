import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
  DialogOverlay
} from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import api, { setAuthToken } from '../services/api';

export default function DashOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 0,
    perPage: 10
  });

  const statusOptions = [
    { value: 'all', label: 'Все статусы' },
    { value: 'принят', label: 'Принят' },
    { value: 'подтвержден', label: 'Подтвержден' },
    { value: 'отправлен', label: 'Отправлен' },
    { value: 'доставлен', label: 'Доставлен' },
    { value: 'отменен', label: 'Отменен' }
  ];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let url = `/admin/orders?page=${pagination.currentPage}`;
      
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }

      const response = await api.get(url);
      setOrders(response.data.orders);
      setPagination(prev => ({
        ...prev,
        total: response.data.total
      }));
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !selectedStatus) return;

    try {
      await api.put(`/admin/orders/${selectedOrder.id}/status`, {
        status: selectedStatus
      });
      fetchOrders();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Ошибка при обновлении статуса:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Произошла ошибка при обновлении статуса');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      fetchOrders();
    }
  }, [statusFilter, pagination.currentPage]);

  const handleStatusChange = (order) => {
    setSelectedOrder(order);
    setSelectedStatus('');
    setIsDialogOpen(true);
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'принят':
        return 'bg-blue-100 text-blue-800';
      case 'подтвержден':
        return 'bg-purple-100 text-purple-800';
      case 'отправлен':
        return 'bg-yellow-100 text-yellow-800';
      case 'доставлен':
        return 'bg-green-100 text-green-800';
      case 'отменен':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управление заказами</h2>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Фильтр по статусу" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Таблица заказов */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID заказа</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Сумма</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Нет заказов
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {order.user?.avatar && (
                        <img 
                          src={order.user.avatar} 
                          alt="Аватар" 
                          className="w-8 h-8 rounded-full"
                          loading='lazy'
                        />
                      )}
                      <div>
                        <div>{order.user?.first_name || 'Неизвестный клиент'}
                        {order.user?.last_name && ` ${order.user.last_name}`}
                        </div>
                        {order.user?.email && (
                          <div className="text-sm text-gray-500">{order.user.email}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {typeof order.total_price === 'number' 
                      ? order.total_price.toFixed(2) 
                      : order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)} ₽
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusChange(order)}
                      disabled={order.status === 'отменен' || order.status === 'доставлен'}
                    >
                      Изменить статус
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Пагинация */}
      {pagination.total > pagination.perPage && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Показано {(pagination.currentPage - 1) * pagination.perPage + 1}-{Math.min(pagination.currentPage * pagination.perPage, pagination.total)} из {pagination.total} заказов
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              disabled={pagination.currentPage === 1}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
            >
              Назад
            </Button>
            <Button 
              variant="outline" 
              disabled={pagination.currentPage * pagination.perPage >= pagination.total}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
            >
              Вперед
            </Button>
          </div>
        </div>
      )}

      {/* Модальное окно смены статуса */}
      {selectedOrder && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
            <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md">
              <DialogHeader>
                <DialogTitle>Изменение статуса заказа #{selectedOrder.id}</DialogTitle>
                <DialogDescription>
                  Выберите новый статус для этого заказа из списка ниже
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Текущий статус</Label>
                  <Input value={selectedOrder.status} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Новый статус</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="подтвержден">Подтвержден</SelectItem>
                      <SelectItem value="отправлен">Отправлен</SelectItem>
                      <SelectItem value="доставлен">Доставлен</SelectItem>
                      <SelectItem value="отменен">Отменен</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Отмена
                  </Button>
                  <Button 
                    onClick={handleUpdateStatus}
                    disabled={!selectedStatus}
                  >
                    Сохранить изменения
                  </Button>
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  );
}