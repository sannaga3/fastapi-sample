import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const unAuthenticatedUrlList = ["/", "/signup", "/login"];
const authenticatedUrlRegexList = [/^\/tasks(?:\/.*)?$/, /^\/users(?:\/.*)?$/];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("task-app-token") ?? null;

  if (authToken && authToken.value) {
    if (unAuthenticatedUrlList.includes(pathname))
      return NextResponse.redirect(new URL("/tasks/list", request.url));
  } else {
    if (authenticatedUrlRegexList.some((regex) => regex.test(pathname))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...unAuthenticatedUrlList, "/tasks/:path*", "/users/:path*"],
};
