import { createPost } from './../../../services/postsService'
import type { APIRoute } from 'astro'
import { getGameDetailsById } from '../../../services/cgabot'
import { getTextForComparing, isGame } from '../../../hepers'

const isSameGames = (arr: string[]) =>
  arr.every((element) => element === arr[0])

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
  console.log(
    `[api/posts/create] [${data.gameId}] - Attempt to create a post\ndetails: `,
    data
  )

  const mainGame = await getGameDetailsById(data.gameId)
  const gamesOrUndefined = await Promise.all(
    data.approveIds.map(getGameDetailsById)
  )

  gamesOrUndefined.push(mainGame)

  if (
    gamesOrUndefined.some((game) => game === undefined) ||
    data.approveIds.length !== 8
  ) {
    console.log(
      `[api/posts/create] [${data.gameId}] - Failed - One or more games is undefined`
    )
    return new Response(undefined, {
      status: 400,
      statusText: 'One of the games was not found'
    })
  }

  const games = gamesOrUndefined.filter(isGame)

  const isSame = isSameGames(games.map(getTextForComparing))

  if (isSame) {
    console.log(`[api/posts/create] [${data.gameId}] - Basic checks passed`)
    const response = await createPost(mainGame!, data)

    if (response.status < 400) {
      return new Response(JSON.stringify({ id: response.data?.id }), {
        status: response.status,
        statusText: 'Post created'
      })
    } else if (response.status === 209) {
      return new Response(undefined, {
        status: response.status,
        statusText: 'The game is already registered'
      })
    } else {
      return new Response(undefined, {
        status: response.status,
        statusText: 'Error'
      })
    }
  } else {
    console.log(
      `[api/posts/create] [${data.gameId}] - Failed - Games not related`
    )
    return new Response(undefined, {
      status: 422,
      statusText: 'The games are not related'
    })
  }
}
