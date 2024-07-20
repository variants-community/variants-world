import { TokenPayload, myJWTVerifyAsync } from 'utils/auth'
import { defineMiddleware } from 'astro:middleware'

type AuthGuardRoute = { path: string; deep?: true; action?: 'redirect' | 'error' }

const AuthGuardRoutes: AuthGuardRoute[] = [
  { path: '/' },
  { path: '/posts', deep: true },
  { path: '/_actions', deep: true, action: 'error' }
]

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url
  const route = AuthGuardRoutes.find(({ path, deep }) => pathname === path || (deep && pathname.startsWith(`${path}/`)))
  if (route) {
    const token = context.cookies.get('token')?.value
    const expires = context.cookies.get('expires')?.value

    try {
      if (!token || !expires) throw new TypeError('No valid cookies found')

      context.locals.user = TokenPayload.parse(await myJWTVerifyAsync(token))
    } catch {
      switch (route.action) {
        // Instantly redirect to login page
        case 'redirect': {
          const url = new URL(context.url)
          url.pathname = '/login'
          // TODO: pass redirect_url param so after logging in user is redirected to target page
          url.search = ''
          return Response.redirect(url, 302)
        }

        // Respond with an access-denied error
        case 'error': {
          return new Response('Unauthorized', { status: 401 })
        }

        // Allow accessing route using guest user
        default: {
          context.locals.user = {
            id: -1,
            profileUrl: 'https://www.chess.com/bundles/web/images/user-image.svg',
            username: 'Guest',
            guest: true
          }
        }
      }
    }
  }

  return await next()
})
