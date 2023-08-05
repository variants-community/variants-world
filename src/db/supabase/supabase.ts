import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'
import cookie from 'cookie'
import type { UserRole } from '@prisma/client'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY
const accessToken = import.meta.env.ACCESS_TOKEN

console.log('supabaseUrl:', supabaseUrl)
console.log('supabaseAnonKey:', supabaseAnonKey)
console.log('accessToken:', accessToken)

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: { autoRefreshToken: true }
})

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

  const { data } = await supabase
    .from('User')
    .select('*')
    .eq('email', user.email)
    .single()

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
