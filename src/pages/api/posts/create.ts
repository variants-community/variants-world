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

export interface ErrorMessage {
  message: string
  details?: string
}

const errorMessage = (errorMessage: ErrorMessage): string =>
  JSON.stringify(errorMessage)

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
    return new Response(
      errorMessage({ message: 'One of the games was not found' }),
      { status: 400 }
    )
  }

  const games = gamesOrUndefined.filter(isGame)

  const isSame = isSameGames(games.map(getTextForComparing))

  if (isSame) {
    console.log(`[api/posts/create] [${data.gameId}] - Basic checks passed`)
    const response = await createPost(mainGame!, data)

    if (response.status < 400) {
      return new Response(JSON.stringify({ id: response.data?.id }), {
        status: response.status
      })
    } else if (response.status === 409) {
      return new Response(
        errorMessage({ message: 'The game is already registered' }),
        { status: response.status }
      )
    } else {
      return new Response(errorMessage({ message: 'Error' }), {
        status: response.status
      })
    }
  } else {
    console.log(
      `[api/posts/create] [${data.gameId}] - Failed - Games not related`
    )
    return new Response(
      errorMessage({ message: 'The games are not related' }),
      { status: 422 }
    )
  }
}
