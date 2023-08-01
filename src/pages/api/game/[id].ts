import type { APIRoute } from 'astro'
import { getGameDetailsById } from '../../../cgabot'

export const get: APIRoute = async ({params}) => {
 console.log('on ', params.id, ' - ', /^\d{8}$/.test(params.id!))
 if (!params.id || !/^\d{8}$/.test(params.id))
  return new Response(undefined, {status: 404, statusText: 'Invalid format.'})

 const game = await getGameDetailsById(params.id)
 console.log('accepted game: ', game)
 if (game)
  return new Response(JSON.stringify(game), {status: 200})
 else 
  return new Response(undefined, {status: 404, statusText: 'Not found'})
}