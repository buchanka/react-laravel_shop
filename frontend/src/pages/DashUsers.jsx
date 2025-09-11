import React, { useEffect, useState, useMemo } from 'react';
import { Button } from "../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/table";
import { Link } from "react-router-dom";
import api from '../services/api';
import { toast } from 'react-toastify';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationEllipsis,
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

const optimizeCloudinaryUrl = (url, options = {}) => {
    if (!url || url.includes('placeholder-avatar')) {
        return "https://res.cloudinary.com/dk5rocfla/image/upload/v1754667013/placeholder-avatar_j3fsgb.png";
    }

    if (url.includes('/image/upload/')) {
        const parts = url.split('/image/upload/');
        const transformations = parts[1].split('/');
        
        if (!transformations[0].includes('f_auto') || !transformations[0].includes('q_auto')) {
            return url.replace(
                '/image/upload/',
                '/image/upload/f_auto,q_auto:good,w_100,h_100,c_fill/'
            );
        }
        return url;
    }

    return url.replace(
        '/image/upload/',
        '/image/upload/f_auto,q_auto:good,w_100,h_100,c_fill/'
    );
};

const OptimizedAvatar = ({ src, alt, className }) => {
    const [imageSrc, setImageSrc] = useState('');
    const [hasError, setHasError] = useState(false);

    const placeholder = "https://res.cloudinary.com/dk5rocfla/image/upload/v1754667013/placeholder-avatar_j3fsgb.png";

    useEffect(() => {
        if (!src || hasError) {
            setImageSrc(placeholder);
            return;
        }

        const optimizedUrl = optimizeCloudinaryUrl(src);
        setImageSrc(optimizedUrl);
    }, [src, hasError]);

    const handleError = () => {
        setHasError(true);
        setImageSrc(placeholder);
    };

    return (
        <img 
            src={imageSrc}
            alt={alt}
            className={className}
            onError={handleError}
            loading="lazy"
            decoding="async"
        />
    );
};

function DashUsers(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const perPage = 10;

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/admin/users?page=${currentPage}&per_page=${perPage}`);
            const filteredUsers = response.data.data.filter(user => user.id !== 1);
            
            setUsers(filteredUsers);
            setTotalPages(response.data.last_page);
        } catch (error) {
            toast.error('Ошибка при загрузке пользователей');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/admin/users/${userToDelete.id}`);
            toast.success('Пользователь успешно удален');
            if (users.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchUsers();
            }
        } catch (error) {
            toast.error('Ошибка при удалении пользователя');
            console.error(error);
        } finally {
            setDeleteDialogOpen(false);
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        items.push(
            <PaginationItem key={1}>
                <PaginationLink 
                    isActive={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                >
                    1
                </PaginationLink>
            </PaginationItem>
        );

        if (currentPage > maxVisiblePages - 2) {
            items.push(
                <PaginationItem key="start-ellipsis">
                    <PaginationEllipsis/>
                </PaginationItem>
            );
        }

        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink 
                        isActive={currentPage === i}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        if (currentPage < totalPages - (maxVisiblePages - 2)) {
            items.push(
                <PaginationItem key="end-ellipsis">
                    <PaginationEllipsis />
                </PaginationItem>
            );
        }

        if (totalPages > 1) {
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink 
                        isActive={currentPage === totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return(
        <div className="space-y-4">
            <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Пользователи</h2>
                <Link to="/admin_dash/add_user">
                    <Button>Добавить пользователя</Button>
                </Link>
            </div>
            
            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Аватар</TableHead>
                                <TableHead>Имя</TableHead>
                                <TableHead>Фамилия</TableHead>
                                <TableHead>Отчество</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Действия</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>
                                        <div className="w-12 h-12 rounded-md overflow-hidden">
                                            <OptimizedAvatar 
                                                src={user.avatar}
                                                alt={`Аватар ${user.first_name}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.first_name}</TableCell>
                                    <TableCell>{user.last_name}</TableCell>
                                    <TableCell>{user.middle_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Link to={`/admin_dash/users/edit/${user.id}`}>
                                                <Button variant="outline" size="sm">Редактировать</Button>
                                            </Link>
                                            <Button 
                                                variant="destructive" 
                                                size="sm"
                                                onClick={() => handleDeleteClick(user)}
                                            >
                                                Удалить
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {totalPages > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                    />
                                </PaginationItem>
                                
                                {renderPaginationItems()}
                                
                                <PaginationItem>
                                    <PaginationNext 
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </>
            )}

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogPortal>
                    <AlertDialogOverlay className="fixed inset-0 bg-black/50 z-40" />
                    <AlertDialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-lg font-semibold">Вы уверены?</AlertDialogTitle>
                            <AlertDialogDescription className="text-sm text-gray-600 mt-2">
                                Вы собираетесь удалить пользователя {userToDelete?.first_name} {userToDelete?.last_name}. Это действие нельзя отменить.
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

export default DashUsers;