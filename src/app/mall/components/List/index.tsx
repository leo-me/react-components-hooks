import { useCachedRequest } from "@/hooks/useCacheRequest/index";
import { fetchMallConfig } from "@/services/mall";

export default function List() {
  const { data, loading, error } = useCachedRequest({
    fetcher: fetchMallConfig,
    cacheKey: "mall-001",
  });

  if (loading) return <div>loading goods list</div>


  return (
    <div>
      <h1>goods list</h1>
      {data?.goodsList.map((v) => (<li key={v}>{v}</li>))}
    </div>);
}