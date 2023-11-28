import {
  TEST_MEMBER_ID,
  TEST_POST_DETAILS_ID,
  TEST_TESTER_ID,
  authenticateAsMember,
  authenticateAsTester,
  supabase
} from '../_tests/test-supabase'
import { describe, expect, it } from 'vitest'

describe('authenticated tester', () => {
  authenticateAsTester()

  it('Allow tester insert his own comments on any posts', async () => {
    const { data, error } = await supabase
      .from('Comment')
      .insert({
        content: `TEST COMMENT (at ${new Date().toUTCString()})`,
        postId: TEST_POST_DETAILS_ID,
        userId: TEST_TESTER_ID
      })
      .select()
      .single()

    expect(error).toBeNull()
    expect(data?.userId).toBe(TEST_TESTER_ID)
  })

  it('Allow tester remove (hidde) any comment', async () => {
    const { error } = await supabase.from('Comment').update({ hidden: true }).eq('postId', TEST_POST_DETAILS_ID) // make all comments not hidden

    expect(error).toBeNull()
  })

  it('Restrict tester insert not their own comments', async () => {
    const { data, error } = await supabase
      .from('Comment')
      .insert({
        content: `hacked COMMENT (at ${new Date().toUTCString()})`,
        postId: TEST_POST_DETAILS_ID,
        userId: TEST_MEMBER_ID
      })
      .select()
      .single()

    expect(error).toBeDefined()
    expect(data).toBeNull()
  })
})

describe('authenticated member', () => {
  authenticateAsMember()

  it('Allow member insert his own comments on any posts', async () => {
    const { data, error } = await supabase
      .from('Comment')
      .insert({
        content: `TEST COMMENT (at ${new Date().toUTCString()})`,
        postId: TEST_POST_DETAILS_ID,
        userId: TEST_MEMBER_ID
      })
      .select()
      .single()

    expect(error).toBeNull()
    expect(data?.userId).toBe(TEST_MEMBER_ID)
  })

  it('Restrict member update any comment', async () => {
    const { error, data } = await supabase
      .from('Comment')
      .update({ content: `ALL COMMENTS hacked (updated) (at ${new Date().toUTCString()})` })
      .eq('postId', TEST_POST_DETAILS_ID)
      .select()
      .single() // try overwrtie alll comments

    expect(error).toBeDefined()
    expect(data).toBeNull()
  })
})
