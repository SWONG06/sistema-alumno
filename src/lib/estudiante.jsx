const alumno = async (code) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alumno/alumno/${atob(code)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token123'
    },
    credentials: 'include',
    mode: 'cors'
  })
  return response;
}

const notasById = async (code) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alumno/nota/${atob(code)}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token123'
    },
    credentials: 'include',
    mode: 'cors'    
  });
  return response;
}

const asistenciasById = async (code) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alumno/asistencia/${atob(code)}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token123'
    },
    credentials: 'include',
    mode: 'cors'    
  });
  return response;
}

const cursosById = async (code) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alumno/curso/${atob(code)}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token123'
    },
    credentials: 'include',
    mode: 'cors'    
  });
  return response;
}

export default {
    alumno,
    notasById,
    asistenciasById,
    cursosById
}