import React from "react";
import { useCachedRequest } from "./hook";

async function fetchMallConfig() {
  // Simulating API requests
  return new Promise<{ name: string }>((resolve) => {
    setTimeout(() => resolve({ name: "Mall Config Data" }), 1000);
  });
}

export default function MallConfig() {
  const { data, loading, error } = useCachedRequest({
    fetcher: fetchMallConfig,
    cacheKey: "mall-001",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <p>{data?.mallName}</p>;
}
