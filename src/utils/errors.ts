import type { CreateRouteResponseDataInterface } from 'pages/api/posts/create'
import type { Prisma } from '@prisma/client'

export const handlePrismaError = (e: Prisma.PrismaClientKnownRequestError) => {
  let errorMessage = ''
  if (e.code === 'P2002') {
    errorMessage = 'A post with this game already exists'
  } else if (e.code === 'P2003') {
    if (e.meta && String(e.meta.field_name).startsWith('Post_authorUserId_fkey')) {
      errorMessage = 'User not found'
    }
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
