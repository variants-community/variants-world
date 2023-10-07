import { type PostDetails, validatePostDetails } from 'services/post-details-validator-new'
import { createPost } from 'services/create-post'
import { getGameDetailsById } from 'cgabot'
import Prisma from 'db/prisma/prisma'
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
    const postDetails = (await request.json()) as PostDetails
    await validatePostDetails(postDetails)
    const game = await getGameDetailsById(postDetails.gameId)
    // TODO: handle `game` being undefined
    // "handle `game` being undefined" -- if the game is undefined,
    // an exception will be thrown at the validation stage ( parseAsync(...) )
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const id = await createPost(game!, postDetails) // the game has already been validate and exist
    return new Response(
      JSON.stringify({
        confirmedGameId: id
      } as CreateRouteResponseDataInterface)
    )
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) return handlePrismaError(e)
    else if (e instanceof Error) return handleError(e)
    else return handleUnknowError()
  }
}

const handlePrismaError = (e: Prisma.PrismaClientKnownRequestError) => {
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
