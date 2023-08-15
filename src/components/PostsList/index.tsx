import PostCard from './PostCard'
import Search from './Search'
import type { PostForCard } from '../../db/prisma/queries'
import { useSearch } from './useSearch'
import { useCtrlKFocus } from './useCtrlKFocus'

type PostsListProps = {
  userId: number;
  posts: PostForCard[];
};

const PostsList = (props: PostsListProps) => {
  const { posts, query, setQuery } = useSearch(
    props.posts,
  )

  useCtrlKFocus()

  return (
    <>
      <Search query={query} setQuery={setQuery} />

      <div className="flex flex-col gap-[30px] ">
        {posts.map((post) => (
          <PostCard userId={props.userId} key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default PostsList
