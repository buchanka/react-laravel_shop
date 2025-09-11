import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <Navigate to="/" state={{ from: location }} replace />;

  return children;
}