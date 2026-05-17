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
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            p-6
            shadow-sm
          "
        >
          <h1
            className="
              text-4xl
              font-bold
              text-gray-900
              tracking-tight
            "
          >
            Inpost Coverage Explorer
          </h1>
          <div className="mt-3 h-1 w-24 rounded-full bg-yellow-400" />
          <p className="mt-4 text-gray-600 max-w-2xl">
            Interactive analytics dashboard for exploring
            InPost parcel point distribution across Europe.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              className="
                px-4
                py-2
                rounded-lg
                border
                border-gray-300
                bg-white
                text-gray-800
                font-medium
                hover:bg-gray-100
                transition-colors
                duration-200
              "
            >
              Zyta's CV
            </button>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="
                px-4
                py-2
                rounded-lg
                bg-yellow-400
                text-black
                font-semibold
                hover:bg-yellow-500
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition-colors
                duration-200
              "
            >
              {loading ? "Refreshing..." : "Refresh Data"}
            </button>
            {isFromCache &&
              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  text-gray-600
                  bg-gray-200
                  px-3
                  py-2
                  rounded-lg
                "
              >
                📦 (loaded from cache)
              </span>}
          </div>
        </div>
        <PointsTable points={data}/>
      </div>
    </div>
  )
}

export default App
