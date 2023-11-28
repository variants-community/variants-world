import {
  TEST_MEMBER_ID,
  TEST_POST_DETAILS_ID,
  TEST_TESTER_ID,
  authenticateAsMember,
  authenticateAsTester,
  supabase
} from '../_tests/test-supabase'
import { describe, expect, it } from 'vitest'

describe('authenticated tester', async () => {
  authenticateAsTester()

  await supabase.from('PostOnUserLikes').delete().eq('postId', TEST_POST_DETAILS_ID)

  it('Allow tester insert his own likes on any posts', async () => {
    const { data, error } = await supabase
      .from('PostOnUserLikes')
      .insert({ postId: TEST_POST_DETAILS_ID, userId: TEST_TESTER_ID })
      .select()
      .single()

    expect(error).toBeNull()
    expect(data?.userId).toBe(TEST_TESTER_ID)
  })

  it('Allow tester remove his own likes on any posts', async () => {
    const { data, error } = await supabase
      .from('PostOnUserLikes')
      .delete()
      .eq('postId', TEST_POST_DETAILS_ID)
      .eq('userId', TEST_TESTER_ID)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data?.userId).toBe(TEST_TESTER_ID)
  })

  it('Restrict tester insert not their own likes', async () => {
    const { data, error } = await supabase
      .from('PostOnUserLikes')
      .insert({ postId: TEST_POST_DETAILS_ID, userId: TEST_MEMBER_ID })
      .select()
      .single()

    expect(error).toBeDefined()
    expect(data).toBeNull()
  })

  await supabase.from('PostOnUserLikes').delete().eq('postId', TEST_POST_DETAILS_ID)
})

describe('authenticated member', () => {
  authenticateAsMember()

  it('Allow member insert his own likes on any posts', async () => {
    const { data, error } = await supabase
      .from('PostOnUserLikes')
      .insert({ postId: TEST_POST_DETAILS_ID, userId: TEST_MEMBER_ID })
      .select()
      .single()

    expect(error).toBeNull()
    expect(data?.userId).toBe(TEST_MEMBER_ID)
  })

  it('Allow member remove his own likes on any posts', async () => {
    const { data, error } = await supabase
      .from('PostOnUserLikes')
      .delete()
      .eq('postId', TEST_POST_DETAILS_ID)
      .eq('userId', TEST_MEMBER_ID)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data?.userId).toBe(TEST_MEMBER_ID)
  })

  it('Restrict member insert not their own likes', async () => {
    const { data, error } = await supabase
      .from('PostOnUserLikes')
      .insert({ postId: TEST_POST_DETAILS_ID, userId: TEST_TESTER_ID })
      .select()
      .single()

    expect(error).toBeDefined()
    expect(data).toBeNull()
  })
})
