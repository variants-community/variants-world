import { TEST_TESTER_ID, authenticateAsTester, supabase } from '../_tests/test-supabase'
import { describe, expect, it } from 'vitest'

describe('authenticated user', () => {
  authenticateAsTester()

  /**
   * SELECT Policy:
   *
   * uuid = auth.uid()::text
   */

  it('Allow reading its own refreshToken', async () => {
    const { data, error } = await supabase.from('User').select('refreshToken').eq('id', TEST_TESTER_ID).single()
    expect(error).toBeNull()
    expect(data?.refreshToken).toBe('test-token')
  })

  it('Restrict reading others refreshToken', async () => {
    const { data, error } = await supabase.from('User').select('refreshToken').eq('username', 'qilp').single()
    expect(error).toBeDefined()
    expect(data).toBeNull()
  })
})
