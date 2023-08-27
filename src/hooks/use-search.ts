import { useRef } from 'preact/hooks'
import { useSignal } from '@preact/signals'

type UseSearchProps<T> = {
  data?: T
  onQuery: (query: string, signal?: AbortSignal) => (T | undefined) | Promise<T | undefined>
}

export const useSearch = <T>(props: UseSearchProps<T>) => {
  const data = useSignal(props.data)
  const query = useSignal('')
  const controller = useRef<AbortController>()

  const isFetching = useSignal(false)

  const changeQuery = async (newQuery: string) => {
    query.value = newQuery
    if (!newQuery) {
      data.value = undefined
      isFetching.value = false
      return
    }

    isFetching.value = true
    if (controller.current) controller.current.abort()
    controller.current = new AbortController()
    try {
      const newData = await props.onQuery(newQuery.trim(), controller.current.signal)
      data.value = newData
      isFetching.value = false
    } catch {
      // Request canceled
    }
  }

  return {
    data: data.value,
    query: query.value,
    setQuery: changeQuery,
    isFetching: isFetching.value
  }
}
