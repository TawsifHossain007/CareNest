import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/services", "/dashboard"];

export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const reqPath = req.nextUrl.pathname;
  const isPrivateReq = privateRoute.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (!token && isPrivateReq) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url)
    );
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/services/:path*/booking/:path*", "/dashboard/:path*"],
};