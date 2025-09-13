import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/passwords', '/notes', '/shopping'];

// Define public routes that should redirect to dashboard if authenticated
const publicRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Debug logging
  console.log('Middleware - Path:', pathname);
  console.log('Middleware - Cookies:', request.cookies.getAll());
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Get current user from the request
  const user = await getCurrentUser(request);
  console.log('Middleware - User:', user);
  
  // If accessing a protected route without authentication
  if (isProtectedRoute && !user) {
    const loginUrl = new URL('/login', request.url);
    // Add redirect parameter to return to the original page after login
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // If accessing a public route while authenticated, redirect to dashboard
  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Allow root path (landing page) to be accessible to everyone
  // Authenticated users can still access it, but won't be redirected
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};