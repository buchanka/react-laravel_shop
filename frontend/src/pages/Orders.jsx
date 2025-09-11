import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowLeft, Package, CheckCircle2, Clock, Truck, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import QRCode from 'react-qr-code';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogPortal,
  AlertDialogOverlay
} from "../components/ui/alert-dialog";
import { toast } from 'sonner';

const ERROR_IMG = "https://res.cloudinary.com/dk5rocfla/image/upload/f_auto,q_auto,w_320,h_320/product-placeholder_qnpcs6.webp";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const { user } = useAuth();

  const handleCancelOrder = async (orderId) => {
    try {
      await api.put(`/customer/orders/${orderId}/cancel`);
      toast.success('Заказ успешно отменен');
      fetchOrders();
    } catch (error) {
      console.error('Ошибка при отмене заказа:', error);
      toast.error(error.response?.data?.message || 'Ошибка при отмене заказа');
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/customer/orders');
      const processedOrders = response.data.orders.map(order => ({
        ...order,
        total_price: Number(order.total_price) || 0
      }));
      setOrders(processedOrders);
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "доставлен":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "в пути":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "принят":
      case "обработка":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "отменен":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return <div className="container mx-auto py-8">Загрузка...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Package className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Мои заказы</h1>
        </div>
        <Button variant="outline" className="bg-cornflower_blue/30 hover:bg-cornflower_blue/50" asChild>
          <Link to="/catalog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Вернуться в каталог
          </Link>
        </Button>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-lg">Заказ #{order.id}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className={`text-sm font-medium ${
                        order.status === "доставлен" ? "text-green-600" :
                        order.status === "в пути" ? "text-blue-600" :
                        order.status === "отменен" ? "text-red-600" :
                        "text-yellow-600"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Дата: {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="font-medium mb-3">Товары:</h3>
                    <ul className="space-y-3">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={item.image || item.product?.image || ERROR_IMG}
                              alt={item.product?.name}
                              className="w-full h-full object-cover"
                              loading='lazy'
                            />
                          </div>
                          <div className="flex-1 flex justify-between">
                            <span>
                              {item.product?.name} × {item.quantity}
                            </span>
                            <span>{(Number(item.price) * Number(item.quantity)).toFixed(2)} руб.</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Итого:</span>
                        <span className="font-bold">{Number(order.total_price).toFixed(2)} руб.</span>
                      </div>
                      {order.tracking_number && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Трек-номер:</p>
                          <p className="font-mono text-sm">{order.tracking_number}</p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            const qrLink = `${window.location.origin}/order-success/${order.id}`;
                             console.log('QR-код ссылка:', qrLink);
                            setCurrentOrderId(order.id);
                            setShowQRDialog(true);
                          }}
                        >
                          Показать QR-код
                        </Button>
                        {order.status === "принят" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            Отменить заказ
                          </Button>
                        )}
                        {order.status === "доставлен" && (
                          <Button variant="outline" size="sm">
                            Повторить заказ
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-8">
          <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">У вас нет заказов</h3>
          <p className="text-gray-500 mb-6">Совершите покупки в нашем каталоге</p>
          <Button asChild>
            <Link to="/catalog" className="flex items-center justify-center gap-2">
              Перейти в каталог
            </Link>
          </Button>
        </Card>
      )}

      <AlertDialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <AlertDialogPortal>
          <AlertDialogOverlay className="fixed inset-0 bg-black/50 z-40" />
          <AlertDialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold">Электронный чек заказа #{currentOrderId}</AlertDialogTitle>
              <button 
                onClick={() => setShowQRDialog(false)}
                className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </AlertDialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <QRCode 
                value={`${window.location.origin}/order-success/${currentOrderId}`}
                size={200}
                level="H"
                aria-label={`QR-код для заказа ${currentOrderId}`}
              />
              <AlertDialogDescription className="text-sm text-gray-600 text-center">
               
              </AlertDialogDescription>
            </div>
            <AlertDialogFooter className="flex justify-end gap-2 pt-4">
              <AlertDialogAction 
                className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => setShowQRDialog(false)}
              >
                Закрыть
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  );
}