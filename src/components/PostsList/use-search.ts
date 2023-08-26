/* eslint-disable github/no-then */
import { fetchPosts } from 'utils/fetch-queries'
import { getTotalPostsCount } from 'db/supabase/queries'
import { useEffect, useState } from 'preact/hooks'
import type { PostForCard } from 'db/prisma/queries'

const POSTS_PER_PAGE = 10

export const useSearch = () => {
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState<PostForCard[]>([])

  const [currentPage, setCurrentPage] = useState(0)
  const [fetching, setFetching] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const [searchTimeout, setSearchTimeout] = useState<number>()

  useEffect(() => {
    getTotalPostsCount().then(setTotalCount)
  }, [])

  useEffect(() => {
    if (fetching && posts.length < totalCount) {
      fetchPosts({ page: currentPage, limit: POSTS_PER_PAGE }).then(newPosts => {
        setPosts(prev => [...prev, ...newPosts])
        setCurrentPage(prev => prev + 1)
        setFetching(false)
      })
    }
  }, [fetching])

  useEffect(() => {
    if (query !== '') {
      if (searchTimeout) self.clearTimeout(searchTimeout)
      setSearchTimeout(
        self.setTimeout(() => {
          fetchPosts({ searchText: query }).then(newPosts => {
            setPosts(newPosts)
            setFetching(false)
          })
        }, 500)
      )
    } else {
      fetchPosts({ page: 0, limit: POSTS_PER_PAGE }).then(newPosts => {
        setPosts(newPosts)
        setCurrentPage(1)
        setFetching(false)
      })
    }
  }, [query])

  const handleScroll = () => {
    const { scrollTop, scrollHeight } = document.documentElement
    if (scrollHeight - (scrollTop + window.innerHeight) < 800) {
      setFetching(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [totalCount])

  return {
    posts,
    query,
    setQuery
  }
}
