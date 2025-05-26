import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const isAdminPath = pathname.startsWith('/admin');
  const isPublicAdminPath = ['/admin/login', '/admin/register'].includes(pathname);
  const isAccountPath = pathname.startsWith('/account');
  const isLoginPath = pathname === '/login';

  // 🔒 Admin area protection
  if (isAdminPath && !isPublicAdminPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (isPublicAdminPath && token) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // 🔒 Protect /account page for logged-in users only
  if (isAccountPath && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // ✅ Allow login page access even if already logged in (no redirect to /account)
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*', '/account', '/login'],
};
