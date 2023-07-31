import { useEffect, useState } from 'preact/hooks'
import PostCard from './PostCard'
import Search from './Search'
import type { PostWithDetailsForCard } from '../db/prisma/queries'

// can it be stored in the db as field?
const getTextForSearch = (post: PostWithDetailsForCard): string => {
  const value = (post.title + post.author.name + post.description + post.type)
    .toLowerCase()
  console.log('rs: ', value)
  return value
}

type PostsListProps = {
  posts: PostWithDetailsForCard[];
};

const PostsList = (props: PostsListProps) => {
  const [query, setQuery] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<PostWithDetailsForCard[]>(
    props.posts,
  )

  useEffect(() => {
    if (query != '') {
      setFilteredPosts(
        props.posts.filter((post) =>
          getTextForSearch(post).includes(query.toLowerCase())
        ),
      )
    }
  }, [query])

  return (
    <>
      <Search query={query} setQuery={setQuery} />

      <div className="flex flex-col gap-[30px] mt-[55px]">
        {filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </>
  )
}

export default PostsList
