// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;

  // Check if user is accessing the dashboard
  if (pathname.startsWith("/dashboard")) {
    const cookies = request.cookies;
    const pinVerified = cookies.get("pinVerified");

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
