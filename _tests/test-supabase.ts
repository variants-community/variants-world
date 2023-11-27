import { beforeEach, expect } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import type { Database } from 'db/supabase/types'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
})

export const authenticate = () => {
  return beforeEach(async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@variants.world',
      password: 'test'
    })
    expect(error).toBeNull()
  })
}
