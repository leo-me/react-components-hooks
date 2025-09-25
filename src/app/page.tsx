'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { useCachedRequest } from "@/hooks/useCachedRequest";
import { fetchMallConfig } from "@/services/mall";
import Cate from "@/components/cate";
import List from "@/components/List";
import { Button } from "@/components/Button";
import './index.scss';



export default function Mall() {
  const router = useRouter();
  const { data, loading, error } = useCachedRequest({
    fetcher: fetchMallConfig,
    cacheKey: "mall-001",
  });


  const goLogin = () => {
    router?.push('/login');
  };  



  // if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mall-container">
      <Button primary onClick={goLogin}>go login</Button>   
      
      {loading && <p>Loading...</p>}
      {!loading  && <p>MallName: {data?.name}</p>}
      <Cate />
      <List />
    </div>
    );
}
