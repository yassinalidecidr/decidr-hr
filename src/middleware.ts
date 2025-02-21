import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname, origin } = request.nextUrl;

  // Paths that don't require authentication
  // const publicPaths = [
  //   '/login',
  //   '/register',
  //   '/forgot-password',
  //   '/',
  //   '/about',
  //   '/services',
  //   '/locations',
  //   '/contact',
  //   '/chat'  // Make chat publicly accessible
  // ];
  
  // Check if the current path starts with any of the public paths
  // const isPublicPath = publicPaths.some(path => 
  //   pathname === path || pathname.startsWith(`${path}/`)
  // );

  // Protected paths that require authentication
  const protectedPaths = ['/dashboard'];
  const isProtectedPath = protectedPaths.some(path => 
    pathname.startsWith(path)
  );

  // Only redirect to login if:
  // 1. User is not authenticated
  // 2. Trying to access a protected route
  if (!token && isProtectedPath) {
    return NextResponse.redirect(
      `${origin}/login?from=${encodeURIComponent(pathname)}`
    );
  }

  // Let all other requests pass through
  return NextResponse.next();
}

// Update matcher to exclude more paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/data (Next.js data files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|public).*)',
  ],
}; 