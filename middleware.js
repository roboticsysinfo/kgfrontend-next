import { NextResponse } from 'next/server';

export function middleware(req) {
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin');
  const isPublicPath = ['/admin/login', '/admin/register'].includes(req.nextUrl.pathname);
  const token = req.cookies.get('token');

  if (isAdminPath && !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
