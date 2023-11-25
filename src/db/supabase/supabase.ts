import { createClient } from '@supabase/supabase-js'
import type { Database } from 'db/supabase/types'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// eslint-disable-next-line import/no-mutable-exports
let supabase: ReturnType<typeof createClient<Database>>
if (!import.meta.env.SSR) {
  const { token } = Object.fromEntries(document.cookie.split('; ').map(line => line.split('='))) as {
    token?: string
    expires?: string // TODO
  }
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  })
  const json = token?.split('.')?.[1]
  if (json) {
    const existingSession = await supabase.auth.getSession()
    if (existingSession.data.session) {
      // eslint-disable-next-line no-console
      console.log('Successfully restored last session')
    } else {
      const id = JSON.parse(atob(json)).id
      const result = await supabase.auth.signInWithPassword({
        email: `${id}@variants.world`,
        password: token.split('.')[2]
      })

      if (result.data.session) {
        // eslint-disable-next-line no-console
        console.log('Successfully logged in')
      } else {
        // eslint-disable-next-line no-console
        console.error('Failed to log in')
      }
    }
  } else {
    throw new TypeError('No cookies found! Please refresh the page.')
  }
} else {
  supabase = undefined as unknown as ReturnType<typeof createClient<Database>>
}

export { supabase }
