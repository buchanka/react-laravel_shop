import React, { useState, useEffect } from 'react';
import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import api from '../services/api';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "../components/ui/pagination";
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

const ERROR_IMG = "https://res.cloudinary.com/dk5rocfla/image/upload/f_auto,q_auto,w_320,h_320/product-placeholder_qnpcs6.webp";

export default function DashProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const itemsPerPage = 5;

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);

    if (searchParams.get('created')) {
      toast.success('Товар успешно добавлен');
      navigate(location.pathname, { replace: true });
    }

    fetchProducts(page);
  }, [location.search, sortOrder, navigate]);

    useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = ERROR_IMG;
  }, []);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/products?page=${page}&per_page=${itemsPerPage}&sort=${sortOrder}`);
      setProducts(response.data.products);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
      toast.error('Не удалось загрузить товары');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (page) => {
    navigate(`/admin_dash/products?page=${page}`);
  };

  const handleDeleteClick = (product) => {
  console.log('Delete clicked', product);
  setProductToDelete(product);
  setDeleteDialogOpen(true);
  console.log('Диалоговое окно открыто');
};

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/admin/products/${productToDelete.id}`);
      toast.success('Товар успешно удален');
      fetchProducts(currentPage);
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
      toast.error(error.response?.data?.message || 'Не удалось удалить товар');
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Загрузка...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Товары</h2>
        <Link to="/admin_dash/add_product">
          <Button>Добавить товар</Button>
        </Link>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Изображение</TableHead>
              <TableHead>ID</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100" 
                onClick={handleSort}
              >
                Название {sortOrder === 'asc' ? '↑' : '↓'}
              </TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>На складе</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.image ? (
                    <div className="w-16 h-16 rounded-md overflow-hidden flex justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = ERROR_IMG;
                        }}
                        loading='lazy'
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                  )}
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price} руб.</TableCell>
                <TableCell>{product.stock} шт.</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2"
                    onClick={() => navigate(`/admin_dash/products/edit/${product.id}`)}
                  >
                    Редактировать
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteClick(product)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                disabled={currentPage === 1}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 
                ? i + 1 
                : currentPage >= totalPages - 2 
                  ? totalPages - 4 + i 
                  : currentPage - 2 + i;
              return page > 0 && page <= totalPages ? (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ) : null;
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogPortal>
          <AlertDialogOverlay className="fixed inset-0 bg-black/50 z-40" />
          <AlertDialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold">Вы уверены?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600 mt-2">
                Вы собираетесь удалить товар "{productToDelete?.name}". Это действие нельзя отменить.
              </AlertDialogDescription>
              <button 
                onClick={() => setDeleteDialogOpen(false)}
                className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                
              </button>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end gap-2 pt-4">
              <AlertDialogCancel className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Нет
              </AlertDialogCancel>
              <AlertDialogAction 
                className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={handleDeleteConfirm}
              >
                Да, удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  );
}