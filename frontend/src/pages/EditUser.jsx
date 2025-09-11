import React, { useState, useEffect, useRef } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from "react-router-dom";
import api from '../services/api';
import { toast } from 'react-toastify';


export default function EditUser() {
    const { id } = useParams();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        phone: '',
        avatar: null
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const phoneInputRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/admin/users/${id}`);
                setFormData({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    middle_name: response.data.middle_name || '',
                    email: response.data.email,
                    phone: response.data.phone,
                    avatar: null
                });
                if (response.data.avatar) {
                    setImagePreview(response.data.avatar);
                }
            } catch (error) {
                toast.error('Ошибка при загрузке данных пользователя');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log('Selected file:', file);
        if (file) {
            setFormData(prev => ({ ...prev, avatar: file }));
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const cleaned = value.replace(/\D/g, '');
        const formatted = cleaned.length > 1 
            ? `+7(${cleaned.substring(1, 4)})${cleaned.substring(4, 7)}-${cleaned.substring(7, 9)}-${cleaned.substring(9, 11)}`
            : value;
        
        setFormData(prev => ({ ...prev, phone: formatted }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            let avatarUrl = imagePreview;
            if (formData.avatar) {
                const imageFormData = new FormData();
                imageFormData.append('avatar', formData.avatar);

                try {
                    const uploadResponse = await api.post(`/admin/users/${id}/upload-avatar`, imageFormData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    if (!uploadResponse.data?.url) {
                        throw new Error('Не удалось получить URL загруженного аватара');
                    }
                    
                    avatarUrl = uploadResponse.data.url;
                    toast.success('Аватар загружен!');
                } catch (uploadError) {
                    console.error('Ошибка загрузки аватара:', uploadError);
                    toast.error(uploadError.response?.data?.message || 'Ошибка при загрузке аватара');
                    setLoading(false);
                    return;
                }
            }

            const userData = {
                ...formData,
                avatar: avatarUrl
            };

            await api.put(`/admin/users/${id}`, userData);
            toast.success('Данные пользователя успешно обновлены');
            navigate('/admin_dash/users');
        } catch (error) {
            if (error.response?.status === 422) {
                console.error('Детали ошибки валидации:', error.response.data);
                setErrors(error.response.data.errors || {});
                const errorMessage = Object.values(error.response.data.errors).flat().join('\n');
                toast.error(errorMessage);
            } else {
                toast.error(error.response?.data?.message || 'Ошибка при обновлении пользователя');
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-2xl font-bold">Управление пользователями</h1>
            
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Редактировать пользователя</h2>
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
                            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name[0]}</p>}
                            <p className="text-sm text-muted-foreground">
                                Должно начинаться с заглавной буквы, может содержать дефис
                            </p>
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
                            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name[0]}</p>}
                            <p className="text-sm text-muted-foreground">
                                Должна начинаться с заглавной буквы, может содержать дефис
                            </p>
                        </div>
                    
                        <div className="space-y-2">
                            <Label htmlFor="middle_name">Отчество</Label>
                            <Input 
                                id="middle_name" 
                                placeholder="Иванович" 
                                value={formData.middle_name}
                                onChange={handleChange}
                            />
                            {errors.middle_name && <p className="text-red-500 text-sm">{errors.middle_name[0]}</p>}
                            <p className="text-sm text-muted-foreground">
                                Должно начинаться с заглавной буквы, может содержать дефис
                            </p>
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
                                onChange={handlePhoneChange}
                            >
                                {(inputProps) => <Input {...inputProps} />}
                            </InputMask>
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone[0]}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Аватар пользователя</Label>
                            <div className="flex items-center gap-4">
                                <Input 
                                    id="avatar" 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {imagePreview && (
                                    <div className="w-16 h-16 rounded-md overflow-hidden border">
                                        <img 
                                            src={imagePreview} 
                                            alt="Превью аватара" 
                                            className="w-full h-full object-cover"
                                            loading='lazy'
                                        />
                                    </div>
                                )}
                            </div>
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
                            {loading ? 'Сохранение...' : 'Сохранить изменения'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}