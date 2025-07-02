'use client'
import login from '../../lib/login';
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function RootLayout({ children }) {
  const [loadingLogout, setLoadingLogout] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoadingLogout(true);
    await login.logout();
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push("/");
  }

  if (loadingLogout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg className="animate-spin mx-auto h-12 w-12 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-700">Cerrando sesión...</p>
        </div>
      </div>
    );
  }
  return (
    <body>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                className="h-10 w-10 mr-2"
                fill="none"
              >
                <rect x="6" y="18" width="28" height="14" rx="2" fill="#2563eb" />
                <rect x="12" y="24" width="6" height="8" rx="1" fill="#fff" />
                <rect x="22" y="24" width="6" height="8" rx="1" fill="#fff" />
                <polygon points="20,6 36,18 4,18" fill="#3b82f6" />
                <rect x="18" y="28" width="4" height="4" rx="1" fill="#2563eb" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-gray-800">SEVA - Docente</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition">
                <span className="sr-only">Notificaciones</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700 text-sm font-medium p-3 rounded-md hover:bg-gray-100 transition"
              onClick={() => {logout()}}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>        
        {children}
    </body>
  );
}