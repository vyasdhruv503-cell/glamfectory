import { auth } from '@/lib/auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin')
  const isOnAccount = req.nextUrl.pathname.startsWith('/account')
  const isOnAuth = req.nextUrl.pathname.startsWith('/auth')
  const isOnApi = req.nextUrl.pathname.startsWith('/api')
  const isSignOutApi = req.nextUrl.pathname === '/api/auth/signout'

  // Allow signout API without authentication
  if (isSignOutApi) {
    return undefined
  }

  if ((isOnAdmin || isOnAccount) && !isLoggedIn) {
    const loginUrl = new URL('/auth/login', req.nextUrl)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return Response.redirect(loginUrl)
  }

  const role = (((req.auth as any)?.user?.role || (req.auth as any)?.role || '') as string).toUpperCase()

  if (isOnAdmin && isLoggedIn) {
    if (role !== 'ADMIN') {
      return Response.redirect(new URL('/account', req.nextUrl))
    }
  }

  if (isOnAuth && isLoggedIn) {
    if (role === 'ADMIN') {
      return Response.redirect(new URL('/admin', req.nextUrl))
    }
    return Response.redirect(new URL('/account', req.nextUrl))
  }

  return undefined
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/auth/:path*',
  ],
}