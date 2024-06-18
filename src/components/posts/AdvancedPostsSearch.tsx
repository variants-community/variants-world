import { AuthorHint } from 'components/AdvancedSearch/hints/AuthorHint'
import { RuleHint } from 'components/AdvancedSearch/hints/RuleHint'
import { Search } from 'components/AdvancedSearch/Search'
import { SortByHint } from 'components/AdvancedSearch/hints/SortByHint'
import { StatusHint } from 'components/AdvancedSearch/hints/StatusHint'
import { TypeHint } from 'components/AdvancedSearch/hints/TypeHint'
import { getValueFromEvent } from 'utils/hepers'
import { useEffect, useMemo, useRef } from 'preact/hooks'
import type { KeyWordToHintMappings } from 'components/AdvancedSearch/use-computed-hints'
import type { SearhHintDetails } from 'db/prisma/queries'

type SearhProps = {
  query: string
  setQuery: (query: string) => void
  searchDetails: SearhHintDetails
}

const PostsSearch = (props: SearhProps) => {
  const ref = useRef<HTMLInputElement>()

  const onQueryInput = async (e: Event) => {
    props.setQuery(getValueFromEvent<string>(e))
  }

  useEffect(() => {
    const onShortcut = (e: KeyboardEvent) => {
      if (e.altKey || e.metaKey || e.shiftKey || !ref.current) return
      if (e.ctrlKey && e.key === 'k') ref.current.focus()
      else if (!e.ctrlKey && e.key === 'Escape') ref.current.blur()
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onShortcut)
    return () => {
      window.removeEventListener('keydown', onShortcut)
    }
  }, [])

  const hintMapper = useMemo(
    () =>
      ({
        author: AuthorHint({ usernames: props.searchDetails.usernames }),
        // after: AfterHint({}),
        // before: BeforeHint({}),
        status: StatusHint({}),
        rule: RuleHint({}),
        type: TypeHint({}),
        // last: LastHint({}),
        'sort-by': SortByHint({})
      }) as KeyWordToHintMappings,
    [props.searchDetails]
  )

  return <Search hintMapper={hintMapper} />
}

export default PostsSearch
