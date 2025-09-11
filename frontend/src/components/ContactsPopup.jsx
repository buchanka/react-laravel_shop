import React, { useState } from 'react';
import PhoneIconSmall from "../contexts/icons/PhoneIcon";
import { XMarkIcon } from '@heroicons/react/24/outline';

function ContactsPopup() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => setIsOpen(!isOpen);
    const phoneNumber = '88005553535'; 
    const email = 'example@email.com';
    const address = 'ул. Летняя д.34 к2';

    return (
        <>
            <button onClick={togglePopup} aria-label="Контакты" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <PhoneIconSmall className="h-5 w-5" />
            </button>

            {isOpen && (
            <section itemScope itemType='http://schema.org/Organization'>
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={togglePopup}></div>
                    <div className="bg-white rounded-md shadow-lg p-4 z-50 w-[30%] h-48 relative">
                        <button 
                            onClick={togglePopup} 
                            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                        >
                            <XMarkIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                        </button>
                        <div className='text-black font-montserrat text-xl font-normal text-center align-baseline p-2'>
                            <h1>Контакты</h1>
                        </div>
                        <div className="text-black font-montserrat text-xl font-medium text-center">
                            <p>
                                <a href={`tel:${phoneNumber}`} className="underline hover:text-blue-500">
                                    Телефон: <span itemProp='telephone'>+7 {phoneNumber.slice(0, 3)} {phoneNumber.slice(3, 6)} {phoneNumber.slice(6, 8)} {phoneNumber.slice(8)}</span>
                                </a>
                            </p>
                            <p>
                                <a href={`mailto:${email}`} className="underline hover:text-blue-500">
                                    Почта: <span itemProp='email'>{email}</span>
                                </a>
                            </p>
                            <p>
                                <a>
                                    Адрес: <span itemProp='address'>{address}</span>
                                </a>
                            </p>
                            
                        </div>
                    </div>
                </div>
            </section>
            )}
        </>
    );
}

export default ContactsPopup;





