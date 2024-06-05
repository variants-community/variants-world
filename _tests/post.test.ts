import { TEST_POST_DETAILS_ID, authenticateAsMember, authenticateAsTester, supabase } from '../_tests/test-supabase'
import { describe, expect, it } from 'vitest'

describe('authenticated tester', () => {
  authenticateAsTester()

  it('Allow tester reading any posts', async () => {
    const { data, error } = await supabase.from('Post').select('id').eq('id', TEST_POST_DETAILS_ID).single()
    expect(error).toBeNull()
    expect(data?.id).toBe(TEST_POST_DETAILS_ID)
  })

  it('Allow tester update any posts', async () => {
    const { data, error } = await supabase
      .from('Post')
      .update({ description: `This post is used for testing rls. (last test: ${new Date().toUTCString()})` })
      .eq('id', TEST_POST_DETAILS_ID)
      .select()
      .single()

    expect(error).toBeNull()
    expect(data).toBeDefined()
  })
})

describe('authenticated member', () => {
  authenticateAsMember()

  it('Allow member reading any posts', async () => {
    const { data, error } = await supabase.from('Post').select('*').eq('id', TEST_POST_DETAILS_ID).single()
    expect(error).toBeNull()
    expect(data?.id).toBe(TEST_POST_DETAILS_ID)
  })

  it('Restrict member update any posts', async () => {
    const { data, error } = await supabase
      .from('Post')
      .update({ description: `I am an evil hacker and I hacked this post (at ${new Date().toUTCString()})` })
      .eq('id', TEST_POST_DETAILS_ID)
      .select()
      .single()

    expect(error).toBeDefined()
    expect(data).toBeNull()
  })

  it('Restrict authors edit not his posts', async () => {
    const { error } = await supabase
      .from('Post')
      .update({ title: 'PROBLEMS Test Post (do not delete) PROBLEMS' })
      .eq('id', TEST_POST_DETAILS_ID)
      .single()
    expect(error).toBeDefined()
  })
})
