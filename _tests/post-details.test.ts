import { TEST_POST_DETAILS_ID, authenticateAsMember, authenticateAsTester, supabase } from '../_tests/test-supabase'
import { describe, expect, it } from 'vitest'

describe('authenticated tester', () => {
  authenticateAsTester()

  it('Allow tester reading any posts details', async () => {
    const { data, error } = await supabase.from('PostDetails').select('postId').eq('id', TEST_POST_DETAILS_ID).single()
    expect(error).toBeNull()
    expect(data?.postId).toBe(TEST_POST_DETAILS_ID)
  })

  it('Allow tester update any posts details', async () => {
    const { data, error } = await supabase
      .from('PostDetails')
      .update({ notes: `TEST TEST TEST TESTER (at ${new Date().toUTCString()})` })
      .eq('id', TEST_POST_DETAILS_ID)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toBeDefined()
  })
})

describe('authenticated member', () => {
  authenticateAsMember()

  it('Restrict member reading any posts details', async () => {
    const { error } = await supabase.from('PostDetails').select('*').eq('id', TEST_POST_DETAILS_ID).single()
    expect(error).toBeDefined()
  })

  it('Restrict member update any posts details', async () => {
    const { data, error } = await supabase
      .from('PostDetails')
      .update({ notes: 'TEST TEST TEST MEMBER ' })
      .eq('id', TEST_POST_DETAILS_ID)
      .select()
      .single()

    expect(error).toBeDefined()
    expect(data).toBeNull()
  })
})
