import React, { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
//контекст меню
import { useMenuContext } from '../contexts/BurgerMenuContext/MenuContext';
//иконки соцсетей
import { SiPinterest } from 'react-icons/si';
import { RiTelegramLine } from 'react-icons/ri';
import { FaVk } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import api from '../services/api';

function MultilevelMenu({ isBurgerOpen, onClose }) {
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
            const fetchCategories = async () => {
                try {
                    const response = await api.get('/categories');
                    setCategories(response.data);
                } catch (error) {
                    console.error('Ошибка при загрузке категорий:', error);
                }
            };
    
            fetchCategories();
        }, []);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const response = await api.get('/collections');
                setCollections(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке коллекций:', error);
            }
        };

        fetchCollections();
    }, []);
    
    const {isMenuOpen, setIsMenuOpen} = useMenuContext();
    return (
        <Transition appear show={isBurgerOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 -translate-x-full"
                    enterTo="opacity-100 -translate-x-0"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 -translate-x-0"
                    leaveTo="opacity-0 -translate-x-full"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 "
                    leaveTo="opacity-0 "
                >
                    <Dialog.Panel className="fixed inset-y-0 max-w-[600px] min-w-[400px] bg-white p-6 text-left shadow-xl transition-all transform">
                            <div className="relative text-right bottom-3">
                                <button onClick={onClose} type="button"> 
                                    <XMarkIcon className="h-6 w-6 text-gray-400" />
                                </button>
                            </div>
                            
                        
                        <Dialog.Title
                            as="h3"
                            className="flex justify-center text-lg font-montserrat font-medium leading-6 text-gray-900"
                        >
                            Меню
                        </Dialog.Title>
                        <div>
                            <nav className="bg-icecream p-2 m-2 border-y border-momo">
                                <div className='flex flex-col space-y-4'>
                                    <Link to="/catalog">
                                        <div className="font-montserrat text-black font-medium">Каталог</div>
                                    </Link>
                                    {categories.map(category => (
                                        <Link 
                                            key={category.id} 
                                            to={{
                                                pathname: '/catalog',
                                                search: `?categories=${category.id}`
                                            }}
                                                state={{ fromCategory: true }}
                                        >
                                                <div className="font-montserrat text-black font-medium">
                                                    {category.name}
                                                </div>
                                        </Link>
                                    ))}
                                    {collections.map(collection => (
                                        <Link 
                                            key={collection.id} 
                                            to={{
                                                pathname: '/catalog',
                                                search: `?collections=${collection.id}`
                                            }}
                                                state={{ fromCollection: true }}
                                        >
                                                <div className="font-montserrat text-black font-medium">
                                                    {collection.name}
                                                </div>
                                        </Link>
                                    ))}
                                    <Link to="/faq">
                                        <div className="font-montserrat text-black font-medium">Поддержка</div>
                                    </Link>
                                </div> 
                            </nav>
                            <div className='relative flex flex-row justify-center items-center'>
                                <a href="https://ru.pinterest.com/" target="_blank" rel="noopener noreferrer">
                                    <SiPinterest className='size-10'/>
                                </a>

                                <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer">
                                    <RiTelegramLine className='size-12'/>
                                </a>

                                <a href="https://vk.com/" target="_blank" rel="noopener noreferrer">
                                    <FaVk className='size-11'/>
                                </a>
                                
                            </div>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}

export default MultilevelMenu;
