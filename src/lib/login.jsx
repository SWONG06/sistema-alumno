const Login = async (role, code, password, recuerdame) => {
      const roleFormat = role.trim().replace(/\s+/g, '');
      const codeFormat = code.trim().replace(/\s+/g, '');
      const passwordFormat = password.trim().replace(/\s+/g, '');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'          
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({
        USUARIO: roleFormat,
        CODIGO: codeFormat,
        CONTRASEÑA: passwordFormat,
        RECUERDAMTE: recuerdame
      })
    })
    return response;
  }
const refresh = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123'
        },
        credentials: 'include',
        mode: 'cors',
      });
        const data = await response.json();
        console.log(data.user.id);
        return data;
}

const logout = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token123'
    }
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  }

  return await response.json();
};


export default {
    Login,
    refresh,
    logout
}