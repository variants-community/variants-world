import type { CGABotGameDetails } from '../cgabot'
import type { PostForCard } from '../db/prisma/queries'
import type { PostDetailsDTO } from '../services/createPost'

export const fetchGameById = async (gameId: string, signal?: AbortSignal) => {
 const response = await fetch(`/api/game/${gameId}`, { method: 'get', signal })
 if (response.status === 200) {
   return (await response.json()) as CGABotGameDetails
 } else {
   return undefined
 }
}

export const postGameToCreatePost = async (data: PostDetailsDTO) => {
 const response = await fetch('/api/posts/create', {
   method: 'post',
   body: JSON.stringify(data)
 })

 const id = await response.json()

 return { data: id, status: response.status, statusText: response.statusText }
}

type Query = {
 page?: number
 limit?: number
 searchText?: string
}

export const fetchPosts = async (query: Query) => {
 let response = null
 if (query.page != undefined && query.limit != undefined) {
   response = await fetch(
     `/api/posts?page=${query.page}&limit=${query.limit}`,
     { method: 'get' }
   )
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
}