import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import { setAuthToken } from '../services/api';

export default function LoginForm({ onSwitchForm, onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/login', {
        email: formData.email,
        password: formData.password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      
      await login(formData.email, formData.password);
      
      if (onSuccess) onSuccess();
      
      navigate('/user_profile');
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Произошла ошибка входа');
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Вход</h1>
        <p className="text-gray-500 mt-2">Войдите в свой аккаунт</p>
      </div>

      {error && (
        <div className="text-red-500 text-center text-sm">
          {error}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email*</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="ivan@example.com" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Пароль*</Label>
          <Input 
            id="password" 
            type="password" 
            required 
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Запомнить меня
            </label>
          </div>

          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Забыли пароль?
          </Link>
        </div>
      
        <Button 
          type="submit" 
          className="w-full bg-cornflower_blue/10 hover:bg-cornflower_blue/30"
          disabled={isLoading}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </Button>
     
      </form>

      <div className="text-center text-sm space-y-2">
        <div>
          Нет аккаунта?{" "}
          <button
            type="button"
            onClick={() => onSwitchForm("signup")}
            className="font-medium text-blue-600 hover:underline"
          >
            Зарегистрироваться
          </button>
        </div>
        <div>
          Вы администратор?{" "}
          <Link 
            to="/admin" 
            className="font-medium text-blue-600 hover:underline"
            onClick={onSuccess}
          >
            Войти в админ-панель
          </Link>
        </div>
      </div>
    </div>
  );
}