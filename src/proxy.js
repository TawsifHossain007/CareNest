import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/services", "/dashboard"];
const adminRoutes = ['/dashboard/all-bookings', '/dashboard/payments', '/dashboard/users'];

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const reqPath = req.nextUrl.pathname;
  const isPrivateReq = privateRoute.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Check if user is not authenticated
  if (!token && isPrivateReq) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url)
    );
  }

  // Check role-based access if user is authenticated
  if (token) {
    const userRole = token.role;

    // Check if user is trying to access admin-only routes
    const isAdminRoute = adminRoutes.some((route) => reqPath.startsWith(route));
    
    if (isAdminRoute && userRole !== 'admin') {
      // Non-admin trying to access admin route - redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/services/:path*/booking/:path*", "/dashboard/:path*"],
};