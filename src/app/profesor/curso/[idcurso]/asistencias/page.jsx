'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import docente from '../../../../../lib/profesor';
import Link from 'next/link';

export default function CargarNotasEstudiante() {
  const idcurso = useParams().idcurso;
  const fecha = atob(useSearchParams().get('fecha'));
  const router = useRouter();

  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [estudiantes, setEstudiantes] = useState(null);
  const [error, setError] = useState('');


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
          const [alumnosRes] = await Promise.all([
            docente.alumnosById(code,idcurso)
          ]);
          
          const alumnos = await alumnosRes.json();

          setEstudiantes(alumnos);

        } catch (error) {
          console.error("Error al cargar datos del alumno:", error);
        }
      };
    
    getAllData();
    setLoading(false);

  }, [code]);

  const handleNotaChange = (id, value) => {
    setNotas(notas.map(nota => 
      nota.id === id ? { ...nota, valor: value ? parseFloat(value) : null } : nota
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validar notas
      const notasInvalidas = notas.filter(n => 
        n.valor !== null && (n.valor < 0 || n.valor > n.max)
      );
      
      if (notasInvalidas.length > 0) {
        setError(`Las notas deben estar entre 0 y ${notasInvalidas[0].max}`);
        return;
      }

      // Simular envío a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aquí iría la llamada real a la API para guardar las notas
      console.log('Notas a guardar:', notas);
      
      // Redirigir después de guardar
      router.push(`/dashboard/teacher/cursos/${idcurso}`);
    } catch (err) {
      setError('Error al guardar las notas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const alerta = () => {
    alert("Solo podrá subir las notas una vez, asegúrese de que los datos sean correctos.");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg className="animate-spin mx-auto h-12 w-12 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-700">Cargando información de asistencias...</p>
        </div>
      </div>
    );
  }

  if (!estudiantes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mt-4 text-lg text-gray-700">No se pudo cargar la información de asistencias</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg">
          {/* Header */}
          <div className="flex bg-gray-600 px-10 py-5 items-center sticky top-0 transition-all z-10 rounded-t-lg">
            <div className='block'>
              <h1 className="text-2xl font-bold text-white">{estudiantes?.[0]?.CURSO?.NOMBRE} - {estudiantes?.[0]?.CURSO?.CODIGOCU}</h1>
              <p className="text-gray-100">Fecha: {fecha}</p>
            </div>
            <div className="ml-auto flex items-center">
              <Link href={`/profesor/curso/${idcurso}`}>
              <button
                className='flex text-sm items-center justify-center active:bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-3 rounded-3xl transition duration-200'
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white"
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
              <div className="flex items-center mb-4">
                <svg className="h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800">Asistencias</h2>
              </div>
              
              <div className="overflow-x-auto">
                <form>
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estudiante
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Estado
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                  {estudiantes?.filter(c => c?.ID_CRONOGRAMA)
                  .map((estudiante, index) => (                      
                        <tr key={estudiante?.ID_CRONOGRAMA} className='hover:bg-gray-50'>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {estudiante?.MATRICULA?.ESTUDIANTE?.NOMBRES+' '+estudiante?.MATRICULA?.ESTUDIANTE?.APELLIDOS}
                            </td>
                            <td className='flex justify-evenly  items-center px-6 py-4 whitespace-nowrap text-sm font-medium'>
                              <div className='flex items-center space-x-2 justify-evenly'>
                              <span className="px-2 py-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800 items-center gap-1">
                                  <input type="radio" name={`asistencia-${index}`} id={`option-${index}-1`} value={1} required/>
                                  <label htmlFor={`option-${index}-1`}>Asistencia</label>
                              </span>
                              </div>
                              <div className='flex items-center space-x-2 justify-evenly'>
                              <span className="px-2 py-1 inline-flex leading-5 font-semibold rounded-full bg-red-100 text-red-800 items-center gap-1">
                                  <input type="radio" name={`asistencia-${index}`} id={`option-${index}-2`} value={2} required/>
                                  <label htmlFor={`option-${index}-2`}>Falta</label>
                              </span>
                              </div>
                              <div className='flex items-center space-x-2 justify-evenly'>
                              <span className="px-2 py-1 inline-flex leading-5 font-semibold rounded-full bg-amber-100 text-amber-800 items-center gap-1">
                                  <input type="radio" name={`asistencia-${index}`} id={`option-${index}-3`} value={3} required/>
                                  <label htmlFor={`option-${index}-3`}>Tardanza</label>
                              </span>
                              </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                    <div className='w-full flex justify-end items-center'>
                        <button className='mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200'>
                            Guardar Asistencia
                        </button>
                    </div>
                </form>
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