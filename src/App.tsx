import { useEffect, useState } from "react";
import { fetchAllPoints } from "./api/inpost";
import { deleteCacheData, CACHE_KEYS } from "./util/cache";

import './App.css'
import { type Point } from "./types/point";
import { PointsTable } from "./components/PointsTable";

function App() {
  const [data, setData] = useState<Point[]>([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);

  const loadData = async (forceRefresh: boolean = false) => {
    setloading(true);
    setError(null);
    try {
      const result = await fetchAllPoints(forceRefresh);
      setData(result.points);
      setIsFromCache(result.fromCache);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = async () => {
    await deleteCacheData(CACHE_KEYS.INPOST_POINTS);
    loadData(true);
  };

  if (loading)
    return <p>Loading...</p>;

  if (error)
    return <p>{error}</p>;

  return (
    <>
    <h1>Inpost Coverage Explorer</h1>
    <div>
      <button onClick={handleRefresh} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh Data"}
      </button>
      {isFromCache && <span>📦 (loaded from cache)</span>}
    </div>
    <PointsTable points={data}/>
    </>
  )
}

export default App
