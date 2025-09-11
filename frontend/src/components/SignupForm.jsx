import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../contexts/AuthContext";
import { setAuthToken } from '../services/api';
import InputMask from 'react-input-mask';
import api from "../services/api";

export default function SignupForm({ onSwitchForm, onSuccess }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setErrors({});
  setSuccessMessage('');

  try {
    const response = await api.post('/register', formData);
    const { token, user } = response.data;

    setAuthToken(token); 
    localStorage.setItem('token', token);
    
    await login(formData.email, formData.password);
    
    setSuccessMessage('Регистрация прошла успешно!');
      if (onSuccess) onSuccess();
      
      setTimeout(() => {
        navigate('/user_profile');
      }, 2000);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Регистрация</h1>
        <p className="text-gray-500 mt-2">Создайте новый аккаунт</p>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {successMessage}
        </div>
      )}

      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">Имя*</Label>
            <Input 
              id="first_name" 
              placeholder="Иван" 
              required 
              value={formData.first_name}
              onChange={handleChange}
            />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name[0]}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Фамилия*</Label>
            <Input 
              id="last_name" 
              placeholder="Иванов" 
              required 
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name[0]}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="middle-name">Отчество</Label>
          <Input 
            id="middle_name" 
            placeholder="Иванович" 
            value={formData.middle_name}
            onChange={handleChange}
          />
          {errors.middle_name && <p className="text-red-500 text-sm">{errors.middle_name[0]}</p>}
        </div>

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
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Телефон*</Label>
            <InputMask
              mask="+7(999)999-99-99"
              maskChar="_"
              alwaysShowMask={false}
              id="phone"
              type="tel"
              placeholder="+7(999)123-45-67"
              required
              value={formData.phone}
              onChange={handleChange}
            >
              {(inputProps) => (
                <Input 
                  {...inputProps}
                />
              )}
            </InputMask>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone[0]}</p>}
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
          {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Повторите пароль*</Label>
          <Input 
            id="password_confirmation" 
            type="password" 
            required 
            onChange={handleChange}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-dust_pink/10 hover:bg-dust_pink/30"
          disabled={isLoading}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </form>

      <div className="text-center text-sm">
        Уже есть аккаунт?{" "}
        <button
          type="button"
          onClick={() => onSwitchForm("login")}
          className="font-medium text-blue-600 hover:underline"
        >
          Войти
        </button>
      </div>
    </div>
  );
}