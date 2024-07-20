/* eslint-disable github/no-then */
import { actions } from 'astro:actions'
import { getTotalPostsCount } from 'db/supabase/queries'
import { useEffect, useState } from 'preact/hooks'
import type { PostForCard } from 'db/prisma/types'
import type { ReadonlySignal } from '@preact/signals'

export const useScrolLoading = (props: { initialPosts: PostForCard[]; POSTS_PER_PAGE: ReadonlySignal<number> }) => {
  const [posts, setPosts] = useState<PostForCard[]>(props.initialPosts)

  const [isLoadNeed, setIsLoadNeed] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    getTotalPostsCount().then(t => setTotalCount(t))
  }, [])

  useEffect(() => {
    if (isLoadNeed && posts.length < totalCount) {
      actions.getPosts({ skip: posts.length, limit: props.POSTS_PER_PAGE.value }).then(fethedPosts => {
        setPosts(prev => [...prev, ...fethedPosts])
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
    posts,
    forceLoad: () => setIsLoadNeed(true)
  }
}
