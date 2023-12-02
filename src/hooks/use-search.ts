import { useRef } from 'preact/hooks'
import { useSignal } from '@preact/signals'

type UseSearchProps<V, T> = {
  default: V
  data?: T
  onQuery: (query: NonNullable<V>, signal?: AbortSignal) => (T | undefined) | Promise<T | undefined>
}

export const useSearch = <V, T>(props: UseSearchProps<V, T>) => {
  const data = useSignal(props.data)
  const query = useSignal<V>(props.default)
  const controller = useRef<AbortController>()

  const isFetching = useSignal(false)

  const changeQuery = async (newQuery: V) => {
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
      const newData = await props.onQuery(newQuery, controller.current.signal)
      data.value = newData
      isFetching.value = false
    } catch {
      // Request canceled
    }
  }

  return {
    signal: data,
    data: data.value,
    query: query.value,
    setQuery: changeQuery,
    isFetching: isFetching.value
  }
}
