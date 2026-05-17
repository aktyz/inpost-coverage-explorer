import { useEffect, useState } from "react";
import { fetchAllPoints } from "./api/inpost";
import { deleteCacheData, CACHE_KEYS, getCachedData } from "./util/cache";

import './App.css'
import { type Point } from "./types/point";
import { PointsTable } from "./components/PointsTable";
import { CVDisplay } from "./components/CVDisplay";

function App() {
  const [data, setData] = useState<Point[]>([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const [showCV, setShowCV] = useState(false);

  const loadData = async (forceRefresh: boolean = false) => {
    // Check cache first to determine if we're loading from cache
    if (!forceRefresh) {
      const cachedPoints = await getCachedData<Point[]>(CACHE_KEYS.INPOST_POINTS);
      if (cachedPoints) {
        setIsFromCache(true);
      }
    }

    setloading(true);
    setError(null);
    try {
      const result = await fetchAllPoints(forceRefresh);
      setData(result.points);
      // Only update isFromCache if it wasn't already set from the cache check
      if (forceRefresh || !isFromCache) {
        setIsFromCache(result.fromCache);
      }
    } catch (err) {
      setError("Failed to load data");
      setIsFromCache(false);
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

          {/* Loading State */}
          {loading && (
            <span className="inline-flex items-center gap-2 text-sm text-gray-600 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg mt-4">
              ⏳ {isFromCache ? "Loading data from IndexedDB..." : "Loading data from InPost endpoint into IndexedDB..."}
            </span>
          )}

          {/* Error State */}
          {error && !loading && (
            <span className="inline-flex items-center gap-2 text-sm text-red-600 bg-red-100 px-3 py-2 rounded-lg mt-4">
              ❌ {error}
            </span>
          )}

          {/* Success State */}
          {!loading && !error && (
            <>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowCV(!showCV)}
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
                  {showCV ? "Go Back to Data Explorer" : "Zyta's CV"}
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
            </>
          )}
        </div>

        {/* Content: Loading, Error, or Data */}
        {loading && <CVDisplay />}
        {!loading && !error && (showCV ? <CVDisplay /> : <PointsTable points={data}/>)}
      </div>
    </div>
  )
}

export default App
