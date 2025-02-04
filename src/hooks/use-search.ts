/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { batch, useSignal } from '@preact/signals'
import { useEffect, useRef } from 'preact/hooks'

type UseSearchProps<V, T> = {
  default: V
  data?: T
  pagination?: { page: number; size: number; pageEnd?: number }
  onQuery: (
    query: NonNullable<V>,
    signal: AbortSignal,
    pagination: { page: number; size: number }
  ) => (T | undefined) | Promise<T | undefined>
}

export const useSearch = <V, T>(props: UseSearchProps<V, T>) => {
  const data = useSignal(
    props.pagination && Array.isArray(props.data)
      ? props.data.map(x => ({ ...x, page: props.pagination!.page }))
      : props.data
  )
  const query = useSignal<V>(props.default)
  const controller = useRef<AbortController>()

  const isFetching = useSignal(false)
  const isEndReached = useSignal(
    props.pagination && Array.isArray(props.data)
      ? props.data.length < props.pagination.size * (props.pagination.pageEnd ? 2 : 1)
      : false
  )

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
      console.log('WHYYYYYYYYYYYYYYY')
      const newData = await props.onQuery(
        newQuery,
        controller.current.signal,
        (props.pagination && { page: 1, size: props.pagination.size }) as never
      )
      batch(() => {
        data.value =
          props.pagination && Array.isArray(newData)
            ? newData.map(x => ({ ...x, page: props.pagination!.page }))
            : newData
        isEndReached.value = false
        isFetching.value = false
        pagination.value = { start: 1, end: 1 }
        pendingPagination.value = { start: 1, end: 1 }
      })
      if (loadTimer.current === -1) return
      loadTimer.current = self.setTimeout(handleScroll)
    } catch (e) {
      // Request canceled
    }
  }

  const pagination = useSignal({
    start: props.pagination?.page ?? 1,
    end: props.pagination?.pageEnd ?? props.pagination?.page ?? 1
  })
  const pendingPagination = useSignal({
    start: props.pagination?.page ?? 1,
    end: props.pagination?.pageEnd ?? props.pagination?.page ?? 1
  })

  const loadTimer = useRef(0)
  const loadPages = async (payload: { page: number; size: number }) => {
    if (!query.value) return
    isFetching.value = true
    if (controller.current) controller.current.abort()
    controller.current = new AbortController()
    self.clearTimeout(loadTimer.current)
    try {
      const newData = await props.onQuery(query.value, controller.current.signal, payload)
      console.log({ newData })
      const app = document.querySelector('#app')!
      const scrollHeight = app.scrollHeight
      const isStartLoaded = pendingPagination.value.start < pagination.value.start
      batch(() => {
        if (Array.isArray(newData) && Array.isArray(data.value)) {
          if (!newData.length) isEndReached.value = true
          else {
            const newItems = []
            for (const item of newData)
              if (!data.value.some(x => x.id === item.id)) newItems.push({ ...item, page: payload.page })
            const index = data.value.findIndex(x => x.page === payload.page + 1)
            console.log(newItems)
            if (index !== -1) data.value.splice(index, 0, ...newItems)
            else data.value.push(...newItems)
          }
        } else {
          data.value = newData
        }
        isFetching.value = false
        pagination.value = { ...pendingPagination.value }
      })
      setTimeout(() => {
        if (isStartLoaded && !app.scrollTop)
          app.scrollTo({ top: app.scrollTop + app.scrollHeight - scrollHeight, behavior: 'instant' })
      })
      if (loadTimer.current === -1) return
      loadTimer.current = self.setTimeout(handleScroll)
    } catch (e) {
      throw e
      // Request canceled
    }
  }

  const handleScroll = () => {
    console.log('handleScroll omg')
    const app = document.querySelector('#app')
    if (!app) return
    const { scrollTop, scrollHeight } = app
    // play around with the trigger factor instead of fixed px
    const trigger = 1
    if (!isEndReached.value && scrollHeight - (scrollTop + window.innerHeight) < window.innerHeight * trigger) {
      console.log('scrollbottom')
      if (pagination.value.end !== pendingPagination.value.end) return
      pendingPagination.value.end++
      loadPages({ page: pendingPagination.value.end, size: props.pagination!.size })
    } else if (pagination.value.start !== 1 && scrollTop < window.innerHeight * trigger) {
      console.log('scrolltop')
      if (pagination.value.start !== pendingPagination.value.start) return
      pendingPagination.value.start--
      loadPages({ page: pendingPagination.value.start, size: props.pagination!.size })
    }
  }

  useEffect(() => {
    if (!props.pagination) return
    const app = document.querySelector('#app')
    if (!app) return
    app.addEventListener('scroll', handleScroll)
    console.error('NOICE')
    return () => {
      console.error('STOPPPPP')
      app.removeEventListener('scroll', handleScroll)
      self.clearTimeout(loadTimer.current)
      loadTimer.current = -1
    }
  }, [])

  return {
    signal: data,
    data: data.value,
    query: query.value,
    setQuery: changeQuery,
    forceLoad: handleScroll,
    isEndReached: isEndReached.value,
    isFetching: isFetching.value
  }
}
