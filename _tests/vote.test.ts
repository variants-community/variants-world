import { TEST_POST_DETAILS_ID, TEST_TESTER_ID, authenticateAsTester, supabase } from '../_tests/test-supabase'
import { describe, expect, it } from 'vitest'
import type { VoteValue } from '@prisma/client'

describe('authenticated user', () => {
  authenticateAsTester()

  /**
   * SELECT INSERT UPDATE Policy:
   *
   * exists (
   *   select 1 from "User"
   *   where ("User".id = "testerId" and "User".uuid = auth.uid()::text)
   * )
   *
   */

  it('Allow tester reading his own vote', async () => {
    const { data, error } = await supabase.from('Vote').select('value').eq('testerId', TEST_TESTER_ID).single()
    expect(error).toBeNull()
    expect(data?.value).toBeTypeOf('string')
  })

  it('Restrict tester reading others votes', async () => {
    const { data, error } = await supabase.from('Vote').select('value').eq('testerId', 50645954).single()
    expect(error).toBeDefined()
    expect(data).toBeNull()
  })

  const value: VoteValue = 'NEUTRAL'
  it('Allow tester insert/update vote', async () => {
    const { data, error } = await supabase
      .from('Vote')
      .upsert(
        { value, postDetailsId: TEST_POST_DETAILS_ID, testerId: TEST_TESTER_ID },
        { onConflict: 'postDetailsId, testerId' }
      )
      .eq('testerId', TEST_TESTER_ID)

    expect(error).toBeNull()
    expect(data).toBeNull()
  })
})
