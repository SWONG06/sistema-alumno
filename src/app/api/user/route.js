// /app/api/alumno/route.js
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const secret = process.env.JWT_SECRET || 'clave_super_secreta';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, secret);

    const userId = decoded.id;
    console.log(userId);

    return NextResponse.json({ id: userId });
  } catch (err) {
    console.error('Error al verificar token:', err);
    return NextResponse.json({ message: 'Token inválido o error del servidor' }, { status: 403 });
  }
}
