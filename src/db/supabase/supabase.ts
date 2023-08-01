import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'
import cookie from 'cookie'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY
const accessToken = import.meta.env.ACCESS_TOKEN

console.log('supabaseUrl:', supabaseUrl)
console.log('supabaseAnonKey:', supabaseAnonKey)
console.log('accessToken:', accessToken)



export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function getUser(req: Request) {
 const c = cookie.parse(req.headers.get('cookie') ?? '')
 if (!c.sbat) {
     return null
 }

 const { data: { user } } = await supabase.auth.getUser(c.sbat)
 if (!user || user.role !== 'authenticated') {
     return null
 }
 return user
}

export async function isLoggedIn(req: Request) {
 return await getUser(req) != null
}
