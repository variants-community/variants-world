import { fetchPosts } from 'utils/fetch-queries'
import { getTotalPostsCount } from 'db/supabase/queries'
import { useEffect, useState } from 'preact/hooks'
import type { PostForCard } from 'db/prisma/queries'

const POSTS_PER_PAGE = 10

export const useScrolLoading = (initPosts: PostForCard[]) => {
  const [posts, setPosts] = useState<PostForCard[]>(initPosts)

  const [currentPage, setCurrentPage] = useState(0)
  const [isLoadNeed, setIsLoadNeed] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    // eslint-disable-next-line github/no-then
    getTotalPostsCount().then(t => setTotalCount(t))
  }, [])

  useEffect(() => {
    if (isLoadNeed && posts.length < totalCount) {
      // eslint-disable-next-line github/no-then
      fetchPosts({ page: currentPage, limit: POSTS_PER_PAGE }).then(fethedPosts => {
        setPosts(prev => [...prev, ...fethedPosts])
        setCurrentPage(prev => prev + 1)
        setIsLoadNeed(false)
      })
    }
  }, [isLoadNeed])

  const handleScroll = () => {
    const { scrollTop, scrollHeight } = document.documentElement
    if (scrollHeight - (scrollTop + window.innerHeight) < 800) {
      setIsLoadNeed(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [totalCount])

  return {
    posts
  }
}
