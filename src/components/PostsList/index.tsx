import PostCard from './PostCard'
import Search from './Search'
import type { PostWithDetailsForCard } from '../../db/prisma/queries'
import { useSearchQuery } from './useSearchQuery'
import { useCtrlKFocus } from './useCtrlKFocus'

type PostsListProps = {
  userId: number;
  posts: PostWithDetailsForCard[];
};

const PostsList = (props: PostsListProps) => {
  const { filteredPosts, query, setQuery } = useSearchQuery(props.posts)

  useCtrlKFocus()

  return (
    <>
      <Search query={query} setQuery={setQuery} />

      <div className="flex flex-col gap-[30px] ">
        {filteredPosts.map((post) => (
          <PostCard userId={props.userId} key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default PostsList
