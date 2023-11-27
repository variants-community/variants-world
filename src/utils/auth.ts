/* eslint-disable camelcase */
import * as jose from 'jose'
import { createSHA256 } from 'hash-wasm'
import { z } from 'astro/zod'
import base64url from 'base64url'
import type { AstroCookies } from 'astro'

export const states = new Map<string, { codeVerifier: string; codeChallenge: string }>()

const encoder = new TextEncoder()
const JWTSecretKey = encoder.encode(import.meta.env.JWT_SECRET)
export const myJWTSignAsync = async (data: jose.JWTPayload) =>
  await new jose.SignJWT(data).setProtectedHeader({ alg: 'HS256' }).sign(JWTSecretKey)
export const myJWTVerifyAsync = async (token: string) => (await jose.jwtVerify(token, JWTSecretKey)).payload

export const TokenPayload = z.object({
  id: z.number(),
  profileUrl: z.string(),
  username: z.string()
})
export type TokenPayloadType = z.infer<typeof TokenPayload>

// Hashes a text value using sha256 and encodes the result to base64url
export const sha256Base64UrlAsync = async (text: string) => {
  const hasher = await createSHA256()
  const bin = hasher.update(text).digest('binary')
  const base64 = btoa(String.fromCharCode(...bin))
  return base64url.fromBase64(base64)
}

// Verifies signature of id_token
export const verifyIdToken = async (idToken: string) => {
  try {
    const JWKS = jose.createRemoteJWKSet(new URL('https://oauth.chess.com/certs'))
    const { payload } = await jose.jwtVerify(idToken, JWKS)

    return payload as {
      preferred_username: string
      picture: string
      user_id: string
      membership: string
    }
  } catch {
    // eslint-disable-next-line no-console
    console.error('id_token is not valid')
    return undefined
  }
}

// Obtains chesscom's token, verifies signature and retrieves profile info from id_token
export const refreshUserInfo = async (params: Record<string, string>, cookies: AstroCookies) => {
  const response = await (
    await fetch('https://oauth.chess.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: String(new URLSearchParams(params))
    })
  ).json()

  const { id_token, refresh_token: refreshToken } = response

  // Retrieve id_token and verify signature
  const profile = await verifyIdToken(id_token)
  if (!profile) return [undefined]

  const id = Number(profile.user_id)
  const { preferred_username: username, picture: profileUrl } = profile

  const payload: TokenPayloadType = { id, username, profileUrl }

  const cookie = await myJWTSignAsync(payload)
  const signature = cookie.split('.')[2]

  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)
  cookies.set('token', cookie, { expires })
  cookies.set('expires', new Date(Date.now() + 60e3 * 60 * 24 * 7), { expires })
  return [{ id, username, profileUrl, refreshToken }, signature] as const
}

// Turns a pathname into absolute url string
export const getAbsoluteUrl = (baseURL: URL, pathname: string) => {
  const target = new URL(baseURL)
  target.pathname = pathname
  target.search = ''
  return target.href
}
