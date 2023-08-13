import { useEffect, useState } from 'preact/hooks'
import type { PostWithDetailsForCard } from '../../db/prisma/queries'

const getTextForSearch = (post: PostWithDetailsForCard): string => {
  const value = (
    post.title +
    post.author.name +
    post.description +
    post.type
  ).toLowerCase()
  console.log('rs: ', value)
  return value
}

export const useSearchQuery = (posts: PostWithDetailsForCard[]) => {
  const [query, setQuery] = useState('')
  const [filteredPosts, setFilteredPosts] =
    useState<PostWithDetailsForCard[]>(posts)

  useEffect(() => {
    if (query != '') {
      setFilteredPosts(
        posts.filter((post) =>
          getTextForSearch(post).includes(query.toLowerCase())
        )
      )
    } else {
      setFilteredPosts(posts)
    }
  }, [query])

  return {
    filteredPosts,
    query,
    setQuery
  }
}
