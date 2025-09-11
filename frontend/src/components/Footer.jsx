import React, { useState, useEffect } from "react";
import './Footer.css';
import { Link } from "react-router-dom";
import PinterestIcon from "../contexts/icons/PinterestIcon";
import TelegramIconSmall from "../contexts/icons/TelegramIcon";
import VkIconSmall from "../contexts/icons/VkIcon";
import api from '../services/api';

function Footer() {
    const [categories, setCategories] = useState([]);

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

    return(
        <footer className="bg-black/20">
            <div className="max-w-screen-xl px-4 pt-16 pb-6 mx-auto sm:px-6 lg:px-8 lg:pt-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-row items-center justify-center space-x-4 mt-5">
                            <a href="https://ru.pinterest.com/" target="_blank" rel="noopener noreferrer">
                                <PinterestIcon className='size-10'/>
                            </a>
                            <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer">
                                <TelegramIconSmall className='size-12'/>
                            </a>
                            <a href="https://vk.com/" target="_blank" rel="noopener noreferrer">
                                <VkIconSmall className='size-11'/>
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 rounded-xl p-6 backdrop-blur-sm bg-black/10">
                        <div className="text-center sm:text-left">
                            <p className="text-lg font-montserrat font-medium text-momo">Каталог</p>
                            <nav className="mt-6">
                                <div className="space-y-4 text-base">
                                    {categories.slice(0, 4).map(category => (
                                        <div key={category.id}>
                                            <Link 
                                                to={{
                                                    pathname: '/catalog',
                                                    search: `?categories=${category.id}`
                                                }}
                                                state={{ fromCategory: true }}
                                                className="text-white transition hover:text-white/75"
                                            >
                                                {category.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </nav>
                        </div>

                        <div className="text-center sm:text-left">
                            <p className="text-lg font-montserrat font-medium text-momo">Помощь</p>
                            <nav className="mt-6">
                                <div className="space-y-4 text-base">
                                    <div>
                                        <Link to="/faq" className="text-white transition hover:text-white/75">
                                            FAQ
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="pt-6 mt-12 border-t border-white/50">
                    <div className="text-center sm:flex sm:justify-between sm:text-left">
                        <p className="text-base text-white/80 space-x-1">
                            <span className="block sm:inline">Все права защищены.</span>
                        </p>
                        <p className="mt-4 text-base text-white/80 sm:order-first sm:mt-0">
                            &copy; 2025 avalon
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;