/* eslint-disable filenames/match-regex */
import { getGameDetailsById } from 'cgabot'
import { isIdValid } from 'utils/hepers'
import { isValidSimilarity } from 'services/validation-utlis'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params }) => {
  if (!params.id || !params.verify_id || !isIdValid(params.id) || !isIdValid(params.verify_id))
    return new Response(JSON.stringify(false), {
      status: 404,
      statusText: 'Invalid format.'
    })

  const mainGame = await getGameDetailsById(params.id)
  const gameToVerify = await getGameDetailsById(params.verify_id)

  if (mainGame && gameToVerify) {
    const isSameGame = isValidSimilarity([mainGame, gameToVerify]) && params.id !== params.verify_id
    // mainGame.q.startFen === gameToVerify.q.startFen &&
    // JSON.stringify(mainGame.q.ruleVariants) === JSON.stringify(gameToVerify.q.ruleVariants)

    return new Response(JSON.stringify(isSameGame), { status: 200 })
  }

  return new Response(JSON.stringify(false), {
    status: 404,
    statusText: 'Not found'
  })
}
