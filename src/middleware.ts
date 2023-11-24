import { TokenPayload } from 'utils/auth'
import { defineMiddleware } from 'astro:middleware'
import jwt from 'jsonwebtoken'

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get('token')?.value
  const expires = context.cookies.get('expires')?.value

  if (['/login', '/callback'].includes(context.url.pathname)) {
    return await next()
  }

  if (!token || !expires) {
    return Response.redirect(`${context.url.protocol}//${context.url.hostname}:${context.url.port}/login`, 302)
  }

  try {
    context.locals.user = TokenPayload.parse(jwt.verify(token, import.meta.env.JWT_SECRET))
  } catch {
    return Response.redirect(`${context.url.protocol}//${context.url.hostname}:${context.url.port}/login`, 302)
  }

  return await next()
})
