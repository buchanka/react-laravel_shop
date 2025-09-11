import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";

export const ProductAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const sections = [
    { title: 'Описание аромата', content: 'Пункт 1' },
    { title: 'Состав', content: 'Пункт 2' },
    { title: 'Рекомендации по уходу', content: 'Пункт 3' },
  ];

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mb-8">
      {sections.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            className="flex justify-between items-center w-full py-4 px-2 md:px-4 text-left font-medium font-montserrat text-gray-900 text-lg"
            onClick={() => toggleSection(index)}
          >
            <span>{item.title}</span>
            <span className="ml-4 text-sm">
              {activeIndex === index ? <FaMinus /> : <FaPlus />}
            </span>
          </button>
          {activeIndex === index && (
            <div className="py-2 px-4 text-gray-700 bg-violet/20 text-base">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
