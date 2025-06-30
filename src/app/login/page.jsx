'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import lib from '../../lib/login';

const formLogin = () => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ESTUDIANTE');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [recuerdame, setRecuerdame] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    if (!code || !password || !role) {
      return setError("Ingreso de datos inválido")
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await lib.Login(role, code, password, recuerdame);
      const login = await response.json();
      if (response.ok) {
        setIsVerified(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        if (role === 'ESTUDIANTE') {
          router.push(`/alumno?login=success`);
        } else {
          router.push('/profesor?login=success');
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Ups! '+err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <span className=" text-gray-600 inline-flex items-center justify-center rounded-full bg-white shadow h-20 w-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
              className="h-16 w-16"
              fill="none"
            >
              <rect x="6" y="18" width="28" height="14" rx="2" fill="#2563eb" />
              <rect x="12" y="24" width="6" height="8" rx="1" fill="#fff" />
              <rect x="22" y="24" width="6" height="8" rx="1" fill="#fff" />
              <polygon points="20,6 36,18 4,18" fill="#3b82f6" />
            </svg>
          </span>
        </div>
        <h2 className="grid my-6 text-center text-3xl font-extrabold text-gray-900 px-10">
          <span>
            Sistema SEVA
          </span>
          <span>
            Acceso
          </span>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 px-10">
          Plataforma de gestión académica para estudiantes y profesores
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-5 rounded-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* Pills para selección de rol */}
          <div className="flex mb-6 rounded-md bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => {setRole('ESTUDIANTE'); setCode(""); setPassword("")}}
              className={`flex-1 transition-all py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${role === 'ESTUDIANTE' ? 'focus:ring-blue-500 bg-white shadow text-blue-700' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Estudiante
            </button>
            <button
              type="button"
              onClick={() => {setRole('PROFESOR'); setCode(""); setPassword("")}}
              className={`flex-1 transition-all py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${role === 'PROFESOR' ? 'focus:ring-gray-500 bg-white shadow text-gray-700' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Profesor
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Código de usuario
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <rect x="3" y="5" width="14" height="10" rx="2" fill="currentColor" opacity="0.2"/>
                    <rect x="6" y="8" width="2" height="4" rx="1" fill="currentColor"/>
                    <rect x="9" y="8" width="2" height="4" rx="1" fill="currentColor"/>
                    <rect x="12" y="8" width="2" height="4" rx="1" fill="currentColor"/>
                    <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z" fill="currentColor"/>
                  </svg>
                </div>
                <input
                  id="code"
                  name="code"
                  type="text"
                  autoComplete="code"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="py-3 transition pl-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder={`código de ${role === 'ESTUDIANTE' ? 'estudiante' : 'docente'}`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-3 transition pl-10 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  value={recuerdame}
                  onChange={(e) => setRecuerdame(e.target.value)}
                  type="checkbox"
                  className={`h-4 w-4  border-gray-300 rounded cursor-pointer ${role==='ESTUDIANTE' ? 'accent-blue-600' : 'accent-gray-600'}`}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordar mis datos
                </label>
              </div>

              <div className="text-sm">
                {/* <Link href="/recuperar-contrasena">
                  <a className="font-medium text-blue-600 hover:text-blue-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </Link> */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full transition-all flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${role === 'ESTUDIANTE' ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : 'bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  isVerified ? (
                  <> 
                    <svg className="h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                      Verificado
                  </>
                  ) : (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verificando...                      
                    </>
                  )
                ) : (
                  `Acceder como ${role === 'ESTUDIANTE' ? 'estudiante' : 'profesor'}`
                )}
              </button>
            </div>
          </form>

          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  ¿Necesitas ayuda?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/soporte">
                <a className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Contacta al soporte técnico
                </a>
              </Link>
            </div>
          </div> */}
        </div>
      </div>

      <footer className="mt-8 text-center text-xs text-gray-500">
        <p>Sistema SEVA v1.0 - © {new Date().getFullYear()} Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default formLogin;