

import { useState, useEffect, useRef } from "react";

interface FetchOptions<T> {
  // function to fetch data 
  fetcher: () => Promise<T>;
  // unique key to identify the request result
  cacheKey: string;
}

interface IRequest<T> {
  // callback to resolve waiting requests with the fetch data
  resolve: (value?: T) => void;
}

// global in-memory cache to store results by cacheKey
const cache: Record<string, unknown> = {};

// the queue is to store pending requests waiting for the same cacheKey result 
const requestQueue: Record<string, IRequest<unknown>[]> = {};

// track whether a request is in progress currently (with cacheKey)
const fetching: Record<string, boolean> = {};



export function useCachedRequest<T>({ fetcher, cacheKey }: FetchOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // track whether the component is still mounted (avoid state updates after unmount)
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    async function fetchData() {

      // return cached data result if available
      if (cache[cacheKey]) {
        setData(cache[cacheKey] as T);
        return;
      }


      // if another request is already fetching the same cacheKey
      // wait until the request resolves
      if (fetching[cacheKey]) {

        return new Promise<T>((resolve) => {
          if (!requestQueue[cacheKey]) requestQueue[cacheKey] = [];
          requestQueue[cacheKey].push({ resolve });
        }).then((res) => {
          if (mountedRef.current) {
            setData(res as T);
          }
        });
      }


      // otherwise, start a new request
      setLoading(true);
      fetching[cacheKey] = true;

      try {
        const result = await fetcher();
        
        // store result in cache
        cache[cacheKey] = result;


        // update state if component is still mounted
        if (mountedRef.current) {
          setData(result);
        }


        // resolve all queued requests waiting for this result
        if (requestQueue[cacheKey]) {
          requestQueue[cacheKey].forEach((req) => req.resolve(result));
          requestQueue[cacheKey] = [];
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(err as Error);
        }
      } finally {
        // marking fetching is finished
        fetching[cacheKey] = false;

        // update the state only if component is still mounted
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // cleanup: mark component as mounted
    return () => {
      mountedRef.current = false;
    };
  }, [cacheKey]);

  return { data, loading, error };
}

