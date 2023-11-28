import { beforeEach, expect } from 'vitest'
import { createClient } from '@supabase/supabase-js'
import type { Database } from 'db/supabase/types'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

export const TEST_TESTER_ID = 1
export const TEST_MEMBER_ID = 2
export const TEST_POST_DETAILS_ID = 3

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
})

export const authenticateAsTester = () => {
  return beforeEach(async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@variants.world',
      password: 'test'
    })
    expect(error).toBeNull()
  })
}

export const authenticateAsMember = () => {
  return beforeEach(async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test2@variants.world',
      password: 'test2@variants.world'
    })
    expect(error).toBeNull()
  })
}
