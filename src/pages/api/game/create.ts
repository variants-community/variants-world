import type { APIRoute } from 'astro'
import { CGABotGameDetails, getGameDetailsById } from '../../../cgabot'

const allAreEqual = (arr: string[]) =>
  arr.every((element) => element === arr[0])

const getTextForComparing = (game: CGABotGameDetails) =>
  game.q.startFen + JSON.stringify(game.q.ruleVariants)

const isGame = (
  game: CGABotGameDetails | undefined
): game is CGABotGameDetails => {
  return !!game
}

export const post: APIRoute = async ({ request }) => {
  const data = (await request.json()) as string[]
  console.log('create post by ids: ', data)

  const games = await Promise.all(data.map(getGameDetailsById))

  if (games.some((game) => game === undefined)) {
    console.log('WRONG ID FOUNDED')
  } else {
    console.log('ALL GAMES FOUNDED')
    const isEqual = allAreEqual(games.filter(isGame).map(getTextForComparing))
    if (isEqual) {
      console.log('ADD POST LOGIC')
    } else {
      console.log('PROVIDED GAMES NOT EQUAL')
    }
  }

  return new Response(undefined, { status: 200 })
}
