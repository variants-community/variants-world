import type { CGABotGameDetails } from 'cgabot'
import type { CreatePostDetails, PostForCard } from 'db/prisma/queries'
import type { CreateRouteResponseDataInterface } from 'pages/api/posts/create'

export const fetchGameById = async (gameNr: number, signal?: AbortSignal) => {
  const response = await fetch(`/api/game/${gameNr}`, { method: 'get', signal })
  if (response.status === 200) {
    return (await response.json()) as CGABotGameDetails
  } else {
    return undefined
  }
}

export const postGameToCreatePost = async (details: CreatePostDetails): Promise<CreateRouteResponseDataInterface> => {
  const response = await fetch('/api/posts/create', {
    method: 'post',
    body: JSON.stringify(details)
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
      response = await fetch(`/api/posts?searchText=${encodeURIComponent(query.searchText)}`, {
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
