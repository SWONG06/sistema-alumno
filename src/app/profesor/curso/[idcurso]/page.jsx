'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('notas');
  const [cursos, setCursos] = useState([]);
  const [estudiantesNotas, setEstudiantesNotas] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [teacherInfo, setTeacherInfo] = useState({
    nombre: 'Ana García',
    especialidad: 'Ingeniería de Software',
    correo: 'ana.garcia@example.edu.pe',
    dni: '12345678'
  });
  const router = useRouter();

  // Simulación de datos (en una aplicación real, estos vendrían de tu API)
  useEffect(() => {
    // Datos de ejemplo para los cursos del profesor
    setCursos([
      { id: 1, codigo: 'PW101', nombre: 'Programación Web', carrera: 'Ing. Software', ciclo: 'V', estudiantes: 25, horario: 'Lunes y Miércoles 8:00-10:00' },
      { id: 2, codigo: 'BD201', nombre: 'Base de Datos', carrera: 'Ing. Software', ciclo: 'IV', estudiantes: 30, horario: 'Martes y Jueves 10:00-12:00' },
      { id: 3, codigo: 'ALG301', nombre: 'Algoritmos', carrera: 'Ciencia de Datos', ciclo: 'III', estudiantes: 20, horario: 'Viernes 14:00-18:00' },
    ]);

    // Datos de ejemplo para estudiantes y notas (de un curso específico)
    setEstudiantesNotas([
      { id: 1, nombre: 'Juan Pérez', dni: '87654321', practica: 16, teoria: 14, ponderacion: 15, estado: 'A' },
      { id: 2, nombre: 'María López', dni: '76543218', practica: 18, teoria: 12, ponderacion: 14, estado: 'A' },
      { id: 3, nombre: 'Carlos Ramírez', dni: '65432187', practica: 10, teoria: 8, ponderacion: 9, estado: 'D' },
      { id: 4, nombre: 'Luisa Fernández', dni: '54321876', practica: 15, teoria: 17, ponderacion: 16, estado: 'A' },
    ]);

    // Datos de ejemplo para registros de asistencia
    setAsistencias([
      { id: 1, fecha: '2023-05-15', curso: 'Programación Web', presentes: 22, ausentes: 3, total: 25 },
      { id: 2, fecha: '2023-05-16', curso: 'Base de Datos', presentes: 28, ausentes: 2, total: 30 },
      { id: 3, fecha: '2023-05-17', curso: 'Algoritmos', presentes: 18, ausentes: 2, total: 20 },
    ]);
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    router.push('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notas':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Registro de Notas</h2>
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500">
                <option>Programación Web - Ciclo V</option>
                <option>Base de Datos - Ciclo IV</option>
                <option>Algoritmos - Ciclo III</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Práctica</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ponderación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {estudiantesNotas.map((estudiante) => (
                    <tr key={estudiante.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-gray-600 hover:text-gray-900 hover:underline focus:outline-2 focus:outline-gray-900 focus:outline-offset-4 rounded-sm">{estudiante.nombre}</button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estudiante.dni}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="number" 
                          defaultValue={estudiante.practica} 
                          className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="number" 
                          defaultValue={estudiante.teoria} 
                          className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {estudiante.ponderacion.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${estudiante.estado === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {estudiante.estado === 'A' ? 'Aprobado' : 'Desaprobado'}
                        </span>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-gray-600 hover:text-gray-400">Editar</button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-sm font-medium">
                Exportar a Excel
              </button>
            </div>
          </div>
        );
      case 'asistencias':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Registro de Asistencias</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Datos</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {asistencias.map((asistencia) => (
                    <tr key={asistencia.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-gray-600 hover:text-gray-900 hover:underline focus:outline-2 focus:outline-gray-900 focus:outline-offset-4 rounded-sm">{new Date(asistencia.fecha).toLocaleDateString()}</button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium flex justify-evenly">
                        <div className='flex items-center space-x-2 justify-evenly'>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
                            Asistencias:
                          </span>
                          <p>0</p>
                        </div>
                        <div className='flex items-center space-x-2 justify-evenly'>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800`}>
                            Faltas:
                          </span>
                          <p>0</p>
                        </div>
                        <div className='flex items-center space-x-2 justify-evenly'>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800`}>
                            Tardanzas:
                          </span>
                          <p>0</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  <h2 className="text-lg font-semibold text-gray-800">{teacherInfo.nombre}</h2>
                  <p className="text-sm text-gray-500">{teacherInfo.especialidad}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 flex items-center">
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {teacherInfo.correo}
                </p>
              </div>
            </div>

            <nav className="bg-white rounded-lg shadow-md p-4 sticky top-10 left-0 w-64">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('notas')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'notas' ? 'bg-gray-200 text-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Registro de Notas
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('asistencias')}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === 'asistencias' ? 'bg-gray-200 text-gray-800' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Control de Asistencias
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;