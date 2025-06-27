'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '../../../../../components/Modal';

export default function CargarNotasEstudiante() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { idCurso, idEstudiante } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [curso, setCurso] = useState(null);
  const [estudiante, setEstudiante] = useState(null);
  const [notas, setNotas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulación de datos - reemplazar con llamadas reales a la API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos del curso
        const cursoData = {
          id: idCurso,
          nombre: 'Matemática Avanzada',
          codigo: 'MAT501',
          creditos: 4,
          ciclo: 5
        };

        // Datos del estudiante
        const estudianteData = {
          id: idEstudiante,
          codigo: 'E2023001',
          nombres: 'María',
          apellidos: 'Gonzales Pérez',
          carrera: 'Ingeniería de Software',
          ciclo: 5
        };

        // Notas existentes
        const notasData = [
          { id: 1, tipo: 'PRACTICA', nombre: 'Práctica 1', valor: 15, max: 20, editable: true },
          { id: 2, tipo: 'PRACTICA', nombre: 'Práctica 2', valor: 18, max: 20, editable: true },
          { id: 3, tipo: 'TEORIA', nombre: 'Examen Parcial', valor: 12, max: 20, editable: true },
          { id: 4, tipo: 'TEORIA', nombre: 'Examen Final', valor: null, max: 20, editable: true }
        ];

        setCurso(cursoData);
        setEstudiante(estudianteData);
        setNotas(notasData);
      } catch (err) {
        setError('Error al cargar los datos del estudiante');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idCurso, idEstudiante]);

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
      router.push(`/dashboard/teacher/cursos/${idCurso}`);
    } catch (err) {
      setError('Error al guardar las notas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const alerta = () => {
    alert("Solo podrá subir las notas una vez, asegúrese de que los datos sean correctos.");
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg className="animate-spin mx-auto h-12 w-12 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-700">Cargando información del estudiante...</p>
        </div>
      </div>
    );
  }

  if (!curso || !estudiante) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mt-4 text-lg text-gray-700">No se pudo cargar la información del estudiante</p>
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
              <h1 className="text-2xl font-bold text-white">{curso.nombre} - {curso.codigo}</h1>
              <p className="text-gray-100">Créditos: {curso.creditos} | Ciclo: {curso.ciclo}</p>
            </div>
            <div className="ml-auto flex items-center">
              <button 
                onClick={() => router.push(`/dashboard/teacher/cursos/${idCurso}`)}
                className='flex items-center justify-center active:bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-3xl transition duration-200'
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

            {/* Información del estudiante */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <svg className="h-6 w-6 text-gray-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h2 className="text-xl font-semibold text-gray-800">Información del Estudiante</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Código</p>
                  <p className="font-medium">{estudiante.codigo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nombre Completo</p>
                  <p className="font-medium">{estudiante.nombres} {estudiante.apellidos}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carrera</p>
                  <p className="font-medium">{estudiante.carrera}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ciclo</p>
                  <p className="font-medium">{estudiante.ciclo}</p>
                </div>
              </div>
            </div>

            {/* Formulario de notas */}
            <form onSubmit={handleSubmit}>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className='flex items-center'>
                    <svg className="h-6 w-6 text-gray-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-800">Registro de Notas</h2>
                  </div>
                  <button
                    type='button'
                    className='inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 active:ring-3 active:ring-offset-2 active:ring-gray-700 transition'
                    onClick={alerta}
                  >
                    Cargar Nota
                  </button>
                  {/* <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                      loading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Guardando...
                      </>
                    ) : (
                      'Cargar Notas'
                    )}
                  </button> */}
                </div>
              <div>
              
              <div className="flex justify-evenly gap-20">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-500 text-white">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-mediu uppercase tracking-wider">
                        Teoría 1
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Nota
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                      <tr className='hover:bg-gray-50'>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Practica 1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          20
                        </td>
                      </tr>
                  </tbody>
                </table>

                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-500 text-white">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Actividad
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Nota
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                      <tr className='hover:bg-gray-50'>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Teoría 1
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          20
                        </td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>                
                
                    
                {/* <div className="space-y-4">
                  {notas.map((nota) => (
                    <div key={nota.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{nota.nombre}</label>
                        <p className="text-xs text-gray-500">{nota.tipo === 'PRACTICA' ? 'Práctica' : 'Teoría'}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          max={nota.max}
                          step="0.1"
                          value={nota.valor || ''}
                          onChange={(e) => handleNotaChange(nota.id, e.target.value)}
                          disabled={!nota.editable || loading}
                          className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm"
                          placeholder={`0 - ${nota.max}`}
                        />
                        <span className="text-sm text-gray-500">/ {nota.max}</span>
                      </div>
                      <div>
                        {nota.valor !== null && (
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            nota.valor >= nota.max * 0.7 ? 'bg-green-100 text-green-800' :
                            nota.valor >= nota.max * 0.5 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {nota.valor >= nota.max * 0.7 ? 'Bueno' :
                             nota.valor >= nota.max * 0.5 ? 'Regular' : 'Bajo'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div> */}

                <div className="mt-6 flex justify-end space-x-3">
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Sistema SEVA v1.0 - © {new Date().getFullYear()} Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-gray-600">Registrar notas</h2>
        <div className='text-gray-600 m-3 flex items-center justify-between'>
          <label htmlFor="" className='w-full'>Práctica</label>
          <input type="number" className='w-full border-2 p-1 border-gray-600 rounded-md'/>
        </div>
        <div className='text-gray-600 m-3 flex items-center justify-between'>
          <label htmlFor="" className='w-full'>Teoría</label>
          <input type="number" className='w-full border-2 p-1 border-gray-600 rounded-md'/>
        </div>
        <div className='w-full flex justify-end mt-5 px-3 gap-3'>
          {/* <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => setIsModalOpen(false)}
          >
            Cerrar
          </button> */}
          <button
            type="button"
            disabled={loading}
            onClick={() => setIsModalOpen(false)}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          <button
            type='button'
            className='inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 active:ring-3 active:ring-offset-2 active:ring-gray-700 transition'
          >
            Cargar Nota
          </button>          
        </div>
      </Modal>
    </div>
  );
}