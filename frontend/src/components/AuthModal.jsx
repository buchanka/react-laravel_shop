import React, { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

export default function AuthModal({ isOpen, onClose, type }) {
  const [activeForm, setActiveForm] = useState(type);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveForm(type);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, type]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity duration-200" 
        onClick={handleClose}
      ></div>
      
      <div className={`bg-white rounded-md shadow-lg p-6 z-50 w-full max-w-2xl md:max-w-xl sm:max-w-lg relative transition-all duration-200 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 focus:outline-none transition-colors"
          aria-label="Закрыть"
        >
          <FaXmark className="h-6 w-6 text-gray-600 hover:text-gray-800" />
        </button>

        <div className="flex justify-center mb-4 gap-2">
          <button
            onClick={() => setActiveForm("login")}
            className={`px-4 py-2 rounded transition-colors ${activeForm === "login" ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Вход
          </button>
          <button
            onClick={() => setActiveForm("signup")}
            className={`px-4 py-2 rounded transition-colors ${activeForm === "signup" ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Регистрация
          </button>
        </div>

        {activeForm === "signup" ? (
          <SignupForm 
            onSwitchForm={setActiveForm} 
            onSuccess={handleClose} 
          />
        ) : (
          <LoginForm 
            onSwitchForm={setActiveForm} 
            onSuccess={handleClose} 
          />
        )}
      </div>
    </div>
  );
}
