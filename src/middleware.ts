import { TokenPayload, myJWTVerifyAsync } from 'utils/auth'
import { defineMiddleware } from 'astro:middleware'
import { prisma } from 'db/prisma/prisma'

let lockedUsers: number[] = []
await prisma.user
  .findMany({ where: { role: 'LOCKED' }, select: { id: true } })
  // eslint-disable-next-line github/no-then
  .then(users => (lockedUsers = users.map(user => user.id)))

type AuthGuardRoute = { path: string; deep?: true; action?: 'redirect' | 'error' }

const AuthGuardRoutes: AuthGuardRoute[] = [
  { path: '/' },
  { path: '/posts', deep: true },
  { path: '/_actions', deep: true, action: 'error' }
]

const WhitelistedRoutes = ['/_actions/starsWebhook']

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url
  const route = AuthGuardRoutes.find(({ path, deep }) => pathname === path || (deep && pathname.startsWith(`${path}/`)))
  if (route && !WhitelistedRoutes.includes(pathname)) {
    const token = context.cookies.get('token')?.value
    const expires = context.cookies.get('expires')?.value

    try {
      if (!token || !expires) throw new TypeError('No valid cookies found')

      context.locals.user = TokenPayload.parse(await myJWTVerifyAsync(token))
      if (lockedUsers.includes(context.locals.user.id)) {
        const url = new URL(context.url)
        url.pathname = '/locked'
        url.search = ''
        return Response.redirect(url, 302)
      }
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
  } else {
    context.locals.user = {
      id: -1,
      profileUrl: 'https://www.chess.com/bundles/web/images/user-image.svg',
      username: 'Guest',
      guest: true
    }
  }

  return await next()
})
