import { authenticate, supabase } from '../_tests/test-supabase'
import { describe, expect, it } from 'vitest'

describe('authenticated user', () => {
  authenticate()

  /**
   * SELECT Policy:
   *
   * uuid = auth.uid()::text
   */

  it('Allow reading its own refreshToken', async () => {
    const { data, error } = await supabase.from('User').select('refreshToken').eq('username', 'Test').single()
    expect(error).toBeNull()
    expect(data?.refreshToken).toBe('test-token')
  })

  it('Restrict reading others refreshToken', async () => {
    const { data, error } = await supabase.from('User').select('refreshToken').eq('username', 'qilp').single()
    expect(error).toBeDefined()
    expect(data).toBeNull()
  })
})
