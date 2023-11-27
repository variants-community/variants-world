import { authenticate, supabase } from '../_tests/test-supabase'
import { describe, expect, it } from 'vitest'

describe('authenticated user', () => {
  authenticate()

  /**
   * SELECT Policy:
   *
   * exists (
   *   select 1 from "User"
   *   where ("User".id = "testerId" and "User".uuid = auth.uid()::text)
   * )
   */

  it('Allow tester reading his own vote', async () => {
    const { data, error } = await supabase.from('Vote').select('value').eq('testerId', 1).single()
    expect(error).toBeNull()
    expect(data?.value).toBeTypeOf('string')
  })

  it('Restrict tester reading others votes', async () => {
    const { data, error } = await supabase.from('Vote').select('value').eq('testerId', 50645954).single()
    expect(error).toBeDefined()
    expect(data).toBeNull()
  })
})
