import { useEffect, useState } from "react";
import { fetchAllPoints } from "./api/inpost";

import './App.css'
import { type InPostPointApi } from "./types/inpost";

function App() {
  const [data, setData] = useState<InPostPointApi[]>([]);
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

  return (
    <>
    <h1>Inpost Coverage Explorer</h1>
    <p>Total points: {data.length}</p>
    </>
  )
}

export default App
