import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Profile verifies its session through the API instead.
const authenticatedRoutes = ["/create"];

const notAuthenticatedRoutes = [
  "/forgot-password",
  "/login",
  "/register",
];

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("access_token")?.value;

  if (
    !cookie &&
    authenticatedRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    cookie &&
    notAuthenticatedRoutes.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}