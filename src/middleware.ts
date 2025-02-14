import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname, origin } = request.nextUrl;

  // Paths that don't require authentication
  const publicPaths = ['/login', '/register', '/forgot-password'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Only redirect to login if:
  // 1. User is not authenticated
  // 2. Trying to access a protected route
  // 3. Not already on the login page
  if (!token && !isPublicPath) {
    return NextResponse.redirect(
      `${origin}/login?from=${encodeURIComponent(pathname)}`
    );
  }

  // Remove the automatic redirect to dashboard
  // Let the login page handle its own redirects
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