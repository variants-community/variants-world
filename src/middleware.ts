/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { TokenPayload } from 'utils/auth'
import { defineMiddleware } from 'astro:middleware'
import jwt from 'jsonwebtoken'

const AuthGuardRoutes = ['/', '/posts/*', '/api']

export const onRequest = defineMiddleware(async (context, next) => {
  if (
    AuthGuardRoutes.some(route => {
      const [, path, all] = route.match(/^(.+?)(\/\*)?$/)!
      return context.url.pathname === path || (all && context.url.pathname.startsWith(`${path}/`))
    })
  ) {
    const token = context.cookies.get('token')?.value
    const expires = context.cookies.get('expires')?.value

    try {
      if (!token || !expires) throw new TypeError('No valid cookies found')

      context.locals.user = TokenPayload.parse(jwt.verify(token, import.meta.env.JWT_SECRET))
    } catch {
      // Redirect to /login
      const url = new URL(context.url)
      url.pathname = '/login'
      // TODO: pass redirect_url param so after logging in user is redirected to target page
      url.search = ''
      return Response.redirect(url, 302)
    }
  }

  return await next()
})
