// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authenticatedRoutes = ["/profile", "/create"];

const notAuthenticatedRoutes = ["/forgot-password", "/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("access_token")?.value;

  if (!cookie && authenticatedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (cookie && notAuthenticatedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  return response;
}
