import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import useUserStore from "./zustand/userSlice";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let cookie = req.cookies.get("token")?.value;
  if (
    pathname.startsWith("/user") ||
    pathname.startsWith("/payment") ||
    pathname.startsWith("/admin")
  ) {
    if (cookie) return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (cookie) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }
}
