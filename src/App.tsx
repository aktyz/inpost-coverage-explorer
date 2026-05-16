import { useEffect, useMemo, useState } from "react";
import { fetchAllPoints } from "./api/inpost";
import { deleteCacheData, CACHE_KEYS } from "./util/cache";

import './App.css'
import { type Point } from "./types/point";
import { Filters } from "./components/Filters";
import { PointsTable } from "./components/PointsTable";

import { DEFAULT_FILTERS } from "./filters/defaultFilters";
import { filterPoints } from "./filters/filterPoints";

function App() {
  const [data, setData] = useState<Point[]>([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

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

  const filteredPoints = useMemo(() => { return filterPoints(data, filters); },
      [data, filters]);

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
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={handleRefresh} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh Data"}
      </button>
      {isFromCache && <span style={{ marginLeft: "1rem", color: "#666" }}>📦 (loaded from cache)</span>}
    </div>
    <h2>Showing first 200 rows of {data.length}</h2>
    <Filters filters={filters} onChange={setFilters}/>
    <PointsTable points={filteredPoints}/>
    </>
  )
}

export default App
