'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import alumno from '../../../../lib/estudiante';
import Link from 'next/link';

export default function CursoDetalleAlumno() {
  const [code, setCode] = useState(null);
  const { idCurso } = useParams();
  const [notas, setNotas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [asistencias, setAsistencias] = useState(null);

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
          const [notasRes, asistenciasRes] = await Promise.all([
            alumno.notasById(code),
            alumno.asistenciasById(code),
          ]);
          
          const notasLis = await notasRes.json();
          const asists = await asistenciasRes.json();


          setNotas(notasLis);
          setAsistencias(asists);

        } catch (error) {
          console.error("Error al cargar datos del alumno:", error);
        }
      };
    
    getAllData();
    setIsLoading(false);

  }, [code]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg className="animate-spin mx-auto h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-700">Cargando información del curso...</p>
        </div>
      </div>
    );
  }

  if (!notas) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mt-4 text-lg text-gray-700">No se pudo cargar la información del curso</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto rounded-b-lg">
        {/* <div className="bg-white shadow-lg rounded-lg overflow-hidden"> */}
        <div className="bg-white shadow-lg rounded-lg">

          {/* Header del curso */}
          <div className="flex bg-blue-600 px-10 py-5 items-center sticky top-0 transition-all z-10 rounded-t-lg">
              {notas
                ?.filter(c => c?.CURSO?.CODIGOCU === idCurso)
                ?.map((curso) => (
                  <div key={curso.CURSO.ID_CURSO} className='block'>
                    <h1 className="text-2xl font-bold text-white">{curso.CURSO.NOMBRE}</h1>
                    <p className="text-blue-100">Profesor(a): {curso.PROFESOR.NOMBRES +' '+curso.PROFESOR.APELLIDOS }</p>
                  </div>
                ))
              }
            <div className="ml-auto flex items-center">
              <Link href={`/alumno`}>
                <button className='flex text-sm items-center justify-center active:bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-3xl transition duration-200'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Regresar
                </button>
              </Link>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="p-10 space-y-8">
            {/* Sección de Notas */}
            <div>
              <div className="flex items-center mb-4">
                <svg className="h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800">Notas</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-20 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Práctica
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nota
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      notas
                        ?.filter(c => c?.CURSO?.CODIGOCU === idCurso) 
                        ?.flatMap(c => c.NOTA)
                        ?.filter(n => n?.ID_NOTA)
                        ?.map((nota) => (
                          <tr key={nota.ID_NOTA} className='hover:bg-gray-50'>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {nota.UNIDAD}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {nota.PROMEDIOP}
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </table>

                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teoría
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nota
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      notas
                        ?.filter(c => c?.CURSO?.CODIGOCU === idCurso) 
                        ?.flatMap(c => c.NOTA)
                        ?.filter(n => n?.ID_NOTA)
                        ?.map((nota) => (
                          <tr key={nota.ID_NOTA} className='hover:bg-gray-50'>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {nota.UNIDAD}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {nota.PROMEDIOT}
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sección de Asistencias */}
            <div>
              <div className="flex items-center mb-4">
                <svg className="h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800">Asistencias</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 text-center">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      asistencias
                        ?.filter(c => c?.CURSO?.CODIGOCU === idCurso) 
                        ?.flatMap(c => c.ASISTENCIA)
                        ?.filter(n => n?.ID_ASISTENCIA)
                        ?.map((asistencia) => (
                            <tr key={asistencia.ID_ASISTENCIA} className='hover:bg-gray-50 text-center'>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {new Date(asistencia.FECHA).toLocaleDateString()}
                              </td>
                              <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${asistencia.ESTADO === 'F' ? 'text-red-600' : (asistencia.ESTADO=== 'A' ? 'text-green-600' : 'text-amber-600')}`}>
                                <div>
                                  <span className={`py-1 px-2 rounded-2xl outline-2 items-center ${asistencia.ESTADO === 'F' ? 'outline-red-600' : (asistencia.ESTADO=== 'A' ? 'outline-green-600' : 'outline-amber-600')}`}>{asistencia.ESTADO}</span>
                                </div>
                              </td>
                            </tr>
                        ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Sistema SEVA v1.0 - © {new Date().getFullYear()} Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}