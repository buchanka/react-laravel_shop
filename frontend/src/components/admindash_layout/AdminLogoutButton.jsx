import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setAuthToken } from '../../services/api';
import api from '../../services/api';

export default function AdminLogoutButton() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await api.post('/admin/logout');
      
      localStorage.removeItem('admin_token');
      localStorage.removeItem('token');
      setAuthToken(null);
      navigate("/admin"); 
    } catch (error) {
      console.error('Logout error:', error);
      
      localStorage.removeItem('admin_token');
      localStorage.removeItem('token');
      setAuthToken(null);
      navigate("/admin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoading}
      className={`px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ${isLoading ? 'opacity-50' : ''}`}
    >
      {isLoading ? 'Выход...' : 'Выйти'}
    </button>
  );
}