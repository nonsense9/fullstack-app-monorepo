import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest, res: NextResponse) {

  const token = request.cookies.get('access_token')?.value

  const protectedPaths = ['/dashboard', '/profile', '/admin']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('auth/login', request.url))
  }
  
  if (token && request.nextUrl.pathname === 'auth/login') {

    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [ '/' ],
};
