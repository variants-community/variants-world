import { PostDetailsValidator } from 'services/post-details-validator'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ValiError, parseAsync } from 'valibot'
import { createPost } from 'services/create-post'
import { getGameDetailsById } from 'cgabot'
import type { APIRoute } from 'astro'

interface ErrorMessage {
  message: string
  details?: string
}

export interface CreateRouteResponseDataInterface {
  confirmedGameId?: number
  error?: ErrorMessage
}

export const post: APIRoute = async ({ request }) => {
  try {
    const postDetails = await parseAsync(PostDetailsValidator, await request.json())
    const game = await getGameDetailsById(postDetails.gameId)
    // TODO: handle `game` being undefined
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = await createPost(game!, postDetails) // the game has already been validate and exist
    return new Response(
      JSON.stringify({
        confirmedGameId: id
      } as CreateRouteResponseDataInterface)
    )
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) return handlePrismaError(e)
    else if (e instanceof Error) return handleError(e)
    else if (e instanceof ValiError) return handleValiError(e)
    else return handleUnknowError()
  }
}

const handlePrismaError = (e: PrismaClientKnownRequestError) => {
  let errorMessage = ''
  if (e.code === 'P2002') {
    errorMessage = 'A post with this game already exists'
  } else {
    errorMessage = 'Unknow error.'
  }
  return new Response(
    JSON.stringify({
      error: { message: errorMessage }
    } as CreateRouteResponseDataInterface),
    { status: 500 }
  )
}

const handleValiError = (e: ValiError) => {
  return new Response(
    JSON.stringify({
      error: { message: e.message }
    } as CreateRouteResponseDataInterface),
    { status: 500 }
  )
}

const handleError = (e: Error) => {
  return new Response(
    JSON.stringify({
      error: { message: e.message }
    } as CreateRouteResponseDataInterface),
    { status: 500 }
  )
}

const handleUnknowError = () => {
  return new Response(
    JSON.stringify({
      error: { message: 'Error' }
    } as CreateRouteResponseDataInterface),
    { status: 500 }
  )
}
