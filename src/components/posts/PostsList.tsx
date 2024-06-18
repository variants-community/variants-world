import { fetchPosts } from 'utils/fetch-queries'
import { useScrolLoading } from 'components/posts/use-scroll-loading'
import { useSearch } from 'src/hooks/use-search'
import PostCard from 'components/posts/PostCard'
import PostsSearch from 'components/posts/AdvancedPostsSearch'
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
    onQuery: async newQuery => {
      if (newQuery.length > 0) {
        return fetchPosts({ searchText: newQuery })
      }
    }
  })

  return (
    <div class="mx-auto container pb-12">
      {/* <AdvancedPostsSearch /> */}
      <PostsSearch query={query} setQuery={setQuery} searchDetails={{ usernames: ['gleb', 'qilp', 'kek'] }} />

      <div class="flex flex-col gap-8">
        {(query.length > 0 ? foundPosts : posts)?.map(post => (
          <PostCard userId={props.userId} key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostsList
