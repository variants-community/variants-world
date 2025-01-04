/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { batch, useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'

type UseSearchProps<V, T> = {
  default: V
  data?: T
  pagination?: { page: number; size: number }
  onQuery: (
    query: NonNullable<V>,
    signal: AbortSignal,
    pagination: { page: number; size: number }
  ) => (T | undefined) | Promise<T | undefined>
}

export const useSearch = <V, T>(props: UseSearchProps<V, T>) => {
  const data = useSignal(props.data)
  const query = useSignal<V>(props.default)
  const controller = useRef<AbortController>()

  const isFetching = useSignal(false)
  const isEndReached = useSignal(false)

  const changeQuery = async (newQuery: V) => {
    query.value = newQuery
    if (!newQuery) {
      batch(() => {
        data.value = undefined
        isFetching.value = false
      })
      return
    }

    isFetching.value = true
    if (controller.current) controller.current.abort()
    controller.current = new AbortController()
    try {
      const newData = await props.onQuery(
        newQuery,
        controller.current.signal,
        (props.pagination && { page: 1, size: props.pagination.size }) as never
      )
      batch(() => {
        data.value = newData
        isEndReached.value = false
        isFetching.value = false
        pagination.value = { start: 1, end: 1 }
        pendingPagination.value = { start: 1, end: 1 }
      })
    } catch (e) {
      // Request canceled
    }
  }

  const pagination = useSignal({ start: props.pagination?.page ?? 1, end: props.pagination?.page ?? 1 })
  const pendingPagination = useSignal({ start: props.pagination?.page ?? 1, end: props.pagination?.page ?? 1 })

  const loadPages = async (payload: { page: number; size: number }) => {
    if (!query.value) return
    isFetching.value = true
    if (controller.current) controller.current.abort()
    controller.current = new AbortController()
    try {
      const newData = await props.onQuery(query.value, controller.current.signal, payload)
      batch(() => {
        if (Array.isArray(newData) && Array.isArray(data.value)) {
          if (!newData.length) isEndReached.value = true
          else for (const item of newData) if (!data.value.some(x => x.id === item.id)) data.value.push(item)
        } else {
          data.value = newData
        }
        isFetching.value = false
        pagination.value = { ...pendingPagination.value }
      })
      setTimeout(handleScroll)
    } catch (e) {
      throw e
      // Request canceled
    }
  }

  const handleScroll = () => {
    const app = document.querySelector('#app')
    if (!app || isEndReached.value) return
    const { scrollTop, scrollHeight } = app
    // play around with the trigger factor instead of fixed px
    const trigger = 1
    if (scrollHeight - (scrollTop + window.innerHeight) < window.innerHeight * trigger) {
      if (pagination.value.end !== pendingPagination.value.end) return
      pendingPagination.value.end++
      loadPages({ page: pendingPagination.value.end, size: props.pagination!.size })
    } else if (pagination.value.start !== 1 && scrollTop < window.innerHeight * trigger) {
      if (pagination.value.start !== pendingPagination.value.start) return
      pendingPagination.value.start++
      loadPages({ page: pendingPagination.value.start, size: props.pagination!.size })
    }
  }

  useEffect(() => {
    if (!props.pagination) return
    const app = document.querySelector('#app')
    if (!app) return
    app.addEventListener('scroll', handleScroll)
    return () => {
      app.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return {
    signal: data,
    data: data.value,
    query: query.value,
    setQuery: changeQuery,
    forceLoad: handleScroll,
    isFetching: isFetching.value
  }
}
