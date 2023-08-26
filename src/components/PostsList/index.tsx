import { useCtrlKFocus } from 'components/PostsList/use-focus-shortcut'
import { useSearch } from 'components/PostsList/use-search'
import PostCard from 'components/PostsList/PostCard'
import Search from 'components/PostsList/Search'

type PostsListProps = {
  userId: number
}

const PostsList = (props: PostsListProps) => {
  const { posts, query, setQuery } = useSearch()

  useCtrlKFocus()

  return (
    <>
      <Search query={query} setQuery={setQuery} />

      <div className="flex flex-col gap-[30px] ">
        {posts.map(post => (
          <PostCard userId={props.userId} key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default PostsList
