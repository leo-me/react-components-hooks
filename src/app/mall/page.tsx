'use client';

import React from "react";
import { useCachedRequest } from "@/hooks/useCachedRequest";
import { fetchMallConfig } from "@/services/mall";
import Cate from "@/components/cate";
import List from "@/components/List";
import './index.scss';



export default function Mall() {
  const { data, loading, error } = useCachedRequest({
    fetcher: fetchMallConfig,
    cacheKey: "mall-001",
  });

  
  console.log('loading: ', loading);


  // if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mall-container">
      {loading && <p>Loading...</p>}
      {!loading  && <p>MallName: {data?.name}</p>}
      <Cate />
      <List />
    </div>
    );
}
