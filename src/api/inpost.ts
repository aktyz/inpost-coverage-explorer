const BASE_URL = "https://api-global-points.easypack24.net/v1/points";

export async function fetchPoints() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch InPost points");
  }

  const data = await response.json();

  return data;
}
