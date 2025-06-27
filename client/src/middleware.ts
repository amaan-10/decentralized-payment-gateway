// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const pathname = request.nextUrl.pathname;

  // If no token, redirect to login with redirectTo param
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const url = request.nextUrl.clone();

  // PIN verification check for dashboard
  if (pathname.startsWith("/dashboard")) {
    const pinVerified = request.cookies.get("pinVerified");
    if (!pinVerified || pinVerified.value !== "true") {
      url.pathname = "/auth/verify-pin";
      url.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*', '/pay/:path*'],
};
