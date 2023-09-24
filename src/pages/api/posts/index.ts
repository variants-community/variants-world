import { getPosts, searchFor } from 'db/prisma/queries'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ url }) => {
  const page = Number(url.searchParams.get('page'))
  const limit = Number(url.searchParams.get('limit'))
  const searchText = url.searchParams.get('searchText')

  if (isNaN(page) || isNaN(limit)) {
    console.log('[api/posts] Invalid request')
    return new Response(undefined, {
      status: 404,
      statusText: 'Invalid format.'
    })
  }

  if (searchText != null) {
    const posts = await searchFor(searchText) //split(' ')
    return new Response(JSON.stringify(posts), { status: 200 })
  } else {
    console.log('[api/posts] page=', page, ' limit=', limit)
    const posts = await getPosts(page * limit, limit)

    return new Response(JSON.stringify(posts), { status: 200 })
  }
}
