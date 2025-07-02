'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import docente from '../../lib/profesor';
import Link from 'next/link';

const TeacherDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('inicio');
  const [cursos, setCursos] = useState([]);
  const [code, setCode] = useState('');
  const [estudiantesNotas, setEstudiantesNotas] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState({});

  useEffect(() => {
    const getCode = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_API_URL}/api/user`);
      const result = await data.json();
      if (result?.id) {
        setCode(result.id);
      } else {
        console.error("No se obtuvo un ID de alumno válido");
      }
    };
    getCode();
  }, []);

  useEffect(() => {
    if (!code) return;

    const getAllData = async () => {
      try {
        const [profesorRes, cursosRes, asistenciasRes] = await Promise.all([
          docente.profesor(code),
          docente.cursosById(code),
          docente.asistenciasById(code)
        ]);

        const profesor = await profesorRes.json();
        const cursos = await cursosRes.json();
        const asistencias = await asistenciasRes.json();

        setTeacherInfo(profesor);
        setCursos(cursos);
        setAsistencias(asistencias);

      } catch (error) {
        console.error("Error al cargar datos del alumno:", error);
      }
    };

    getAllData();
  }, [code]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Resumen de cursos */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Mis Cursos</h3>
              <div className="overflow-x-auto overflow-y-auto max-h-[400px] w-full">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiantes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créditos</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horas</th>
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cursos?.filter(c => c?.CURSO?.CODIGOCU)
                    .map((curso) => (
                      <tr key={curso?.ID_CURSO} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link href={`/profesor/curso/${curso.CURSO?.CODIGOCU}`}>
                            <button className="text-gray-600 hover:text-gray-900 hover:underline focus:outline-2 focus:outline-gray-900 focus:outline-offset-4 rounded-sm">{curso?.CURSO?.CODIGOCU}</button>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso?.CURSO?.NOMBRE}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso?.MATRICULAS}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso?.CURSO?.CREDITOS}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{curso?.CURSO?.HORAS}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Últimos registros de asistencia */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Últimas Asistencias</h3>
              <div className="space-y-4">
                {asistencias?.filter(c => c?.ID_CRONOGRAMA)
                .slice(0, 3)
                .map((asistencia) => {
                  const total = asistencia.ASISTENCIA?.length || 0;
                  const asistenciasA = asistencia.ASISTENCIA?.filter(a => a.ESTADO === 'A').length || 0;
                  const asistenciasT = asistencia.ASISTENCIA?.filter(a => a.ESTADO === 'T').length || 0;
                  const asistenciasF = asistencia.ASISTENCIA?.filter(a => a.ESTADO === 'F').length || 0;
                  const porcentajeA = total > 0 ? (asistenciasA / total) * 100 : 0;

                  return (
                    <div key={asistencia?.ID_CRONOGRAMA} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between flex-wrap items-center pb-2 space-y-1">
                        <div className='grid place-items-center justify-items-start m-0'>
                          <h4 className="font-medium text-gray-800">{asistencia?.CURSO?.NOMBRE}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(asistencia?.ASISTENCIA?.[0]?.FECHA).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium text-green-600">{asistenciasA} presentes</span>
                          <span className="block text-xs font-medium text-red-600">{asistenciasF} ausentes</span>
                          <span className="block text-xs font-medium text-amber-600">{asistenciasT} tardanzas</span>
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-600 h-2 rounded-full"
                          style={{ width: `${porcentajeA}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg flex">
                  <div className='w-full flex flex-wrap'>
                    <p className="text-sm text-blue-800 font-medium w-full">Total Cursos</p>
                    <p className="text-2xl font-bold text-blue-600 w-full">{cursos.length}</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">Estudiantes</p>
                  <p className="text-2xl font-bold text-green-600">{cursos.reduce((acc, curso) => acc + (curso.MATRICULAS || 0), 0)}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium">Créditos</p>
                  <p className="text-2xl font-bold text-yellow-600">{cursos.reduce((acc, curso) => acc + (curso?.CURSO?.CREDITOS || 0), 0)}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'perfil':
        return (
          <div className="grid bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 w-full">Mi Perfil</h2>
            <div className="grid">
              <div className='w-full flex items-center justify-start mb-6'>
                <h3 className="text-lg font-medium text-gray-800">Información Personal</h3>
              </div>
              <div className='flex flex-col md:flex-row justify-between gap-y-5'>
                <div className="space-y-4 w-full">
                  <div>
                    <label className="block text-sm font-bold text-gray-700">Nombres Completos</label>
                    <p className="mt-1 text-sm text-gray-900">{teacherInfo?.NOMBRES+' '+teacherInfo?.APELLIDOS}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700">DNI</label>
                    <p className="mt-1 text-sm text-gray-900">{teacherInfo?.DNI}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700">Correo Electrónico</label>
                    <p className="mt-1 text-sm text-gray-900">{teacherInfo?.CORREO}</p>
                  </div>
                </div>
                <div className="space-y-4 w-full">
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">Especialidad</label>
                    <p className="mt-1 text-sm text-gray-900">{teacherInfo?.ESPECIALIDAD}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    <circle cx="24" cy="24" r="24" fill="#505050" />
                    <circle cx="24" cy="18" r="9" fill="#FBBF24" />
                    <ellipse cx="24" cy="34" rx="13" ry="8" fill="#F3F4F6" />
                    <circle cx="24" cy="18" r="7" fill="#FDE68A" />
                    <circle cx="24" cy="18" r="5" fill="#F59E42" />
                  </svg>
                  {/* <img className="h-12 w-12 rounded-full" src="/avatar-profesor.png" alt="Avatar" /> */}
                </div>
                <div>
                  <p className='text-gray-400 text-sm'># {teacherInfo?.USUARIO?.CODIGOU}</p>
                  <h2 className="text-lg font-semibold text-gray-800">{teacherInfo?.NOMBRES+' '+teacherInfo?.APELLIDOS}</h2>
                  <p className="text-sm text-gray-500">{teacherInfo?.ESPECIALIDAD}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Correo: {teacherInfo?.CORREO}
                </p>
              </div>
            </div>

            <nav className="bg-white rounded-lg shadow-md p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('inicio')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'inicio' ? 'bg-gray-200 text-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Inicio
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('perfil')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'perfil' ? 'bg-gray-200 text-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Perfil
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r bg-gray-500 to-gray-800 rounded-lg shadow-md p-6 mb-6 text-white">
              <h2 className="text-2xl font-bold mb-2">¡Bienvenido(a), Prof. {teacherInfo?.NOMBRES+' '+teacherInfo?.APELLIDOS}!</h2>
              <p className="opacity-90">Gestiona tus cursos, registra notas y asistencias desde tu panel.</p>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;