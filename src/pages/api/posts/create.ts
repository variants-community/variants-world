import { createPost } from './../../../services/postsService'
import type { APIRoute } from 'astro'
import { getGameDetailsById } from '../../../services/cgabot'
import { getTextForComparing, isGame } from '../../../hepers'

const isSameGames = (arr: string[]) =>
  arr.every((element) => element === arr[0])

export interface CreatePostDTO {
  userId: number
  gameIds: string[] // lenght = 9
}

export interface PostDetailsDTO {
  userId: number
  gameId: string
  approveIds: string[]
  details: {
    description: string
    title: string
    type: string
  }
}

export const post: APIRoute = async ({ request }) => {
  const data = (await request.json()) as PostDetailsDTO
  console.log('create post by ids: ', data)

  const mainGame = await getGameDetailsById(data.gameId)
  const gamesOrUndefined = await Promise.all(
    data.approveIds.map(getGameDetailsById)
  )

  gamesOrUndefined.push(mainGame)

  if (
    gamesOrUndefined.some((game) => game === undefined) ||
    data.approveIds.length !== 8
  ) {
    return new Response(undefined, {
      status: 400,
      statusText: 'One of the games was not found'
    })
  }

  const games = gamesOrUndefined.filter(isGame)

  const isSame = isSameGames(games.map(getTextForComparing))

  if (isSame) {
    createPost(mainGame!, data)
  }

  return new Response(undefined, {
    status: 200,
    statusText: 'The games are not related'
  })
}
