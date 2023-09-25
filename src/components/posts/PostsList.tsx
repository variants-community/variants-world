import { fetchPosts } from 'utils/fetch-queries'
import { useCtrlKFocus } from 'components/posts/use-focus-shortcut'
import { useScrolLoading } from 'components/posts/use-scroll-loading'
import { useSearch } from 'src/hooks/use-search'
import PostCard from 'components/posts/PostCard'
import Search from 'components/posts/Search'
import type { PostForCard } from 'db/prisma/queries'

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
    onQuery: async q => {
      if (query.length > 0) {
        return fetchPosts({ searchText: q })
      }
    }
  })

  useCtrlKFocus()

  return (
    <div class="mx-auto container pb-12">
      <Search query={query} setQuery={setQuery} />

      <div class="flex flex-col gap-8">
        {(query.length > 0 ? foundPosts : posts)?.map(post => (
          <PostCard userId={props.userId} key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostsList
