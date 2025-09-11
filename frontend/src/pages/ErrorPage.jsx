import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AlertTriangle, Home, RotateCw } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-custom_gradient2 p-6 text-white">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="h-10 w-10" />
            <h1 className="text-3xl font-bold">Ошибка 404</h1>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-32 w-32 rounded-full bg-red-100 mb-6">
            <AlertTriangle className="h-16 w-16 text-red-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Страница не найдена</h2>
          <p className="text-gray-600 mb-8">
            Запрашиваемая страница не существует или была перемещена.
            Пожалуйста, проверьте URL или вернитесь на главную.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                На главную
              </Link>
            </Button>
            
            <Button variant="outline" className="gap-2">
              <RotateCw className="h-4 w-4" />
              Попробовать снова
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Если проблема повторяется, свяжитесь с нашей поддержкой</p>
        <a href="mailto:support@example.com" className="text-blue-500 hover:underline">
          support@example.com
        </a>
      </div>
    </div>
  );
}