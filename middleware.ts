import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";


const protectedRoutes = [
  "/dashboard",
  "/courses",
  "/courses/modules",
  "/courses/modules/",
  "/grading",
  "/log-out",
  "/project",
  "/project/", 
  "/settings",
  "/cohorts",
  "/mentors"
];

export default function middleware(req: NextRequest) {
  const tokenPresent = cookies().get("adminAccessToken")?.value;
  const isAuthenticated = tokenPresent !== undefined ? true : false;

  const path = req.nextUrl.pathname;

  if (!isAuthenticated && isProtectedRoute(path)) {
    const redirectURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
}

function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );
}
