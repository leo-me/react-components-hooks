// requestStore.ts
import { create } from "zustand"

interface RequestState<T = any> {
  // global in-memory cache to store results by cacheKey
  cache: Record<string, T>
  // track whether a request is in progress currently (with cacheKey)
  fetching: Record<string, boolean>
  // the object is to store the errors
  error: Record<string, Error | null>
  // the queue is to store pending requests waiting for the same cacheKey result 
  requestQueue: Record<string, ((value?: T) => void)[]>

  setCache: (key: string, data: T) => void
  setFetching: (key: string, isFetching: boolean) => void
  setError: (key: string, error: Error | null) => void
  pushToQueue: (key: string, resolver: (value?: T) => void) => void
  resolveQueue: (key: string, value: T) => void
}

export const useRequestStore = create<RequestState>((set, get) => ({
  cache: {},
  fetching: {},
  error: {},
  requestQueue: {},

  setCache: (key, data) =>
    set((state) => ({
      cache: { ...state.cache, [key]: data },
    })),

  setFetching: (key, isFetching) =>
    set((state) => ({
      fetching: { ...state.fetching, [key]: isFetching },
    })),

  setError: (key, error) =>
    set((state) => ({
      error: { ...state.error, [key]: error },
    })),

  pushToQueue: (key, resolver) =>
    set((state) => ({
      requestQueue: {
        ...state.requestQueue,
        [key]: [...(state.requestQueue[key] || []), resolver],
      },
    })),

  resolveQueue: (key, value) => {
    const { requestQueue } = get()
    requestQueue[key]?.forEach((resolve) => resolve(value))
    set((state) => ({
      requestQueue: { ...state.requestQueue, [key]: [] },
    }))
  },
}))
