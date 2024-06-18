import { fetchPosts } from 'utils/fetch-queries'
import { useEffect, useRef } from 'preact/hooks'
import { useScrolLoading } from 'components/posts/use-scroll-loading'
import { useSearch } from 'src/hooks/use-search'
import PostCard from 'components/posts/PostCard'
import PostsSearch from 'components/posts/PostsSearch'
import type { PostForCard } from 'db/prisma/queries'

const Tribute = !import.meta.env.SSR ? await import('tributejs') : undefined

type PostsListProps = {
  userId: number
  posts: PostForCard[]
}

const PostsList = (props: PostsListProps) => {
  const { posts } = useScrolLoading(props.posts)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (Tribute) {
      if (!searchRef.current) return

      console.log('tributejs')
      const tribute = new Tribute.default({
        // trigger: '',
        selectClass: 'highlight',
        containerClass: 'tribute-container',
        itemClass: '',
        // function called on select that returns the content to insert
        selectTemplate(item) {
          return `<span class='tag'>${item.original.value}</span>`
        },

        // template for displaying item in menu
        menuItemTemplate(item) {
          return item.string
        },
        // template for when no match is found (optional),
        // If no template is provided, menu is hidden.
        // noMatchTemplate: null,

        // specify an alternative parent container for the menu
        // container must be a positioned element for the menu to appear correctly ie. `position: relative;`
        // default container is the body
        // menuContainer: document.body,

        // column to search against in the object (accepts function or string)
        // lookup: 'key',

        // column that contains the content to insert by default
        fillAttr: 'value',

        // REQUIRED: array of objects to match or a function that returns data (see 'Loading remote data' for an example)
        values: [
          { key: 'test', value: 'test' },
          { key: 'test', value: 'test' }
        ]

        // When your values function is async, an optional loading template to show
        // loadingItemTemplate: null,

        // specify whether a space is required before the trigger string
        // requireLeadingSpace: true,

        // specify whether a space is allowed in the middle of mentions
        // allowSpaces: false,

        // optionally specify a custom suffix for the replace text
        // (defaults to empty space if undefined)
        // replaceTextSuffix: '\n',

        // specify whether the menu should be positioned.  Set to false and use in conjuction with menuContainer to create an inline menu
        // (defaults to true)
        // positionMenu: true,

        // when the spacebar is hit, select the current match
        // spaceSelectsMatch: false,

        // turn tribute into an autocomplete
        // autocompleteMode: false,

        // Customize the elements used to wrap matched strings within the results list
        // defaults to <span></span> if undefined
        // searchOpts: {
        //   pre: '<span>',
        //   post: '</span>',
        //   skip: false // true will skip local search, useful if doing server-side search
        // },

        // Limits the number of items in the menu
        // menuItemLimit: 25,

        // specify the minimum number of characters that must be typed before menu appears
        // menuShowMinLength: 0
      })
      console.log(tribute)
      tribute.attach(searchRef.current)
    }
  }, [])

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
      <div>
        <div ref={searchRef} contentEditable>
          Kek
        </div>
      </div>
      {/* <PostsSearch query={query} setQuery={setQuery} /> */}

      <div class="flex flex-col gap-8">
        {(query.length > 0 ? foundPosts : posts)?.map(post => (
          <PostCard userId={props.userId} key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostsList
