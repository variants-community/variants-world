import { type ValidationRequest, validateGames } from 'utils/games-validation'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const validationRequest = (await request.json()) as ValidationRequest
    const validationDetails = await validateGames(validationRequest, locals.user)

    if (!validationDetails) return new Response(undefined, { status: 404 })
    return new Response(JSON.stringify(validationDetails), { status: 200 })
  } catch (err) {
    return new Response(undefined, { status: 403 })
  }
}
