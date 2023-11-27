/* eslint-disable no-console */
import { beforeEach, describe, expect, it } from 'vitest'
import { supabase } from '../_tests/test-supabase'

// imports
describe('authenticated user', () => {
  beforeEach(async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@variants.world',
      password: 'test'
    })
    expect(error).toBeNull()
  })

  it('Get its own refreshToken', async () => {
    const { data, error } = await supabase.from('User').select('refreshToken').eq('username', 'Test').single()
    error && console.error(error)
    expect(error).toBeNull()
    expect(data?.refreshToken).toBe('test-token')
  })

  it('Get others refreshToken', async () => {
    const { data, error } = await supabase.from('User').select('refreshToken').eq('username', 'Test').single()
    expect(error).toBeDefined()
    expect(data).toBeNull()
  })
})
