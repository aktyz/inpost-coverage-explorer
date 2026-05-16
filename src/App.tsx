import { useEffect, useState } from "react";
import { fetchAllPoints } from "./api/inpost";
import { getUniqueCountries, getUniqueStatuses, getUniquePointTypes } from "./util/exploreDataset";

import './App.css'
import { type Point } from "./types/point";

function App() {
  const [data, setData] = useState<Point[]>([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchAllPoints();
        setData(result);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setloading(false);
      }
    }
    loadData();
  }, []);

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
    <p>Total points: {data.length}</p>
    <p>Unique Countries: {uniqueCountries.length} - {uniqueCountries.join(", ")}</p>
    <p>Unique Statuses: {uniqueStatuses.length} - {uniqueStatuses.join(", ")}</p>
    <p>Unique Point Types: {uniquePointTypes.length} - {uniquePointTypes.map(type => type.replace(/_/g, " ").charAt(0).toUpperCase() + type.slice(1).replace(/_/g, " ")).join(", ")}</p>
    </>
  )
}

export default App
