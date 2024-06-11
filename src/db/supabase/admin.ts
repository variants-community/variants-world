import { OAUTH_CLIENT_ID } from 'astro:env/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from 'db/supabase/types'

OAUTH_CLIENT_ID
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
}).auth.admin
