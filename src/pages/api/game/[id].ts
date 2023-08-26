import { getGameDetailsById } from 'cgabot'
import { isIdValid } from 'utils/hepers'
import type { APIRoute } from 'astro'

export const get: APIRoute = async ({ params }) => {
  if (!params.id || !isIdValid(params.id))
    return new Response(undefined, {
      status: 404,
      statusText: 'Invalid format.'
    })

  const game = await getGameDetailsById(params.id)

  if (game) return new Response(JSON.stringify(game), { status: 200 })
  else return new Response(undefined, { status: 404, statusText: 'Not found' })
}
