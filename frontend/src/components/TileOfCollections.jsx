import React, { useEffect, useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import 'swiper/css/navigation';
import api from '../services/api';
import './SwiperStyles.css';
import Animation from './Animation';
import OptimizedImage from './OptimizedImage';

const placeholderImages = [
  'https://res.cloudinary.com/dk5rocfla/image/upload/v1754663182/collection_1_zfqzjo.jpg',
  'https://res.cloudinary.com/dk5rocfla/image/upload/v1754663245/collection_2_uwnj94.webp',
  'https://res.cloudinary.com/dk5rocfla/image/upload/v1754663284/collection_3_uikdyk.jpg',
  'https://res.cloudinary.com/dk5rocfla/image/upload/v1754663997/collection_4_g5jccp.jpg',
  'https://res.cloudinary.com/dk5rocfla/image/upload/v1754663997/collection_5_kztx5m.jpg',
  'https://res.cloudinary.com/dk5rocfla/image/upload/v1754663997/collection_6_gujoxi.jpg',
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

function TileOfCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await api.get('/collections');
        setCollections(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Ошибка при загрузке коллекций:', err);
      }
    };

    fetchCollections();
  }, []);

  const optimizedCollections = useMemo(() => {
      return collections.map((collection, index) => ({
        ...collection,
        optimizedImage: optimizeImageUrl(
          collection.imageUrl || optimizedPlaceholders[index % optimizedPlaceholders.length],
          320,
          250
        )
      }));
    }, [collections]);

  const handleCollectionClick = (collectionId, collectionName) => {
    navigate(`/catalog?collections=&{collectionId}&collectionName${encodeURIComponent(collectionName)}`)
  }

  if (loading) return <div className="text-center py-8">Загрузка коллекций...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Ошибка загрузки: {error}</div>;
  if (collections.length === 0) return <div className="text-center py-8">Коллекции не найдены</div>;

  return (
    <section>
      <h3 className="text-center text-black text-2xl font-montserrat font-normal pt-7 pb-2">
        Коллекции свечей
      </h3>
      <div className="py-4">
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
          {optimizedCollections.map((collection, index) => (  
            <SwiperSlide key={collection.id}>
              <div className="h-full p-4">
                <div className="relative mx-auto w-full min-h-[250px] min-w-[250px] max-w-[320px] overflow-hidden rounded-lg"
                onClick={() => handleCollectionClick(collection.id, collection.name,)}
                >
                  <Animation>
                    <OptimizedImage
                      src={collection.optimizedImage}
                      alt={collection.name}
                      className="h-full w-full min-h-[250px] min-w-[250px] max-w-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Animation>
                  <div className='absolute inset-0 flex flex-col justify-center items-center z-10 pointer-events-none'>
                    <h4 className="inline-block break-words whitespace-pre-wrap text-white font-montserrat text-xl md:text-2xl font-medium italic text-center px-4 py-2 bg-slate-400 bg-opacity-50 rounded-lg">
                      {collection.name}
                    </h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TileOfCollections;

