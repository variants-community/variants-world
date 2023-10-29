import type { CreateRouteResponseDataInterface } from 'pages/api/posts/create'
import type { Prisma } from '@prisma/client'

export const handlePrismaError = (e: Prisma.PrismaClientKnownRequestError) => {
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

export const handleError = (e: Error) => {
  return new Response(
    JSON.stringify({
      error: { message: e.message }
    } as CreateRouteResponseDataInterface),
    { status: 500 }
  )
}

export const handleUnknowError = () => {
  return new Response(
    JSON.stringify({
      error: { message: 'Error' }
    } as CreateRouteResponseDataInterface),
    { status: 500 }
  )
}
