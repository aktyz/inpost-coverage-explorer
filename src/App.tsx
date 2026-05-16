import { useEffect, useState } from "react";
import { fetchAllPoints } from "./api/inpost";
import { getUniqueCountries, getUniqueStatuses, getUniquePointTypes } from "./util/exploreDataset";
import { deleteCacheData, CACHE_KEYS } from "./util/cache";

import './App.css'
import { type Point } from "./types/point";

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

  const uniqueCountries = getUniqueCountries(data);
  const uniqueStatuses = getUniqueStatuses(data);
  const uniquePointTypes = getUniquePointTypes(data);

  return (
    <>
    <h1>Inpost Coverage Explorer</h1>
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={handleRefresh} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh Data"}
      </button>
      {isFromCache && <span style={{ marginLeft: "1rem", color: "#666" }}>📦 (loaded from cache)</span>}
    </div>
    <p>Total points: {data.length}</p>
    <p>Unique Countries: {uniqueCountries.length} - {uniqueCountries.join(", ")}</p>
    <p>Unique Statuses: {uniqueStatuses.length} - {uniqueStatuses.join(", ")}</p>
    <p>Unique Point Types: {uniquePointTypes.length} - {uniquePointTypes.map(type => type.replace(/_/g, " ").charAt(0).toUpperCase() + type.slice(1).replace(/_/g, " ")).join(", ")}</p>
    </>
  )
}

export default App
