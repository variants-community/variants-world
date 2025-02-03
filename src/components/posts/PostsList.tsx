import { type GalleryView, GalleryViewSwitch } from 'components/common/GalleryViewSwitch'
import { actions } from 'astro:actions'
import { cl, statusToColor, statusToString } from 'utils/hepers'
import { useComputed, useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { useSearch } from 'src/hooks/use-search'
import PostCard from 'components/posts/PostCard'
import PostsSearch from 'components/posts/PostsSearch'
import type { GameStatus, PostForCard } from 'db/prisma/types'

type PostsListProps = {
  userId: number
  posts: PostForCard[]
  galleryView: GalleryView
  size: number
  page: number
  pageEnd?: number
  status?: GameStatus
  search?: string
  focusedPostId?: number
}

const PostsList = (props: PostsListProps) => {
  const galleryView = useSignal<GalleryView>(props.galleryView)
  const STATUSES = useComputed<GameStatus[]>(() => ['UNDER_REVIEW', 'ACCEPTED', 'DECLINED', 'PENDING_REPLY'])

  useEffect(() => {
    if (props.focusedPostId)
      document
        .querySelector(`[href="/posts/${props.focusedPostId}"]`)
        ?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, [])

  useEffect(() => {
    const timer = self.setTimeout(forceLoad, 100)
    return () => self.clearTimeout(timer)
  }, [galleryView.value])

  console.log({ title: props.search })
  const {
    data: foundPosts,
    query,
    setQuery,
    isEndReached,
    forceLoad
  } = useSearch({
    data: props.posts,
    default: { search: props.search ?? '', status: props.status ?? undefined },
    onQuery: async (newQuery, _, { page, size }) => {
      console.warn('OOOOooofff', { newQuery, page, size })
      if (newQuery) {
        return (await actions.getFilteredPosts.orThrow({ ...newQuery, page, size })).posts
      }
    },
    pagination: { page: props.page, size: props.size, pageEnd: props.pageEnd }
  })

  return (
    <div class="mx-auto container pb-12">
      <div class="flex gap-x-3 mt-4 lg:mt-0 mb-4">
        <PostsSearch
          query={query.search ?? ''}
          setQuery={search => {
            document.cookie = `search=${search ?? ''}; path=/; SameSite=Strict`
            setQuery({ search, status: query.status })
          }}
        />
        <GalleryViewSwitch signal={galleryView} />
      </div>
      <div class="mb-10 lg:mb-8 flex gap-x-3 px-5">
        {STATUSES.value.map(status => (
          <div
            class={cl(
              'flex items-center gap-x-1.5 bg-dark darkborder shadow-lightSmall px-2.5 py-1 rounded-lg cursor-pointer select-none',
              query.status === status ? `text-${statusToColor(status)} shadow-lightSmallHover` : 'text-text'
            )}
            onMouseDown={() => {
              const newStatus = query.status === status ? undefined : status
              document.cookie = `status=${newStatus ?? ''}; path=/; SameSite=Strict`
              setQuery({ search: query.search ?? '', status: newStatus })
            }}
          >
            {/* <StatusIndicator status={activeStatus.value === status ? status : undefined} small /> */}
            {statusToString(status)}
          </div>
        ))}
      </div>

      <div class={useComputed(() => cl('flex flex-col', galleryView.value === 'compact' ? 'gap-4' : 'gap-8'))}>
        {foundPosts?.map(post => <PostCard userId={props.userId} key={post.id} post={post} view={galleryView} />)}
        <div class={cl(isEndReached ? 'h-0' : 'h-[calc(95dvh-6rem)]')} />
      </div>
    </div>
  )
}

export default PostsList
