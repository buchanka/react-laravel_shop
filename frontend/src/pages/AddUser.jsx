import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import api from '../services/api';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';

export default function AddUser() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        
        try {
            const response = await api.post('/admin/users', formData);
            toast.success('Пользователь успешно добавлен');
            navigate('/admin_dash/users');
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
                const errorMessages = Object.values(error.response.data.errors).flat();
                toast.error(errorMessages.join('\n'));
            } else {
                toast.error(error.response?.data?.message || 'Ошибка при добавлении пользователя');
                console.error('Ошибка:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold">Управление пользователями</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Добавить нового пользователя</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name">Имя</Label>
                            <Input 
                                id="first_name" 
                                placeholder="Иван" 
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                Должно начинаться с заглавной буквы, может содержать дефис
                            </p>
                            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name[0]}</p>}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="last_name">Фамилия</Label>
                            <Input 
                                id="last_name" 
                                placeholder="Иванов" 
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                Должна начинаться с заглавной буквы, может содержать дефис
                            </p>
                            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name[0]}</p>}
                        </div>
                    
                        <div className="space-y-2">
                            <Label htmlFor="middle_name">Отчество</Label>
                            <Input 
                                id="middle_name" 
                                placeholder="Иванович" 
                                value={formData.middle_name}
                                onChange={handleChange}
                            />
                            <p className="text-sm text-muted-foreground">
                                Должно начинаться с заглавной буквы, может содержать дефис
                            </p>
                            {errors.middle_name && <p className="text-red-500 text-sm">{errors.middle_name[0]}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email"
                                placeholder="ivan45@gmail.com" 
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="phone">Телефон</Label>
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
                            <Label htmlFor="password">Пароль</Label>
                            <Input 
                                id="password" 
                                type="password"
                                placeholder="Пароль" 
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <p className="text-sm text-muted-foreground">
                                Минимум 8 символов, заглавная буква, цифра и спецсимвол
                            </p>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">Подтверждение пароля</Label>
                            <Input 
                                id="password_confirmation" 
                                type="password"
                                placeholder="Подтвердите пароль" 
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                required
                            />
                            {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.confirmation[0]}</p>}
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                        <Button 
                            variant="outline" 
                            type="button"
                            onClick={() => navigate('/admin_dash/users')}
                        >
                            Отмена
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Сохранение...' : 'Сохранить пользователя'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}