import { actions } from 'astro:actions'
import { useScrolLoading } from 'components/posts/use-scroll-loading'
import { useSearch } from 'src/hooks/use-search'
import PostCard from 'components/posts/PostCard'
import PostsSearch from 'components/posts/PostsSearch'
import type { PostForCard } from 'db/prisma/types'

type PostsListProps = {
  userId: number
  posts: PostForCard[]
}

const PostsList = (props: PostsListProps) => {
  const { posts } = useScrolLoading(props.posts)

  const {
    data: foundPosts,
    query,
    setQuery
  } = useSearch({
    default: '',
    onQuery: async newQuery => {
      if (newQuery.length > 0) {
        return actions.getFilteredPosts({ query: newQuery })
      }
    }
  })

  return (
    <div class="mx-auto container pb-12">
      <PostsSearch query={query} setQuery={setQuery} />

      <div class="flex flex-col gap-8">
        {(query.length > 0 ? foundPosts : posts)?.map(post => (
          <PostCard userId={props.userId} key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostsList
