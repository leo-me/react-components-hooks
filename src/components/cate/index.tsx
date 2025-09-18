import { useCachedRequest } from "@/hooks/useCachedRequest";
import { fetchMallConfig } from "@/services/mall";

export default function CateList() {
  const { data, loading, error } = useCachedRequest({
    fetcher: fetchMallConfig,
    cacheKey: "mall-002",
  });


  if (loading) return <div>loading cate list</div>


  return (
    <div>
      <h1>cate list</h1>
      {data?.cateList.map((v) => (<li key={v}>{v}</li>))}
    </div>
  );
}