import { type GalleryView, GalleryViewSwitch } from 'components/common/GalleryViewSwitch'
import { actions } from 'astro:actions'
import { cl } from 'utils/hepers'
import { useComputed, useSignal, useSignalEffect } from '@preact/signals'
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
  const { posts, forceLoad } = useScrolLoading({
    initialPosts: props.posts,
    POSTS_PER_PAGE: useComputed(() => (galleryView.value === 'large' ? 10 : 50))
  })

  const galleryView = useSignal<GalleryView>('large')
  useSignalEffect(() => {
    if (galleryView.value === 'compact') forceLoad()
  })

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
      <div class="flex gap-x-3 mt-4 mb-10 lg:(mb-14 mt-0)">
        <PostsSearch query={query} setQuery={setQuery} />
        <GalleryViewSwitch signal={galleryView} />
      </div>

      <div class={useComputed(() => cl('flex flex-col', galleryView.value === 'large' ? 'gap-8' : 'gap-4'))}>
        {(query.length > 0 ? foundPosts : posts)?.map(post => (
          <PostCard userId={props.userId} key={post.id} post={post} view={galleryView} />
        ))}
      </div>
    </div>
  )
}

export default PostsList
