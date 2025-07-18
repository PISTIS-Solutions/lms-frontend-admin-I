import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = [
  "/dashboard",
  "/courses",
  "/courses/modules",
  "/courses/modules/[content]",
  "/grading",
  "/log-out",
  "/project",
  "/project/[project]",
  "/settings",
];

export default function middleware(req: NextRequest) {
  const tokenPresent = cookies().get("adminAccessToken")?.value;
  const isAuthenticated = tokenPresent !== undefined ? true : false;
  if (
    !isAuthenticated &&
    isProtectedRoute(req.nextUrl.pathname, protectedRoutes)
  ) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

function isProtectedRoute(path: string, protectedRoutes: string[]): boolean {
  return protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\[.*\]/, ".*")}$`);
    return regex.test(path);
  });
}
