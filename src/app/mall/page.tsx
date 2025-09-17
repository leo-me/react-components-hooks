'use client';

import React from "react";
import { useCachedRequest } from "@/hooks/useCacheRequest";
import { fetchMallConfig } from "@/services/mall";
import Cate from "./components/cate";
import List from "./components/List";



export default function Mall() {
  const { data, loading, error } = useCachedRequest({
    fetcher: fetchMallConfig,
    cacheKey: "mall-001",
  });

  
  console.log('loading: ', loading);


  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>MallName: {data?.name}</p>
      <Cate />
      <List />
    </div>
    );
}
