'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '../../../../../components/Modal';
import docente from '../../../../../lib/profesor';
import Link from 'next/link';

export default function CargarNotasEstudiante() {
  const router = useRouter();
  const alumno = atob(useSearchParams().get('alumno'));
  const idcurso = useParams().idcurso;

  const [notaPractica, setNotaPractica] = useState(null);
  const [notaTeoria, setNotaTeoria] = useState(null);
  const [unidad, setUnidad] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tipoNota, setTipoNota] = useState(null);
  const [estudiante, setEstudiante] = useState(null);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState('');

  const getAllData = async () => {
    setLoading(true);
    try {
      const estudianteRes = await docente.notasByAlumno(alumno, idcurso);
      const estudianteNotas = await estudianteRes.json();
      setEstudiante(estudianteNotas);
    } catch (error) {
      console.error("Error al cargar datos del alumno:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, [alumno, idcurso]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNota = {
      MATRICULA: alumno,
      CODIGOCU: idcurso,
      TEORIA: notaTeoria,
      PRACTICA: notaPractica,
      UNIDAD: unidad,
      TIPO: tipoNota,
    };

    try {
      setLoading(true);
      await docente.cargarNota(newNota);
      await getAllData();
      setIsModalOpen(false);
    } catch (error) {
      console.log("No se pudo cargar la nota: " + error);
    } finally {
      setLoading(false);
    }
  };

      
  const alerta = () => {
    alert("Solo podrá subir las notas una vez, asegúrese de que los datos sean correctos.");
    setIsModalOpen(true)
  }
    
  const openDetails = (idnota) => {
    const getData = async () => {
      try {
        const [notaDetailRes] = await Promise.all([
          docente.detailsByNota(idnota)
        ]);
        
        const detailsNotas = await notaDetailRes.json();
        
        setDetails(detailsNotas);
      } catch (error) {
        console.error("Error al cargar datos del alumno:", error);
      }
    };
    getData();
    
    setIsDetailOpen(true);
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

  if (!estudiante) {
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
              <h1 className="text-2xl font-bold text-white">{estudiante?.CURSO?.NOMBRE} - {estudiante?.CURSO?.CODIGOCU}</h1>
              <p className="text-gray-100">Créditos: {estudiante?.CURSO?.CREDITOS} | Periodo: {estudiante?.MATRICULA?.PERIODO}</p>
            </div>
            <div className="ml-auto flex items-center">
              <Link href={`/profesor/curso/${idcurso}`}>
              <button 
                className='flex text-sm items-center justify-center active:bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-3 rounded-3xl transition duration-200'
              >
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
                  <p className="text-sm text-gray-700 font-bold">Código</p>
                  <p className="font-medium text-gray-500"># {estudiante?.MATRICULA?.ESTUDIANTE?.USUARIO?.CODIGOU}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-bold">Nombre Completo</p>
                  <p className="font-medium text-gray-500">{estudiante?.MATRICULA?.ESTUDIANTE?.NOMBRES+' '+estudiante?.MATRICULA?.ESTUDIANTE?.APELLIDOS}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-bold">Carrera</p>
                  <p className="font-medium text-gray-500">{estudiante?.MATRICULA?.CARRERA?.NOMBRE}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-bold">Ciclo</p>
                  <p className="font-medium text-gray-500">{estudiante?.MATRICULA?.CICLO}</p>
                </div>
              </div>
            </div>

            {/* Registro de notas */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className='flex items-center'>
                    <svg className="h-6 w-6 text-gray-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-800">Registro de Notas</h2>
                  </div>
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
              
              <div className="grid gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                <div>
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-500 text-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-mediu uppercase tracking-wider">
                          Teoría
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Nota
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {estudiante?.NOTA.filter(c => c?.ID_CRONOGRAMA)
                      .map((nota) => (
                        <tr key={nota?.ID_NOTA} className='hover:bg-gray-50'>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <button 
                              className="text-gray-600 hover:text-gray-900 hover:underline focus:outline-2 focus:outline-gray-900 focus:outline-offset-4 rounded-sm"
                              onClick={()=> {openDetails(nota?.ID_NOTA); setTipoNota('Teoria')}}>
                              Unidad {nota?.UNIDAD}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {nota?.PROMEDIOT}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type='button'
                    className='inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 active:ring-3 active:ring-offset-2 active:ring-gray-700 transition'
                    onClick={() => {alerta(); setTipoNota('Teoria');}}
                  >
                    Cargar Nota
                  </button>
                </div>
                <div>
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-500 text-white">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Practica
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Nota
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {estudiante?.NOTA.filter(c => c?.ID_CRONOGRAMA)
                      .map((nota) => (
                        <tr key={nota?.ID_NOTA} className='hover:bg-gray-50'>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <button 
                              className="text-gray-600 hover:text-gray-900 hover:underline focus:outline-2 focus:outline-gray-900 focus:outline-offset-4 rounded-sm"
                              onClick={()=> {openDetails(nota?.ID_NOTA); setTipoNota('Practica')}}>
                              Unidad {nota?.UNIDAD}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {nota?.PROMEDIOP}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                     type='button'
                    className='inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 active:ring-3 active:ring-offset-2 active:ring-gray-700 transition'
                    onClick={() => {alerta(); setTipoNota('Practica')}}
                  >
                    Cargar Nota
                  </button>                   
                </div>
              </div>
            </div>

                <div className="mt-6 flex justify-end space-x-3">
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-4 text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block h-6 w-6 text-gray-500 mr-2 align-middle"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="8" cy="8" r="1" fill="currentColor" />
          </svg>
          Registrar Nota
          </h2>
          {(tipoNota === 'Practica') ? (
          <div className='text-gray-600 m-3 flex items-center justify-between'>
            <label htmlFor="practica" className='w-full'>Práctica</label>
            <input 
              type="number"
              id='practica'
              min={0}
              className='w-full border-2 p-1 border-gray-600 rounded-md'
              value={notaPractica || ""}
              onChange={(e) => setNotaPractica(e.target.value)}/>
          </div>
          ) : null}
          {(tipoNota === 'Teoria') ? (
          <div className='text-gray-600 m-3 flex items-center justify-between'>
            <label htmlFor="theory" className='w-full'>Teoría</label>
            <input 
              type="number" 
              id='theory' 
              min={0}
              className='w-full border-2 p-1 border-gray-600 rounded-md'
              value={notaTeoria || ""}
              onChange={(e) => setNotaTeoria(e.target.value)}/>
          </div>
          ) : null}
        <div className='text-gray-600 m-3 flex items-center justify-between'>
          <label htmlFor="unit" className='text-sm cursor-pointer w-full'>Unidad</label>
          <select 
            name="unit"
            id="unit" 
            className='w-full border-2 p-1 border-gray-600 rounded-md'
            value={unidad}
            onChange={(e) => setUnidad(+e.target.value)}
            >
            {[1, 2, 3, 4, 5, 6].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <div className='w-full flex justify-end mt-5 px-3 gap-3'>
          <button
            type="button"
            disabled={loading}
            onClick={() => setIsModalOpen(false)}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          <button
            type='submit'
            className='inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 active:ring-3 active:ring-offset-2 active:ring-gray-700 transition'
          >
            Cargar Nota
          </button>          
        </div>
        </form>
      </Modal>


      <Modal isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-gray-600 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block h-6 w-6 text-gray-500 mr-2 align-middle"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01"
            />
          </svg>
          Detalles de la unidad
          </h2>
        <div className='w-full flex justify-end mt-5 px-3 gap-3 flex-wrap'>
          <div className="bg-gray-50 rounded-lg p-6 flex w-full justify-center flex-wrap">
              <p className='w-full text-gray-600 font-bold text-center mb-5'>
                {tipoNota+' '+details?.UNIDAD}
              </p>
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-500 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Nota
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {details?.NOTA_DETALLEs?.filter(c => c?.ID_NOTA_DETALLE)
                  .map((nota) => (
                    <tr key={nota?.ID_NOTA_DETALLE} className='hover:bg-gray-50'>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {nota?.FECHA}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tipoNota==='Practica' ? nota?.PRACTICA : nota?.TEORIA}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
      </Modal>      
    </div>
  );
}