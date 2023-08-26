import { useEffect, useState } from 'preact/hooks'

type UseSearchProps<T> = {
  data?: T
  onQuery: (query: string) => (T | undefined) | Promise<T | undefined>
}

export const useSearch = <T>(props: UseSearchProps<T>) => {
  const [searchTimeout, setSearchTimeout] = useState<number>()

  const [data, setData] = useState(props.data)
  const [query, setQuery] = useState('')

  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    setIsFetching(true)
    if (searchTimeout) clearTimeout(searchTimeout)
    setSearchTimeout(
      window.setTimeout(async () => {
        setData(await props.onQuery(query.trim()))
        setIsFetching(false)
      }, 300)
    )
  }, [query])

  return {
    data,
    query,
    setQuery,
    isFetching
  }
}
