import { createClient } from '@supabase/supabase-js'
import type { Database } from 'db/supabase/types'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// eslint-disable-next-line import/no-mutable-exports
let supabase: ReturnType<typeof createClient<Database>>
if (!import.meta.env.SSR) {
  const { token } = Object.fromEntries(document.cookie.split('; ').map(line => line.split('='))) as {
    token?: string
    expires?: string // TODO
  }
  supabase = createClient<Database>(supabaseUrl, token ?? '')
} else {
  supabase = undefined as unknown as ReturnType<typeof createClient<Database>>
}

export { supabase }
