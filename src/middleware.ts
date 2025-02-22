import { TokenPayload, myJWTVerifyAsync } from 'utils/auth'
import { defineMiddleware } from 'astro:middleware'
import { prisma } from 'db/prisma/prisma'

export const LockedUsers = prisma.user
  .findMany({ where: { lockedUntil: { not: null } }, select: { id: true, lockedUntil: true } })
  // eslint-disable-next-line github/no-then
  .then(users => users.map(u => ({ id: u.id, lockedUntil: u.lockedUntil as Date })))

type AuthGuardRoute = { path: string; deep?: true; action?: 'redirect' | 'error' }

const AuthGuardRoutes: AuthGuardRoute[] = [
  { path: '/' },
  { path: '/locked' },
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

      if (context.url.pathname === '/locked') return await next()
      const lockedUser = (await LockedUsers).find(u => u.id === context.locals.user.id)
      if (lockedUser) {
        return context.redirect('/locked', 302)
      }
    } catch {
      switch (route.action) {
        // Instantly redirect to login page
        case 'redirect': {
          // TODO: pass redirect_url param so after logging in user is redirected to target page
          return context.redirect('/login', 302)
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
