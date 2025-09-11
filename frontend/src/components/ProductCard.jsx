import React, { useState, useEffect } from 'react';
import { FaHeart, FaShare, FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import CollectionBadges from './CollectionBadges';
import { CardButtons } from './CardButtons';
import api from '../services/api';

export const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-8">Загрузка...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;
  if (!product) return <div className="text-center py-8">Товар не найден</div>;

  return (
    <div className="max-w-6xl mx-auto p-2 my-12 sm:p-8 bg-white rounded-lg shadow-md relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-6 order-1">{product.name}</h2>

      <div className="flex flex-col md:flex-row md:gap-6">
        <div className="w-full md:w-1/2 flex flex-col order-3 md:order-1">
          <div className="bg-gray-200 rounded-lg overflow-hidden aspect-square flex items-center justify-center m-4">
            <img 
              src={`${product.image || 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754667050/product-placeholder_qnpcs6.webp'}?w=600&h=600&c=fill&f=auto&q=auto:good&dpr=auto`}
              srcSet={`
              ${product.image}?w=300&h=300&c=fill&f=auto&q=auto 300w,
              ${product.image}?w=600&h=600&c=fill&f=auto&q=auto 600w,
              ${product.image}?w=900&h=900&c=fill&f=auto&q=auto 900w
              `}
              sizes='(max-width: 768px) 100vw, 50vw'
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4 order-2 md:order-2">
          <div className="md:hidden order-2">
            <div className="flex justify-between items-start mb-2">
              <div className="text-3xl font-bold text-gray-800">{product.price}₽</div>
              <div className="p-2">
                <CardButtons productId={product.id} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-gray-700 md:hidden order-5">
            <div><span className="font-medium">Высота:</span> {product.height} см</div>
            <div><span className="font-medium">Длина:</span> {product.length} см</div>
            <div><span className="font-medium">Ширина:</span> {product.width} см</div>
            <div><span className="font-medium">Высота:</span> {product.height || '—'} г</div>
            <div className="col-span-2"><span className="font-medium">Время горения:</span> {product.burn_time || '—'} часов</div>
          </div>

          <div className="order-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Описание:</h3>
            <p className="text-gray-700">{product.description || 'Описание отсутствует'}</p>
          </div>

          <div className="order-7">
            <h3 className="text-lg font-medium text-gray-800 mb-2">В коллекциях:</h3>
              <CollectionBadges productId={product.id} />
          </div>

          <div className="hidden md:flex flex-col md:flex-row gap-6 order-8">
            <div className="flex-1">
              <div className="text-3xl font-bold text-gray-800 mb-2">{product.price} ₽</div>
              <div className="space-y-2 text-gray-700">
                <div><span className="font-medium">Высота:</span> {product.height} см</div>
                <div><span className="font-medium">Длина:</span> {product.length} см</div>
                <div><span className="font-medium">Ширина:</span> {product.width} см</div>
                <div><span className="font-medium">Время горения:</span> {product.burn_time || '—'} часов</div>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-start">
              <div className="p-2">
                <CardButtons productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-start">
        <Link 
          to="/catalog" 
          className="text-black bg-dust_pink bg-opacity-50 flex items-center gap-2 hover:bg-dust_pink transition-colors px-3 py-2 rounded hover:text-white text-sm sm:text-base"
        >
          <FaArrowLeft className="h-4 w-4" />
          <span>Назад</span>
        </Link>
      </div>
    </div>
  );
};
