import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function Accordion() {
    const [activeIndex, setActiveIndex] = useState(null);

    const faq = [
        { question: 'Есть ли минимальная сумма для заказа?', answer: 'Минимальная сумма заказа на сайте 1400 руб.' },
        { question: 'Наличие товара на складе соответствует сайту?', 
        answer: 'Да, сайт напрямую связан с нашим складом, поэтому все товары, представленные на сайте, есть в наличии на текущий момент времени.' },
        { question: 'Можно оформить дозаказ?', answer: 'Если вдруг после оформления заказа Вам требуется добавить товар по количеству или других цветов, то свяжитесь с нами по телефону +79117378880 и мы внесем изменения.' },
        { question: 'Что делать, если я хочу оттенок, не представленный в каталоге, возможен ли индивидуальный заказ?', answer: ' В нашем каталоге представлены только самые популярные оттенки, пожалуйста, посмотрите каталог. Если вы все-таки не нашли подходящий оттенок и хотите сделать заказ на индивидуальную колеровку, напишите нам, и мы обсудим детали.' },
        { question: 'Какой состав ваших свечей?', answer: 'Мы заботимся о Вашем здоровье и используем только самые качественные ингредиенты. Состав наших свечей: растительный воск, 100% очищенный пищевой парафиновый воск.' },
        { question: 'Есть ли скидки?', answer: 'У нас постоянно обновляется раздел Промоакции, где вы можете ознакомиться с актуальными скидками.' },
    ];

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className=''>
            <div className='flex items-center justify-center h-17'>
                <img 
                className="w-[40%]" 
                src="https://res.cloudinary.com/dk5rocfla/image/upload/f_webp,q_auto,w_600/divider_bebxqh.png" 
                alt="divider" 
                loading="lazy" 
                />
            </div>
            <div className='my-8'>
                <div className='text-center text-black text-2xl font-montserrat font-normal'>
                    <h6 className=''>Часто задаваемые вопросы (FAQ)</h6>
                </div>
                <div className="w-full p-8">
                    {faq.map((item, index) => ( 
                        <div key={index} className="border-b border-gray-200">
                            <button
                                className="flex justify-between items-center w-full py-4 px-6 text-left font-medium font-montserrat text-gray-900 text-lg focus:outline-none"
                                onClick={() => handleClick(index)}
                            >
                                <span>{item.question}</span>
                                <span className="ml-6 size-5">
                                    {activeIndex === index ? <FaMinus/> : <FaPlus/>}
                                </span>
                            </button>
                            {activeIndex === index && (
                                <div className="py-4 px-6 text-gray-700 bg-violet/20 text-base">
                                    {item.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex items-center justify-center h-17 my-4'>
               <img 
                className="w-[40%]" 
                src="https://res.cloudinary.com/dk5rocfla/image/upload/f_webp,q_auto,w_600/divider_bebxqh.png" 
                alt="divider" 
                loading="lazy" 
                />
            </div>
        </section>
    );
}

export default Accordion;
