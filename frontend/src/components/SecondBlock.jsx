import React, { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import './SwiperStyles.css';
import Animation from './Animation';
import api from '../services/api';
import OptimizedImage from './OptimizedImage';

const placeholderImages = [
  'https://res.cloudinary.com/dk5rocfla/image/upload/v1754665983/category_1_qkdhhz.jpg',
  'https://res.cloudinary.com/dk5rocfla/image/upload/v1754665983/category_2_csvfc6.jpg',
  'https://res.cloudinary.com/dk5rocfla/image/upload/v1754665982/category_3_wf3zkm.jpg',
  'https://res.cloudinary.com/dk5rocfla/image/upload/v1754665982/category_4_san9co.jpg',
  
];

const optimizeImageUrl = (url, width = 320, height = 250, quality = 'auto:good') => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    c: 'fill',
    f: 'auto',
    q: quality,
    dpr: 'auto',
    fl: 'progressive'
  });

  return `${url}?${params.toString()}`;
};

const optimizedPlaceholders = placeholderImages.map(url => 
  optimizeImageUrl(url, 320, 250)
);

function SecondBlock() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

   const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/catalog?categories=${categoryId}&categoryName=${encodeURIComponent(categoryName)}`);
  };

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Отправка запроса на /categories'); 
        const response = await api.get('/categories'); 
        console.log('Ответ:', response.data); 
        
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          throw new Error('Некорректный формат данных');
        }
      } catch (err) {
        console.error('Ошибка:', err);
        setError(err.response?.data?.message || err.message || 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const optimizedCategories = useMemo(() => {
    return categories.map((category, index) => ({
      ...category,
      optimizedImage: optimizeImageUrl(
        category.imageUrl || optimizedPlaceholders[index % optimizedPlaceholders.length],
        320,
        250
      )
    }));
  }, [categories]);

  if (loading) {
    return <div className="text-center py-8">Загрузка категорий...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Ошибка: {error}</div>;
  }

  return (
    <div className="rounded-lg border-y border-momo py-4">
      <section className="py-4">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={20}
          className="mySwiper max-w-[1300px] mx-auto"
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {optimizedCategories.length > 0 ? (
            optimizedCategories.map((category, index) => (
              <SwiperSlide key={category.id || index}>
                <div className="h-full p-4">
                  <div 
                   className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg group"
                   onClick={() => handleCategoryClick(category.id, category.name)}
                   >
                    <Animation>
                      <OptimizedImage
                        src={category.optimizedImage}
                        alt={category.name}
                        className="h-full w-full min-h-[250px] min-w-[250px] max-w-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Animation>
                    <div className="absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none">
                      <h2 className="inline-block break-words whitespace-pre-wrap text-white font-montserrat text-xl md:text-2xl font-medium italic text-center px-4 py-2 bg-slate-400 bg-opacity-50 rounded-lg">
                        {category.name}
                      </h2>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="text-center py-8 w-full">Категории не найдены</div>
          )}
        </Swiper>
      </section>
    </div>
  );
}

export default SecondBlock;
