'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import alumno from '../../lib/estudiante';

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('userId');
  const [activeTab, setActiveTab] = useState('inicio');
  const [notas, setNotas] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    // MATRICULAs: [{}],
    // USUARIO: {}
  });

  useEffect(() => {
    const getStudent= async () => {
      try {
        const response = await alumno.alumno(code);
        const estudiante = await response.json();
        // console.log(estudiante[0]);
        setStudentInfo(estudiante[0]);
        // console.log("xddd : "+estudiante);
      } catch (error) {
        console.log("Ocurrió un error inesperado: "+error);
      }
    }
    const getNotas = async () => {
      try {
        const response = await alumno.notasById(code);
        const notas = await response.json();
        // console.log(notas);
        setNotas(notas);
      } catch (error) {
        console.log("Ocurrió un error inesperado: "+error);
      }
    }
    const getAsistencias = async () => {
      try {
        const response = await alumno.asistenciasById(code);
        const asistencias = await response.json();
        // console.log(asistencias);
        setAsistencias(asistencias);
      } catch (error) {
        console.log("Ocurrió un error inesperado: "+error);
      }
    }
    const getCursos = async () => {
      try {
        const response = await alumno.cursosById(code);
        const cursos = await response.json();
        // console.log(cursos);
        setCursos(cursos);
      } catch (error) {
        console.log("Ocurrió un error inesperado: "+error);
      }
    }
    getStudent()
    getNotas()
    getAsistencias()
    getCursos()

    // Datos de ejemplo para pagos
    setPagos([
      { id: 1, fecha: '2023-03-15', monto: 1200, estado: 'Pagado' },
      { id: 2, fecha: '2023-04-10', monto: 800, estado: 'Pagado' },
      { id: 3, fecha: '2023-05-05', monto: 1000, estado: 'Pendiente' },
    ]);
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    router.push('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resumen de notas */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Notas</h3>
              <div className="space-y-3">
                {notas?.filter(c => c?.NOTA?.[0]?.ID_NOTA)
                  .slice(0, 4)
                  .map((nota) => (
                    <div key={"nota-"+nota?.NOTA?.[0]?.ID_NOTA} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <button className="text-gray-600 hover:text-gray-900 hover:underline focus:outline-2 focus:outline-gray-900 focus:outline-offset-4 rounded-sm">
                          {nota?.CURSO?.NOMBRE}
                        </button>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${parseFloat(nota?.NOTA?.[0]?.PROMEDIOP) > 14.5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {parseFloat(nota?.NOTA?.[0]?.PROMEDIOP)}
                      </span>
                    </div>
                ))}
              </div>
              <Link href="#notas" onClick={() => {setActiveTab('notas')}} className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todas las notas →
              </Link>
            </div>

            {/* Asistencias recientes */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Asistencias Recientes</h3>
              <div className="space-y-3">
                {asistencias?.filter(c => c?.ASISTENCIA?.[0]?.ID_ASISTENCIA)
                  .slice(0, 3)
                  .map((asistencia) => (
                  <div key={"asistencia-"+asistencia?.ASISTENCIA?.[0]?.ID_ASISTENCIA} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium text-gray-800">{asistencia?.CURSO?.NOMBRE}</span>
                      <span className="block text-xs text-gray-500">{new Date(asistencia?.ASISTENCIA?.[0]?.FECHA).toLocaleDateString()}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${asistencia?.ASISTENCIA?.[0]?.ESTADO === 'A' ? 'bg-green-100 text-green-800' : (asistencia?.ASISTENCIA?.[0]?.ESTADO==='F' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800')}`}>
                      {asistencia?.ASISTENCIA?.[0]?.ESTADO === 'A' ? 'Asistió' : (asistencia?.ASISTENCIA?.[0]?.ESTADO==='F' ? 'Falta' : 'Tardanza')}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="#asistencias" onClick={() => setActiveTab('asistencias')} className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todas las asistencias →
              </Link>
            </div>

            {/* Cursos matriculados */}
            <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cursos Matriculados</h3>
              <div className="space-y-4">
                {cursos?.filter(c => c?.CURSO?.ID_CURSO)
                  .slice(0, 2)
                  .map((curso) => (
                  <div key={"curso-"+curso?.CURSO?.ID_CURSO} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-medium text-gray-800">{curso?.CURSO?.NOMBRE}</h4>
                    <p className="text-sm text-gray-600 mt-1">Profesor: {curso?.CURSO?.PROFESOR?.NOMBRES+' '+curso?.CURSO?.PROFESOR?.APELLIDOS}</p>
                    <div className="flex justify-between mt-2 text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Créditos: {curso?.CURSO?.CREDITOS}</span>
                      <span className="text-gray-500">Horas: {curso?.CURSO?.HORAS}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'notas':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Notas</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className='text-center'>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Práctica</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Teoría</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Promedio Unidad</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {notas?.filter(c => c?.NOTA?.[0]?.ID_NOTA)
                  .map((nota) => (
                    <tr key={"notad-"+nota?.NOTA?.[0]?.ID_NOTA} className="hover:bg-gray-50 text-center">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <button className="text-gray-600 hover:text-gray-900 hover:underline focus:outline-2 focus:outline-gray-900 focus:outline-offset-4 rounded-sm">{nota?.CURSO?.NOMBRE}</button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parseFloat(nota?.NOTA?.[0]?.PROMEDIOP) }</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parseFloat(nota?.NOTA?.[0]?.PROMEDIOT) }</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{((parseFloat(nota?.NOTA?.[0]?.PROMEDIOP)+parseFloat(nota?.NOTA?.[0]?.PROMEDIOT))/2).toFixed(2) }</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${'A' === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {(parseFloat(nota?.NOTA?.[0]?.PROMEDIOP)+parseFloat(nota?.NOTA?.[0]?.PROMEDIOT))/2 > 14 ? 'Aprobado' : 'Desaprobado'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'asistencias':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Asistencias</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className='text-center'>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {asistencias?.filter(c => c?.ASISTENCIA?.[0]?.ID_ASISTENCIA)
                  .map((asistencia) => (
                    <tr key={"asistenciad-"+asistencia?.ASISTENCIA?.[0]?.ID_ASISTENCIA} className="hover:bg-gray-50 text-center">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asistencia?.CURSO?.NOMBRE}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(asistencia?.ASISTENCIA?.[0]?.FECHA).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${asistencia?.ASISTENCIA?.[0]?.ESTADO === 'A' ? 'bg-green-100 text-green-800' : (asistencia?.ASISTENCIA?.[0]?.ESTADO==='F' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800')}`}>
                          {asistencia?.ASISTENCIA?.[0]?.ESTADO === 'A' ? 'Asistió' : (asistencia?.ASISTENCIA?.[0]?.ESTADO==='F' ? 'Falta' : 'Tardanza')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'cursos':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Cursos</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 ">
              {cursos?.filter(c => c?.CURSO?.ID_CURSO)
              .map((curso) => (
                <div key={"cursod-"+curso?.CURSO?.ID_CURSO} className="border box-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-5 bg-white box-border">
                    <p className='text-gray-400 text-sm'>#{curso?.CURSO?.CODIGOCU}</p>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{curso?.CURSO?.NOMBRE}</h3>
                    <p className="text-sm text-gray-600 mb-3">Profesor: {curso?.CURSO?.PROFESOR?.NOMBRES+' '+curso?.CURSO?.PROFESOR?.APELLIDOS}</p>
                    <div className="flex justify-between text-sm py-2 cursor-default">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Créditos: {curso?.CURSO?.CREDITOS}</span>
                      <span className="text-blue-800 py-1 px-2 rounded-sm bg-blue-100">Horas: {curso?.CURSO?.HORAS}</span>
                    </div>
                    <p className='text-gray-600 mb-4 py-1 px-2 rounded-md bg-gray-100 text-sm'>Cursación: {curso?.CURSACION}</p>
                    <Link href={`alumno/curso/${curso?.CURSO?.CODIGOCU}?userId=${code}`}>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 transition ring-blue-600 hover:ring-2 ring-offset-2 text-white py-2 px-4 rounded-md duration-300">
                          Ver detalles
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'pagos':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mis Pagos</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pagos.map((pago) => (
                    <tr key={pago.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(pago.fecha).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">S/ {pago.monto.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${pago.estado === 'Pagado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {pago.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Ver recibo</button>
                        {pago.estado === 'Pendiente' && (
                          <button className="text-green-600 hover:text-green-900">Pagar ahora</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'perfil':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Mi Perfil</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Información Personal</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">Nombres Completos</label>
                    <p className="mt-1 text-sm text-gray-900">{studentInfo.NOMBRES && studentInfo.APELLIDOS ? studentInfo.NOMBRES+' '+studentInfo.APELLIDOS : 'No disponible'}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">DNI</label>
                    <p className="mt-1 text-sm text-gray-900">{studentInfo.DNI ? studentInfo.DNI : 'No disponible'}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">Correo Electrónico</label>
                    <p className="mt-1 text-sm text-gray-900">{studentInfo.CORREO ? studentInfo.CORREO : 'No disponible'}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Información Académica</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">Carrera</label>
                    <p className="mt-1 text-sm text-gray-900">{studentInfo.MATRICULAs[0].CARRERA.NOMBRE ? studentInfo.MATRICULAs[0].CARRERA.NOMBRE : 'No disponible'}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 font-bold">Ciclo Actual</label>
                    <p className="mt-1 text-sm text-gray-900">{studentInfo.MATRICULAs[0].CICLO ? studentInfo.MATRICULAs[0].CICLO : 'No disponible'}°</p>
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
                    viewBox="0 0 48 48"
                    className="h-12 w-12 rounded-full"
                  >
                    <circle cx="24" cy="24" r="24" fill="#e0e7ef" />
                    <circle cx="24" cy="18" r="9" fill="#90caf9" />
                    <ellipse cx="24" cy="36" rx="13" ry="8" fill="#64b5f6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{studentInfo.NOMBRES} {studentInfo.APELLIDOS}</h2>
                  <p className="text-sm text-gray-500">{studentInfo.CARRERA}</p>
                </div>
              </div>
              <div className="grid space-y-2 border-t border-gray-200 pt-4 items-center">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Ciclo: {studentInfo.MATRICULAs?.[0]?.CICLO}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2" />
                  </svg>
                  Periodo: {studentInfo.MATRICULAs?.[0]?.PERIODO}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="#e0e7ef" />
                    <path d="M8 12l2 2 4-4" stroke="#34d399" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Condicion: {studentInfo.MATRICULAs?.[0]?.CONDICION}
                </p>                 
              </div>
            </div>

            <nav className="bg-white rounded-lg shadow-md p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('inicio')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'inicio' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
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
                    onClick={() => setActiveTab('notas')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'notas' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Mis Notas
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('asistencias')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'asistencias' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Asistencias
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('cursos')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'cursos' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Cursos
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('pagos')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'pagos' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pagos
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('perfil')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'perfil' ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
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
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-6 mb-6 text-white">
              <h2 className="text-2xl font-bold mb-2">¡Bienvenido(a), {studentInfo.NOMBRES}!</h2>
              <p className="opacity-90">Revisa tus notas, asistencias y más en tu panel de estudiante.</p>
            </div>

            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;