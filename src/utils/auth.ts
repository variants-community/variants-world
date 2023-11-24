/* eslint-disable camelcase */
import { z } from 'astro/zod'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import type { AstroCookies } from 'astro'

export const states = new Map<string, { codeVerifier: string; codeChallenge: string }>()

export const TokenPayload = z.object({
  id: z.number(),
  profileUrl: z.string(),
  username: z.string()
})
export type TokenPayloadType = z.infer<typeof TokenPayload>

export const verifyIdToken = async (idToken: string) => {
  try {
    const key = (await (await fetch('https://oauth.chess.com/certs')).json())?.keys[0]

    const publicKey = crypto.createPublicKey({ key, format: 'jwk' })
    const pem = publicKey.export({ type: 'pkcs1', format: 'pem' })

    return jwt.verify(idToken, pem) as {
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
  if (!profile) return

  const id = Number(profile.user_id)
  const { preferred_username: username, picture: profileUrl } = profile

  const payload: TokenPayloadType = { id, username, profileUrl }

  const cookie = jwt.sign(payload, import.meta.env.JWT_SECRET)

  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)
  cookies.set('token', cookie, { expires })
  cookies.set('expires', new Date(Date.now() + 60e3 * 60 * 24 * 7))
  return { id, username, profileUrl, refreshToken }
}

// export const getMetadata = (req: Request) => {
//   const ua = req.headers.get('user-agent')
//   if (!ua) return 'Unknown device'
//   const agent = parser(ua)
//   return `${agent.browser.name} ${agent.browser.version}, ${agent.os.name} ${agent.os.version}`
// }

// export const getLocation = async (ip: string) => {
//   if (ip.startsWith('::')) ip = ''
//   const location = await (await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`)).json()
//   return `${location.geoplugin_city}, ${location.geoplugin_countryName}`
// }
