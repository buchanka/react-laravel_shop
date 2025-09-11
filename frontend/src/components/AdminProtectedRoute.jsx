import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

export default function AdminProtectedRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) return <div>Загрузка...</div>;
  if (!user || !isAdmin()) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
}