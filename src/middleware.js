import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

// const secret = process.env.JWT_SECRET;
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function middleware(request) {
  try {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('accessToken')?.value;
  const user = await verifyJWT(token);


  if (pathname.startsWith('/login') && user) {
    const role = user.role;

    // Redirigir al dashboard adecuado según su rol
    if (role === 'ESTUDIANTE') {
      return NextResponse.redirect(new URL('/alumno', request.url));

    } else if (role === 'PROFESOR') {
      return NextResponse.redirect(new URL('/profesor', request.url));
    }
  }  

  if (!token) {
    if (pathname.startsWith('/login')) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  

  if (!user) {
    if (pathname.startsWith('/login')) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }  
  const role = user.role;
  
  if (pathname.startsWith('/alumno') && role !== 'ESTUDIANTE') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (pathname.startsWith('/profesor') && role !== 'PROFESOR') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();

}catch(e) {
    console.log("No se pudo verificar identidad: \n"+e);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/public$).*)',
  ],
};
