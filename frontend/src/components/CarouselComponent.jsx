import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import './SwiperStyles.css';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

const slides = [
  { 
    image: 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754662424/slider1_cza0py.jpg', 
    title: "Уют каждый день", 
    text: "Ароматные свечи, чтобы порадовать себя и тех, кто дорог",
    buttonText: "Каталог" 
  },
  { 
    image: 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754662443/slider2_esdica.jpg', 
    title:"Уютный дом каждый день.",
    text: "Ароматы для дома и праздника.",
    buttonText: "Каталог"
  },
  { 
    image: 'https://res.cloudinary.com/dk5rocfla/image/upload/v1754662482/slider3_r4g9z7.webp', 
    title:"Уникальный ассортимент.",
    text: "Только авторские модели наших художников.",
    buttonText: "Каталог"
  }
];

function CarouselComponent() {
  return (
    <section className="slider-section relative p-4 w-full">
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        navigation
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        speed={800}
        className="mySwiper arrow-white w-full h-[300px] md:h-[450px] lg:h-[600px] rounded-xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="relative w-full h-full rounded-xl overflow-hidden"
          >
            <OptimizedImage
              src={slide.image}
              alt={slide.title}
              widths={[600, 1200, 1800]} 
              height={600}
              className="absolute inset-0 w-full h-full object-cover"
              sizes="(max-width: 768px) 600px, (max-width: 1280px) 1200px, 1800px"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6 md:p-10 bg-white bg-opacity-80 rounded-lg text-black sm:w-[90%] md:w-[80%] relative z-10">
                <div className="flex justify-center items-center py-2">
                  <Link to="/catalog">
                    <button className="bg-black font-extralight px-6 md:px-8 py-2 md:py-3 font-montserrat text-white text-lg md:text-2xl">
                      {slide.buttonText}
                    </button>
                  </Link>
                </div>
                <h1 className="font-montserrat text-2xl md:text-3xl text-black text-center mb-4">
                  {slide.title}
                </h1>
                <p className="font-montserrat text-lg md:text-2xl font-bold text-center">
                  {slide.text}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default CarouselComponent;









