import { NextResponse } from "next/server";
import { verifyAccessToken } from "./utils/auth";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const payload = verifyAccessToken(token);

  if (!payload) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/p-user/:path*", "/p-admin/:path*"],
};