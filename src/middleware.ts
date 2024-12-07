import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack";

export async function middleware(request: NextRequest) {
  const user = await stackServerApp.getUser();
  const reqPath = request.nextUrl.pathname;
  const whiteListed = [
    "/handler/sign-in",
    "/handler/sign-up",
    "/handler/oauth-callback",
  ];
  if (!user && !whiteListed.includes(reqPath)) {
    return NextResponse.redirect(new URL("/handler/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
