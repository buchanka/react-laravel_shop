import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqData = [
  {
    category: 'Аккаунт и авторизация',
    items: [
      {
        question: 'Как создать аккаунт?',
        answer: 'Нажмите "Регистрация" в шапке сайта, укажите email и пароль. После подтверждения email ваш аккаунт будет активен.',
      },
      {
        question: 'Я забыл пароль. Как восстановить доступ?',
        answer: 'На странице входа нажмите "Забыли пароль?", введите email. Вы получите ссылку для сброса пароля.',
      },
      {
        question: 'Можно ли войти через соцсети?',
        answer: 'Да, доступен вход через Google и Facebook. Ваши данные защищены.',
      },
      {
        question: 'Как изменить личные данные в профиле?',
        answer: 'В личном кабинете → "Настройки профиля". Изменения сохраняются автоматически.',
      },
    ],
  },
  {
    category: 'Оплата и возврат',
    items: [
      {
        question: 'Какие способы оплаты вы принимаете?',
        answer: 'Карты Visa/Mastercard, Apple/Google Pay, PayPal. Для юр. лиц — банковский перевод.',
      },
      {
        question: 'Как вернуть товар?',
        answer: 'В течение 14 дней после получения оформите возврат в личном кабинете. Товар должен быть неиспользованным.',
      },
      {
        question: 'Сколько ждать возврата денег?',
        answer: 'До 10 рабочих дней после получения товара на наш склад.',
      },
      {
        question: 'Что делать, если оплата не прошла?',
        answer: 'Проверьте баланс карты или попробуйте другой способ оплаты. Если проблема осталась — напишите в поддержку.',
      },
    ],
  },
  {
    category: 'Доставка',
    items: [
      {
        question: 'Какие варианты доставки доступны?',
        answer: 'Курьером, пункты выдачи, почта России. Сроки и цены указаны при оформлении.',
      },
      {
        question: 'Как отследить заказ?',
        answer: 'Номер трека придет на email. Его можно ввести на сайте транспортной компании.',
      },
      {
        question: 'Что делать, если заказ задерживается?',
        answer: 'Напишите нам в чат с номером заказа. Мы уточним статус у перевозчика.',
      },
    ],
  },
  {
    category: 'О свечах',
    items: [
      {
        question: 'Из каких материалов сделаны свечи?',
        answer: 'Натуральный соевый воск, хлопковые фитили, безопасные аромамасла. Также есть и свечи из парафина, они более бюджетные.',
      },
      {
        question: 'Как ухаживать за свечой?',
        answer: 'Первое горение — минимум 2 часа (чтобы воск растопился полностью). Обрезайте фитиль до 5 мм перед каждым использованием.',
      },
      {
        question: 'Почему моя свеча коптит?',
        answer: 'Скорее всего, фитиль слишком длинный. Потушите свечу, обрежьте фитиль и зажгите снова.',
      },
    ],
  },
  {
    category: 'Безопасность и конфиденциальность',
    items: [
      {
        question: 'Как защищены мои платежные данные?',
        answer: 'Мы не храним данные карт. Все платежи обрабатываются через защищённый шлюз [Платежная система].',
      },
      {
        question: 'Кто видит мои персональные данные?',
        answer: 'Только сотрудники службы доставки и поддержки. Мы не передаём данные третьим лицам.',
      },
    ],
  },
];

const FAQAccordion = () => {
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
    setActiveQuestionIndex(null); 
  };

  const toggleQuestion = (index) => {
    setActiveQuestionIndex(activeQuestionIndex === index ? null : index);
  };

  return (
    <section className="">
      <div className="my-8">
        <h6 className="text-center text-black text-2xl font-montserrat font-normal">
          Часто задаваемые вопросы (FAQ)
        </h6>

        <div className="w-full p-8">
          {faqData.map((category, catIndex) => (
            <div key={catIndex} className="mb-6 border border-gray-300 rounded-lg">
              <button
                className="w-full text-left px-6 py-4 flex justify-between items-center bg-gray-100 font-semibold text-lg text-gray-800 rounded-t-lg"
                onClick={() => toggleCategory(catIndex)}
              >
                <span>{category.category}</span>
                {openCategoryIndex === catIndex ? <FaMinus /> : <FaPlus />}
              </button>

              {openCategoryIndex === catIndex && (
                <div className="bg-white">
                  {category.items.map((item, qIndex) => (
                    <div key={qIndex} className="border-t border-gray-200">
                      <button
                        className="flex justify-between items-center w-full py-4 px-6 text-left font-medium font-montserrat text-gray-900 text-base"
                        onClick={() => toggleQuestion(qIndex)}
                      >
                        <span>{item.question}</span>
                        <span>{activeQuestionIndex === qIndex ? <FaMinus /> : <FaPlus />}</span>
                      </button>
                      {activeQuestionIndex === qIndex && (
                        <div className="py-3 px-6 bg-violet/20 text-gray-700 text-sm">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default FAQAccordion;
