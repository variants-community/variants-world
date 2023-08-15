import type { APIRoute } from 'astro'
import { getPosts } from '../../../db/prisma/queries'

export const get: APIRoute = async ({ url }) => {
 
  const page = Number(url.searchParams.get('page'))
  const limit = Number(url.searchParams.get('limit'))

  if (isNaN(page) || isNaN(limit)) {
    console.log('[api/posts] Invalid request')
    return new Response(undefined, {
      status: 404,
      statusText: 'Invalid format.'
    })
  }
  console.log('[api/posts] page=', page, ' limit=', limit)
  const posts = await getPosts(page * limit, limit)

  return new Response(JSON.stringify(posts), { status: 200 })
}
