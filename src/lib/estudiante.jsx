const alumno = async (code) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alumno/alumno/${code}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`
    },
    credentials: 'include',
    mode: 'cors'
  })
  return response;
}

const notasById = async (code) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alumno/nota/${code}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`
    },
    credentials: 'include',
    mode: 'cors'    
  });
  return response;
}

const asistenciasById = async (code) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alumno/asistencia/${code}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`
    },
    credentials: 'include',
    mode: 'cors'    
  });
  return response;
}

const cursosById = async (code) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alumno/curso/${code}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`
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
    cursosById,
}