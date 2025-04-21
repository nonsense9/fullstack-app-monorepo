import { NextResponse } from "next/server";


export function middleware(request) {
  try {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  } catch (e) {
    console.error('middleware',e);
  }
}

export const config = {
  matcher: [ '/' ],
};
