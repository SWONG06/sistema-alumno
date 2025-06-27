export default function RootLayout({ children }) {
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
            <h1 className="text-xl font-semibold text-gray-800">SEVA - Profesor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                <span className="sr-only">Notificaciones</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </div>
            <button
              className="text-gray-600 hover:text-gray-700 text-sm font-medium"
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