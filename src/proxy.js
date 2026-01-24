import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/my-bookings", "/services"];

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = Boolean(token);
  const reqPath = req.nextUrl.pathname;
  const isPrivateReq = privateRoute.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!token && isPrivateReq) {
      // console.log(process.env.NEXTAUTH_SECRET)
      console.log('token',token)
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url)
    );
  }
  console.log('Before NextResponse')
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/my-bookings/:path*", "/services/:path*/booking/:path*"],
};