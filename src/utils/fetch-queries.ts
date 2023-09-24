import type { CGABotGameDetails } from 'cgabot'
import type { CreateRouteResponseDataInterface } from 'pages/api/posts/create'
import type { PostDetails } from 'services/create-post'
import type { PostForCard } from 'db/prisma/queries'

export const fetchGameById = async (gameId: string, signal?: AbortSignal) => {
  try {
    const response = await fetch(`/api/game/${gameId}`, { method: 'get', signal })
    if (response.status === 200) {
      return (await response.json()) as CGABotGameDetails
    } else {
      return undefined
    }
  } catch {
    return undefined
  }
}

export const postGameToCreatePost = async (postDetails: PostDetails): Promise<CreateRouteResponseDataInterface> => {
  const response = await fetch('/api/posts/create', {
    method: 'post',
    body: JSON.stringify(postDetails)
  })

  const data = (await response.json()) as CreateRouteResponseDataInterface
  return data
}

type Query = {
  page?: number
  limit?: number
  searchText?: string
}

export const fetchPosts = async (query: Query) => {
  try {
    let response = null
    if (query.page !== undefined && query.limit !== undefined) {
      response = await fetch(`/api/posts?page=${query.page}&limit=${query.limit}`, { method: 'get' })
    } else if (query.searchText) {
      response = await fetch(`/api/posts?searchText=${query.searchText}`, {
        method: 'get'
      })
    } else {
      return []
    }

    if (response.status === 200) {
      return (await response.json()) as PostForCard[]
    } else {
      return []
    }
  } catch {
    return []
  }
}
