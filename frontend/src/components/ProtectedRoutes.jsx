import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    toast.error('Пожалуйста, авторизуйтесь для доступа к этой странице');
    return <Navigate to="/catalog" replace />;
  }

  return children;
};

export default ProtectedRoute;