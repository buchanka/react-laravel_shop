import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { IoIosSearch } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function SearchPopup({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
            onClose();
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10 opacity-85" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="fixed h-screen w-full transform rounded-none bg-black p-6 text-left align-middle shadow-xl transition-all">
                                <div className="absolute top-4 right-4">
                                    <button onClick={onClose} type="button"> 
                                        <XMarkIcon className="h-6 w-6 text-white" />
                                    </button>
                                </div>

                                <Dialog.Title
                                    as="h3"
                                    className="flex justify-center text-lg font-montserrat font-medium leading-6 text-white"
                                >
                                    Поиск
                                </Dialog.Title>

                                <div className="flex flex-col">
                                    <form onSubmit={handleSearch} className="relative mt-6 flex justify-center items-center">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <IoIosSearch className="h-6 w-6 text-white" />
                                            </div>
                                            <input
                                                type="search"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="lg:w-[900px] bg-black border border-white text-white rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-montserrat sm:w-[500px]"
                                                placeholder="Найти..."
                                            />
                                            <button className="absolute inset-y-0 right-0 pr-3 flex items-center" type="submit"> 
                                                <MdOutlineArrowRightAlt className="h-5 w-5 text-griff" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
