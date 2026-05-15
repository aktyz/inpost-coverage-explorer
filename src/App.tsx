import { useEffect, useState } from "react";
import { fetchPoints } from "./api/inpost";
import './App.css'

function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchPoints();
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
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
    </>
  )
}

export default App
