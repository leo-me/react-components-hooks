/**
 * use zustand
 */

import { useEffect, useRef } from "react";
import { useRequestStore } from "@/store/requestStore"


interface FetchOptions<T> {
  // function to fetch data 
  fetcher: (cacheKey?: string) => Promise<T>;
  // unique key to identify the request result
  cacheKey: string;
}

export function useCachedRequest<T>({ fetcher, cacheKey }: FetchOptions<T>) {
  const {
    cache,
    fetching,
    error,
    setCache,
    setFetching,
    setError,
    pushToQueue,
    resolveQueue,
  } = useRequestStore();

  // track whether the component is still mounted (avoid state updates after unmount)
  const mountedRef = useRef(true);

  async function fetchData() {
    // return cached data result if available
    if (cache[cacheKey]) {
      return;
    }



    // if another request is already fetching the same cacheKey
    // wait until the request resolves
    if (fetching[cacheKey]) {
      return new Promise<T>((resolve) => {
        pushToQueue(cacheKey, resolve as (value?: any) => void);
      }).then(() => {
        if (mountedRef.current) {
          setFetching(cacheKey, false)
        }
      });
    }


    // otherwise, start a new request
    setFetching(cacheKey, true)

    try {
      const result = await fetcher(cacheKey);

      // store result in cache
      setCache(cacheKey, result)

      // resolve all queued requests waiting for this result
      resolveQueue(cacheKey, result)
    } catch (err) {
      if (mountedRef.current) {
        setError(cacheKey, err as Error)
      }
    } finally {
      // marking fetching is finished
      setFetching(cacheKey, false)
    }
  }

  useEffect(() => {
    mountedRef.current = true;

    fetchData();

    // cleanup: mark component as mounted
    return () => {
      mountedRef.current = false;
    };
  }, [cacheKey]);

  return {
    data: cache[cacheKey] as T | undefined,
    loading: fetching[cacheKey] || false,
    error: error[cacheKey] || null,
  };
}

