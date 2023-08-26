import { fetchPosts } from 'utils/fetch-queries'
import { useCtrlKFocus } from 'components/PostsList/use-focus-shortcut'
import { useScrolLoading } from 'components/PostsList/use-scroll-loading'
import { useSearch } from 'src/hooks/use-search'
import PostCard from 'components/PostsList/PostCard'
import Search from 'components/PostsList/Search'
import type { PostForCard } from 'db/prisma/queries'

type PostsListProps = {
  userId: number
  initPosts: PostForCard[]
}

const PostsList = (props: PostsListProps) => {
  const { posts } = useScrolLoading(props.initPosts)

  const {
    data: foundPosts,
    query,
    setQuery
  } = useSearch({
    onQuery: async q => {
      if (query.length > 0) {
        return fetchPosts({ searchText: q })
      }
    }
  })

  useCtrlKFocus()

  return (
    <>
      <Search query={query} setQuery={setQuery} />

      <div class="flex flex-col gap-[30px] ">
        {query.length > 0 &&
          foundPosts &&
          foundPosts.map(post => <PostCard userId={props.userId} key={post.id} post={post} />)}
        {query.length === 0 && posts && posts.map(post => <PostCard userId={props.userId} key={post.id} post={post} />)}
      </div>
    </>
  )
}

export default PostsList
