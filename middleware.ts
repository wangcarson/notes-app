import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Next.js middleware (runs before website is loaded)
// https://nextjs.org/docs/14/app/building-your-application/routing/middleware
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Get jwt token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Redirect to dashboard if authenticated
  if (token && url.pathname === "/home") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect to home if not authenticated
  if (!token && url.pathname !== "/home") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// Apply to dashboard and home pages (for now)
export const config = {
  matcher: ["/dashboard", "/home"],
};
