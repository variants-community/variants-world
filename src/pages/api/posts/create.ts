import { type CreatePostDetails, createPost, doesPostWithTitleExist, doesUserExist } from 'db/prisma/queries'
import { descriptionValid, doesGameExist, titleValid } from 'utils/post-validation'
import { handleError, handlePrismaError, handleUnknowError } from 'utils/errors'
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const details = (await request.json()) as CreatePostDetails
    const [game] = await Promise.all([
      doesGameExist(details.gameNr),
      doesUserExist(details.userId),
      descriptionValid(details.data.description),
      titleValid(details.data.title),
      doesPostWithTitleExist(details.data.title)
    ])

    const id = await createPost(game, details) // the game has already been validate and exist
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
