import { fetchPosts } from 'utils/fetch-queries'
import { getTotalPostsCount } from 'db/supabase/queries'
import { useEffect, useState } from 'preact/hooks'
import type { PostForCard } from 'db/prisma/queries'

const POSTS_PER_PAGE = 10

export const useScrolLoading = (initialPosts: PostForCard[]) => {
  const [posts, setPosts] = useState<PostForCard[]>(initialPosts)

  const [currentPage, setCurrentPage] = useState(1)
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
    const app = document.querySelector('#app')
    if (!app) return
    const { scrollTop, scrollHeight } = app
    // play around with the trigger factor instead of fixed px
    const trigger = 1
    if (scrollHeight - (scrollTop + window.innerHeight) < window.innerHeight * trigger) {
      setIsLoadNeed(true)
    }
  }

  useEffect(() => {
    const app = document.querySelector('#app')
    if (!app) return
    app.addEventListener('scroll', handleScroll)
    return () => {
      app.removeEventListener('scroll', handleScroll)
    }
  }, [totalCount])

  return {
    posts
  }
}
