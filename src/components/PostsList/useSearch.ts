import { useEffect, useState } from 'preact/hooks'
import type { PostForCard, PostWithDetailsForCard } from '../../db/prisma/queries'
import { supabase } from '../../db/supabase/supabase'

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

export const useSearch = (initpPosts: PostForCard[]) => {
  const [query, setQuery] = useState('')
  const [posts, setPosts] =
    useState<PostForCard[]>(initpPosts)

  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    supabase
      .from('Post')
      .select('*', { count: 'exact', head: true })
      .then((response) => {
        console.log('load count')
        setTotalCount(response.count ?? 0)
      })
  }, [])

  const handleScroll = () => {
    const { scrollTop, scrollHeight } = document.documentElement
    if (scrollHeight - (scrollTop + window.innerHeight) < 400) {
      setFetching(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [totalCount])


  useEffect(() => {
    if (fetching && posts.length < totalCount) {
      console.log('fetch!!!')
      fetch(`/api/posts?page=${currentPage}&limit=${5}`, {method: 'get'})
      .then(async response => {
        const newPosts = await response.json() as PostForCard[]
        setPosts(prev => [...prev, ...newPosts])
        setCurrentPage((prev) => prev + 1)
        setFetching(false)
      })
    }
  }, [fetching])

  useEffect(() => {
    if (query != '') {
      
      setPosts(
        posts.filter((post) =>
          getTextForSearch(post).includes(query.toLowerCase())
        )
      )
    } else {
      setPosts(posts)
    }
  }, [query])

  return {
    posts,
    query,
    setQuery
  }
}
