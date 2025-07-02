const profesor = async (code) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profesor/profesor/${code}`, {
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

const cursosById = async (code) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profesor/curso/${code}`,{
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profesor/asistencia/${code}`,{
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

const notasById = async (code, curso) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profesor/nota/${code}/${curso}`,{
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

const asistenciasByCurso = async (code,curso) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profesor/asistencia/${code}/${curso}`,{
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

const notasByAlumno = async (alumno,curso) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profesor/nota/alumno/${alumno}/${curso}`,{
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

const alumnosById = async (code,curso) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profesor/alumno/${code}/${curso}`,{
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

const detailsByNota = async (code) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profesor/detalles/nota/${code}`,{
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

const cargarNota = async (nuevaNota) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profesor/notas`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`
    },
    body: JSON.stringify(nuevaNota),
    credentials: 'include',
    mode: 'cors'    
  });
  return response;
}

export default {
    profesor,
    cursosById,
    asistenciasById,
    notasById,
    asistenciasById,
    asistenciasByCurso,
    notasByAlumno,
    alumnosById,
    detailsByNota,
    cargarNota
}