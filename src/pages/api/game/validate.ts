import { type GamesConfirmationRequest, validateGames } from 'utils/games-validation'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  try {
    const games = (await request.json()) as GamesConfirmationRequest
    const validationDetails = await validateGames(games)

    if (!validationDetails) return new Response(undefined, { status: 404 })
    return new Response(JSON.stringify(validationDetails), { status: 200 })
  } catch (err) {
    return new Response(undefined, { status: 400 })
  }
}
