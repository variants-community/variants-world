import { supabase } from 'db/supabase/supabase'
import cookie from 'cookie'
import type { UserRole } from '@prisma/client'

export interface AuthentificatedUser {
  id: number
  role: UserRole
  username: string
}

export async function getUser(req: Request) {
  const c = cookie.parse(req.headers.get('cookie') ?? '')
  if (!c.sbat) {
    return null
  }

  const {
    data: { user }
  } = await supabase.auth.getUser(c.sbat)
  if (!user || user.role !== 'authenticated') {
    return null
  }

  const { data } = await supabase.from('User').select('*').eq('email', user.email).single()

  if (data) {
    return {
      id: data.id,
      role: data.role,
      username: data.name
    } as AuthentificatedUser
  }

  return null
}

export async function isLoggedIn(req: Request) {
  return (await getUser(req)) != null
}
