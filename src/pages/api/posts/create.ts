import type { APIRoute } from 'astro'
import { getGameDetailsById } from '../../../services/cgabot'
import { createPost } from '../../../services/postsService'
import { getTextForComparing, isGame } from '../../../hepers'

const isSameGames = (arr: string[]) =>
  arr.every((element) => element === arr[0])

export interface CreatePostDTO {
  userId: number
  gameIds: string[] // lenght = 9
}

export interface PostDetailsDTO {
  gameId: string;
  approveIds: string[];
  details: {
    description: string;
    title: string;
    type: string;
  };
}


export const post: APIRoute = async ({ request }) => {
  const data = (await request.json()) as CreatePostDTO
  console.log('create post by ids: ', data)

  const gamesOrUndefined = await Promise.all(data.gameIds.map(getGameDetailsById))

  if (gamesOrUndefined.some((game) => game === undefined) || data.gameIds.length !== 9) {
    return new Response(undefined, {
      status: 400,
      statusText: 'One of the games was not found'
    })
  }

  const games = gamesOrUndefined.filter(isGame)

  const isSame = isSameGames(games.map(getTextForComparing))

  if (isSame) {
    createPost(games[0], data.userId)
  }

  return new Response(undefined, { status: 200 })
}
