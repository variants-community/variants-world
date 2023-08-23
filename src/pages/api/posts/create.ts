import type { APIRoute } from 'astro'
import { PostDetailsDTO, createPost } from '../../../services/createPost'
import { validateGame } from '../../../services/validateGame'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

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
    const gameDetails = (await request.json()) as PostDetailsDTO
    const game = await validateGame(gameDetails)
    const id = await createPost(game, gameDetails)
    return new Response(
      JSON.stringify({
        confirmedGameId: id
      } as CreateRouteResponseDataInterface)
    )
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return handlePrismaError(e)
    } else if (e instanceof Error) return handleError(e)
    else return handleUnknowError()
  }
}

const handlePrismaError = (e: PrismaClientKnownRequestError) => {
  let errorMessage = ''
  if (e.code === 'P2002') {
    errorMessage = 'Post with this game alredy exist.'
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
