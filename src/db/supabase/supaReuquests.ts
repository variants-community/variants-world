import { supabase } from './supabase'

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3
  const from = page ? page * limit : 0
  const to = page ? from + size - 1 : size - 1

  return { from, to }
}

export const getPostsByPage = async (page: number) => {
  const { from, to } = getPagination(page, 10)
  const { data, count, error } = await supabase
    .from('Post')
    .select(`
    *,
    author ( * )
    `)
    .order('createdAt', { ascending: true })
    .range(from, to)
  error && console.log('[getPostsByPage]: ', error.message)
  return {
    data,
    count,
    page
  }
}
